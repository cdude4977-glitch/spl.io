import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import SportsGrid from './components/SportsGrid';
import AuctionSection from './components/AuctionSection';
import FixturesSection from './components/FixturesSection';
import LeaderboardSection from './components/LeaderboardSection';
import RulesSection from './components/RulesSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import NoticeBanner from './components/NoticeBanner';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { dataService } from './services/dataService';

export type TabType = 'Home' | 'Timeline' | 'Fixtures' | 'Standings' | 'Leaderboard' | 'Rules' | 'Gallery' | 'Contact' | 'Admin';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
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
    switch (activeTab) {
      case 'Home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onNavigate={setActiveTab} />
            <StatsSection />
            <SportsGrid />
          </motion.div>
        );
      case 'Timeline':
        return <motion.div key="timeline_page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><TimelineSection /></motion.div>;
      case 'Fixtures':
        return <motion.div key="fixtures" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><FixturesSection /></motion.div>;
      case 'Standings':
      case 'Leaderboard':
        return <motion.div key="standings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><LeaderboardSection /></motion.div>;
      case 'Rules':
        return <motion.div key="rules" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><RulesSection /></motion.div>;
      case 'Gallery':
        return <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><GallerySection /></motion.div>;
      case 'Contact':
        return <motion.div key="contact_page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Footer onNavigate={setActiveTab} /></motion.div>;
      case 'Admin':
        return <motion.div key="admin_page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><AdminPage /></motion.div>;
      default:
        return <Hero onNavigate={setActiveTab} />;
    }
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
                

        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {/* Footer always visible at bottom of page content */}
      {activeTab !== 'Contact' && activeTab !== 'Admin' && <Footer onNavigate={setActiveTab} />}

      {/* Global Cursor Glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30 overflow-hidden">
         <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-blue/10 blur-[150px] rounded-full" />
         <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-neon/10 blur-[150px] rounded-full" />
      </div>
    </div>
  );
}
