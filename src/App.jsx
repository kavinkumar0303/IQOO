import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CustomCursor } from './components/common/CustomCursor';
import { BackgroundDecorations } from './components/common/BackgroundDecorations';
import { Navbar } from './components/common/Navbar';
import { AIMentorDrawer } from './components/common/AIMentorDrawer';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { LearningJourneyPage } from './pages/LearningJourneyPage';
import { TimetablePage } from './pages/TimetablePage';
import { SubjectPracticePage } from './pages/SubjectPracticePage';
import { AIAnalysisPage } from './pages/AIAnalysisPage';
import { DatabasePage } from './pages/DatabasePage';
import { HistoryPage } from './pages/HistoryPage';
import { LearningMapPage } from './pages/LearningMapPage';
import { RetentionPage } from './pages/RetentionPage';
import { UnderstandingPage } from './pages/UnderstandingPage';

const MainLayout = () => {
  const { activePage, isLoggedIn } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'journey':
        return <LearningJourneyPage />;
      case 'timetable':
        return <TimetablePage />;
      case 'subjects':
        return <SubjectPracticePage defaultTab="overview" />;
      case 'practice':
        return <SubjectPracticePage defaultTab="code" />;
      case 'analysis':
        return <AIAnalysisPage />;
      case 'database':
        return <DatabasePage />;
      case 'history':
        return <HistoryPage />;
      case 'map':
        return <LearningMapPage />;
      case 'retention':
        return <RetentionPage />;
      case 'understanding':
        return <UnderstandingPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDF8] text-[#24152F] overflow-x-hidden selection:bg-[#FF7A00] selection:text-white">
      {/* 1. Custom Interactive Cursor */}
      <CustomCursor />

      {/* 2. Dynamic Colorful Signature Background */}
      <BackgroundDecorations />

      {/* 3. Floating Navbar (shown on authenticated pages or top switcher) */}
      {activePage !== 'login' && <Navbar />}

      {/* 4. Active Page Content */}
      <main className="relative z-10 w-full transition-all">
        {renderPage()}
      </main>

      {/* 5. AI Mentor Slide-Out Drawer */}
      <AIMentorDrawer />

      {/* 6. Subtle Global Footer */}
      {activePage !== 'login' && (
        <footer className="relative z-10 py-6 px-4 text-center border-t border-[#24152F]/5 mt-12 bg-white/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B6170] font-medium">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#24152F]">
                Learn<span className="text-gradient-sunburst">IQ</span>
              </span>
              <span>•</span>
              <span>Smart Education • Smarter Learning</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Next-Gen College AI</span>
              <span>•</span>
              <span className="text-[#FF7A00] font-bold">2026 Academic Edition</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
