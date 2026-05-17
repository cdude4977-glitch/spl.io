import React, { useState, useEffect } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { dataService } from '../services/dataService';
import { Notice } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function NoticeBanner() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      const data = await dataService.getNotices();
      setNotices(data);
    };
    loadNotices();
  }, []);

  useEffect(() => {
    if (notices.length > 1 && isVisible) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % notices.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [notices, isVisible]);

  if (!isVisible || notices.length === 0) return null;

  const currentNotice = notices[currentIndex];

  const getIcon = (type: string) => {
    switch (type) {
      case 'Alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'Success': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default: return <Info className="w-4 h-4 text-brand-blue" />;
    }
  };

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="bg-brand-charcoal/50 backdrop-blur-md border-b border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-between py-3 gap-4">
        <div className="flex items-center gap-4 flex-1 overflow-hidden">
          <div className="flex-shrink-0 animate-pulse">
            <Bell className="w-4 h-4 text-brand-neon" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNotice.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 overflow-hidden"
            >
               <div className="flex items-center gap-2 flex-shrink-0">
                  {getIcon(currentNotice.type)}
                  <span className="text-[10px] font-mono font-black uppercase tracking-tighter sm:tracking-widest text-white/40">{currentNotice.type}</span>
               </div>
               <p className="text-[11px] font-bold uppercase tracking-tight sm:tracking-normal text-white truncate">
                  <span className="text-brand-neon mr-2">[{currentNotice.title}]</span>
                  {currentNotice.content}
               </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={() => setIsVisible(false)} className="p-1 hover:bg-white/5 rounded-lg transition-all">
          <X className="w-4 h-4 text-white/20" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-brand-neon/20 w-full overflow-hidden">
         <motion.div 
           key={currentIndex}
           initial={{ x: '-100%' }}
           animate={{ x: '0%' }}
           transition={{ duration: 5, ease: 'linear' }}
           className="h-full bg-brand-neon"
         />
      </div>
    </motion.div>
  );
}
