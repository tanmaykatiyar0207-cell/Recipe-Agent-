"use client";

import { motion } from "framer-motion";
import { ChefHat, Github, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <ChefHat className="w-8 h-8 text-primary" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Sparkles className="w-3 h-3 text-secondary" />
              </motion.div>
            </motion.div>
            <span className="text-xl font-display font-bold gradient-text">
              Recipe Agent
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="#chat"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              Get Cooking
            </Link>
            <motion.a
              href="https://github.com/tanmaykatiyar0207-cell/Recipe-Agent-"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all duration-300 text-sm"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
