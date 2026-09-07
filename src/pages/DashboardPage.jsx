import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  Flame, 
  BookOpen, 
  Clock, 
  Brain, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  CalendarClock, 
  ChevronRight, 
  Mic, 
  Bot, 
  TrendingUp, 
  GitFork, 
  Check, 
  Radio,
  Coffee,
  Database,
  Terminal,
  Binary
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AIOrb } from '../components/3d/AIOrb';
import { 
  todaySchedule, 
  aiRecommendation, 
  subjectProgressList, 
  aiBrainMetrics, 
  streakDays, 
  learningHistoryList 
} from '../data/mockData';

export const DashboardPage = () => {
  const { 
    currentUser, 
    greeting, 
    currentTimeStr, 
    navigateTo, 
    setIsAIMentorOpen,
    streakCount,
    understandingScore 
  } = useApp();

  const [activeSubjectFilter, setActiveSubjectFilter] = useState('all');

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* ==================== 1. TOP GREETING & HEADER ==================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#24152F] tracking-tight">
              {greeting}, {currentUser.name}
            </h1>
            <div className="hidden sm:flex">
              <AIOrb size="sm" pulse={true} />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-1 flex items-center gap-2">
            <span>Ready to level up your college learning today?</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
            <span className="text-[#FF7A00] font-bold">{currentTimeStr || 'Live Sync'}</span>
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigateTo('journey')}
            className="px-4 py-2 rounded-2xl glass-pill text-xs font-bold text-[#FF1681] border border-[#FF1681]/30 hover:bg-[#FF1681]/10 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF1681]" />
            13-Stage Journey
          </button>
          <button
            onClick={() => setIsAIMentorOpen(true)}
            className="px-4 py-2 rounded-2xl btn-gradient-primary text-xs font-bold shadow-glow-orange flex items-center gap-1.5 group transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AI Mentor</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ==================== 2. DASHBOARD HERO CARD ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative glass-card-warm p-6 sm:p-8 lg:p-10 rounded-[32px] sm:rounded-[40px] shadow-glow-orange/20 border border-white overflow-hidden"
      >
        {/* Decorative ambient background rings */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-[24px] border-[#FFD84D]/25 pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full border-[20px] border-[#FF1681]/15 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Hero Content & Progress Ring */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#FF7A00]/30 shadow-sm text-xs font-bold text-[#FF7A00]">
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
              TODAY'S LEARNING PROGRESS
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              
              {/* Circular Progress Gauge */}
              <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="#FFF5DC"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="url(#heroProgressGradient)"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={2 * Math.PI * 48 * (1 - 0.78)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="heroProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF1681" />
                      <stop offset="50%" stopColor="#FF7A00" />
                      <stop offset="100%" stopColor="#FFD84D" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Percentage */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-[#24152F] tracking-tight">78%</span>
                  <span className="text-[10px] font-bold text-[#6B6170] uppercase">Complete</span>
                </div>
              </div>

              {/* Progress Summary Text */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#24152F]">
                  You're doing great today, {currentUser.name}!
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-bold text-[#6B6170]">
                  <span className="px-2.5 py-1 rounded-xl bg-white/70 border border-white">
                    ⏱ 3 Classes
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-white/70 border border-white">
                    📚 2 Topics Active
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-[#20B86B]/15 text-[#20B86B]">
                    ✓ 1 Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('subjects')}
                className="py-3 px-6 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-pink cursor-pointer"
              >
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('timetable')}
                className="py-3 px-5 rounded-2xl glass-card hover:bg-white text-[#24152F] font-bold text-xs sm:text-sm flex items-center gap-2 border border-white transition-all cursor-pointer"
              >
                <CalendarClock className="w-4 h-4 text-[#FF7A00]" />
                View Timetable
              </button>
            </div>
          </div>

          {/* Right Hero Focus Summary (Clean, Static, Rebalanced) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            <div className="p-4 rounded-2xl bg-white/80 border border-[#FF7A00]/20 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FFD84D] flex items-center justify-center text-white shadow-sm">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#24152F]">Data Structures (CS301)</h4>
                  <p className="text-[11px] text-[#6B6170]">Arrays & Memory Layout • Live in AI Lab 3</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-[#20B86B] bg-[#20B86B]/15 px-2.5 py-1 rounded-full shrink-0">
                85% Mastery
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-[#FF1681]/20 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF1681] to-[#FF7A00] flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#24152F]">AI Recommendation</h4>
                  <p className="text-[11px] text-[#6B6170]">10m Array Insertion Practice Ready</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-[#FF1681] bg-[#FF1681]/15 px-2.5 py-1 rounded-full shrink-0">
                +6% Boost
              </span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* ==================== 3. 4 QUICK STAT CARDS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* CARD 1: 5 Day Streak with mini calendar */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card-warm p-5 rounded-3xl border border-[#FF7A00]/30 shadow-card-soft relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FFD84D] flex items-center justify-center text-white shadow-glow-orange">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[10px] font-bold text-[#FF7A00] bg-[#FF7A00]/15 px-2.5 py-0.5 rounded-full">
              Keep Going!
            </span>
          </div>

          <h3 className="text-2xl font-black text-[#24152F] tracking-tight">{streakCount} Day Streak</h3>
          <p className="text-xs text-[#6B6170] font-medium mt-0.5">Building strong daily habits</p>

          {/* 7-day mini calendar */}
          <div className="flex items-center justify-between gap-1 mt-4 pt-3 border-t border-[#24152F]/10">
            {streakDays.map((sd) => (
              <div key={sd.day} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#6B6170]">{sd.day}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  sd.completed 
                    ? 'bg-gradient-to-tr from-[#FF7A00] to-[#FFD84D] text-[#24152F] shadow-sm' 
                    : 'bg-[#FFF5DC] text-[#6B6170]'
                }`}>
                  {sd.completed ? '✓' : '○'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CARD 2: 12 Topics Completed */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card-pink p-5 rounded-3xl border border-[#FF1681]/30 shadow-card-soft relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF1681] to-[#FF7A00] flex items-center justify-center text-white shadow-glow-pink">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#FF1681] bg-[#FF1681]/15 px-2.5 py-0.5 rounded-full">
              This Month
            </span>
          </div>

          <h3 className="text-2xl font-black text-[#24152F] tracking-tight">12 Topics</h3>
          <p className="text-xs text-[#6B6170] font-medium mt-0.5">Completed across 5 subjects</p>

          <div className="mt-4 pt-3 border-t border-[#24152F]/10 flex items-center justify-between text-xs font-bold text-[#24152F]">
            <span>Target: 16 Topics</span>
            <span className="text-[#FF1681]">75% of Goal</span>
          </div>
        </motion.div>

        {/* CARD 3: 3 Classes Today */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-5 rounded-3xl border border-[#20B86B]/30 shadow-card-soft relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#20B86B] to-[#FFC928] flex items-center justify-center text-white shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#20B86B] bg-[#20B86B]/15 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20B86B] animate-ping" />
              1 Live Now
            </span>
          </div>

          <h3 className="text-2xl font-black text-[#24152F] tracking-tight">3 Classes</h3>
          <p className="text-xs text-[#6B6170] font-medium mt-0.5">Next: DSA with Mr. Aravind</p>

          <div className="mt-4 pt-3 border-t border-[#24152F]/10 flex items-center justify-between text-xs font-bold">
            <span className="text-[#6B6170]">Lab 3 • Ground Floor</span>
            <span className="text-[#20B86B]">Room 402 ✓</span>
          </div>
        </motion.div>

        {/* CARD 4: 82% AI Understanding */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-5 rounded-3xl border border-[#8E168F]/30 shadow-card-soft relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8E168F] to-[#FF1681] flex items-center justify-center text-white shadow-glow-magenta">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#8E168F] bg-[#8E168F]/15 px-2.5 py-0.5 rounded-full">
              Optimal AI Index
            </span>
          </div>

          <h3 className="text-2xl font-black text-[#24152F] tracking-tight">{understandingScore}%</h3>
          <p className="text-xs text-[#6B6170] font-medium mt-0.5">Conceptual Retention Rate</p>

          <div className="mt-4 pt-3 border-t border-[#24152F]/10 flex items-center justify-between text-xs font-bold">
            <span className="text-[#6B6170]">Weekly Shift</span>
            <span className="text-[#20B86B] flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +7.4%
            </span>
          </div>
        </motion.div>

      </div>

      {/* ==================== 4. AI NEXT ACTION CARD (SPECIAL RECOMMENDATION) ==================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel-dark text-white p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] shadow-2xl relative overflow-hidden border border-white/20"
      >
        {/* Glow & Rings */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF1681]/30 via-[#FF7A00]/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <AIOrb size="sm" pulse={true} />
              <span className="text-xs font-extrabold tracking-wider uppercase text-[#FFD84D]">
                {aiRecommendation.title}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {aiRecommendation.greeting}
            </h3>

            <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed">
              {aiRecommendation.insight}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FFD84D]">
                🎯 {aiRecommendation.recommendedTask}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90">
                ⏱ {aiRecommendation.estimatedTime}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#20B86B]/20 text-[#20B86B] border border-[#20B86B]/40">
                {aiRecommendation.metricImpact}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => navigateTo('practice', 'code')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-2xl btn-gradient-primary font-bold text-sm flex items-center justify-center gap-2 shadow-glow-orange group"
            >
              <span>{aiRecommendation.suggestedAction}</span>
              <Play className="w-4 h-4 fill-current group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </motion.div>

      {/* ==================== 5. TODAY'S TIMETABLE & TODAY'S LEARNING PATH ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Today's Schedule Table */}
        <div className="lg:col-span-8 glass-card p-6 sm:p-8 rounded-[32px] border border-white shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#24152F] flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-[#FF7A00]" />
                Today's Schedule
              </h3>
              <p className="text-xs text-[#6B6170] font-medium mt-0.5">Real-time synchronized with college timetable</p>
            </div>
            <button 
              onClick={() => navigateTo('timetable')}
              className="text-xs font-bold text-[#FF1681] hover:underline flex items-center gap-1"
            >
              Full Timetable <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Schedule List */}
          <div className="space-y-3">
            {todaySchedule.map((cls) => {
              const isLive = cls.status === 'live';
              const isDone = cls.status === 'completed';
              return (
                <div
                  key={cls.id}
                  className={`p-4 rounded-2xl transition-all border ${
                    isLive 
                      ? 'glass-card-warm border-[#FF7A00] shadow-glow-orange/30 ring-2 ring-[#FF7A00]/20' 
                      : isDone 
                      ? 'bg-white/50 border-[#24152F]/10 opacity-75' 
                      : 'bg-white/80 border-[#24152F]/10 hover:border-[#FF1681]/30'
                  } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Time Badge */}
                    <div className="px-3 py-2 rounded-xl bg-[#FFF5DC] border border-[#FF7A00]/20 text-center min-w-[80px]">
                      <span className="text-xs font-extrabold text-[#24152F] block leading-tight">{cls.time}</span>
                      <span className="text-[10px] font-semibold text-[#6B6170]">{cls.duration}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-extrabold text-[#24152F]">
                          {cls.subject}
                        </h4>
                        {isLive && (
                          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white text-[10px] font-black tracking-wider flex items-center gap-1 shadow-sm animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            LIVE NOW
                          </span>
                        )}
                        {isDone && (
                          <span className="px-2 py-0.5 rounded-full bg-[#20B86B]/15 text-[#20B86B] text-[10px] font-bold">
                            ✓ Done
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#6B6170] mt-0.5">
                        {cls.topic} • {cls.instructor}
                      </p>
                      <span className="text-[11px] font-medium text-[#FF7A00] block mt-0.5">
                        📍 {cls.room}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {isLive ? (
                      <button
                        onClick={() => navigateTo('subjects')}
                        className="py-2 px-4 rounded-xl btn-gradient-primary text-xs font-bold shadow-glow-orange flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Join Class
                      </button>
                    ) : (
                      <button
                        onClick={() => navigateTo('subjects')}
                        className="py-2 px-3.5 rounded-xl glass-pill hover:bg-white text-xs font-bold text-[#24152F] border border-white"
                      >
                        Open Subject
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connected Mini Learning Journey Path */}
        <div className="lg:col-span-4 glass-card-warm p-6 rounded-[32px] border border-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-[#24152F] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                Today's Learning Path
              </h3>
              <span className="text-[10px] font-bold text-[#FF1681] bg-[#FF1681]/15 px-2 py-0.5 rounded-full">
                Step 2 of 4
              </span>
            </div>

            {/* Connected Vertical Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-1 before:bg-gradient-to-b before:from-[#20B86B] before:via-[#FF7A00] before:to-[#FFD84D]/40">
              
              {/* Step 1: Completed */}
              <div className="relative">
                <div className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full bg-[#20B86B] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  ✓
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#6B6170]">09:30 AM</span>
                  <h4 className="text-xs font-extrabold text-[#24152F]">Mathematics • Integration</h4>
                  <p className="text-[11px] text-[#20B86B] font-semibold">Theory notes logged</p>
                </div>
              </div>

              {/* Step 2: Current */}
              <div className="relative">
                <div className="absolute -left-[30px] top-0.5 w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF1681] to-[#FF7A00] text-white flex items-center justify-center text-xs font-bold shadow-glow-orange animate-pulse">
                  ●
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 border border-[#FF7A00]/40 shadow-sm">
                  <span className="text-[10px] font-bold text-[#FF7A00]">10:30 AM • Current</span>
                  <h4 className="text-xs font-extrabold text-[#24152F]">DSA • Arrays & Memory</h4>
                  <p className="text-[11px] text-[#6B6170]">Lab session with code runner</p>
                </div>
              </div>

              {/* Step 3: Upcoming */}
              <div className="relative">
                <div className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full bg-white border-2 border-[#FFD84D] text-[#6B6170] flex items-center justify-center text-xs font-bold">
                  ○
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#6B6170]">11:30 AM</span>
                  <h4 className="text-xs font-extrabold text-[#24152F]">Java • Inheritance</h4>
                  <p className="text-[11px] text-[#6B6170]">OOP concepts & practice</p>
                </div>
              </div>

            </div>
          </div>

          <button
            onClick={() => navigateTo('journey')}
            className="w-full mt-6 py-2.5 rounded-2xl glass-card hover:bg-white text-xs font-bold text-[#FF7A00] border border-[#FF7A00]/30 flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <span>Explore 13-Stage Journey Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* ==================== 6. SUBJECT PROGRESS (CIRCULAR & CURVED GAUGES) ==================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#24152F]">
              Subject Mastery & Progress
            </h3>
            <p className="text-xs text-[#6B6170] font-medium">Visual mastery index across active course modules</p>
          </div>
          <button
            onClick={() => navigateTo('subjects')}
            className="text-xs font-bold text-[#FF7A00] hover:underline"
          >
            View All Subjects →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {subjectProgressList.map((sub) => (
            <motion.div
              key={sub.id}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => navigateTo('subjects')}
              className="glass-card p-5 rounded-3xl border border-white shadow-card-soft cursor-pointer hover:border-[#FF7A00]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#24152F]">{sub.short}</span>
                  <span className="text-[10px] font-bold text-[#20B86B] bg-[#20B86B]/15 px-2 py-0.5 rounded-full">
                    {sub.progress}%
                  </span>
                </div>

                <h4 className="text-xs font-extrabold text-[#24152F] line-clamp-1">{sub.name}</h4>
                <p className="text-[11px] text-[#6B6170] mt-0.5">{sub.completedTopics}/{sub.totalTopics} Topics</p>
              </div>

              {/* Circular Mini Progress Ring */}
              <div className="mt-4 flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="16" stroke="#FFF5DC" strokeWidth="4" fill="none" />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      stroke={sub.colorHex}
                      strokeWidth="4"
                      strokeDasharray={2 * Math.PI * 16}
                      strokeDashoffset={2 * Math.PI * 16 * (1 - sub.progress / 100)}
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-black text-[#24152F]">{sub.progress}%</span>
                </div>
                <div className="text-[11px] font-bold text-[#6B6170]">
                  <span>{sub.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ==================== 7. QUICK ACTIONS ("WHAT DO YOU WANT TO DO?") ==================== */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-extrabold text-[#24152F]">
          What do you want to do?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Action 1: Practice Coding */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => navigateTo('practice', 'code')}
            className="glass-card-warm p-5 rounded-3xl border border-[#FF7A00]/40 shadow-sm hover:shadow-glow-orange cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FFD84D] flex items-center justify-center text-white font-bold text-lg shadow-sm mb-3">
              💻
            </div>
            <h4 className="font-extrabold text-sm text-[#24152F]">Practice Coding</h4>
            <p className="text-xs text-[#6B6170] mt-1">Improve your problem solving with real-time test cases</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF7A00] mt-3">
              Run Code <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          {/* Action 2: Study Topic */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => navigateTo('subjects')}
            className="glass-card-pink p-5 rounded-3xl border border-[#FF1681]/40 shadow-sm hover:shadow-glow-pink cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF1681] to-[#FF7A00] flex items-center justify-center text-white font-bold text-lg shadow-sm mb-3">
              📖
            </div>
            <h4 className="font-extrabold text-sm text-[#24152F]">Study Topic</h4>
            <p className="text-xs text-[#6B6170] mt-1">Continue where you stopped in Arrays syllabus</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF1681] mt-3">
              Open Notes <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          {/* Action 3: Retention Check */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => navigateTo('retention')}
            className="glass-card p-5 rounded-3xl border border-[#8E168F]/40 shadow-sm hover:shadow-glow-magenta cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8E168F] to-[#FF1681] flex items-center justify-center text-white font-bold text-lg shadow-sm mb-3">
              🔁
            </div>
            <h4 className="font-extrabold text-sm text-[#24152F]">Retention Check</h4>
            <p className="text-xs text-[#6B6170] mt-1">Practice spaced recall questions to strengthen memory</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8E168F] mt-3">
              Start Check <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          {/* Action 4: Learning Log */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => navigateTo('practice', 'log')}
            className="glass-card p-5 rounded-3xl border border-[#20B86B]/40 shadow-sm hover:shadow-sm cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#20B86B] to-[#FFD84D] flex items-center justify-center text-white font-bold text-lg shadow-sm mb-3">
              🎙
            </div>
            <h4 className="font-extrabold text-sm text-[#24152F]">30s Learning Log</h4>
            <p className="text-xs text-[#6B6170] mt-1">Record what you learned today in voice or text</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#20B86B] mt-3">
              Record Log <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

        </div>
      </div>

      {/* ==================== 8. AI LEARNING BRAIN & RECENT LEARNING ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Dedicated AI Learning Brain Card */}
        <div className="lg:col-span-7 glass-card-warm p-6 sm:p-8 rounded-[32px] border border-white shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AIOrb size="md" pulse={true} />
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#24152F]">
                  Your AI Learning Brain
                </h3>
                <p className="text-xs text-[#6B6170] font-medium">Multi-dimensional cognitive analysis</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-[#20B86B] bg-[#20B86B]/15 px-3 py-1 rounded-full">
              Optimized
            </span>
          </div>

          {/* 4 Pillars Gauge */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            
            <div className="p-3.5 rounded-2xl bg-white/80 border border-white text-center">
              <span className="text-xl font-black text-[#FF7A00]">{aiBrainMetrics.understanding.score}%</span>
              <p className="text-xs font-bold text-[#24152F] mt-0.5">Understanding</p>
              <span className="text-[10px] text-[#20B86B] font-semibold">● Optimal</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-white text-center">
              <span className="text-xl font-black text-[#FF1681]">{aiBrainMetrics.consistency.score}%</span>
              <p className="text-xs font-bold text-[#24152F] mt-0.5">Consistency</p>
              <span className="text-[10px] text-[#FF1681] font-semibold">● 5-Day Streak</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-white text-center">
              <span className="text-xl font-black text-[#FFD84D]">{aiBrainMetrics.retention.score}%</span>
              <p className="text-xs font-bold text-[#24152F] mt-0.5">Retention</p>
              <span className="text-[10px] text-[#FF7A00] font-semibold">● Recall Ready</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-white text-center">
              <span className="text-xl font-black text-[#20B86B]">{aiBrainMetrics.practice.score}%</span>
              <p className="text-xs font-bold text-[#24152F] mt-0.5">Practice</p>
              <span className="text-[10px] text-[#20B86B] font-semibold">● High Velocity</span>
            </div>

          </div>

          {/* AI Summary Quote */}
          <div className="p-4 rounded-2xl bg-[#24152F] text-white text-xs font-medium leading-relaxed flex items-start gap-3">
            <span className="text-xl">🤖</span>
            <p className="text-white/90">
              "{aiBrainMetrics.aiSummary}"
            </p>
          </div>
        </div>

        {/* Recently Learned Timeline */}
        <div className="lg:col-span-5 glass-card p-6 rounded-[32px] border border-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#24152F] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF1681]" />
              Recently Learned
            </h3>
            <button
              onClick={() => navigateTo('history')}
              className="text-xs font-bold text-[#FF1681] hover:underline"
            >
              All History →
            </button>
          </div>

          <div className="space-y-2.5">
            {learningHistoryList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-white/70 border border-[#24152F]/10 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-[#24152F]">{item.subject}</span>
                    <span className="text-[10px] text-[#6B6170]">• {item.topic}</span>
                  </div>
                  <span className="text-[10px] text-[#6B6170]">{item.date}</span>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Learning Map Preview Button */}
          <button
            onClick={() => navigateTo('map')}
            className="w-full py-2.5 rounded-2xl glass-pill hover:bg-white text-xs font-bold text-[#24152F] border border-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <GitFork className="w-3.5 h-3.5 text-[#FF7A00]" />
            Open Full Learning Map
          </button>
        </div>

      </div>

    </div>
  );
};
