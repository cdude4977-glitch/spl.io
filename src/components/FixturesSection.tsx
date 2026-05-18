import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Trophy, User, Users } from 'lucide-react';
import { MATCHES, TEAMS } from '../constants';
import { Match, SportType, AgeCategory, Gender } from '../types';
import { dataService } from '../services/dataService';

const MatchCard = React.memo(({ match }: { match: Match }) => {
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
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-brand-neon transition-colors overflow-hidden p-2">
               <img src={dataService.getPublicLogoUrl(teamA?.logo || '')} alt={teamA?.name} loading="lazy" className="w-full h-full object-contain" />
            </div>
            <h4 className="font-display font-extrabold text-lg uppercase tracking-tighter text-center max-w-[120px]">{teamA?.name}</h4>
          </div>

          {/* Score/VS */}
          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-2">
               <span className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-white/40 uppercase tracking-widest">{match.gender}</span>
               <span className="px-2 py-0.5 rounded bg-brand-neon/10 text-[8px] font-bold text-brand-neon uppercase tracking-widest">{match.ageCategory}</span>
             </div>
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
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-brand-neon transition-colors overflow-hidden p-2">
               <img src={dataService.getPublicLogoUrl(teamB?.logo || '')} alt={teamB?.name} loading="lazy" className="w-full h-full object-contain" />
            </div>
            <h4 className="font-display font-extrabold text-lg uppercase tracking-tighter text-center max-w-[120px]">{teamB?.name}</h4>
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
});

export default function FixturesSection() {
  const [activeSport, setActiveSport] = useState<SportType>('Football');
  const [activeGender, setActiveGender] = useState<Gender>('Boys');
  const [activeAge, setActiveAge] = useState<AgeCategory>('U15');
  const [matches, setMatches] = useState<Match[]>(() => dataService.getCachedMatches() || []);
  const [loading, setLoading] = useState(() => !dataService.getCachedMatches());

  useEffect(() => {
     let isMounted = true;
     const loadData = async () => {
        const data = await dataService.getMatches();
        if (isMounted) {
          setMatches(data);
          setLoading(false);
        }
     };
     loadData();
     return () => { isMounted = false; };
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(m => 
      m.sport === activeSport && 
      m.gender === activeGender && 
      m.ageCategory === activeAge
    );
  }, [matches, activeSport, activeGender, activeAge]);

  const sports: SportType[] = ['Football', 'Cricket', 'Basketball'];
  const ageCategories: AgeCategory[] = ['U11', 'U13', 'U15', 'U19'];

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-neon border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section id="fixtures" className="py-24 bg-brand-dark">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-brand-neon font-mono text-sm tracking-widest uppercase">Match Center</span>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Fixtures & <span className="text-brand-blue">Results</span></h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Sport Selector */}
            <div className="flex bg-brand-charcoal overflow-x-auto no-scrollbar rounded-xl border border-white/10 p-1 shrink-0">
              {sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setActiveSport(sport)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all uppercase tracking-widest whitespace-nowrap ${
                    activeSport === sport ? 'bg-brand-neon text-brand-dark' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>

            {/* Gender Selector */}
            <div className="flex bg-brand-charcoal overflow-hidden rounded-xl border border-white/10 p-1 shrink-0">
              {(['Boys', 'Girls'] as Gender[]).map(gender => (
                <button
                  key={gender}
                  onClick={() => setActiveGender(gender)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all uppercase tracking-widest flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                    activeGender === gender ? 'bg-brand-blue text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <User className="w-3 h-3" />
                  {gender}
                </button>
              ))}
            </div>

            {/* Age Category Selector */}
            <div className="flex bg-brand-charcoal overflow-x-auto no-scrollbar rounded-xl border border-white/10 p-1 shrink-0">
              {ageCategories.map(age => (
                <button
                  key={age}
                  onClick={() => setActiveAge(age)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all uppercase tracking-widest whitespace-nowrap ${
                    activeAge === age ? 'bg-white text-brand-dark' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence initial={false}>
            <motion.div
              key={`${activeSport}-${activeGender}-${activeAge}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="glass-card py-24 text-center space-y-6 flex flex-col items-center justify-center">
                   <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white/10" />
                   </div>
                   <div className="space-y-2">
                     <p className="text-xl font-display font-bold uppercase italic text-white/60">Schedule Pending</p>
                     <p className="text-white/20 text-xs uppercase tracking-widest font-mono">No matches have been scheduled for {activeSport} {activeAge} {activeGender} yet.</p>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
