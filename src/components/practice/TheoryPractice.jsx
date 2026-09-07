import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, Lightbulb, ArrowRight, BrainCircuit } from 'lucide-react';
import { theoryExercise } from '../../data/mockData';
import { playSound } from '../../utils/soundEffects';

export const TheoryPractice = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (optId) => {
    if (isSubmitted) return;
    setSelectedOption(optId);
    playSound('hover');
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (selectedOption === 'A') {
      playSound('success');
    } else {
      playSound('action');
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    playSound('click');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Question Card */}
      <div className="glass-card-warm p-6 sm:p-8 rounded-[32px] border border-[#FF7A00]/30 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-[#FF1681] border border-[#FF1681]/30">
            {theoryExercise.subject} • {theoryExercise.topic}
          </span>
          <span className="text-xs font-bold text-[#FF7A00] flex items-center gap-1">
            <BrainCircuit className="w-4 h-4" /> Conceptual MCQ
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-[#24152F] tracking-tight">
          {theoryExercise.question}
        </h3>

        {/* Options List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {theoryExercise.options.map((opt) => {
            const isChosen = selectedOption === opt.id;
            const isCorrect = opt.isCorrect;
            
            let btnStyle = 'bg-white/80 border-[#24152F]/15 text-[#24152F] hover:border-[#FF7A00]';
            if (isSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-[#20B86B]/15 border-[#20B86B] text-[#20B86B] font-bold ring-2 ring-[#20B86B]/30';
              } else if (isChosen && !isCorrect) {
                btnStyle = 'bg-[#E83B5C]/15 border-[#E83B5C] text-[#E83B5C] font-bold';
              }
            } else if (isChosen) {
              btnStyle = 'bg-gradient-to-r from-[#FF7A00]/20 to-[#FFD84D]/30 border-[#FF7A00] text-[#24152F] font-bold ring-2 ring-[#FF7A00]/30';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-sm ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-white border border-[#24152F]/10 flex items-center justify-center font-bold text-xs">
                    {opt.id}
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold">{opt.text}</span>
                </div>
                {isSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-[#20B86B]" />
                )}
                {isSubmitted && isChosen && !isCorrect && (
                  <XCircle className="w-5 h-5 text-[#E83B5C]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {isSubmitted ? (
            <button
              onClick={handleReset}
              className="py-2.5 px-5 rounded-2xl glass-card text-xs font-bold text-[#24152F] hover:bg-white"
            >
              Try Again
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="py-3 px-8 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-glow-pink"
            >
              Submit Answer
            </button>
          )}
        </div>
      </div>

      {/* AI Explanation Breakdown */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="glass-card-warm p-6 rounded-[32px] border border-[#20B86B]/40 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#20B86B]">
              <Sparkles className="w-4 h-4 text-[#FF7A00]" />
              AI STEP-BY-STEP REASONING
            </div>

            <p className="text-xs sm:text-sm text-[#24152F] font-medium leading-relaxed">
              {theoryExercise.explanation}
            </p>

            <div className="p-3.5 rounded-2xl bg-white/90 border border-[#FF7A00]/20 flex items-start gap-2.5 text-xs text-[#6B6170]">
              <Lightbulb className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#24152F]">AI Pro Tip:</strong> {theoryExercise.aiTip}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
