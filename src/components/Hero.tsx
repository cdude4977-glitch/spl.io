import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { TabType } from '../App';

export default function Hero({ onNavigate }: { onNavigate: (tab: TabType) => void }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-05-20T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        mins: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        secs: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000))
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with Stadium Vibe */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/60 to-brand-dark z-10" />
        <img 
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop" 
          alt="Stadium" 
          className="w-full h-full object-cover transform scale-110"
        />
        {/* Floating Particles/Lights */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
           {[...Array(20)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1 h-1 bg-brand-neon rounded-full"
               initial={{ 
                 x: Math.random() * 2000 - 1000, 
                 y: Math.random() * 2000 - 1000,
                 opacity: Math.random()
               }}
               animate={{ 
                 y: [null, Math.random() * -500],
                 opacity: [0, 1, 0]
               }}
               transition={{ 
                 duration: Math.random() * 5 + 5, 
                 repeat: Infinity,
                 ease: "linear"
               }}
             />
           ))}
        </div>
      </div>

      <div className="relative z-20 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Subtitle */}
          <div className="flex items-center justify-center gap-3">
             <div className="h-[1px] w-8 bg-brand-neon/50" />
             <span className="text-brand-neon font-mono text-sm tracking-[0.4em] uppercase">
               Summer Edition 2026
             </span>
             <div className="h-[1px] w-8 bg-brand-neon/50" />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter uppercase italic">
            SHALOM PREMIER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 block">
              LEAGUE
            </span>
          </h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-lg md:text-xl font-light italic max-w-2xl mx-auto"
          >
            "Push Your Limits. Bring Out The Best In You."
          </motion.p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <button 
              onClick={() => onNavigate('Registration')}
              className="btn-primary flex items-center gap-2 group"
            >
              REGISTER NOW
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity }}>
                →
              </motion.span>
            </button>
            <button 
              onClick={() => onNavigate('Timeline')}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold py-3 px-8 rounded-full transition-all group"
            >
              VIEW TIMELINE
            </button>
          </div>

          {/* Countdown Footer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.mins },
              { label: 'Secs', value: timeLeft.secs }
            ].map((item) => (
              <div key={item.label} className="glass-card p-4 flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-display font-bold text-brand-neon">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Info Pills */}
          <div className="flex flex-wrap justify-center gap-6 pt-12 text-white/50 text-xs md:text-sm font-mono">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-neon" />
              Starts: 20 May 2026 (Grades V-XII)
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-neon" />
              Shalom Hills International School
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[8px] uppercase tracking-widest">Scroll Down</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
