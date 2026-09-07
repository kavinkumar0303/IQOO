import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, CheckCircle2, AlertTriangle, XCircle, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { AIOrb } from '../components/3d/AIOrb';
import { useApp } from '../context/AppContext';

export const AIAnalysisPage = () => {
  const { navigateTo } = useApp();

  const metrics = [
    {
      category: "Coding Practice",
      topic: "DSA • Array Max Search",
      rating: "GOOD",
      score: "94%",
      color: "text-[#20B86B] bg-[#20B86B]/15 border-[#20B86B]/30",
      analysis: "High efficiency O(n) iteration with 0 memory overhead. Passed 3/3 test cases on first run."
    },
    {
      category: "Theory Accuracy",
      topic: "Calculus • Integration by Parts",
      rating: "GOOD",
      score: "88%",
      color: "text-[#20B86B] bg-[#20B86B]/15 border-[#20B86B]/30",
      analysis: "Correct power rule application ∫ x² dx = x³/3 + C with immediate conceptual rationale."
    },
    {
      category: "Consistency & Streak",
      topic: "5-Day Learning Habit",
      rating: "GOOD",
      score: "92%",
      color: "text-[#20B86B] bg-[#20B86B]/15 border-[#20B86B]/30",
      analysis: "5 consecutive active morning sessions logged on schedule without misses."
    },
    {
      category: "Weakness Alert",
      topic: "DSA • Array Insertion Edge Bounds",
      rating: "WEAK",
      score: "42%",
      color: "text-[#E83B5C] bg-[#E83B5C]/15 border-[#E83B5C]/30",
      analysis: "Struggles with rightward element shifting when array reaches maximum capacity."
    },
    {
      category: "Spaced Retention",
      topic: "DSA • Linked List Operations",
      rating: "PARTIAL",
      score: "68%",
      color: "text-[#F4A62A] bg-[#F4A62A]/15 border-[#F4A62A]/30",
      analysis: "Head deletion remembered (O(1)), but tail insertion traversal needs quick 5m review."
    }
  ];

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div className="glass-card-warm p-6 sm:p-8 rounded-[36px] border border-[#FF7A00]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <AIOrb size="lg" pulse={true} />
          <div>
            <span className="text-xs font-bold text-[#FF1681] bg-[#FF1681]/15 px-3 py-1 rounded-full uppercase tracking-wider">
              Stage 08 • Cognitive Synthesis
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-[#24152F] tracking-tight mt-1">
              AI Multi-Dimensional Analysis
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-0.5">
              Continuous neural evaluation across code, theory, reflection logs, and memory retention.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('database')}
          className="py-3 px-6 rounded-2xl btn-gradient-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-glow-pink self-start md:self-center"
        >
          <span>View Learning Memory</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-card p-6 rounded-[32px] border border-white shadow-card-soft flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#6B6170] uppercase">{item.category}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${item.color}`}>
                  {item.rating} • {item.score}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#24152F]">{item.topic}</h3>
              <p className="text-xs text-[#6B6170] font-medium mt-2 leading-relaxed">
                {item.analysis}
              </p>
            </div>

            <div className="pt-3 border-t border-[#24152F]/10 flex items-center justify-between text-xs font-bold">
              <span className="text-[#FF7A00]">AI Action</span>
              <span className="text-[#24152F] hover:underline cursor-pointer flex items-center gap-0.5">
                Targeted Practice →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommended Remedial Action Card */}
      <div className="glass-panel-dark text-white p-6 sm:p-8 rounded-[36px] shadow-2xl border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#FFD84D] uppercase tracking-wider">
            Primary Improvement Vector
          </span>
          <h3 className="text-xl font-extrabold text-white">
            10-Minute Remedial Array Insertion Challenge
          </h3>
          <p className="text-xs text-white/80 max-w-xl">
            Focusing on boundary resizing will push your DSA mastery from 85% to 91% and eliminate stack overflow errors.
          </p>
        </div>

        <button
          onClick={() => navigateTo('practice', 'code')}
          className="py-3 px-8 rounded-2xl btn-gradient-orange font-bold text-xs sm:text-sm flex-shrink-0 shadow-md"
        >
          Start Practice Now →
        </button>
      </div>

    </div>
  );
};
