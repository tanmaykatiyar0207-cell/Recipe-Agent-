"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Divider with animation */}
      <motion.div
        className="relative h-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        </div>
      </motion.div>

      <Features />

      {/* Divider */}
      <motion.div
        className="relative h-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        </div>
      </motion.div>

      <ChatInterface />
      <Footer />
    </main>
  );
}
