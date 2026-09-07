import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  CalendarClock, 
  BookOpen, 
  Code2, 
  Sparkles, 
  History, 
  GitFork, 
  Repeat, 
  Bell, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  LogOut,
  ChevronDown,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import learniqLogo from '../../assets/learniq-logo.png';

export const Navbar = () => {
  const { 
    activePage, 
    navigateTo, 
    currentUser, 
    userRole, 
    handleRoleSwitch, 
    logout, 
    soundOn, 
    toggleSoundSetting,
    notifications
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'journey', label: '13-Stage Flow', icon: Sparkles },
    { id: 'timetable', label: 'Timetable', icon: CalendarClock },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Code2 },
    { id: 'history', label: 'History', icon: History },
    { id: 'map', label: 'Learning Map', icon: GitFork },
    { id: 'retention', label: 'Retention', icon: Repeat },
  ];

  return (
    <header className="sticky top-3 z-50 w-full px-3 sm:px-4 lg:px-6">
      <div 
        className="w-full mx-auto"
        style={{ maxWidth: '1720px' }}
      >
        <nav className="glass-card rounded-[28px] px-3 py-1.5 sm:px-4 2xl:px-5 grid grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[auto_1fr_auto] items-center gap-2 xl:gap-2.5 2xl:gap-5 shadow-glow-orange/10 border border-white/90 min-h-[56px] xl:min-h-[60px] relative">
          
          {/* ==================== 1. LEFT ZONE: BRAND ==================== */}
          <div 
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none flex-shrink-0"
          >
            {/* Official LearnIQ Education Icon */}
            <img 
              src={learniqLogo} 
              alt="LearnIQ Education Logo" 
              className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0 transition-transform group-hover:scale-105"
              draggable="false"
            />

            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-sm sm:text-base xl:text-lg 2xl:text-xl tracking-tight text-[#24152F] group-hover:opacity-90 transition-opacity leading-none">
                Learn<span className="text-gradient-sunburst">IQ</span>
              </span>
              <p className="text-[8.5px] sm:text-[9px] xl:text-[9.5px] 2xl:text-[10px] font-semibold text-[#6B6170] mt-0.5 tracking-wide leading-none whitespace-nowrap">
                Smart Education • Smarter Learning
              </p>
            </div>
          </div>

          {/* ==================== 2. CENTER ZONE: NAVIGATION ==================== */}
          <div className="hidden xl:flex items-center justify-center min-w-0 flex-1 px-1">
            <div className="flex items-center justify-center gap-0.5 2xl:gap-1.5 bg-[#FFF5DC]/70 p-1 rounded-2xl border border-white/60">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`relative h-[36px] xl:h-[38px] 2xl:h-[42px] px-1.5 xl:px-2 2xl:px-3.5 rounded-xl text-[10.5px] xl:text-[11.5px] 2xl:text-[13.5px] font-semibold transition-all flex items-center justify-center gap-1 xl:gap-1.5 whitespace-nowrap leading-none flex-shrink-0 cursor-pointer ${
                      isActive 
                        ? 'text-white shadow-glow-pink' 
                        : 'text-[#6B6170] hover:text-[#24152F] hover:bg-white/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-gradient-to-r from-[#FF1681] via-[#FF7A00] to-[#FF8A00] rounded-xl z-0"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-1 xl:gap-1.5 leading-none">
                      <Icon className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== 3. RIGHT ZONE: ACTIONS ==================== */}
          <div className="flex items-center justify-end gap-1.5 2xl:gap-2 flex-shrink-0">
            
            {/* Sound Toggle Button */}
            <button
              onClick={toggleSoundSetting}
              className="w-[36px] h-[36px] xl:w-[38px] xl:h-[38px] 2xl:w-[42px] 2xl:h-[42px] rounded-full glass-pill flex items-center justify-center text-[#6B6170] hover:text-[#FF7A00] transition-colors border border-white flex-shrink-0 cursor-pointer"
              title={soundOn ? "Mute interactive audio" : "Enable interactive audio"}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#FF7A00]" /> : <VolumeX className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#6B6170]" />}
            </button>

            {/* Notification Button & Dropdown */}
            <div ref={notifRef} className="relative flex items-center">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-[36px] h-[36px] xl:w-[38px] xl:h-[38px] 2xl:w-[42px] 2xl:h-[42px] rounded-full glass-pill flex items-center justify-center text-[#6B6170] hover:text-[#FF1681] transition-colors relative border border-white flex-shrink-0 cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF1681] border-2 border-white shadow-glow-pink" />
                )}
              </button>

              {/* Notification Drawer (Anchored inside Viewport) */}
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-32px)] glass-card-warm rounded-3xl p-4 shadow-2xl border border-white z-50 origin-top-right"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#24152F]/10 mb-2">
                      <span className="font-bold text-sm text-[#24152F] flex items-center gap-1.5">
                        <Bell className="w-4 h-4 text-[#FF7A00]" /> Notifications
                      </span>
                      <span className="text-[11px] font-semibold text-[#FF1681] bg-[#FF1681]/10 px-2 py-0.5 rounded-full">
                        {unreadCount} New
                      </span>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {notifications.map((item) => (
                        <div 
                          key={item.id}
                          className={`p-2.5 rounded-2xl transition-colors text-xs ${
                            item.unread ? 'bg-white/90 border border-[#FF7A00]/30 shadow-sm' : 'bg-white/40'
                          }`}
                        >
                          <p className="font-medium text-[#24152F]">{item.text}</p>
                          <span className="text-[10px] text-[#6B6170] mt-1 block">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar & Dropdown (Strictly Anchored Inside Viewport) */}
            <div ref={profileRef} className="relative flex items-center">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-[36px] xl:h-[38px] 2xl:h-[42px] pl-1 pr-2 xl:pr-2.5 rounded-full glass-pill hover:bg-white transition-all border border-white flex items-center justify-center gap-1.5 xl:gap-2 flex-shrink-0 cursor-pointer"
              >
                <div className="w-6.5 h-6.5 xl:w-7 xl:h-7 2xl:w-7.5 2xl:h-7.5 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FFD84D] flex items-center justify-center text-white font-bold text-[11px] xl:text-xs shadow-sm flex-shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:flex flex-col justify-center leading-none">
                  <p className="text-[10px] xl:text-[11px] 2xl:text-xs font-bold text-[#24152F] leading-tight">{currentUser.name}</p>
                  <p className="text-[8.5px] xl:text-[9px] 2xl:text-[10px] font-semibold text-[#FF7A00] uppercase tracking-wider leading-tight">{userRole}</p>
                </div>
                <ChevronDown className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#6B6170] flex-shrink-0" />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-32px)] glass-card-warm rounded-3xl p-4 shadow-2xl border border-white z-50 origin-top-right"
                  >
                    <div className="pb-3 border-b border-[#24152F]/10">
                      <p className="font-bold text-sm text-[#24152F]">{currentUser.fullName || currentUser.name}</p>
                      <p className="text-xs text-[#6B6170] truncate">{currentUser.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF7A00]/15 text-[#FF7A00] text-[11px] font-bold">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {currentUser.department || "Computer Science & AI"}
                      </div>
                    </div>

                    {/* Role Switcher */}
                    <div className="py-3 border-b border-[#24152F]/10">
                      <p className="text-[11px] font-bold text-[#6B6170] uppercase tracking-wider mb-2">Switch View</p>
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FFF5DC] rounded-2xl">
                        <button
                          onClick={() => handleRoleSwitch('student')}
                          className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
                            userRole === 'student' 
                              ? 'bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white shadow-sm' 
                              : 'text-[#6B6170] hover:text-[#24152F]'
                          }`}
                        >
                          Student
                        </button>
                        <button
                          onClick={() => handleRoleSwitch('faculty')}
                          className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
                            userRole === 'faculty' 
                              ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFD84D] text-[#24152F] shadow-sm' 
                              : 'text-[#6B6170] hover:text-[#24152F]'
                          }`}
                        >
                          Faculty
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={logout}
                      className="w-full mt-2 py-2 px-3 rounded-2xl text-xs font-bold text-[#E83B5C] hover:bg-[#E83B5C]/10 transition-colors flex items-center gap-2 justify-center"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile / Tablet Menu Button (shown below xl) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-[44px] h-[44px] rounded-full glass-pill flex items-center justify-center text-[#24152F] flex-shrink-0"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile / Tablet Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              className="xl:hidden mt-2 glass-card rounded-3xl p-4 shadow-xl border border-white overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigateTo(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#FF1681] to-[#FF7A00] text-white shadow-glow-orange' 
                          : 'bg-white/70 text-[#24152F] hover:bg-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
