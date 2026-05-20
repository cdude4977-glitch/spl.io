import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TEAMS, SPORT_SPREADSHEETS } from '../constants';
import { SportType, Team } from '../types';
import { Users, FileSpreadsheet, Trophy, Search, ChevronRight, ExternalLink } from 'lucide-react';

export default function TeamsSection() {
  const [selectedSport, setSelectedSport] = useState<SportType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const sports: (SportType | 'All')[] = ['All', 'Cricket', 'Football', 'Basketball'];

  const filteredTeams = TEAMS.filter(team => {
    const matchesSport = selectedSport === 'All' || team.sport === selectedSport;
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  // Group teams by sport then by age/gender for better organization
  const groupedTeams = filteredTeams.reduce((acc, team) => {
    const key = `${team.sport} - ${team.ageCategory} ${team.gender}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(team);
    return acc;
  }, {} as Record<string, Team[]>);

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="teams-section">
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-bold uppercase tracking-widest mb-4"
        >
          <Users className="w-3 h-3" />
          Squads
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter uppercase mb-4"
        >
          Our <span className="text-brand-neon">Teams</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base"
        >
          Explore official squads. Each sport has a dedicated master spreadsheet for full player lists and stats.
        </motion.p>
      </div>

      {/* Filters and Sport Links */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex overflow-x-auto pb-2 md:pb-0 no-scrollbar gap-2 w-full md:w-auto">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                  selectedSport === sport
                    ? 'bg-brand-neon text-brand-dark border-brand-neon shadow-[0_0_20px_rgba(157,255,0,0.3)]'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto flex-1 md:max-w-xs">
            <input
              type="text"
              placeholder="Search teams or captains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:border-brand-neon/50 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Sport Spreadsheets Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(selectedSport === 'All' ? sports.filter(s => s !== 'All') : [selectedSport]).map((sport) => (
            selectedSport !== 'All' || sport !== 'All' ? (
              <motion.a
                key={sport}
                href={SPORT_SPREADSHEETS[sport as SportType]}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between p-4 bg-brand-neon/5 border border-brand-neon/20 rounded-2xl hover:bg-brand-neon/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-neon/20 flex items-center justify-center text-brand-neon">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-neon/60 block leading-none mb-1">Spreadsheet</span>
                    <span className="text-sm font-bold text-white uppercase">{sport} MASTER SQUAD</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-brand-neon transition-colors" />
              </motion.a>
            ) : null
          ))}
        </div>
      </div>

      {/* Grouped Results */}
      <div className="space-y-16">
        {Object.entries(groupedTeams).map(([category, teams], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white/90">
                {category}
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <TeamCard key={team.id} team={team} index={index} />
              ))}
            </div>
          </motion.div>
        ))}

        {Object.keys(groupedTeams).length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No teams match your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

interface TeamCardProps {
  team: Team;
  index: number;
  key?: string;
}

function TeamCard({ team, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden hover:border-brand-neon/30 transition-all"
    >
      {/* Team Color Accent */}
      <div 
        className="absolute top-0 left-0 w-full h-1" 
        style={{ backgroundColor: team.color }}
      />

      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="w-16 h-16 rounded-xl bg-white/5 p-2 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <img 
              src={team.logo} 
              alt={team.name} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">
              {team.sport}
            </span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400">
              {team.id}
            </span>
          </div>
        </div>

        <h4 className="text-lg font-display font-bold text-white mb-6 leading-tight group-hover:text-brand-neon transition-colors">
          {team.name}
        </h4>

        <div className="pt-6 border-t border-white/5 flex gap-3 text-xs text-gray-500 uppercase font-bold tracking-widest">
           {team.ageCategory} • {team.gender}
        </div>
      </div>
    </motion.div>
  );
}
