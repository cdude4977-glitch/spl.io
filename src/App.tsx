import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NoticeBanner from './components/NoticeBanner';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import SportsGrid from './components/SportsGrid';
import FixturesSection from './components/FixturesSection';
import LeaderboardSection from './components/LeaderboardSection';
import RulesSection from './components/RulesSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import TeamsSection from './components/TeamsSection';
import { motion, AnimatePresence } from 'motion/react';
import { dataService } from './services/dataService';

export type TabType = 'Home' | 'Timeline' | 'Fixtures' | 'Standings' | 'Leaderboard' | 'Teams' | 'Rules' | 'Gallery' | 'Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    // With static data, we can resolve loading almost instantly
    // but we keep a tiny delay for the brand intro to feel polished
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        {activeTab === 'Home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Hero onNavigate={setActiveTab} />
            <StatsSection />
            <SportsGrid />
          </motion.div>
        )}
        {activeTab === 'Timeline' && (
          <motion.div 
            key="timeline_page" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <TimelineSection />
          </motion.div>
        )}
        {activeTab === 'Fixtures' && (
          <motion.div 
            key="fixtures" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <FixturesSection />
          </motion.div>
        )}
        {(activeTab === 'Standings' || activeTab === 'Leaderboard') && (
          <motion.div 
            key="standings" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <LeaderboardSection />
          </motion.div>
        )}
        {activeTab === 'Teams' && (
          <motion.div 
            key="teams_page" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <TeamsSection />
          </motion.div>
        )}
        {activeTab === 'Rules' && (
          <motion.div 
            key="rules" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <RulesSection />
          </motion.div>
        )}
        {activeTab === 'Gallery' && (
          <motion.div 
            key="gallery" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <GallerySection />
          </motion.div>
        )}
        {activeTab === 'Contact' && (
          <motion.div 
            key="contact_page" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Footer onNavigate={setActiveTab} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-brand-dark flex flex-col items-center justify-center z-[100]">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
           transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
           className="w-32 h-32 flex items-center justify-center mb-8"
        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBh0o1D522SioDfbVK_ik-uIHIkRLz50oOQ&s" className="w-full h-full object-contain" alt="Loading Logo" />
        </motion.div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-display font-extrabold tracking-tighter uppercase mb-2">
            SHALOM <span className="text-brand-neon">PREMIER</span>
          </h2>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 2, ease: "easeInOut" }}
               className="h-full bg-brand-neon"
             />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-dark text-white selection:bg-brand-neon selection:text-brand-dark overflow-x-hidden">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-24 sm:pt-32 lg:pt-36">
        <NoticeBanner />
                
        {renderContent()}
      </main>

      {/* Footer always visible at bottom of page content */}
      {activeTab !== 'Contact' && <Footer onNavigate={setActiveTab} />}

      {/* Global Cursor Glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30 overflow-hidden">
         <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-blue/10 blur-[150px] rounded-full" />
         <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-neon/10 blur-[150px] rounded-full" />
      </div>
    </div>
  );
}
