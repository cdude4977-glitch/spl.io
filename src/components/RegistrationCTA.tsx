import { motion } from 'motion/react';
import { CreditCard, Rocket, ExternalLink, Calendar } from 'lucide-react';
import { TabType } from '../App';

interface RegistrationCTAProps {
  onNavigate: (tab: TabType) => void;
}

export default function RegistrationCTA({ onNavigate }: RegistrationCTAProps) {
  return (
    <section className="py-24 bg-brand-dark overflow-hidden">
      <div className="section-container">
        <div className="glass-card bg-gradient-to-br from-brand-blue/20 via-brand-charcoal to-brand-neon/10 border-brand-neon/20 p-8 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
            {/* Animated BG elements */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-brand-neon/5 blur-[100px]" 
            />
            
            <div className="relative z-10 space-y-8 max-w-3xl">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-brand-neon/10 border border-brand-neon/20 px-4 py-2 rounded-full mb-4">
                     <Rocket className="w-4 h-4 text-brand-neon" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-brand-neon">Slots are filling fast!</span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-extrabold uppercase italic tracking-tighter leading-none">
                    Join The <span className="text-brand-neon">Elite.</span> <br />
                    Rise As A <span className="text-brand-blue underline decoration-white/20 underline-offset-8">Legend.</span>
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                  <div className="flex items-center gap-6 text-left p-6 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all">
                     <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <CreditCard className="w-8 h-8" />
                     </div>
                     <div>
                        <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Registration Fee</p>
                        <h4 className="text-2xl font-display font-black tracking-tight">INR 1,000</h4>
                        <p className="text-xs text-white/40 italic">Per Student / Sport</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6 text-left p-6 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all">
                     <div className="w-14 h-14 bg-brand-neon rounded-2xl flex items-center justify-center text-brand-dark shadow-lg group-hover:scale-110 transition-transform">
                        <Calendar className="w-8 h-8" />
                     </div>
                     <div>
                        <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Hard Deadline</p>
                        <h4 className="text-2xl font-display font-black tracking-tight">17 MAY 2026</h4>
                        <p className="text-xs text-white/40 italic">Final Entries Only</p>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8">
                  <a 
                    href="https://forms.gle/TCQoBhxq1djtYgQU8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 px-8 py-5 bg-emerald-500 text-white font-black rounded-2xl shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                  >
                     REGISTER FOOTBALL <ExternalLink className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://forms.gle/J8MvqkFThqjaeqd2A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 px-8 py-5 bg-blue-500 text-white font-black rounded-2xl shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                  >
                     REGISTER CRICKET <ExternalLink className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://forms.gle/arFXBddqbqfCnrkLA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 px-8 py-5 bg-orange-500 text-white font-black rounded-2xl shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                  >
                     REGISTER BASKETBALL <ExternalLink className="w-4 h-4" />
                  </a>
               </div>
            </div>
        </div>
      </div>
    </section>
  );
}
