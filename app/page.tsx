"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MoodSync() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState({
    color: "from-slate-900 to-slate-800",
    label: "Neutral",
    emoji: "😶",
  });

  useEffect(() => {
    const word = text.toLowerCase();
    if (
      word.includes("happy") ||
      word.includes("love") ||
      word.includes("amazing")
    ) {
      setMood({
        color: "from-pink-500 to-rose-400",
        label: "Joyful",
        emoji: "✨",
      });
    } else if (
      word.includes("sad") ||
      word.includes("tired") ||
      word.includes("lonely")
    ) {
      setMood({
        color: "from-indigo-900 to-blue-800",
        label: "Melancholy",
        emoji: "🌙",
      });
    } else if (
      word.includes("hype") ||
      word.includes("party") ||
      word.includes("let's go")
    ) {
      setMood({
        color: "from-orange-500 to-yellow-400",
        label: "Energetic",
        emoji: "🔥",
      });
    } else if (text.length > 0) {
      setMood({
        color: "from-teal-500 to-emerald-400",
        label: "Chill",
        emoji: "🍃",
      });
    } else {
      setMood({
        color: "from-slate-900 to-slate-800",
        label: "Waiting...",
        emoji: "⌨️",
      });
    }
  }, [text]);

  return (
    <main
      className={`min-h-screen transition-all duration-1000 bg-gradient-to-br ${mood.color} flex items-center justify-center p-6`}
    >
      <motion.div
        layout
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Animated Background Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />

        <header className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            MOOD_SYNC
          </h1>
          <p className="text-white/60 font-medium">
            Build with Soul. Code with Vibe.
          </p>
        </header>

        <div className="flex items-center gap-3 mb-6 bg-black/20 w-fit px-4 py-2 rounded-full border border-white/5">
          <span className="text-xl">{mood.emoji}</span>
          <span className="text-white font-bold uppercase tracking-widest text-xs">
            {mood.label}
          </span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How's your vibe today?"
          className="w-full h-40 bg-transparent text-white text-lg placeholder:text-white/30 border-none focus:ring-0 resize-none"
        />

        <footer className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-white/40 text-sm">
          <span>{text.length} characters</span>
          <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform">
            Save Vibe
          </button>
        </footer>
      </motion.div>
    </main>
  );
}
