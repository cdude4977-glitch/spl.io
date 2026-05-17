import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShieldAlert, Clock, ScrollText } from 'lucide-react';
import { SportType } from '../types';

const RULES_DATA: Record<SportType, { title: string, content: string[] }> = {
  Football: {
    title: 'Football Summer League Rules',
    content: [
      'Age Category: Under 11, 13, 15, 19 Boys & Girls (Born on or after specified dates).',
      'Team size: 5+1 Players (5 Players + 1 Rolling Substitution).',
      'Matches will be played on League Cum Knock-out basis.',
      'Total duration will be 25 minutes (12+1+12).',
      'Proper football attire with shin guards and stockings is compulsory.',
      'No team to play with fewer than 5 players (including goalkeeper).',
      'In absence of clarification, FIFA rules apply.'
    ]
  },
  Cricket: {
    title: 'Cricket Summer League Rules',
    content: [
      'Age Category: Under 11, 13, 15, 19 Boys & Girls.',
      'Team members should be in proper white Cricket dress.',
      'Matches consist of 6 overs per innings, with 5 bowlers used per innings.',
      'Teams should have a maximum of 8 players (7 playing + 1 Impact Player).',
      'No LBW (Leg Before Wicket) will be allowed.',
      'In case of a tie, there will be a Super Over.',
      'In absence of clarification, ICC rules apply.',
      'U-11/U-13 matches in morning (6:00 - 10:00 AM), U-15/U-19 in evening (4:00 - 7:00 PM).'
    ]
  },
  Basketball: {
    title: 'Basketball Summer League Rules',
    content: [
      'Age Category: Under 11, 13, 15, 19 Boys & Girls.',
      'Team size: 4 Players (3 Players + 1 Rolling Substitute).',
      'Playing format: 3x3 Half Court.',
      'Duration: 10-2-10 minutes.',
      'Tied score will lead to 2 minutes overtime.',
      'FIBA 3x3 rules will be applied in all matches.',
      'League cum Knockout format.',
      'Proper basketball jerseys and non-marking shoes compulsory.'
    ]
  }
};

export default function RulesSection() {
  const [openSport, setOpenSport] = useState<SportType | null>('Football');

  return (
    <section id="rules" className="py-24 bg-brand-dark">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-brand-neon font-mono text-sm tracking-widest uppercase">The Playbook</span>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Official <span className="text-brand-blue">Regulations</span></h2>
          </div>
          <ScrollText className="w-16 h-16 text-white/5 hidden md:block" />
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {(Object.keys(RULES_DATA) as SportType[]).map((sport) => (
            <div key={sport} className="glass-card overflow-hidden">
               <button
                 onClick={() => setOpenSport(openSport === sport ? null : sport)}
                 className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
               >
                 <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded-xl bg-brand-neon/10 flex items-center justify-center text-brand-neon">
                     <ShieldAlert className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-display font-bold uppercase">{RULES_DATA[sport].title}</h3>
                     <p className="text-[10px] text-white/40 uppercase tracking-widest">Tap to view full details</p>
                   </div>
                 </div>
                 <motion.div
                   animate={{ rotate: openSport === sport ? 180 : 0 }}
                   className="text-white/20"
                 >
                   <ChevronDown />
                 </motion.div>
               </button>

               <AnimatePresence>
                 {openSport === sport && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                   >
                     <div className="p-8 pt-0 border-t border-white/5 bg-white/5">
                        <ul className="space-y-4">
                           {RULES_DATA[sport].content.map((rule, i) => (
                             <motion.li 
                               key={i}
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: i * 0.1 }}
                               className="flex items-start gap-4 text-white/70"
                             >
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-neon shadow-[0_0_8px_#00F0FF] flex-shrink-0" />
                                <span>{rule}</span>
                             </motion.li>
                           ))}
                        </ul>
                        <div className="mt-8 p-4 bg-brand-dark/50 rounded-2xl border border-white/5 flex items-center gap-4">
                           <Clock className="w-5 h-5 text-brand-blue" />
                           <p className="text-xs text-white/40 italic">
                             Teams must report to the venue at least 30 minutes before their scheduled match time. Late arrival may lead to walk-overs.
                           </p>
                        </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
