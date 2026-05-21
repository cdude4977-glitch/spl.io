import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, TrendingUp, ChevronRight, User, Users } from 'lucide-react';
import { TEAMS } from '../constants';
import { Team, SportType, AgeCategory, Gender } from '../types';
import { dataService } from '../services/dataService';

// Memoized Team Row for performance
const TeamRow = React.memo(({ team, rank }: { team: Team, rank: number }) => (
  <div className="grid grid-cols-12 p-4 items-center hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0">
    <div className="col-span-1 flex items-center justify-center">
      <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs ${
        rank === 1 ? 'bg-yellow-500 text-brand-dark shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 
        rank === 2 ? 'bg-gray-300 text-brand-dark' :
        rank === 3 ? 'bg-orange-600 text-white' : 'bg-white/10 text-white/60'
      }`}>
        {rank}
      </span>
    </div>
    <div className="col-span-4 flex items-center gap-2 sm:gap-4 pl-2">
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded overflow-hidden border border-white/10 shrink-0">
        <img src={dataService.getPublicLogoUrl(team.logo)} alt={team.name} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <h4 className="font-display font-bold group-hover:text-brand-neon transition-colors uppercase italic tracking-tight text-[10px] sm:text-sm truncate">{team.name}</h4>
    </div>
    <div className="col-span-1 text-center font-mono text-[10px] text-white/60">{team.played}</div>
    <div className="col-span-1 text-center font-mono text-[10px] text-white/60">{team.wins}</div>
    <div className="col-span-1 text-center font-mono text-[10px] text-white/60 hidden sm:block">{team.draws}</div>
    <div className="col-span-1 text-center font-mono text-[10px] text-white/60">{team.losses}</div>
    <div className="col-span-1 text-center font-mono text-[10px] text-white/60 hidden md:block">{team.gf}</div>
    <div className="col-span-1 text-center font-mono text-[10px] text-white/60 hidden md:block">{team.ga}</div>
    <div className="col-span-1 text-center font-mono text-[10px] text-brand-blue font-bold">
      {team.gd > 0 ? `+${team.gd}` : team.gd}
    </div>
    <div className="col-span-1 text-right font-display font-black text-xs sm:text-lg text-brand-neon italic">
      {team.points}
    </div>
  </div>
));

export default function LeaderboardSection() {
  const [activeSport, setActiveSport] = useState<SportType>('Football');
  const [activeGender, setActiveGender] = useState<Gender>('Boys');
  const [activeAge, setActiveAge] = useState<AgeCategory>('U15');
  const [teams, setTeams] = useState<Team[]>(() => dataService.getCachedTeams() || []);
  const [loading, setLoading] = useState(() => !dataService.getCachedTeams());

  useEffect(() => {
     let isMounted = true;
     const loadData = async () => {
        const data = await dataService.getTeams();
        if (isMounted) {
          setTeams(data);
          setLoading(false);
        }
     };
     loadData();
     return () => { isMounted = false; };
  }, []);

  const sortedTeams = useMemo(() => {
    return [...teams]
      .filter(t => t.sport === activeSport && t.gender === activeGender && t.ageCategory === activeAge)
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gd !== a.gd) return b.gd - a.gd;
        return b.gf - a.gf;
      });
  }, [teams, activeSport, activeGender, activeAge]);

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
    <section id="leaderboard" className="py-24 bg-brand-charcoal/30">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-brand-neon font-mono text-sm tracking-widest uppercase">The Rankings</span>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Official <span className="text-brand-blue">Standings</span></h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Sport Selector */}
            <div className="flex bg-brand-dark overflow-x-auto no-scrollbar rounded-xl border border-white/5 p-1 shrink-0">
              {sports.map(sport => (
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
            <div className="flex bg-brand-dark overflow-hidden rounded-xl border border-white/5 p-1 shrink-0">
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
            <div className="flex bg-brand-dark overflow-x-auto no-scrollbar rounded-xl border border-white/5 p-1 shrink-0">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Standings Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card overflow-hidden">
               <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-brand-neon" />
                    {activeSport} {activeAge} {activeGender} Leaderboard
                  </h3>
                  <span className="text-[10px] font-mono text-white/20 uppercase">{sortedTeams.length} Teams Competing</span>
               </div>
               <div className="grid grid-cols-12 p-6 border-b border-white/5 bg-white/5 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-white/40">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-4 pl-2">Team</div>
                  <div className="col-span-1 text-center">P</div>
                  <div className="col-span-1 text-center">W</div>
                  <div className="col-span-1 text-center hidden sm:block">D</div>
                  <div className="col-span-1 text-center">L</div>
                  <div className="col-span-1 text-center hidden md:block">GF</div>
                  <div className="col-span-1 text-center hidden md:block">GA</div>
                  <div className="col-span-1 text-center">GD</div>
                  <div className="col-span-1 text-right">Pts</div>
               </div>
               <div className="divide-y divide-white/5 min-h-[400px]">
                 <AnimatePresence initial={false}>
                   <motion.div
                     key={`${activeSport}-${activeGender}-${activeAge}`}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.15 }}
                   >
                     {sortedTeams.length > 0 ? (
                       sortedTeams.map((team, idx) => (
                         <TeamRow key={team.id} team={team} rank={idx + 1} />
                       ))
                     ) : (
                       <div className="flex flex-col items-center justify-center h-[400px] text-white/20">
                          <Users className="w-12 h-12 mb-4 opacity-10" />
                          <p className="uppercase font-mono text-xs tracking-widest">No teams registered in this category</p>
                       </div>
                     )}
                   </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </div>

          {/* Individual Awards / Stats */}
          <div className="space-y-6">
            <div className="glass-card p-8 border-l-4 border-yellow-500 relative overflow-hidden group">
               <div className="absolute top-4 right-4 text-yellow-500 opacity-20 transform -rotate-12 transition-transform group-hover:scale-150 duration-500">
                  <Medal className="w-24 h-24" />
               </div>
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="text-yellow-500 w-6 h-6" />
                    <h3 className="font-display font-extrabold text-2xl uppercase italic">Player of <br /> the Week</h3>
                  </div>
                  <div className="flex items-center gap-4">
                     <img src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=100&h=100&auto=format&fit=crop" loading="lazy" className="w-16 h-16 rounded-full border-2 border-yellow-500" alt="MVP" />
                     <div>
                        <p className="font-display font-bold text-xl">TBD</p>
                        <p className="text-xs text-white/40 uppercase font-mono">TBD • TBD</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white/5 p-3 rounded-xl">
                        <p className="text-xl font-bold">0</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-tighter">Goals</p>
                     </div>
                     <div className="bg-white/5 p-3 rounded-xl">
                        <p className="text-xl font-bold">0</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-tighter">Assists</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="glass-card p-6 space-y-4">
               <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-blue">
                 <Star className="w-4 h-4" /> Top Performers
               </h4>
               <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                 {[
                   { name: 'Naksh Yadav', score: '7 goals', sport: 'Football U15' },
                   { name: 'Moksh', score: '51 runs', sport: 'Cricket U19' },
                   { name: 'Harish', score: '43 runs', sport: 'Cricket U15' },
                   { name: 'Rudraksh', score: '40 runs', sport: 'Cricket U13' },
                   { name: 'Harshit Jha', score: '39 runs', sport: 'Cricket U13' },
                   { name: 'Gaurv Yadav', score: '26 runs', sport: 'Cricket U19' },
                   { name: 'Dhruv Yadav', score: '25 runs', sport: 'Cricket U13' },
                   { name: 'Tegh Singh', score: '25 runs, 1 wkt', sport: 'Cricket U13' },
                   { name: 'Aarav Mane', score: '22 runs', sport: 'Cricket U15' },
                   { name: 'Evaan', score: '3 wickets', sport: 'Cricket U11' },
                   { name: 'Devansh', score: '16 runs, 1 wkt', sport: 'Cricket U11' },
                   { name: 'Ahsan Ul Huq', score: '15 runs, 1 wkt', sport: 'Cricket U11' }
                 ].map((player, idx) => (
                   <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                      <div>
                         <p className="text-sm font-bold">{player.name}</p>
                         <p className="text-[10px] text-white/40 uppercase">{player.sport}</p>
                      </div>
                      <span className="font-mono text-brand-neon font-bold">{player.score}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
