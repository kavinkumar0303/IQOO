import React, { createContext, useContext, useState, useEffect } from 'react';
import { studentProfile, facultyProfile, learningHistoryList } from '../data/mockData';
import { playSound, toggleSound as toggleAudioSys, isSoundEnabled } from '../utils/soundEffects';
import { apiClient, db, authService } from '../api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('student'); // 'student' | 'faculty'
  const [currentUser, setCurrentUser] = useState(studentProfile);
  const [activePage, setActivePage] = useState('login'); // 'login' | 'dashboard' | 'journey' | 'subjects' | 'practice' | 'analysis' | 'database' | 'history' | 'map' | 'retention' | 'understanding'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [soundOn, setSoundOn] = useState(true);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // For subject/practice tabs
  
  // Dynamic Greeting based on real time
  const [greeting, setGreeting] = useState('Good Morning');
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  // Learning logs state backed by database
  const [learningLogs, setLearningLogs] = useState(() => db.getCollection('learning_logs') || learningHistoryList);
  
  // Spaced retention score
  const [retentionScore, setRetentionScore] = useState(65);
  const [understandingScore, setUnderstandingScore] = useState(78);
  const [streakCount, setStreakCount] = useState(5);

  // Notification center backed by database
  const [notifications, setNotifications] = useState(() => db.getCollection('notifications') || [
    { id: "notif-001", text: "DSA Live class with Mr. Aravind is starting now in Lab 3!", time: "Just now", unread: true },
    { id: "notif-002", text: "AI Analysis: Your array traversal mastery increased to 94%", time: "15m ago", unread: true },
    { id: "notif-003", text: "Retention recall ready: Singly Linked Lists review", time: "1h ago", unread: false },
  ]);

  // AI Mentor Chat State
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Kavin! I'm LearnIQ AI, your personal college learning companion. How can I assist you with your DSA, Math, or Java topics today?",
      time: "10:30 AM",
      suggestions: ["Explain Array Insertion complexity", "Review Math Integration formula", "What class is next?"]
    }
  ]);

  // Clock synchronizer
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      if (hours < 12) {
        setGreeting('Good Morning');
      } else if (hours < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
      setCurrentTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Restore authenticated session if tokens exist
  useEffect(() => {
    const checkExistingAuth = async () => {
      if (authService.isAuthenticated()) {
        const storedUser = authService.getCurrentUser();
        if (storedUser && storedUser.profile) {
          setUserRole(storedUser.role);
          setCurrentUser(storedUser.profile);
          setIsLoggedIn(true);
        }
      }
    };
    checkExistingAuth();
  }, []);

  const handleRoleSwitch = async (role) => {
    setUserRole(role);
    if (role === 'faculty') {
      const fac = db.findOne('faculty_profiles', () => true) || facultyProfile;
      setCurrentUser(fac);
    } else {
      const std = db.findOne('student_profiles', () => true) || studentProfile;
      setCurrentUser(std);
    }
    playSound('action');
  };

  const login = async (role = 'student') => {
    setUserRole(role);
    
    // Authenticate via token API
    try {
      const response = await apiClient.login(role);
      if (response.success && response.data.profile) {
        setCurrentUser(response.data.profile);
      } else {
        if (role === 'faculty') {
          setCurrentUser(facultyProfile);
        } else {
          setCurrentUser(studentProfile);
        }
      }
    } catch (e) {
      console.warn('[LearnIQ Auth] Falling back to default profile:', e);
      if (role === 'faculty') {
        setCurrentUser(facultyProfile);
      } else {
        setCurrentUser(studentProfile);
      }
    }

    setIsLoggedIn(true);
    setActivePage('dashboard');
    playSound('success');
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (e) {
      console.warn('[LearnIQ Auth] Logout error:', e);
    }
    setIsLoggedIn(false);
    setActivePage('login');
    playSound('click');
  };

  const navigateTo = (page, tab = null) => {
    setActivePage(page);
    if (tab) setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('hover');
  };

  const toggleSoundSetting = () => {
    const res = toggleAudioSys();
    setSoundOn(res);
  };

  const addLearningLog = async (newLog) => {
    const logPayload = {
      subject: newLog.subject || "DSA",
      topic: newLog.topic || "Arrays & Voice Reflection",
      reflection: newLog.reflection || "Great reflection captured! Key concepts properly categorized into persistent memory."
    };

    // Optimistic state update
    const optimisticLog = {
      id: `hist-${Date.now()}`,
      date: "Today, Just now",
      time: currentTimeStr || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...logPayload,
      category: "Learning Log",
      score: "88%",
      status: "Good",
      badgeColor: "bg-[#20B86B]/15 text-[#20B86B] border-[#20B86B]/30",
      aiFeedback: logPayload.reflection,
    };

    setLearningLogs(prev => [optimisticLog, ...prev]);
    setUnderstandingScore(prev => Math.min(100, prev + 4));
    playSound('success');

    // Async DB/API sync
    try {
      await apiClient.createLearningLog(logPayload);
    } catch (e) {
      console.warn('[LearnIQ API] Error syncing learning log:', e);
    }
  };

  const sendAIMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: currentTimeStr || "Now"
    };

    setAiChatMessages(prev => [...prev, userMsg]);
    playSound('click');

    // Query AI backend endpoint
    try {
      const response = await apiClient.sendAIMessage(text);
      if (response.success && response.data) {
        setAiChatMessages(prev => [...prev, {
          id: response.data.id || Date.now() + 1,
          sender: 'ai',
          text: response.data.text,
          time: "Just now",
          suggestions: response.data.suggestions || ["Give me a practice question", "Show my weak areas", "Save this note"]
        }]);
        playSound('action');
        return;
      }
    } catch (e) {
      console.warn('[LearnIQ AI API] Fallback AI reply:', e);
    }

    // Fallback response simulation
    setTimeout(() => {
      let replyText = "I analyzed your question regarding this concept. In your curriculum, this links directly to your DSA module. Keep focusing on edge cases!";
      if (text.toLowerCase().includes('array') || text.toLowerCase().includes('insertion')) {
        replyText = "Array insertion at index `i` requires shifting elements rightward, yielding O(n) worst-case time complexity. For O(1) amortized insertions, dynamic arrays double their capacity when full.";
      } else if (text.toLowerCase().includes('math') || text.toLowerCase().includes('integral')) {
        replyText = "For integration, recall the fundamental rule: ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C. For trigonometric forms like ∫ sin(x) dx = -cos(x) + C.";
      } else if (text.toLowerCase().includes('class') || text.toLowerCase().includes('next')) {
        replyText = "Your next class is Data Structures (DSA301) with Mr. Aravind in AI Lab 3 (LIVE NOW)!";
      }

      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        time: "Just now",
        suggestions: ["Give me a practice question", "Show my weak areas", "Save this note"]
      };
      setAiChatMessages(prev => [...prev, aiReply]);
      playSound('action');
    }, 600);
  };

  const markNotificationAsRead = async (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    try {
      await apiClient.markNotificationRead(id);
    } catch (e) {
      console.warn('[LearnIQ API] Error updating notification:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        currentUser,
        activePage,
        isLoggedIn,
        soundOn,
        isAIMentorOpen,
        activeTab,
        greeting,
        currentTimeStr,
        learningLogs,
        retentionScore,
        understandingScore,
        streakCount,
        notifications,
        aiChatMessages,
        handleRoleSwitch,
        login,
        logout,
        navigateTo,
        setActiveTab,
        toggleSoundSetting,
        setIsAIMentorOpen,
        addLearningLog,
        sendAIMessage,
        markNotificationAsRead,
        setRetentionScore,
        setUnderstandingScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
