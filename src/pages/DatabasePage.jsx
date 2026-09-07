import React from 'react';
import { motion } from 'framer-motion';
import { Database, HardDrive, Cpu, ShieldCheck, Search, Filter, Server, ArrowRight, Layers, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DatabasePage = () => {
  const { learningLogs, navigateTo } = useApp();

  const memoryStats = [
    { label: "Vector Embeddings", count: "1,248", desc: "Indexed syllabus nodes" },
    { label: "Code Submissions", count: "84", desc: "Verified algorithm tests" },
    { label: "Reflection Logs", count: `${learningLogs.length}`, desc: "Voice & text reflections" },
    { label: "Retention Anchors", count: "42", desc: "Spaced recall triggers" },
  ];

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div className="glass-card-warm p-6 sm:p-8 rounded-[36px] border border-[#FF7A00]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#FF7A00] bg-[#FF7A00]/15 px-3 py-1 rounded-full uppercase tracking-wider">
            Stage 09 • Memory Vault
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#24152F] tracking-tight mt-1">
            Your AI Learning Memory
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-0.5">
            Decentralized cognitive vector database indexing every lecture, code attempt, and reflection.
          </p>
        </div>

        <button
          onClick={() => navigateTo('history')}
          className="py-3 px-6 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-pink self-start md:self-center"
        >
          <span>Open Full History</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Memory Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {memoryStats.map((stat, idx) => (
          <div key={idx} className="glass-card p-5 rounded-3xl border border-white shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#FF7A00]">{stat.count}</span>
            <h4 className="text-xs font-bold text-[#24152F] mt-1">{stat.label}</h4>
            <p className="text-[10px] text-[#6B6170] mt-0.5">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Visual Memory Blocks Architecture */}
      <div className="glass-card p-6 sm:p-8 rounded-[36px] border border-white shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-[#24152F] flex items-center gap-2">
            <Server className="w-5 h-5 text-[#FF7A00]" />
            Indexed Knowledge Blocks
          </h3>
          <span className="text-xs font-bold text-[#20B86B] bg-[#20B86B]/15 px-3 py-1 rounded-full">
            Status: Fully Synced
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {learningLogs.map((log) => (
            <motion.div
              key={log.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-2xl bg-white/90 border border-[#FF7A00]/20 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FF1681]">{log.subject}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${log.badgeColor}`}>
                  {log.status}
                </span>
              </div>
              <h4 className="text-xs font-extrabold text-[#24152F]">{log.topic}</h4>
              <p className="text-[11px] text-[#6B6170] line-clamp-2">{log.aiFeedback}</p>
              <div className="pt-2 border-t border-[#24152F]/10 flex items-center justify-between text-[10px] text-[#6B6170]">
                <span>{log.date}</span>
                <span className="text-[#FF7A00] font-bold">{log.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
