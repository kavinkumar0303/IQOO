import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Code2, 
  BrainCircuit, 
  Mic, 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  Layers, 
  GraduationCap, 
  ArrowRight,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CodeRunner } from '../components/practice/CodeRunner';
import { TheoryPractice } from '../components/practice/TheoryPractice';
import { LearningLog30s } from '../components/practice/LearningLog30s';
import { playSound } from '../utils/soundEffects';

export const SubjectPracticePage = ({ defaultTab = 'overview' }) => {
  const { activeTab: contextTab, setActiveTab: setContextTab, navigateTo } = useApp();
  const [tab, setTab] = useState(contextTab || defaultTab || 'overview');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleTabChange = (t) => {
    setTab(t);
    setContextTab(t);
    playSound('click');
  };

  const handleMarkCompleted = () => {
    setIsCompleted(!isCompleted);
    playSound('success');
  };

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 pb-24">
      
      {/* Subject Header Banner */}
      <div className="glass-card-warm p-6 sm:p-8 rounded-[36px] border border-[#FF7A00]/30 shadow-sm relative overflow-hidden">
        {/* Background ambient corner ring */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border-[18px] border-[#FFD84D]/30 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#FF7A00] text-white font-extrabold text-xs shadow-sm">
                CS301 • CORE
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-[#24152F] border border-[#24152F]/10">
                Semester 6
              </span>
              <span className="text-xs font-bold text-[#20B86B] bg-[#20B86B]/15 px-3 py-0.5 rounded-full">
                85% Subject Mastery
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#24152F] tracking-tight">
              Data Structures & Algorithms (DSA)
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#6B6170]">
              <span className="flex items-center gap-1 text-[#24152F]">
                <UserCheck className="w-4 h-4 text-[#FF7A00]" /> Faculty: Mr. Aravind
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#FF1681]">
                <Sparkles className="w-4 h-4" /> Today's Topic: Arrays & Dynamic Memory
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleMarkCompleted}
              className={`py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                isCompleted 
                  ? 'bg-[#20B86B] text-white shadow-sm' 
                  : 'glass-card hover:bg-white text-[#24152F] border border-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? "Topic Completed ✓" : "Mark as Completed"}
            </button>

            <button
              onClick={() => handleTabChange('code')}
              className="py-3 px-6 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-pink"
            >
              <Play className="w-4 h-4 fill-current" /> Practice Now
            </button>
          </div>
        </div>

        {/* Tab Navigation Pills */}
        <div className="mt-8 pt-4 border-t border-[#24152F]/10 flex flex-wrap items-center gap-2">
          {[
            { id: 'overview', label: 'Topic Overview', icon: BookOpen },
            { id: 'code', label: 'Code Runner', icon: Code2 },
            { id: 'theory', label: 'Theory Practice', icon: BrainCircuit },
            { id: 'log', label: '30s Reflection Log', icon: Mic },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white shadow-glow-orange'
                    : 'bg-white/70 text-[#6B6170] hover:text-[#24152F] hover:bg-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <div>
        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Syllabus / Lecture Notes */}
            <div className="lg:col-span-8 glass-card p-6 sm:p-8 rounded-[32px] border border-white shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-[#24152F]">
                  Arrays: Contiguous Memory & Performance
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-1 leading-relaxed">
                  Arrays provide constant-time O(1) random access via memory address arithmetic `base_address + index * sizeof(type)`. Understanding cache locality and memory bounds is fundamental before proceeding to Linked Lists.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FFF5DC] border border-[#FF7A00]/30 space-y-1">
                  <span className="text-xs font-bold text-[#FF7A00]">Access Time</span>
                  <p className="font-mono text-base font-black text-[#24152F]">O(1) Instant Lookup</p>
                  <p className="text-[11px] text-[#6B6170]">Direct pointer indexing calculation</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF5DC] border border-[#FF7A00]/30 space-y-1">
                  <span className="text-xs font-bold text-[#FF1681]">Insertion / Deletion</span>
                  <p className="font-mono text-base font-black text-[#24152F]">O(n) Worst Case</p>
                  <p className="text-[11px] text-[#6B6170]">Element shift required for in-place edits</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-[#24152F]/10 space-y-2">
                <h4 className="text-xs font-extrabold text-[#24152F] uppercase tracking-wider">
                  Faculty Summary Notes (Mr. Aravind)
                </h4>
                <ul className="space-y-1.5 text-xs text-[#6B6170] list-disc list-inside font-medium">
                  <li>Keep track of index boundary checks to avoid buffer overflow errors.</li>
                  <li>In dynamic arrays (vector/ArrayList), geometric resizing doubles capacity when full to provide amortized O(1) appending.</li>
                  <li>Complete today's coding exercise finding the maximum element across positive and negative inputs.</li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-[#20B86B] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Recommended prerequisite for Trees
                </span>
                <button
                  onClick={() => handleTabChange('code')}
                  className="py-2.5 px-5 rounded-xl btn-gradient-primary text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  Start Coding Exercise <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Topic Progress & AI Readiness */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card-warm p-6 rounded-[32px] border border-white shadow-sm space-y-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider block">
                  DSA Module Breakdown
                </span>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span>1. Arrays & Memory</span>
                    <span className="text-[#20B86B]">95% Mastered</span>
                  </div>
                  <div className="w-full bg-[#FFF5DC] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#20B86B] h-full rounded-full w-[95%]" />
                  </div>

                  <div className="flex items-center justify-between font-bold pt-2">
                    <span>2. Linked Lists</span>
                    <span className="text-[#FF7A00]">88% Mastered</span>
                  </div>
                  <div className="w-full bg-[#FFF5DC] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#FF7A00] h-full rounded-full w-[88%]" />
                  </div>

                  <div className="flex items-center justify-between font-bold pt-2">
                    <span>3. Stacks & Queues</span>
                    <span className="text-[#FF1681]">64% In Progress</span>
                  </div>
                  <div className="w-full bg-[#FFF5DC] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#FF1681] h-full rounded-full w-[64%]" />
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('map')}
                  className="w-full mt-2 py-2.5 rounded-xl glass-card hover:bg-white text-xs font-bold text-[#24152F] border border-white"
                >
                  Open Full Knowledge Tree
                </button>
              </div>
            </div>

          </div>
        )}

        {tab === 'code' && <CodeRunner />}
        {tab === 'theory' && <TheoryPractice />}
        {tab === 'log' && <LearningLog30s />}
      </div>

    </div>
  );
};
