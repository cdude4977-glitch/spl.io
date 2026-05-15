import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Trophy } from 'lucide-react';
import { MATCHES, TEAMS } from '../constants';
import { Match, SportType } from '../types';

export default function FixturesSection() {
  const [activeSport, setActiveSport] = useState<SportType>('Football');

  const filteredMatches = MATCHES.filter(m => m.sport === activeSport);

  return (
    <section id="fixtures" className="py-24 bg-brand-dark">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-brand-neon font-mono text-sm tracking-widest uppercase">Match Center</span>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Fixtures & <span className="text-brand-blue">Results</span></h2>
          </div>
          
          <div className="flex bg-brand-charcoal rounded-full p-1 border border-white/10">
            {(['Football', 'Cricket', 'Basketball'] as SportType[]).map((sport) => (
              <button
                key={sport}
                onClick={() => setActiveSport(sport)}
                className={`px-8 py-3 rounded-full text-xs font-bold transition-all ${
                  activeSport === sport ? 'bg-brand-neon text-brand-dark' : 'text-white/40 hover:text-white'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSport}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="glass-card py-20 text-center space-y-4">
                   <Calendar className="w-12 h-12 text-white/10 mx-auto" />
                   <p className="text-white/40 italic">No matches scheduled for {activeSport} yet. Stay tuned!</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
  const teamA = TEAMS.find(t => t.id === match.teamAId);
  const teamB = TEAMS.find(t => t.id === match.teamBId);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass-card overflow-hidden group"
    >
      <div className="flex flex-col lg:flex-row items-center p-6 lg:p-10 gap-8">
        {/* Match Status Badge */}
        <div className="flex flex-col items-center gap-2">
          {match.status === 'Live' ? (
            <div className="flex flex-col items-center">
              <span className="flex h-3 w-3 bg-red-500 rounded-full animate-ping mb-2" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-red-500">Live</span>
            </div>
          ) : match.status === 'Completed' ? (
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Final</span>
          ) : (
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-neon">Upcoming</span>
          )}
          <span className="text-xs font-mono text-white/20 mt-1">ID: {match.id}</span>
        </div>

        {/* Teams and Score */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-around gap-8 md:gap-16">
          {/* Team A */}
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-brand-neon transition-colors overflow-hidden">
              {teamA?.logo.startsWith('/') || teamA?.logo.startsWith('http') ? (
                <img src={teamA.logo} alt={teamA.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">{teamA?.logo}</span>
              )}
            </div>
            <h4 className="font-display font-extrabold text-xl uppercase tracking-tighter text-center">{teamA?.name}</h4>
          </div>

          {/* Score/VS */}
          <div className="flex flex-col items-center gap-2">
             {match.status === 'Upcoming' ? (
                <div className="text-4xl font-display font-black text-white/10 italic select-none">VS</div>
             ) : (
                <div className="flex items-center gap-6">
                  <span className="text-5xl md:text-6xl font-display font-black text-brand-neon">{match.scoreA || '0'}</span>
                  <span className="text-2xl font-display font-black text-white/20">/</span>
                  <span className="text-5xl md:text-6xl font-display font-black text-brand-neon">{match.scoreB || '0'}</span>
                </div>
             )}
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-brand-neon transition-colors overflow-hidden">
              {teamB?.logo.startsWith('/') || teamB?.logo.startsWith('http') ? (
                <img src={teamB.logo} alt={teamB.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">{teamB?.logo}</span>
              )}
            </div>
            <h4 className="font-display font-extrabold text-xl uppercase tracking-tighter text-center">{teamB?.name}</h4>
          </div>
        </div>

        {/* Match Info */}
        <div className="lg:border-l border-white/10 lg:pl-10 space-y-4 text-sm text-white/60">
           <div className="flex items-center gap-3">
             <Calendar className="w-4 h-4 text-brand-neon" />
             {match.date}
           </div>
           <div className="flex items-center gap-3">
             <Clock className="w-4 h-4 text-brand-neon" />
             {match.time}
           </div>
           <div className="flex items-center gap-3">
             <MapPin className="w-4 h-4 text-brand-neon" />
             {match.venue}
           </div>
           {match.result && (
             <div className="pt-2 flex items-center gap-2 text-green-400 font-bold">
               <Trophy className="w-4 h-4" />
               {match.result}
             </div>
           )}
        </div>
      </div>
      
      {/* Bottom Progress Bar for Live Matches */}
      {match.status === 'Live' && (
        <div className="h-1 bg-white/5 w-full">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: '65%' }}
             transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
             className="h-full bg-brand-neon shadow-[0_0_10px_#00F0FF]"
           />
        </div>
      )}
    </motion.div>
  );
}
