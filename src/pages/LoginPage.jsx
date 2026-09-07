import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Lock, 
  UserCheck, 
  GraduationCap, 
  CheckCircle2, 
  Cpu, 
  Zap,
  Eye,
  EyeOff,
  BookOpen,
  BrainCircuit,
  BarChart3,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import learniqLogo from '../assets/learniq-logo.png';

export const LoginPage = () => {
  const { login, userRole, handleRoleSwitch } = useApp();
  const [email, setEmail] = useState('kavin.k@learniq.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(userRole || 'student');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    handleRoleSwitch(role);
    if (role === 'faculty') {
      setEmail('aravind.s@learniq.edu');
    } else {
      setEmail('kavin.k@learniq.edu');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole);
      setIsLoading(false);
    }, 450);
  };

  const handleQuickDemo = (role) => {
    handleRoleChange(role);
    setIsLoading(true);
    setTimeout(() => {
      login(role);
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className="login-page min-h-[100svh] min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 xl:p-12 box-border overflow-x-hidden relative bg-[#FFFDF8]">
      
      {/* Subtle Static Background Gradients (Zero animation / zero mouse tracking) */}
      <div className="absolute top-[-10%] left-[-5%] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#FF1681]/10 via-[#FF7A00]/8 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[580px] h-[580px] rounded-full bg-gradient-to-tl from-[#FFD84D]/15 via-[#FF7A00]/8 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] right-[30%] w-[380px] h-[380px] rounded-full bg-[#EC087F]/5 blur-3xl pointer-events-none" />

      {/* Main Two-Column Layout Container */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
        
        {/* ==================== 1. LEFT COLUMN: HERO PRESENTATION ==================== */}
        <div className="lg:col-span-7 flex flex-col justify-center max-w-[620px] space-y-6">
          
          {/* LearnIQ Official Brand Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl glass-card-warm border border-[#FF7A00]/40 shadow-sm w-fit">
            <img 
              src={learniqLogo} 
              alt="LearnIQ Education Logo" 
              className="w-8 h-8 object-contain shrink-0"
              draggable="false"
            />
            <span className="font-extrabold text-sm sm:text-base tracking-wider text-[#24152F]">
              Learn<span className="text-gradient-sunburst">IQ</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
            <span className="text-[11px] font-bold text-[#FF1681] whitespace-nowrap">Next-Gen College AI</span>
          </div>

          {/* Main Hero Typography */}
          <div className="space-y-2">
            <h1 className="text-[clamp(36px,4.8vw,64px)] font-black text-[#24152F] tracking-tight leading-[1.05]">
              Learn Smarter <br />
              <span className="text-gradient-sunburst">Grow Faster</span>
            </h1>
            <p className="text-sm sm:text-base xl:text-lg text-[#6B6170] font-medium leading-relaxed max-w-[540px]">
              Your smarter way to learn every day. Personalized daily study companion, interactive workflows, and intelligent college retention analysis.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <span className="px-3.5 py-1.5 rounded-full glass-card text-xs font-bold text-[#FF1681] border border-[#FF1681]/30 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#FF1681]" /> AI Powered
            </span>
            <span className="px-3.5 py-1.5 rounded-full glass-card text-xs font-bold text-[#FF7A00] border border-[#FF7A00]/30 flex items-center gap-1.5 shadow-sm">
              <Cpu className="w-4 h-4 text-[#FF7A00]" /> Personalized
            </span>
            <span className="px-3.5 py-1.5 rounded-full glass-card text-xs font-bold text-[#20B86B] border border-[#20B86B]/30 flex items-center gap-1.5 shadow-sm">
              <GraduationCap className="w-4 h-4 text-[#20B86B]" /> Built for Students
            </span>
          </div>

          {/* Clean Static Learning Highlights Preview Card */}
          <div className="pt-2 hidden sm:block">
            <div className="p-5 sm:p-6 rounded-[28px] glass-card border border-white/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#24152F]/10 pb-3">
                <span className="text-xs font-bold text-[#24152F] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#FF7A00]" /> 
                  Smart Academic Mastery
                </span>
                <span className="text-[11px] font-extrabold text-[#20B86B] bg-[#20B86B]/15 px-2.5 py-0.5 rounded-full">
                  13-Stage System Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-white/70 border border-[#FF7A00]/15 space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#FF7A00]">
                    <Flame className="w-3.5 h-3.5" /> 5 Day Streak
                  </div>
                  <p className="text-[10px] text-[#6B6170] font-medium leading-tight">Consistent daily learning retention</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/70 border border-[#FF1681]/15 space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#FF1681]">
                    <BrainCircuit className="w-3.5 h-3.5" /> 82% AI Score
                  </div>
                  <p className="text-[10px] text-[#6B6170] font-medium leading-tight">Optimal conceptual understanding</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/70 border border-[#20B86B]/15 space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#20B86B]">
                    <BarChart3 className="w-3.5 h-3.5" /> 78% Mastery
                  </div>
                  <p className="text-[10px] text-[#6B6170] font-medium leading-tight">Curriculum syllabus on track</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ==================== 2. RIGHT COLUMN: LOGIN CARD ==================== */}
        <div className="lg:col-span-5 w-full flex justify-center items-center">
          <div className="w-full max-w-[460px] xl:max-w-[480px] glass-card-warm p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] shadow-xl border border-white relative overflow-hidden box-border">
            
            {/* Subtle Static Corner Ambient Glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br from-[#FF1681]/25 to-[#FFD84D]/25 blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="mb-5 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#24152F] tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B6170] font-medium mt-0.5">
                    Ready to continue your learning journey?
                  </p>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF1681] to-[#FF7A00] p-0.5 shadow-sm flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Role Selection Pill Buttons */}
            <div className="mb-4 relative z-10">
              <label className="block text-[11px] sm:text-xs font-bold text-[#6B6170] uppercase tracking-wider mb-1.5">
                I am a...
              </label>
              <div className="w-full h-[52px] grid grid-cols-2 gap-1.5 p-1 bg-[#FFF5DC]/80 rounded-2xl border border-[#FF7A00]/20 box-border items-center">
                <button
                  type="button"
                  onClick={() => handleRoleChange('student')}
                  className={`h-full rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    selectedRole === 'student'
                      ? 'bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white shadow-glow-orange'
                      : 'text-[#6B6170] hover:text-[#24152F] hover:bg-white/60'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('faculty')}
                  className={`h-full rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    selectedRole === 'faculty'
                      ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFD84D] text-[#24152F] shadow-glow-yellow'
                      : 'text-[#6B6170] hover:text-[#24152F] hover:bg-white/60'
                  }`}
                >
                  <UserCheck className="w-4 h-4 shrink-0" />
                  <span>Faculty</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 relative z-10">
              {/* Student ID / Email Field */}
              <div>
                <label className="block text-xs font-bold text-[#24152F] mb-1.5">
                  {selectedRole === 'faculty' ? 'Faculty Email / ID' : 'Student ID / Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#FF7A00]">
                    <Mail className="w-4 h-4 shrink-0" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'faculty' ? "aravind.s@learniq.edu" : "kavin.k@learniq.edu"}
                    className="w-full h-[52px] pl-10 pr-4 bg-white/90 border border-[#24152F]/15 rounded-2xl text-xs sm:text-sm text-[#24152F] font-medium placeholder-[#6B6170] focus:outline-none focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/15 transition-all shadow-sm box-border"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#24152F]">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] font-bold text-[#FF1681] hover:underline whitespace-nowrap">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#FF1681]">
                    <Lock className="w-4 h-4 shrink-0" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-[52px] pl-10 pr-10 bg-white/90 border border-[#24152F]/15 rounded-2xl text-xs sm:text-sm text-[#24152F] font-medium placeholder-[#6B6170] focus:outline-none focus:border-[#FF1681] focus:ring-4 focus:ring-[#FF1681]/15 transition-all shadow-sm box-border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B6170] hover:text-[#24152F]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 shrink-0" /> : <Eye className="w-4 h-4 shrink-0" />}
                  </button>
                </div>
              </div>

              {/* Continue Learning Gradient Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[54px] rounded-2xl btn-gradient-primary font-bold text-sm sm:text-base flex items-center justify-center gap-2 group transition-all mt-1 box-border shadow-md cursor-pointer hover:opacity-95 active:scale-[0.99]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <span>Continue Learning</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo One-Click Access */}
            <div className="mt-4 pt-3.5 border-t border-[#24152F]/10 relative z-10">
              <p className="text-[11px] font-bold text-[#6B6170] text-center mb-2 uppercase tracking-wider">
                Instant Demo Access
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('student')}
                  className="h-[40px] px-2 rounded-xl bg-white hover:bg-[#FFF5DC] border border-[#FF7A00]/30 text-[11px] font-bold text-[#FF7A00] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                  <span className="truncate">Student (Kavin)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('faculty')}
                  className="h-[40px] px-2 rounded-xl bg-white hover:bg-[#FFF5DC] border border-[#FF1681]/30 text-[11px] font-bold text-[#FF1681] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#FF1681] shrink-0" />
                  <span className="truncate">Faculty (Aravind)</span>
                </button>
              </div>
            </div>

            {/* Extra UI Features */}
            <div className="mt-4 pt-3.5 border-t border-[#24152F]/10 relative z-10 text-center">
              <p className="text-xs font-bold text-[#24152F] mb-2">
                Your learning journey starts here.
              </p>
              <div className="grid grid-cols-3 gap-1 text-[10px] font-semibold text-[#6B6170]">
                <div className="flex flex-col items-center gap-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#20B86B]" />
                  <span>Personalized</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A00]" />
                  <span>AI Analysis</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1681]" />
                  <span>Progress Track</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
