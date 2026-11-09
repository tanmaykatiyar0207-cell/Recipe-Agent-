"use client";

import { motion, useInView } from "framer-motion";
import { Brain, ChefHat, Clock, Globe, Heart, Sparkles } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered",
    description:
      "Leverages Google Gemini to understand your cravings and generate perfect recipes tailored to your taste.",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Globe,
    title: "50+ Cuisines",
    description:
      "From Italian pasta to Japanese ramen, Thai curries to Mexican tacos — explore cuisines from around the world.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Heart,
    title: "Diet Friendly",
    description:
      "Vegan, keto, gluten-free, or any dietary preference — get recipes that match your lifestyle.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Clock,
    title: "Quick & Easy",
    description:
      "From 15-minute meals to elaborate feasts — specify your time and get recipes that fit your schedule.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: ChefHat,
    title: "Step by Step",
    description:
      "Clear, detailed instructions with tips and tricks so even beginners can cook like a pro.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description:
      "Tell me what's in your fridge and I'll create something amazing with those ingredients.",
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-32 px-6" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
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
            <Sparkles className="w-4 h-4 text-secondary" />
            Why Choose Recipe Agent
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
            Cook Smarter,{" "}
            <span className="gradient-text">Not Harder</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Everything you need to discover, create, and master delicious meals
            with the power of AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative glass rounded-2xl p-6 h-full cursor-default overflow-hidden"
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                />

                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                {/* Bottom line accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
