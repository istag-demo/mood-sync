"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import Sentiment from 'sentiment';

const analyzer = new Sentiment();

export default function MoodSync() {
  const [text, setText] = useState("");
  const [vibeScore, setVibeScore] = useState(0);
  const [mood, setMood] = useState({ 
    color: "from-gray-900 to-black", 
    label: "Idle", 
    emoji: "⌨️",
    glow: "rgba(255,255,255,0.1)" 
  });

  useEffect(() => {
    const result = analyzer.analyze(text);
    const score = result.score;
    setVibeScore(score);

    if (text.length === 0) {
      setMood({ color: "from-gray-900 via-slate-900 to-black", label: "Waiting...", emoji: "⌨️", glow: "rgba(255,255,255,0.05)" });
    } else if (score >= 4) {
      setMood({ color: "from-yellow-400 via-orange-500 to-red-500", label: "MAX VIBE", emoji: "⚡", glow: "rgba(255,165,0,0.5)" });
    } else if (score >= 1) {
      setMood({ color: "from-cyan-400 via-blue-500 to-indigo-600", label: "Positive Flow", emoji: "🌊", glow: "rgba(0,255,255,0.3)" });
    } else if (score <= -1) {
      setMood({ color: "from-purple-900 via-violet-950 to-black", label: "Deep / Dark", emoji: "💎", glow: "rgba(138,43,226,0.4)" });
    } else {
      setMood({ color: "from-emerald-500 via-teal-600 to-cyan-700", label: "Steady Chill", emoji: "🧘", glow: "rgba(16,185,129,0.2)" });
    }
  }, [text]);

  return (
    <main className={`min-h-screen transition-all duration-[2000ms] ease-in-out bg-gradient-to-tr ${mood.color} flex items-center justify-center p-4 overflow-hidden`}>
      
      {/* Background Decorative Element */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[1000px] h-[1000px] rounded-full border border-white/5 pointer-events-none"
      />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ boxShadow: `0 0 80px ${mood.glow}` }}
        className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] shadow-2xl w-full max-w-xl transition-all duration-1000"
      >
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic leading-none">MOOD_SYNC v2</h1>
            <p className="text-white/40 mt-2 font-mono text-sm tracking-widest uppercase">Engine: Neural-Vibe-1.0</p>
          </div>
          <motion.div 
            key={mood.label}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl"
          >
            {mood.emoji}
          </motion.div>
        </div>

        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Broadcast your frequency..."
            className="w-full h-48 bg-transparent text-white text-2xl font-light placeholder:text-white/10 border-none focus:ring-0 resize-none transition-all"
          />
          {/* Visual Score Meter */}
          <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${Math.min(Math.max((vibeScore + 5) * 10, 0), 100)}%` }}
              className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-white/30 text-xs uppercase font-bold tracking-tighter">Current Sentiment Score</span>
            <span className="text-white text-2xl font-mono">{vibeScore > 0 ? `+${vibeScore}` : vibeScore}</span>
          </div>
          <div className="text-right">
            <p className="text-white/60 font-bold italic">{mood.label}</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}