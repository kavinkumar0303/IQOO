import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Clock, Save, Sparkles, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

export const LearningLog30s = () => {
  const { addLearningLog } = useApp();
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRecording, setIsRecording] = useState(false);
  const [logText, setLogText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('DSA');

  useEffect(() => {
    let timer;
    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRecording) {
      setIsRecording(false);
      playSound('action');
    }
    return () => clearInterval(timer);
  }, [isRecording, timeLeft]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeLeft(30);
      setIsSaved(false);
      playSound('action');
    } else {
      setIsRecording(false);
      playSound('click');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!logText.trim() && !isRecording) return;

    addLearningLog({
      subject: selectedSubject,
      topic: `${selectedSubject} 30-Second Reflection`,
      reflection: logText.trim() || "Captured oral summary: Traversed array indexing, implemented largest element scan in O(n) time, and noted boundary overflow risks.",
    });

    setIsSaved(true);
    setIsRecording(false);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FF1681', '#FF7A00', '#20B86B']
    });
  };

  const handleReset = () => {
    setTimeLeft(30);
    setIsRecording(false);
    setLogText('');
    setIsSaved(false);
    playSound('click');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass-card-warm p-6 sm:p-8 rounded-[36px] border border-[#FF7A00]/30 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#FF1681] bg-[#FF1681]/15 px-3 py-1 rounded-full uppercase tracking-wider">
              30-Second Rapid Reflection
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#24152F] mt-2">
              What did you learn today? 🎙
            </h3>
            <p className="text-xs text-[#6B6170] font-medium mt-0.5">
              Rapid voice or text synthesis stored directly in your AI Learning Memory.
            </p>
          </div>

          {/* 30s Countdown Timer Ring */}
          <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" stroke="#FFF5DC" strokeWidth="6" fill="none" />
              <circle
                cx="30"
                cy="30"
                r="24"
                stroke="#FF1681"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={2 * Math.PI * 24 * (1 - timeLeft / 30)}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <span className="absolute font-mono font-black text-sm text-[#24152F]">{timeLeft}s</span>
          </div>
        </div>

        {/* Subject Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#6B6170]">Subject:</span>
          {['DSA', 'Java', 'Math', 'DBMS'].map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedSubject === sub
                  ? 'bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white shadow-sm'
                  : 'bg-white/80 text-[#6B6170] hover:bg-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Voice Recording Simulator Waveform */}
        <div className="p-6 rounded-3xl bg-white/90 border border-[#FF7A00]/20 flex flex-col items-center justify-center space-y-4">
          <button
            type="button"
            onClick={toggleRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-glow-pink ${
              isRecording 
                ? 'bg-[#E83B5C] animate-pulse scale-110' 
                : 'bg-gradient-to-tr from-[#FF1681] to-[#FF7A00] hover:scale-105'
            }`}
          >
            {isRecording ? <Mic className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>

          {/* Animated Audio Waveform Bars */}
          {isRecording ? (
            <div className="flex items-center gap-1.5 h-10">
              <span className="w-1.5 bg-[#FF1681] rounded-full animate-wave-1" />
              <span className="w-1.5 bg-[#FF7A00] rounded-full animate-wave-2" />
              <span className="w-1.5 bg-[#FFD84D] rounded-full animate-wave-3" />
              <span className="w-1.5 bg-[#20B86B] rounded-full animate-wave-4" />
              <span className="w-1.5 bg-[#FF1681] rounded-full animate-wave-5" />
              <span className="w-1.5 bg-[#FF7A00] rounded-full animate-wave-1" />
              <span className="w-1.5 bg-[#FFD84D] rounded-full animate-wave-3" />
            </div>
          ) : (
            <p className="text-xs font-bold text-[#6B6170]">
              Click microphone to start 30s voice recording
            </p>
          )}
        </div>

        {/* Text Area Notes */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#24152F] mb-1.5">
              Or write your key takeaway notes:
            </label>
            <textarea
              rows={4}
              value={logText}
              onChange={(e) => setLogText(e.target.value)}
              placeholder="e.g. Mastered array traversal, but need to re-verify in-place element insertion at boundary index..."
              className="w-full p-4 rounded-2xl bg-white border border-[#24152F]/15 text-xs sm:text-sm text-[#24152F] placeholder-[#6B6170] focus:outline-none focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/15 transition-all font-medium"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-4 rounded-xl glass-card text-xs font-bold text-[#6B6170] hover:text-[#24152F] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>

            <button
              type="submit"
              className="py-3 px-8 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-pink"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Log Saved to AI Memory
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Learning Log
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
