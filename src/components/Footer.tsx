"use client";

import { motion } from "framer-motion";
import { ChefHat, Github, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-16 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <ChefHat className="w-8 h-8 text-primary" />
            <span className="text-2xl font-display font-bold gradient-text">
              Recipe Agent
            </span>
          </motion.div>

          <p className="text-gray-400 text-center max-w-md">
            AI-powered recipe assistant that helps you discover delicious meals
            tailored to your preferences.
          </p>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/tanmaykatiyar0207-cell/Recipe-Agent-"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-4 h-4 text-accent fill-accent" />
            </motion.div>
            <span>and</span>
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Gemini AI</span>
          </div>

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Recipe Agent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
