import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { TabType } from '../App';
import { dataService } from '../services/dataService';

const NAV_LINKS: { name: TabType; displayName: string }[] = [
  { name: 'Home', displayName: 'Home' },
  { name: 'Timeline', displayName: 'Timeline' },
  { name: 'Fixtures', displayName: 'Fixtures' },
  { name: 'Leaderboard', displayName: 'Leaderboard' },
  { name: 'Rules', displayName: 'Rules' },
  { name: 'Gallery', displayName: 'Gallery' },
  { name: 'Contact', displayName: 'Contact' },
];

export default function Navbar({ activeTab, setActiveTab }: { activeTab: TabType; setActiveTab: (tab: TabType) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [branding, setBranding] = useState({
    schoolLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBh0o1D522SioDfbVK_ik-uIHIkRLz50oOQ&s',
    eventName: 'Shalom Hills International School'
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load branding from Supabase
    dataService.getSiteConfig('branding').then(data => {
      if (data) setBranding(data);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/10 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center gap-8">
          {/* Logo Group */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer shrink-0"
            onClick={() => setActiveTab('Home')}
          >
            <div className={`transition-all duration-500 flex items-center justify-center hover:scale-110 ${
              isScrolled 
                ? 'w-10 h-10 sm:w-12 sm:h-12' 
                : 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16'
            }`}>
              <img 
                src={dataService.getPublicLogoUrl(branding.schoolLogo)} 
                className="w-full h-full object-contain" 
                alt="Logo" 
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-display font-black tracking-tighter uppercase whitespace-nowrap text-white transition-all duration-500 ${
                isScrolled 
                  ? 'text-sm sm:text-base' 
                  : 'text-base sm:text-xl lg:text-2xl'
              }`}>
                {branding.eventName}
              </span>
              <span className={`uppercase font-black text-brand-neon transition-all duration-500 ${
                isScrolled 
                  ? 'text-[7px] sm:text-[9px] tracking-[0.1em]' 
                  : 'text-[9px] sm:text-[11px] lg:text-xs tracking-[0.15em] sm:tracking-[0.2em]'
              }`}>
                Summer Edition 2026
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center lg:gap-5 xl:gap-8">
            {NAV_LINKS.map((link, idx) => (
              <motion.button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === link.name ? 'text-brand-neon' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.displayName}
              </motion.button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-charcoal overflow-hidden border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setActiveTab(link.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-4 text-base font-medium rounded-xl transition-all ${
                    activeTab === link.name ? 'text-brand-neon bg-white/5' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.displayName}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
