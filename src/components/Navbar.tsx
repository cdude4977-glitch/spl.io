import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { TabType } from '../App';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab('Home')}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
              <img src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-contain" alt="Shalom School Logo" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-extrabold text-lg tracking-tighter uppercase">
                SHALOM <span className="text-white/60">PREMIER</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-neon">
                Summer Edition 2026
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, idx) => (
              <motion.button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`text-sm font-medium transition-colors ${
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
              className={`bg-brand-neon text-brand-dark font-bold px-6 py-2.5 rounded-full text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all ${
                activeTab === 'Registration' ? 'ring-2 ring-white ring-offset-2 ring-offset-brand-dark' : ''
              }`}
            >
              REGISTER NOW
            </motion.button>

            {/* Authentic Shalom Hills Logo - Top Right */}
            <div className="h-10 w-px bg-white/10 mx-2" />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <img 
                src="https://shalomhills.com/wp-content/themes/shalomhills/images/logo.png" 
                alt="Shalom Hills International School" 
                className="h-12 w-auto brightness-125 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                onError={(e) => {
                  // Fallback if the logo URL fails
                  e.currentTarget.src = "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200&auto=format&fit=crop";
                }}
              />
            </motion.div>
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
