import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, XCircle, Clock, Terminal, Sparkles, Send, Check } from 'lucide-react';
import { codeExercise } from '../../data/mockData';
import { playSound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

export const CodeRunner = () => {
  const [code, setCode] = useState(codeExercise.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testCases, setTestCases] = useState(codeExercise.testCases);
  const [consoleOutput, setConsoleOutput] = useState([
    "LearnIQ C++ Compiler v14.2.0 initialized.",
    "Ready to execute largest(arr, n) tests."
  ]);
  const [activeTestCaseTab, setActiveTestCaseTab] = useState(1);

  const handleRunCode = () => {
    setIsRunning(true);
    playSound('code-run');

    setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput([
        "Compiling solution.cpp...",
        "Compilation successful (0 warnings, 0 errors).",
        "Running Test Case 1: [1, 8, 7, 56, 90] => Output: 90 (PASSED in 2ms)",
        "Running Test Case 2: [5, 5, 5, 5] => Output: 5 (PASSED in 1ms)",
        "Running Test Case 3: [-10, -3, -50, -1] => Output: -1 (PASSED in 2ms)",
        "✨ All 3 Test Cases Passed! Ready for submission."
      ]);
      playSound('success');
    }, 600);
  };

  const handleResetCode = () => {
    setCode(codeExercise.starterCode);
    setConsoleOutput(["Code reset to template."]);
    setIsSubmitted(false);
    playSound('click');
  };

  const handleSubmitCode = () => {
    setIsSubmitted(true);
    playSound('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF1681', '#FF7A00', '#FFD84D', '#20B86B']
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Problem Header & Metadata */}
      <div className="glass-card-warm p-5 rounded-3xl border border-[#FF7A00]/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#20B86B]/15 text-[#20B86B] text-[11px] font-bold">
              {codeExercise.difficulty}
            </span>
            <span className="text-xs font-bold text-[#6B6170]">
              Faculty: {codeExercise.faculty}
            </span>
          </div>
          <h3 className="text-lg font-black text-[#24152F] mt-1">{codeExercise.title}</h3>
          <p className="text-xs text-[#6B6170] font-medium mt-0.5">{codeExercise.description}</p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="px-3 py-1 rounded-xl bg-white/90 border border-[#24152F]/10 text-xs font-bold text-[#24152F] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FF7A00]" /> {codeExercise.timeLimit}
          </span>
          <span className="px-3 py-1 rounded-xl bg-white/90 border border-[#24152F]/10 text-xs font-bold text-[#24152F]">
            {codeExercise.memoryLimit}
          </span>
        </div>
      </div>

      {/* Editor & Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Code Editor Window */}
        <div className="lg:col-span-7 code-editor-dark p-4 sm:p-5 rounded-3xl flex flex-col justify-between shadow-2xl relative">
          
          {/* Top Editor Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#E83B5C]" />
                <span className="w-3 h-3 rounded-full bg-[#F4A62A]" />
                <span className="w-3 h-3 rounded-full bg-[#20B86B]" />
              </div>
              <span className="text-white/60 font-mono text-[11px] ml-2">solution.cpp</span>
            </div>
            <span className="text-[#FFD84D] text-[11px] font-mono">C++ 17</span>
          </div>

          {/* Textarea Editor */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="w-full bg-transparent text-white font-mono text-xs sm:text-sm resize-none focus:outline-none leading-relaxed selection:bg-[#FF7A00] selection:text-white"
            spellCheck={false}
          />

          {/* Bottom Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 mt-3">
            <button
              onClick={handleResetCode}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="py-2.5 px-5 rounded-xl btn-gradient-orange text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                {isRunning ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#24152F] border-t-transparent rounded-full animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Run Tests
                  </>
                )}
              </button>

              <button
                onClick={handleSubmitCode}
                className="py-2.5 px-6 rounded-xl btn-gradient-primary text-xs font-bold flex items-center gap-1.5 shadow-glow-pink"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4" /> Submitted
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Submit Solution
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Test Cases & Live Console Output */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Test Case Selectors */}
          <div className="glass-card p-4 rounded-3xl border border-white shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#24152F] uppercase tracking-wider">
                Test Cases
              </span>
              <span className="text-[11px] font-bold text-[#20B86B]">
                3 of 3 Passing ✓
              </span>
            </div>

            <div className="flex items-center gap-2">
              {testCases.map((tc) => (
                <button
                  key={tc.id}
                  onClick={() => setActiveTestCaseTab(tc.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTestCaseTab === tc.id 
                      ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFD84D] text-[#24152F] shadow-sm' 
                      : 'bg-[#FFF5DC] text-[#6B6170] hover:bg-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#20B86B]" />
                  Case {tc.id}
                </button>
              ))}
            </div>

            {/* Active Test Case Detail */}
            {testCases.map((tc) => {
              if (tc.id !== activeTestCaseTab) return null;
              return (
                <div key={tc.id} className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#24152F]/10 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#6B6170] uppercase">Input</span>
                    <p className="font-mono font-bold text-[#24152F] bg-white p-2 rounded-xl border border-[#24152F]/10 mt-0.5">
                      {tc.input}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#6B6170] uppercase">Expected Output</span>
                    <p className="font-mono font-bold text-[#20B86B] bg-[#20B86B]/10 p-2 rounded-xl border border-[#20B86B]/20 mt-0.5">
                      {tc.expected}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal Console Output */}
          <div className="glass-panel-dark text-white p-4 rounded-3xl border border-white/10 font-mono text-xs space-y-2 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-white/60 text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Compiler Console Output</span>
            </div>
            <div className="space-y-1 text-white/90 max-h-40 overflow-y-auto">
              {consoleOutput.map((line, idx) => (
                <p key={idx} className={line.includes('Passed') || line.includes('successful') ? 'text-[#20B86B]' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
