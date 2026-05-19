import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Trophy, Target, Shield } from 'lucide-react';
import { Team, SportType } from '../types';
import { dataService } from '../services/dataService';

const TeamCard = React.memo(({ team }: { team: Team }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -5 }}
    className="relative group bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-brand-neon/50 hover:bg-white/10 shadow-xl"
  >
    {/* Background Decorative Element */}
    <div 
      className="absolute -right-4 -bottom-4 w-24 h-24 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
      style={{ backgroundColor: team.color || '#00F0FF' }}
    />

    <div className="flex items-center gap-5 mb-6">
      <div className="w-16 h-16 rounded-xl bg-brand-dark/50 p-2 border border-white/10 group-hover:border-brand-neon transition-colors overflow-hidden">
        <img 
          src={dataService.getPublicLogoUrl(team.logo)} 
          alt={team.name} 
          loading="lazy" 
          className="w-full h-full object-contain" 
        />
      </div>
      <div>
        <h3 className="font-display font-black text-lg uppercase italic tracking-tighter leading-tight group-hover:text-brand-neon transition-colors">
          {team.name}
        </h3>
        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono mt-1">
          {team.sport} • {team.ageCategory} • {team.gender}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Wins</p>
        <p className="text-xl font-display font-black text-brand-neon italic">{team.wins || 0}</p>
      </div>
      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Losses</p>
        <p className="text-xl font-display font-black text-white/40 italic">{team.losses || 0}</p>
      </div>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-brand-neon" />
        <span className="text-xs font-medium text-white/60">Captain: {team.captain}</span>
      </div>
      <div className="flex items-center gap-2">
        <Target className="w-4 h-4 text-brand-neon" />
        <span className="text-xs font-black text-brand-neon">{team.points || 0} PTS</span>
      </div>
    </div>
  </motion.div>
));

export default function TeamsSection() {
  const [activeSport, setActiveSport] = useState<SportType | 'All'>('All');
  const [teams, setTeams] = useState<Team[]>(() => dataService.getCachedTeams() || []);
  const [loading, setLoading] = useState(() => !dataService.getCachedTeams());

  useEffect(() => {
    let isMounted = true;
    const loadTeams = async () => {
      const data = await dataService.getTeams();
      if (isMounted) {
        setTeams(data);
        setLoading(false);
      }
    };
    loadTeams();
    return () => { isMounted = false; };
  }, []);

  const sports: (SportType | 'All')[] = ['All', 'Football', 'Cricket', 'Basketball'];

  const filteredTeams = useMemo(() => {
    if (activeSport === 'All') return teams;
    return teams.filter(t => t.sport === activeSport);
  }, [teams, activeSport]);

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-neon border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section id="teams" className="py-24 bg-brand-dark overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-[2px] bg-brand-neon"></div>
              <span className="text-brand-neon font-mono text-sm uppercase tracking-[0.3em]">The Lineup</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-black italic uppercase tracking-tighter leading-none"
            >
              Tournament <span className="text-brand-neon">Teams</span>
            </motion.h2>
          </div>

          {/* Sport Filters */}
          <div className="flex flex-wrap gap-2">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setActiveSport(sport)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeSport === sport 
                    ? 'bg-brand-neon text-brand-dark shadow-[0_0_20px_rgba(0,240,255,0.3)]' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Users className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 font-display uppercase tracking-widest italic">No teams found for this category</p>
          </div>
        )}
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-[-1] opacity-20">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-neon/10 blur-[120px] rounded-full animate-pulse" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
}
