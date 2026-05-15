import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Gavel, Users, DollarSign, Trophy, Info } from 'lucide-react';
import { PLAYERS, TEAMS } from '../constants';
import { Player, Team, SportType } from '../types';

export default function AuctionSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState<SportType | 'All'>('All');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [localPlayers, setLocalPlayers] = useState(PLAYERS);
  const [localTeams, setLocalTeams] = useState(TEAMS);

  const filteredPlayers = useMemo(() => {
    return localPlayers.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSport = filterSport === 'All' || p.sport === filterSport;
      return matchesSearch && matchesSport;
    });
  }, [searchTerm, filterSport, localPlayers]);

  const handleBid = (teamId: string) => {
    if (!selectedPlayer) return;
    
    setLocalPlayers(prev => prev.map(p => {
      if (p.id === selectedPlayer.id) {
        return {
          ...p,
          currentBid: (p.currentBid || p.basePrice) + 100,
          teamId
        };
      }
      return p;
    }));

    // Update selected player in modal
    setSelectedPlayer(prev => prev ? {
      ...prev,
      currentBid: (prev.currentBid || prev.basePrice) + 100,
      teamId
    } : null);
  };

  const handleSell = () => {
     if (!selectedPlayer || !selectedPlayer.teamId) return;

     const buyerTeam = localTeams.find(t => t.id === selectedPlayer.teamId);
     if (!buyerTeam) return;

     // Deduct from purse
     setLocalTeams(prev => prev.map(t => {
       if (t.id === buyerTeam.id) {
         return {
           ...t,
           purseRemaining: t.purseRemaining - (selectedPlayer.currentBid || selectedPlayer.basePrice)
         };
       }
       return t;
     }));

     setLocalPlayers(prev => prev.map(p => {
       if (p.id === selectedPlayer.id) {
         return { ...p, status: 'Sold' };
       }
       return p;
     }));

     setSelectedPlayer(null);
  };

  return (
    <section id="auction" className="py-24 bg-brand-dark/50 overflow-hidden relative">
      {/* Background Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-neon/5 blur-[120px] rounded-full -z-10" />

      <div className="section-container">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
          <div className="space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-brand-neon font-mono text-sm tracking-widest uppercase">Live Auction System</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Player <span className="text-brand-blue">Bidding</span></h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search players..." 
                className="bg-brand-charcoal border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-neon transition-all w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex bg-brand-charcoal rounded-full p-1 border border-white/10">
              {['All', 'Football', 'Cricket', 'Basketball'].map((sport) => (
                <button
                  key={sport}
                  onClick={() => setFilterSport(sport as any)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                    filterSport === sport ? 'bg-brand-neon text-brand-dark' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Purse Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
           {localTeams.filter(t => filterSport === 'All' || t.sport === filterSport).map(team => (
             <motion.div 
               layout
               key={team.id} 
               className="glass-card p-4 flex flex-col justify-between group overflow-hidden relative border-t-2"
               style={{ borderTopColor: team.color }}
             >
               <div className="flex items-center gap-3 relative z-10 mb-3">
                 <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-md object-cover" />
                 <div>
                   <h4 className="font-display font-bold text-sm leading-tight">{team.name}</h4>
                   <p className="text-[9px] text-white/40 uppercase tracking-widest">{team.sport}</p>
                 </div>
               </div>
               <div className="relative z-10">
                 <p className="text-lg font-mono font-bold text-brand-neon">₹{team.purseRemaining}L</p>
                 <p className="text-[9px] text-white/40 uppercase tracking-widest leading-none">Purse Left</p>
               </div>
               <div className="absolute top-0 right-0 w-24 h-24 bg-brand-neon/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-all group-hover:bg-brand-neon/10" />
             </motion.div>
           ))}
        </div>

        {/* Players Masonry-ish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPlayers.map((player) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedPlayer(player)}
                className="glass-card overflow-hidden cursor-pointer group"
              >
                <div className="relative h-48">
                  <img src={player.photo} alt={player.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    {player.sport}
                  </div>
                  {player.status === 'Sold' && (
                    <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm flex items-center justify-center">
                       <span className="bg-green-500 text-white px-6 py-2 rounded-full font-extrabold uppercase tracking-widest -rotate-12 shadow-xl">
                         SOLD
                       </span>
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-bold text-lg text-white group-hover:text-brand-neon transition-colors">{player.name}</h4>
                      <p className="text-xs text-white/40">{player.role} • {player.ageCategory}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-white/40 uppercase">Roster Status</p>
                       <p className="font-mono text-sm uppercase text-brand-neon">{player.status}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                       <Users className="w-4 h-4 text-brand-neon" />
                       <span className="text-xs text-white/60">
                         {player.teamId ? localTeams.find(t => t.id === player.teamId)?.name : 'Unassigned'}
                       </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <Search className="w-12 h-12 text-white/10 mx-auto" />
            <p className="text-white/40">No players found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Player Auction Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl" onClick={() => setSelectedPlayer(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-brand-charcoal border border-white/10 w-full max-w-4xl rounded-[2rem] overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-full relative">
                  <img src={selectedPlayer.photo} alt={selectedPlayer.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <span className="bg-brand-blue text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                         {selectedPlayer.sport}
                       </span>
                       <h3 className="text-4xl font-display font-extrabold uppercase">{selectedPlayer.name}</h3>
                       <p className="text-white/60">{selectedPlayer.role} • {selectedPlayer.ageCategory}</p>
                    </div>
                    <div className="text-right">
                       <div className="flex items-center gap-2 justify-end mb-1">
                         <span className="flex h-2 w-2 rounded-full bg-brand-neon animate-pulse" />
                         <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">Team Slot Open</span>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                     {Object.entries(selectedPlayer.stats).map(([key, val]) => (
                       <div key={key} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                         <p className="text-2xl font-bold">{val}</p>
                         <p className="text-[10px] uppercase tracking-widest text-white/40">{key}</p>
                       </div>
                     ))}
                  </div>

                  {selectedPlayer.status !== 'Sold' ? (
                    <div className="space-y-6">
                      <div className="flex flex-col gap-3">
                        <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Place Bid For Team</p>
                        <div className="flex flex-wrap gap-2">
                          {localTeams.filter(t => t.sport === selectedPlayer.sport).map(team => (
                            <button 
                              key={team.id}
                              onClick={() => handleBid(team.id)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                selectedPlayer.teamId === team.id 
                                  ? 'bg-brand-neon border-brand-neon text-brand-dark scale-105' 
                                  : 'bg-white/5 border-white/10 text-white/60 hover:border-brand-neon/50'
                              }`}
                            >
                              {team.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button 
                          onClick={handleSell}
                          disabled={!selectedPlayer.teamId}
                          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <Gavel className="w-5 h-5" /> SOLD
                        </button>
                        <button 
                          onClick={() => setSelectedPlayer(null)}
                          className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all"
                        >
                          PASS
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-3xl flex items-center gap-6">
                       <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-green-500/20">
                          ✓
                       </div>
                       <div>
                         <p className="text-xs text-green-500 font-bold uppercase tracking-widest mb-1">Auction Result</p>
                         <h4 className="text-2xl font-bold uppercase">SOLD TO {localTeams.find(t => t.id === selectedPlayer.teamId)?.name}</h4>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
