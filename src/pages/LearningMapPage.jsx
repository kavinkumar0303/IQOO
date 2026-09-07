import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, CheckCircle2, AlertTriangle, XCircle, Lock, Sparkles, ArrowRight, Play, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { learningMapNodes } from '../data/mockData';

export const LearningMapPage = () => {
  const { navigateTo } = useApp();
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div className="glass-card-warm p-6 sm:p-8 rounded-[36px] border border-[#FF7A00]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#FF7A00] bg-[#FF7A00]/15 px-3 py-1 rounded-full uppercase tracking-wider">
            Stage 11 • Visual Skill Tree
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#24152F] tracking-tight mt-1">
            Futuristic Learning Map
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-0.5">
            Interconnected syllabus nodes displaying real-time mastery, prerequisites, and target milestones.
          </p>
        </div>

        <button
          onClick={() => navigateTo('retention')}
          className="py-3 px-6 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-pink self-start md:self-center"
        >
          <span>Retention Check</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#6B6170]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#20B86B]" /> Completed (✓)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF7A00]" /> In Progress (●)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#E83B5C]" /> Needs Revision (⚠)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#6B6170]/40" /> Locked (🔒)
        </span>
      </div>

      {/* Visual Subject Nodes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {learningMapNodes.map((subject) => (
          <div
            key={subject.id}
            className="glass-card p-6 sm:p-8 rounded-[36px] border border-white shadow-sm space-y-5 relative overflow-hidden"
          >
            {/* Subject Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#24152F]/10">
              <h3 className="text-lg font-black text-[#24152F]">{subject.name}</h3>
              <span className="text-xs font-bold text-[#FF7A00] bg-[#FFF5DC] px-3 py-1 rounded-full">
                {subject.topics.filter(t => t.status === 'completed').length}/{subject.topics.length} Mastered
              </span>
            </div>

            {/* Connected Node Chain */}
            <div className="space-y-3 relative pl-6 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-[#20B86B] via-[#FF7A00] to-[#FFD84D]/30">
              {subject.topics.map((topic, tIdx) => {
                let statusBadge = null;
                let dotColor = 'bg-[#20B86B]';

                if (topic.status === 'completed') {
                  statusBadge = <span className="text-xs font-bold text-[#20B86B]">✓ {topic.score}%</span>;
                  dotColor = 'bg-[#20B86B]';
                } else if (topic.status === 'in-progress') {
                  statusBadge = <span className="text-xs font-bold text-[#FF7A00]">● {topic.score}% Active</span>;
                  dotColor = 'bg-[#FF7A00]';
                } else if (topic.status === 'revision') {
                  statusBadge = <span className="text-xs font-bold text-[#E83B5C]">⚠ Needs Revision</span>;
                  dotColor = 'bg-[#E83B5C]';
                } else {
                  statusBadge = <span className="text-xs font-bold text-[#6B6170]">🔒 Prereq Needed</span>;
                  dotColor = 'bg-[#6B6170]/40';
                }

                return (
                  <motion.div
                    key={tIdx}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedNode({ subject: subject.name, ...topic })}
                    className="p-3.5 rounded-2xl bg-white/80 border border-[#24152F]/10 hover:border-[#FF7A00] transition-all cursor-pointer flex items-center justify-between shadow-sm relative"
                  >
                    {/* Circle Node Indicator */}
                    <div className={`absolute -left-[30px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${dotColor} border-2 border-white shadow-sm`} />

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-[#24152F]">{topic.name}</h4>
                      <p className="text-[10px] text-[#6B6170]">Topic Node #{tIdx + 1}</p>
                    </div>

                    <div>{statusBadge}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Node Drawer / Modal */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-md glass-card-warm p-6 sm:p-8 rounded-[36px] shadow-2xl border border-white space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FF1681]">{selectedNode.subject}</span>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-xl font-black text-[#24152F]">{selectedNode.name}</h3>
              <p className="text-xs text-[#6B6170] font-medium leading-relaxed">
                Current mastery evaluated at <strong className="text-[#FF7A00]">{selectedNode.score}%</strong>. Practice interactive problems to raise your mastery to 90%+.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedNode(null);
                    navigateTo('practice', 'code');
                  }}
                  className="flex-1 py-3 px-5 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-pink"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Practice Node
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
