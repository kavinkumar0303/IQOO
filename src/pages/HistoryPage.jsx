import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Search, Filter, Calendar, Sparkles, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HistoryPage = () => {
  const { learningLogs, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredLogs = learningLogs.filter((item) => {
    const matchesSearch = 
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = 
      filterStatus === 'All' || 
      item.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div className="glass-card-warm p-6 sm:p-8 rounded-[36px] border border-[#FF7A00]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#FF1681] bg-[#FF1681]/15 px-3 py-1 rounded-full uppercase tracking-wider">
            Stage 10 • Timeline Archive
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#24152F] tracking-tight mt-1">
            Learning History & Records
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-0.5">
            Searchable log of all practice submissions, lectures, test scores, and AI diagnostic feedback.
          </p>
        </div>

        <button
          onClick={() => navigateTo('map')}
          className="py-3 px-6 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-pink self-start md:self-center"
        >
          <span>Open Learning Map</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="glass-card p-4 sm:p-6 rounded-3xl border border-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#FF7A00]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subject, topic, date, or concept..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-[#24152F]/15 rounded-2xl text-xs sm:text-sm text-[#24152F] placeholder-[#6B6170] focus:outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/20 font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Good', 'Partial', 'Needs Revision'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white shadow-sm'
                  : 'bg-white/80 text-[#6B6170] hover:bg-white hover:text-[#24152F]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl text-xs sm:text-sm font-bold text-[#6B6170]">
            No learning records match your search query.
          </div>
        ) : (
          filteredLogs.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 sm:p-6 rounded-3xl border border-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#FF7A00]/40 transition-all"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-[#FF7A00]/15 text-[#FF7A00] font-black text-xs">
                    {item.subject}
                  </span>
                  <span className="text-xs font-extrabold text-[#24152F]">
                    {item.topic}
                  </span>
                  <span className="text-[11px] text-[#6B6170]">
                    • {item.category || "Class Session"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#6B6170] font-medium leading-relaxed">
                  {item.aiFeedback}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#6B6170] font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FF7A00]" /> {item.date} {item.time && `• ${item.time}`}
                  </span>
                </div>
              </div>

              {/* Status & Score */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-base font-black text-[#24152F]">
                  {item.score}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${item.badgeColor}`}>
                  {item.status}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
};
