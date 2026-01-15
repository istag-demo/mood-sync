"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import Sentiment from 'sentiment'; // This uses the library you installed

const analyzer = new Sentiment();

export default function MoodSync() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState({ 
    color: "from-slate-900 to-slate-800", 
    label: "Neutral", 
    emoji: "⌨️" 
  });

  useEffect(() => {
    if (text.length === 0) {
      setMood({ color: "from-slate-900 to-slate-800", label: "Waiting...", emoji: "⌨️" });
      return;
    }

    // Use AI sentiment analysis instead of just checking words
    const result = analyzer.analyze(text);
    
    if (result.score > 3) {
      setMood({ color: "from-orange-400 to-rose-400", label: "Hype / Energetic", emoji: "🔥" });
    } else if (result.score > 0) {
      setMood({ color: "from-teal-400 to-emerald-400", label: "Positive / Chill", emoji: "🍃" });
    } else if (result.score < 0) {
      setMood({ color: "from-indigo-900 to-blue-800", label: "Deep / Moody", emoji: "🌙" });
    } else {
      setMood({ color: "from-slate-700 to-slate-600", label: "Neutral", emoji: "😶" });
    }
  }, [text]);

  return (
    <main className={`min-h-screen transition-all duration-1000 bg-gradient-to-br ${mood.color} flex items-center justify-center p-6`}>
      <motion.div 
        layout
        className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-lg"
      >
        <header className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tighter italic">MOOD_SYNC</h1>
          <p className="text-white/60 font-medium">AI Sentiment Analysis Engine</p>
        </header>

        <div className="flex items-center gap-3 mb-6 bg-black/20 w-fit px-4 py-2 rounded-full border border-white/5">
          <span className="text-xl">{mood.emoji}</span>
          <span className="text-white font-bold uppercase tracking-widest text-xs">{mood.label}</span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How is your vibe really?"
          className="w-full h-40 bg-transparent text-white text-lg placeholder:text-white/30 border-none focus:ring-0 resize-none"
        />
      </motion.div>
    </main>
  );
}