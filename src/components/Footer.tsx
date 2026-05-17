import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Trophy } from 'lucide-react';
import { TabType } from '../App';

export default function Footer({ onNavigate }: { onNavigate?: (tab: TabType) => void }) {
  const handleAdminSecret = (e: React.MouseEvent) => {
    if (e.detail === 3 && onNavigate) { // Triple click secret
       onNavigate('Admin');
    }
  };

  return (
    <footer id="contact" className="bg-brand-dark border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
               <h2 
                 onClick={handleAdminSecret}
                 className="text-4xl md:text-6xl font-extrabold uppercase cursor-default select-none"
               >
                 Shalom <span className="text-brand-blue underline decoration-brand-neon underline-offset-8">Premier</span> League
               </h2>
               <p className="text-white/40 max-w-lg">
                 Shalom Hills International School proudly hosts the premier inter-school sports tournament. Experience a platform where talent meets opportunity and excellence reaches new heights.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass-card p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-neon/10 flex items-center justify-center text-brand-neon">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold uppercase text-sm font-display tracking-widest">The Venue</h4>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Shalom Hills International School,<br />
                    Block C, Sushant Lok Phase I,<br />
                    Gurugram, Haryana - 122001
                  </p>
               </div>

               <div className="glass-card p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold uppercase text-sm font-display tracking-widest">Connect</h4>
                  </div>
                  <div className="space-y-2">
                    <a href="tel:+918319807831" className="block text-sm text-white/50 hover:text-brand-neon transition-colors">Basketball: Mr. Tenzin (+91 8319807831)</a>
                    <a href="tel:+919717106405" className="block text-sm text-white/50 hover:text-brand-neon transition-colors">Football: Mr. Vishwas (+91 9717106405)</a>
                    <a href="tel:+917987715686" className="block text-sm text-white/50 hover:text-brand-neon transition-colors">Cricket: Mr. Ankit Yadav (+91 7987715686)</a>
                  </div>
               </div>
            </div>

            <div className="flex gap-4">
               {[Instagram, Twitter].map((Icon, i) => (
                 <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all duration-300">
                    <Icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </div>

          {/* Social and Credits Section */}
          <div className="space-y-8 flex flex-col justify-end">
            <div className="glass-card p-10 bg-gradient-to-br from-white/5 to-transparent border-white/10 flex flex-col items-center justify-center text-center space-y-6">
                <Trophy className="w-16 h-16 text-brand-neon animate-bounce" />
                <h3 className="text-3xl font-display font-black tracking-tighter uppercase italic">Stay Competitive</h3>
                <p className="text-white/40 text-sm max-w-xs">
                  Follow us for real-time match alerts, auction highlights, and exclusive tournament content.
                </p>
                <div className="flex gap-4">
                  {[Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-mono text-white/20">
           <div className="flex flex-col gap-2">
             <span>© 2026 Shalom Hills International School. All rights reserved.</span>
             <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg inline-block w-fit">
               <span className="text-brand-neon font-bold">Made by:</span> tanush kansal and ean kotadia
             </div>
           </div>
           <div className="flex gap-8">
              <a href="#" className="hover:text-brand-neon transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-neon transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-neon transition-colors">Official Website</a>
           </div>
        </div>
      </div>

      {/* Decorative Light Leak */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-neon/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
    </footer>
  );
}
