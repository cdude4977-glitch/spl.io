import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { TabType } from '../App';
import { dataService } from '../services/dataService';

const NAV_LINKS: { name: TabType; displayName: string }[] = [
  { name: 'Home', displayName: 'Home' },
  { name: 'Timeline', displayName: 'Timeline' },
  { name: 'Brochure', displayName: 'Brochure' },
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
      setIsScrolled(window.scrollY > 20);
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
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
            onClick={() => setActiveTab('Home')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
              <img src={dataService.getPublicLogoUrl(branding.schoolLogo)} className="w-full h-full object-contain" alt="Logo" />
            </div>
            <div className="flex flex-col leading-tight max-w-[150px] sm:max-w-none">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tighter uppercase line-clamp-1 sm:line-clamp-none">
                {branding.eventName.split(' ')[0]} <span className="text-white/60">{branding.eventName.split(' ').slice(1).join(' ')}</span>
              </span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold text-brand-neon">
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
            <motion.button
              onClick={() => setActiveTab('Registration')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-brand-neon text-brand-dark font-bold px-4 xl:px-6 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all whitespace-nowrap ${
                activeTab === 'Registration' ? 'ring-2 ring-white ring-offset-2 ring-offset-brand-dark' : ''
              }`}
            >
              REGISTER NOW
            </motion.button>
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
              <div className="pt-4">
                <button 
                  onClick={() => {
                    setActiveTab('Registration');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-brand-neon text-brand-dark font-bold py-4 rounded-xl shadow-lg"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
