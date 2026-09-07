import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, Mic, Lightbulb, Code2, BookOpen, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIOrb } from '../3d/AIOrb';

export const AIMentorDrawer = () => {
  const { isAIMentorOpen, setIsAIMentorOpen, aiChatMessages, sendAIMessage } = useApp();
  const [inputVal, setInputVal] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendAIMessage(inputVal);
    setInputVal('');
  };

  const handleSuggestionClick = (text) => {
    sendAIMessage(text);
  };

  const handleVoiceToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        sendAIMessage("Can you summarize the time complexity of array insertion and traversal?");
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <AnimatePresence>
      {isAIMentorOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAIMentorOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative z-10 w-full max-w-md h-full bg-[#FFFDF8] shadow-2xl flex flex-col border-l border-white/80 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#24152F] to-[#54145F] text-white flex items-center justify-between relative overflow-hidden">
              {/* Background ambient ring */}
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-8 border-[#FF1681]/20 pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
                <AIOrb size="md" pulse={true} />
                <div>
                  <h3 className="font-extrabold text-base flex items-center gap-1.5">
                    LearnIQ AI Mentor
                    <Sparkles className="w-4 h-4 text-[#FFD84D]" />
                  </h3>
                  <p className="text-xs text-[#FFD84D] font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#20B86B] animate-pulse" />
                    Always Active • Tailored to your syllabus
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAIMentorOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Context Bar */}
            <div className="px-4 py-2 bg-[#FFF5DC] border-b border-[#FF7A00]/20 flex items-center justify-between text-[11px] font-bold text-[#24152F]">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#FF7A00]" />
                Current Focus: DSA • Arrays
              </span>
              <span className="text-[#FF1681] bg-[#FF1681]/10 px-2 py-0.5 rounded-full">
                82% Understanding
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiChatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-3xl text-xs sm:text-sm font-medium leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white rounded-br-none shadow-glow-orange'
                        : 'glass-card-warm text-[#24152F] rounded-tl-none border border-white shadow-sm'
                    }`}
                  >
                    {msg.text}

                    {msg.sender === 'ai' && (
                      <div className="mt-2 pt-2 border-t border-[#24152F]/10 flex items-center justify-between text-[10px] text-[#6B6170]">
                        <span>LearnIQ AI Engine</span>
                        <span>{msg.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Suggestion Pills */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                      {msg.suggestions.map((sugg, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(sugg)}
                          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FFF5DC] border border-[#FF7A00]/30 text-[11px] font-bold text-[#FF7A00] shadow-sm transition-all hover:scale-102 text-left"
                        >
                          ✦ {sugg}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isRecording && (
                <div className="p-3 rounded-2xl glass-card-pink border border-[#FF1681]/40 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF1681] flex items-center justify-center text-white animate-pulse">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#FF1681]">Listening to your voice...</p>
                    <p className="text-[11px] text-[#6B6170]">Speak naturally about your topic</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#24152F]/10">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                    isRecording 
                      ? 'bg-[#FF1681] text-white animate-ping' 
                      : 'bg-[#FFF5DC] text-[#FF7A00] hover:bg-[#FFD84D]/30 border border-[#FF7A00]/30'
                  }`}
                  title="Voice question"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask any concept, DSA problem, formula..."
                  className="flex-1 bg-[#FFFDF8] border border-[#24152F]/15 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-[#24152F] placeholder-[#6B6170] focus:outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/20 transition-all font-medium"
                />

                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="w-10 h-10 rounded-2xl btn-gradient-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-glow-pink"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
