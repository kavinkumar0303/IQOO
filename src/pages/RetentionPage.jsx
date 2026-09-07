import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Repeat, CheckCircle2, XCircle, Sparkles, ArrowRight, Brain, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { retentionExercise } from '../data/mockData';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export const RetentionPage = () => {
  const { navigateTo, setRetentionScore, setUnderstandingScore } = useApp();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [retentionLevel, setRetentionLevel] = useState(retentionExercise.retentionBefore);

  const handleSelect = (optId) => {
    if (isAnswered) return;
    setSelectedOption(optId);
    playSound('hover');
  };

  const handleVerify = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
    if (selectedOption === 'A') {
      setRetentionLevel(retentionExercise.retentionAfter);
      setRetentionScore(retentionExercise.retentionAfter);
      setUnderstandingScore(82);
      playSound('success');
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#20B86B', '#FF7A00', '#FFD84D']
      });
    } else {
      playSound('action');
    }
  };

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div className="glass-card-warm p-6 sm:p-8 rounded-[36px] border border-[#FF7A00]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#FF1681] bg-[#FF1681]/15 px-3 py-1 rounded-full uppercase tracking-wider">
            Stage 12 • Spaced Repetition
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#24152F] tracking-tight mt-1">
            Retention Recall Check
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-0.5">
            Combating the Ebbinghaus forgetting curve with intelligent active recall prompts.
          </p>
        </div>

        <button
          onClick={() => navigateTo('understanding')}
          className="py-3 px-6 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-pink self-start md:self-center"
        >
          <span>Updated Understanding</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Recall Card */}
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="glass-card p-6 sm:p-8 rounded-[36px] border border-white shadow-sm space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-[#FFF5DC] text-xs font-bold text-[#FF7A00] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Learned {retentionExercise.daysAgo} Days Ago
            </span>
            <span className="text-xs font-bold text-[#6B6170]">
              Subject: {retentionExercise.subject} • {retentionExercise.topic}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-[#24152F]">
              Do you still remember? 🤔
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6170] font-medium leading-relaxed">
              {retentionExercise.prompt}
            </p>
          </div>

          {/* Question Box */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#24152F]/10 space-y-3">
            <h4 className="text-sm sm:text-base font-extrabold text-[#24152F]">
              {retentionExercise.question}
            </h4>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {retentionExercise.options.map((opt) => {
                const isChosen = selectedOption === opt.id;
                const isCorrect = opt.isCorrect;

                let btnStyle = 'bg-white border-[#24152F]/15 text-[#24152F] hover:border-[#FF7A00]';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-[#20B86B]/15 border-[#20B86B] text-[#20B86B] font-bold';
                  } else if (isChosen && !isCorrect) {
                    btnStyle = 'bg-[#E83B5C]/15 border-[#E83B5C] text-[#E83B5C] font-bold';
                  }
                } else if (isChosen) {
                  btnStyle = 'bg-[#FFF5DC] border-[#FF7A00] text-[#24152F] font-bold ring-2 ring-[#FF7A00]/30';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <span className="font-mono text-xs sm:text-sm font-bold">{opt.id}. {opt.text}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-[#20B86B]" />}
                    {isAnswered && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-[#E83B5C]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6B6170]">Retention Score:</span>
              <span className="text-base font-black text-[#FF7A00]">{retentionLevel}%</span>
              {isAnswered && selectedOption === 'A' && (
                <span className="text-xs font-bold text-[#20B86B]">+24% Boosted 🔥</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedOption(null);
                  setIsAnswered(false);
                }}
                className="py-2.5 px-4 rounded-xl glass-card text-xs font-bold text-[#6B6170]"
              >
                Reset
              </button>
              <button
                onClick={handleVerify}
                disabled={!selectedOption || isAnswered}
                className="py-3 px-7 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm shadow-glow-pink disabled:opacity-40"
              >
                Verify Memory
              </button>
            </div>
          </div>

          {/* AI Explanation after answer */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-[#20B86B]/10 border border-[#20B86B]/30 space-y-2 text-xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-[#20B86B]">
                  <Sparkles className="w-4 h-4" /> AI Spaced Retain Insight
                </div>
                <p className="text-[#24152F] font-medium leading-relaxed">
                  {retentionExercise.explanation}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => navigateTo('understanding')}
                    className="py-2 px-4 rounded-xl btn-gradient-orange text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    View Updated Understanding <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
};
