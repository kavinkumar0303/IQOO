import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  LayoutDashboard, 
  CalendarClock, 
  BookOpen, 
  Code, 
  BrainCircuit, 
  Mic, 
  Cpu, 
  Database, 
  History, 
  GitFork, 
  Repeat, 
  Trophy,
  ExternalLink,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { journeyStages } from '../data/mockData';
import { AIOrb } from '../components/3d/AIOrb';

export const LearningJourneyPage = () => {
  const { navigateTo } = useApp();
  const [selectedStage, setSelectedStage] = useState(null);

  const stageIcons = {
    "01": Sparkles,
    "02": LayoutDashboard,
    "03": CalendarClock,
    "04": BookOpen,
    "05": Code,
    "06": BrainCircuit,
    "07": Mic,
    "08": Cpu,
    "09": Database,
    "10": History,
    "11": GitFork,
    "12": Repeat,
    "13": Trophy,
  };

  const stageNavTargets = {
    "01": "login",
    "02": "dashboard",
    "03": "timetable",
    "04": "subjects",
    "05": "practice",
    "06": "practice",
    "07": "practice",
    "08": "analysis",
    "09": "database",
    "10": "history",
    "11": "map",
    "12": "retention",
    "13": "understanding",
  };

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-10 pb-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-warm border border-[#FF7A00]/40 text-xs font-bold text-[#FF7A00] shadow-sm">
          <Sparkles className="w-4 h-4 text-[#FF1681]" />
          LEARNIQ 13-STAGE INTERACTIVE FLOW
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24152F] tracking-tight">
          Your Complete <span className="text-gradient-sunburst">Learning Journey</span>
        </h1>

        <p className="text-sm sm:text-base text-[#6B6170] font-medium leading-relaxed">
          From morning 3D authentication to continuous cognitive understanding updates. Experience how LearnIQ transforms daily college studying into an intelligent, rewarding pipeline.
        </p>
      </div>

      {/* Connected 13-Stage Zig-Zag Architecture */}
      <div className="relative py-8">
        
        {/* Central Connecting Flow Ribbon (Desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-1.5 -translate-x-1/2 bg-gradient-to-b from-[#FF1681] via-[#FF7A00] to-[#FFD84D] opacity-40 rounded-full" />

        <div className="space-y-8 lg:space-y-12 relative z-10">
          {journeyStages.map((stage, idx) => {
            const Icon = stageIcons[stage.stage] || Sparkles;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`flex flex-col lg:flex-row items-center ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-6 lg:gap-12`}
              >
                {/* Content Card */}
                <div className={`w-full lg:w-[46%] ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    onClick={() => setSelectedStage(stage)}
                    className="glass-card-warm p-6 rounded-[28px] border border-white shadow-card-soft cursor-pointer hover:border-[#FF7A00] transition-all group relative overflow-hidden"
                  >
                    {/* Glowing corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FF1681]/15 to-transparent rounded-bl-full pointer-events-none" />

                    <div className={`flex items-center gap-3 mb-3 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white font-black text-xs shadow-sm">
                        Stage {stage.stage}
                      </span>
                      <span className="text-xs font-bold text-[#FF7A00]">
                        {stage.tagline}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#24152F] group-hover:text-gradient-sunburst transition-colors">
                      {stage.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-2 leading-relaxed">
                      {stage.description}
                    </p>

                    {/* Mini Preview Chip */}
                    <div className={`mt-4 pt-3 border-t border-[#24152F]/10 flex items-center gap-2 ${
                      isEven ? 'lg:justify-end' : 'lg:justify-start'
                    }`}>
                      <div className="px-3 py-1 rounded-xl bg-white/90 border border-[#FF7A00]/30 text-[11px] font-bold text-[#24152F] shadow-sm flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#FF1681]" />
                        {stage.preview}
                      </div>
                      <span className="text-xs font-bold text-[#FF7A00] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Explore <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Central Connecting Node & Icon */}
                <div className="relative flex items-center justify-center flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF1681] via-[#FF7A00] to-[#FFD84D] p-0.5 shadow-glow-orange flex items-center justify-center text-white">
                    <div className="w-full h-full bg-[#24152F] rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#FFD84D]" />
                    </div>
                  </div>
                  <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-[#FF7A00] text-white text-[9px] font-black shadow-sm">
                    {stage.stage}
                  </span>
                </div>

                {/* Opposite Spacer Column */}
                <div className="w-full lg:w-[46%] hidden lg:block" />

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Interactive Modal */}
      <AnimatePresence>
        {selectedStage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStage(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-lg glass-card-warm p-6 sm:p-8 rounded-[36px] shadow-2xl border border-white space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white font-extrabold text-xs">
                  STAGE {selectedStage.stage}
                </span>
                <button
                  onClick={() => setSelectedStage(null)}
                  className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#24152F] font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#24152F]">{selectedStage.title}</h3>
                <p className="text-xs font-bold text-[#FF7A00] mt-0.5">{selectedStage.tagline}</p>
                <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-3 leading-relaxed">
                  {selectedStage.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-[#FF7A00]/30">
                <span className="text-[11px] font-bold text-[#6B6170] uppercase tracking-wider block mb-1">
                  Active Features in this Stage
                </span>
                <p className="text-xs font-bold text-[#24152F]">
                  ✦ {selectedStage.preview}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const target = stageNavTargets[selectedStage.stage] || 'dashboard';
                    setSelectedStage(null);
                    navigateTo(target);
                  }}
                  className="flex-1 py-3 px-5 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-pink"
                >
                  <span>Launch Stage Experience</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedStage(null)}
                  className="py-3 px-5 rounded-2xl glass-card text-xs font-bold text-[#24152F]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
