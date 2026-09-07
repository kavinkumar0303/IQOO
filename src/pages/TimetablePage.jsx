import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Play, MapPin, UserCheck, Clock, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { todaySchedule } from '../data/mockData';

export const TimetablePage = () => {
  const { navigateTo } = useApp();
  const [selectedDay, setSelectedDay] = useState('Friday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div className="glass-card-warm p-6 sm:p-8 rounded-[36px] border border-[#FF7A00]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#FF7A00] bg-[#FF7A00]/15 px-3 py-1 rounded-full uppercase tracking-wider">
            Stage 03 • Daily Synchronizer
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#24152F] tracking-tight mt-1">
            College Academic Timetable
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-0.5">
            Synchronized with university lab allocations, faculty slots, and live classroom streams.
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#FFF5DC] rounded-2xl border border-[#FF7A00]/20 overflow-x-auto">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDay === day
                  ? 'bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white shadow-sm'
                  : 'text-[#6B6170] hover:text-[#24152F]'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Class Schedule Stream */}
      <div className="space-y-4">
        {todaySchedule.map((item) => {
          const isLive = item.status === 'live';
          const isDone = item.status === 'completed';

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              className={`glass-card p-6 rounded-[32px] border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                isLive 
                  ? 'border-[#FF7A00] shadow-glow-orange/30 ring-2 ring-[#FF7A00]/20 bg-white/95' 
                  : isDone
                  ? 'border-[#24152F]/10 opacity-80'
                  : 'border-white hover:border-[#FF1681]/30'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-4">
                <div className="px-4 py-3 rounded-2xl bg-[#FFF5DC] border border-[#FF7A00]/20 text-center min-w-[95px] flex-shrink-0">
                  <span className="text-sm font-black text-[#24152F] block leading-tight">{item.time}</span>
                  <span className="text-[11px] font-semibold text-[#6B6170]">{item.duration}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-[#FF1681] bg-[#FF1681]/10 px-2.5 py-0.5 rounded-full">
                      {item.code}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#24152F]">
                      {item.subject}
                    </h3>
                    {isLive && (
                      <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white text-[10px] font-black tracking-wider flex items-center gap-1 shadow-sm animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        LIVE NOW
                      </span>
                    )}
                    {isDone && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#20B86B]/15 text-[#20B86B] text-[10px] font-bold">
                        ✓ Completed
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#6B6170]">
                    Topic: {item.topic}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#6B6170] pt-1">
                    <span className="flex items-center gap-1 text-[#24152F]">
                      <UserCheck className="w-3.5 h-3.5 text-[#FF7A00]" /> {item.instructor}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#FF7A00]">
                      <MapPin className="w-3.5 h-3.5" /> {item.room}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Action */}
              <div className="flex items-center gap-3 self-end lg:self-center">
                {isLive ? (
                  <button
                    onClick={() => navigateTo('subjects')}
                    className="py-3 px-6 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-orange"
                  >
                    <Play className="w-4 h-4 fill-current" /> Join Live Lab Session
                  </button>
                ) : (
                  <button
                    onClick={() => navigateTo('subjects')}
                    className="py-2.5 px-4 rounded-xl glass-card hover:bg-white text-xs font-bold text-[#24152F] border border-white"
                  >
                    View Subject Syllabus →
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
