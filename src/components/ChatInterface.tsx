"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Send,
  ChefHat,
  User,
  Sparkles,
  Trash2,
  Lightbulb,
} from "lucide-react";
import { useState, useRef, useEffect, FormEvent } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "🍝 Give me a quick pasta recipe for dinner",
  "🥗 I have chicken, rice, and broccoli. What can I make?",
  "🍰 Suggest a simple dessert for beginners",
  "🌮 What's a good vegetarian Mexican recipe?",
  "🍜 How do I make authentic ramen from scratch?",
  "🥘 Give me a healthy meal prep idea for the week",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    setError(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <section
      id="chat"
      ref={sectionRef}
      className="relative py-24 px-6 min-h-screen"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-secondary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ChefHat className="w-4 h-4 text-primary" />
            AI Recipe Chat
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
            Ask me <span className="gradient-text">anything</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            What are you craving today? Describe your ingredients, mood, or
            cuisine preference and I&apos;ll create the perfect recipe.
          </p>
        </motion.div>

        {/* Chat container */}
        <motion.div
          className="glass rounded-3xl overflow-hidden glow-orange"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-surface" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Recipe Agent</h3>
                <p className="text-xs text-green-400">Online • Ready to cook</p>
              </div>
            </div>

            {messages.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearChat}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          {/* Messages area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-6 scroll-smooth">
            {messages.length === 0 ? (
              // Welcome state with suggestions
              <motion.div
                className="h-full flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <ChefHat className="w-10 h-10 text-primary" />
                </motion.div>

                <h3 className="text-xl font-display font-semibold mb-2">
                  What shall we cook today?
                </h3>
                <p className="text-gray-400 text-sm mb-8 text-center">
                  Pick a suggestion or type your own request
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {SUGGESTIONS.map((suggestion, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(suggestion)}
                      className="text-left px-4 py-3 rounded-xl glass-light hover:bg-white/10 transition-all duration-300 text-sm text-gray-300 hover:text-white group"
                    >
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-secondary mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{suggestion}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              // Messages
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <ChefHat className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-primary-light text-white rounded-br-md"
                          : "glass-light rounded-bl-md"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div className="recipe-markdown text-sm">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                      <p
                        className={`text-[10px] mt-2 ${
                          message.role === "user"
                            ? "text-white/50"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {message.role === "user" && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-300" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <ChefHat className="w-4 h-4 text-white" />
                </div>
                <div className="glass-light rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="typing-dots flex gap-1.5">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-white/5 p-4"
          >
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me for a recipe..."
                  rows={1}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-sm text-white placeholder-gray-500 resize-none transition-all duration-300"
                  disabled={isLoading}
                />
              </div>
              <motion.button
                type="submit"
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex-shrink-0"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </motion.button>
            </div>
            <p className="text-[11px] text-gray-600 mt-2 text-center">
              Recipe Agent uses Gemini AI. Recipes are AI-generated suggestions.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
