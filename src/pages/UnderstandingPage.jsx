import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, Zap, LayoutDashboard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AIOrb } from '../components/3d/AIOrb';
import confetti from 'canvas-confetti';

export const UnderstandingPage = () => {
  const { navigateTo, understandingScore } = useApp();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FF1681', '#FF7A00', '#FFD84D', '#20B86B']
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 pb-24">
      
      {/* Celebration Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white text-xs font-black shadow-glow-pink">
          <Trophy className="w-4 h-4" />
          STAGE 13 • MASTERY LEVEL UP
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#24152F] tracking-tight">
          Your Learning Map <span className="text-gradient-sunburst">Updated!</span>
        </h1>

        <p className="text-sm sm:text-base text-[#6B6170] font-medium leading-relaxed">
          Great Progress! You're getting better every day. Your recent practice session and retention test upgraded your cognitive index.
        </p>
      </div>

      {/* Main Score Leap Visual */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card-warm p-8 sm:p-12 rounded-[40px] border border-[#FF7A00]/40 shadow-glow-orange/30 text-center space-y-8 relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#FF1681]/20 via-[#FF7A00]/20 to-[#FFD84D]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-center gap-6 sm:gap-12">
            
            {/* Before Score */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#6B6170] uppercase">Previous</span>
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/80 border border-[#24152F]/10 flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl sm:text-3xl font-black text-[#6B6170]">65%</span>
                <span className="text-[10px] font-bold text-[#6B6170]">Baseline</span>
              </div>
            </div>

            {/* Growth Arrow Indicator */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF1681] to-[#FF7A00] flex items-center justify-center text-white shadow-glow-pink">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-[#20B86B]">+17% Boost</span>
            </div>

            {/* New Mastery Score */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#FF7A00] uppercase">New AI Score</span>
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-[#FF1681] via-[#FF7A00] to-[#FFD84D] p-1 shadow-glow-orange flex flex-col items-center justify-center">
                <div className="w-full h-full bg-[#24152F] rounded-[22px] flex flex-col items-center justify-center text-white">
                  <span className="text-3xl sm:text-4xl font-black text-[#FFD84D]">{understandingScore}%</span>
                  <span className="text-[10px] font-bold text-white/80 uppercase">High Mastery</span>
                </div>
              </div>
            </div>

          </div>

          {/* Unlocked Milestones */}
          <div className="relative z-10 pt-4 border-t border-[#24152F]/10 space-y-3">
            <h3 className="text-sm font-extrabold text-[#24152F] uppercase tracking-wider">
              Unlocked Syllabus Capabilities
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
              <div className="p-3 rounded-2xl bg-white/90 border border-[#20B86B]/30 text-[#20B86B] flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Binary Tree Traversal</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/90 border border-[#20B86B]/30 text-[#20B86B] flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Recursive Partitioning</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/90 border border-[#20B86B]/30 text-[#20B86B] flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>5-Day Habit Shield</span>
              </div>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigateTo('dashboard')}
              className="py-3.5 px-8 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-orange"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>

            <button
              onClick={() => navigateTo('practice', 'code')}
              className="py-3.5 px-6 rounded-2xl glass-card hover:bg-white text-[#24152F] font-bold text-xs sm:text-sm border border-white"
            >
              Continue to Next Topic →
            </button>
          </div>

        </motion.div>
      </div>

    </div>
  );
};
