import { motion } from 'motion/react';
import { Target, Trophy, Users, Star } from 'lucide-react';

const SPORTS = [
  {
    id: 'football',
    name: 'Football',
    emoji: '⚽️🏆',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    color: 'from-[#00ff88]/80 to-[#004d2c]/95',
    categories: ['U-11', 'U-13', 'U-15', 'U-19'],
    rules: '5+1 Players, 25 min (12+1+12), FIFA rules apply.',
    highlights: ['League Cum Knockout', 'Rolling Substitutions', 'Match MVP']
  },
  {
    id: 'cricket',
    name: 'Cricket',
    emoji: '🏏🔥',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
    color: 'from-[#00d2ff]/80 to-[#003366]/95',
    categories: ['U-11', 'U-13', 'U-15', 'U-19'],
    rules: '6 Overs, 5 Bowlers, 8-player squad (7+1 impact).',
    highlights: ['League Cum Knockout', 'No LBW Allowed', 'Super Over for Tie']
  },
  {
    id: 'basketball',
    name: 'Basketball',
    emoji: '🏀⚡️',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    color: 'from-[#ff9900]/80 to-[#663300]/95',
    categories: ['U-11', 'U-13', 'U-15', 'U-19'],
    rules: '3x3 Half Court, 10-2-10 duration, FIBA 3x3 rules.',
    highlights: ['League Cum Knockout', '4 Players Squad', 'Standard FIBA 3x3']
  }
];

export default function SportsGrid() {
  return (
    <section id="sports" className="py-24 bg-brand-dark overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-brand-neon font-mono text-sm tracking-widest uppercase">The Arena</span>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Featured <span className="text-brand-blue">Disciplines</span></h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm italic">
            Elite competition across three major sports. Choose your battlefield and prepare for glory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPORTS.map((sport, idx) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Image & Gradient Overlay */}
              <img 
                src={sport.image} 
                alt={sport.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${sport.color} opacity-90 transition-opacity group-hover:opacity-100`} />
              
              {/* Decorative Neon Border */}
              <div className="absolute inset-4 border-2 border-white/20 rounded-2xl z-10 pointer-events-none group-hover:border-brand-neon transition-colors duration-500" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <span className="text-6xl mb-4 group-hover:animate-bounce">{sport.emoji}</span>
                <h3 className="text-4xl font-display font-extrabold text-white mb-4 uppercase tracking-tighter">
                  {sport.name}
                </h3>
                
                <div className="space-y-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="flex flex-wrap gap-2">
                     {sport.categories.map(cat => (
                       <span key={cat} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest">
                         {cat}
                       </span>
                     ))}
                   </div>
                   <p className="text-white/90 text-sm font-light leading-relaxed">
                     {sport.rules}
                   </p>
                   <div className="flex flex-col gap-1 border-t border-white/10 pt-3">
                     {sport.highlights.map(h => (
                       <div key={h} className="flex items-center gap-2 text-[10px] text-brand-neon font-bold uppercase tracking-wider">
                         <Star className="w-3 h-3" /> {h}
                       </div>
                     ))}
                   </div>
                   <button className="w-full bg-white text-brand-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-neon hover:text-brand-dark transition-all">
                     View Complete Rules <Trophy className="w-4 h-4" />
                   </button>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -inset-1 bg-brand-neon opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
