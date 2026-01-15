"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MoodSync() {
  const [text, setText] = useState("");
  const [vibeScore, setVibeScore] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mood, setMood] = useState({ 
    color: "from-gray-900 to-black", 
    label: "Idle", 
    emoji: "⌨️" 
  });


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const Sentiment = require('sentiment');
    const analyzer = new Sentiment();
    
    const result = analyzer.analyze(text);
    setVibeScore(result.score);

    if (text.length === 0) {
      setMood({ color: "from-gray-900 to-black", label: "Waiting...", emoji: "⌨️" });
    } else if (result.score >= 2) {
      setMood({ color: "from-orange-400 to-rose-400", label: "Hype / Energetic", emoji: "🔥" });
    } else if (result.score > 0) {
      setMood({ color: "from-teal-400 to-emerald-400", label: "Positive / Chill", emoji: "🍃" });
    } else if (result.score < 0) {
      setMood({ color: "from-indigo-900 to-blue-800", label: "Deep / Moody", emoji: "🌙" });
    } else {
      setMood({ color: "from-slate-700 to-slate-600", label: "Neutral", emoji: "😶" });
    }
  }, [text, mounted]);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className={`min-h-screen transition-all duration-1000 bg-gradient-to-br ${mood.color} flex items-center justify-center p-6`}>
      <motion.div 
        layout
        className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[40px] shadow-2xl w-full max-w-lg"
      >
        <h1 className="text-4xl font-black text-white tracking-tighter italic mb-2">MOOD_SYNC</h1>
        <div className="flex items-center gap-3 mb-6 bg-black/20 w-fit px-4 py-2 rounded-full border border-white/5">
          <span className="text-xl">{mood.emoji}</span>
          <span className="text-white font-bold uppercase tracking-widest text-xs">{mood.label}</span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How is your vibe today?"
          className="w-full h-40 bg-transparent text-white text-2xl placeholder:text-white/20 border-none focus:ring-0 resize-none"
        />
        
        <div className="mt-4 text-white/40 font-mono text-sm">
          Score: {vibeScore}
        </div>
      </motion.div>
    </main>
  );
}