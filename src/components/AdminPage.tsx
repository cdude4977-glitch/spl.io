import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Trophy, Calendar, Gavel, Search, Settings, Plus, Download, 
  ShieldCheck, Database, RefreshCcw, AlertTriangle, CheckCircle2,
  LayoutDashboard, Play, History, BarChart3, Image as LucideImage,
  Bell, FileText, LogOut, ChevronRight, Menu, X, DollarSign,
  TrendingUp, Activity, UserPlus, Star, Clock, MapPin, Zap, User, Trash2
} from 'lucide-react';
import { PLAYERS, TEAMS, MATCHES, NOTICES } from '../constants';
import { dataService } from '../services/dataService';
import { supabase } from '../lib/supabase';
import { Player, Team, Match, Notice, SportType, AgeCategory, Gender } from '../types';

type AdminModule = 
  | 'Dashboard' | 'Players' | 'Team Management' | 'Auction' | 'Fixtures' 
  | 'Live Scores' | 'Leaderboard' | 'Statistics' 
  | 'Gallery' | 'Notices' | 'Settings';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeModule, setActiveModule] = useState<AdminModule>('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dbStatus, setDbStatus] = useState<{ loading: boolean, success?: boolean, error?: string }>({ loading: false });
  const [loginError, setLoginError] = useState('');
  const [teams, setTeams] = useState<Team[]>(TEAMS);
  const [players, setPlayers] = useState<Player[]>(PLAYERS);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadAllData();
    }
  }, [isLoggedIn]);

  const loadAllData = async () => {
    setLoadingData(true);
    const [fetchedTeams, fetchedPlayers] = await Promise.all([
      dataService.getTeams(),
      dataService.getPlayers()
    ]);
    setTeams(fetchedTeams);
    setPlayers(fetchedPlayers);
    setLoadingData(false);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'spl2026') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Hint: admin / spl2026');
    }
  };

  const testDbConnection = async () => {
    setDbStatus({ loading: true });
    const result = await dataService.testConnection();
    setDbStatus({ 
      loading: false, 
      success: result.success, 
      error: result.error 
    });
  };

  if (!isLoggedIn) {
     return <LoginScreen handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} loginError={loginError} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <header className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-display font-black tracking-tighter uppercase italic">{activeModule}</h2>
              <div className="px-2 py-0.5 rounded bg-brand-neon/10 border border-brand-neon/20 text-[8px] font-black text-brand-neon uppercase tracking-widest">Admin V1.0</div>
            </div>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-mono">Shalom Premier League Management</p>
          </div>

          <div className="flex items-center gap-4">
             <div className={`px-4 py-1.5 rounded-lg border flex items-center gap-3 transition-all ${
                dbStatus.success === true ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                dbStatus.success === false ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                'bg-white/5 border-white/10 text-white/40'
              }`}>
                <Database className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{dbStatus.success ? 'Cloud Connected' : 'Local Auth'}</span>
                <button onClick={testDbConnection}><RefreshCcw className={`w-3 h-3 ${dbStatus.loading ? 'animate-spin' : ''}`} /></button>
             </div>
             
             <div className="w-10 h-10 rounded-full bg-brand-neon/20 border border-brand-neon/20 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="Admin" />
             </div>
          </div>
        </header>

        <div className="p-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeModule}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
             >
                {activeModule === 'Dashboard' && <DashboardOverview teams={teams} players={players} />}
                {activeModule === 'Players' && <PlayerManagement players={players} teams={teams} />}
                {activeModule === 'Team Management' && <TeamManagement teams={teams} setTeams={setTeams} />}
                {activeModule === 'Auction' && <AuctionControl players={players} teams={teams} />}
               {activeModule === 'Fixtures' && <FixturesManagement />}
               {activeModule === 'Live Scores' && <LiveScoreCenter />}
               {activeModule === 'Leaderboard' && <LeaderboardControl />}
               {activeModule === 'Statistics' && <StatsModule />}
               {activeModule === 'Gallery' && <GalleryAdmin />}
               {activeModule === 'Notices' && <NoticeManager />}
               {activeModule === 'Settings' && <SettingsPanel />}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Sub-Components ---

function LoginScreen({ handleLogin, username, setUsername, password, setPassword, loginError }: any) {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-brand-charcoal/80 border border-white/10 p-10 rounded-[2rem] shadow-2xl backdrop-blur-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-brand-neon/20 rounded-2xl flex items-center justify-center border border-brand-neon/20">
               <ShieldCheck className="w-10 h-10 text-brand-neon" />
            </div>
            <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter">ADMIN LOGIN</h2>
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest mt-2">Shalom Premier League 2026</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Username</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-brand-neon transition-all font-mono"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-brand-neon transition-all font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {loginError && <p className="text-red-500 text-[10px] font-bold text-center bg-red-500/10 py-2 rounded-lg">{loginError}</p>}

            <button type="submit" className="w-full py-4 bg-brand-neon text-brand-dark font-black uppercase italic tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-neon/20">
               AUTHENTICATE ACCESS
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function Sidebar({ activeModule, setActiveModule, isCollapsed, setIsCollapsed, onLogout }: any) {
  const menuItems: { name: AdminModule, icon: any }[] = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Players', icon: Users },
    { name: 'Team Management', icon: Trophy },
    { name: 'Auction', icon: Gavel },
    { name: 'Fixtures', icon: Calendar },
    { name: 'Live Scores', icon: Play },
    { name: 'Leaderboard', icon: BarChart3 },
    { name: 'Statistics', icon: TrendingUp },
    { name: 'Gallery', icon: LucideImage },
    { name: 'Notices', icon: Bell },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`bg-[#0A0A0A] border-r border-white/5 transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="p-6 flex items-center justify-between border-b border-white/5">
         {!isCollapsed && <h1 className="text-xl font-display font-black tracking-tighter uppercase italic">SPL <span className="text-brand-neon">ADMIN</span></h1>}
         <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-white/5 rounded-lg transition-all text-white/40">
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
         </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
         {menuItems.map(item => (
           <button
             key={item.name}
             onClick={() => setActiveModule(item.name)}
             className={`w-full flex items-center gap-4 p-3.5 rounded-xl transition-all group ${
               activeModule === item.name 
               ? 'bg-brand-neon text-brand-dark font-black' 
               : 'text-white/40 hover:bg-white/5 hover:text-white'
             }`}
           >
              <item.icon className={`w-5 h-5 ${activeModule === item.name ? '' : 'group-hover:scale-110 transition-transform'}`} />
              {!isCollapsed && <span className="text-xs uppercase tracking-widest">{item.name}</span>}
           </button>
         ))}
      </nav>

      <div className="p-4 mt-auto">
         <button 
           onClick={onLogout}
           className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all group"
         >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && <span className="text-xs font-black uppercase tracking-widest">Logout</span>}
         </button>
      </div>
    </aside>
  );
}

function DashboardOverview({ teams, players }: { teams: Team[], players: Player[] }) {
  const stats = [
    { label: 'Total Players', val: players.length.toString(), trend: '+12%', icon: Users, color: 'text-blue-500' },
    { label: 'Total Teams', val: teams.length.toString(), trend: 'Full', icon: Trophy, color: 'text-yellow-500' },
    { label: 'Live Matches', val: '2', trend: 'Active', icon: Activity, color: 'text-red-500' },
    { label: 'Auction Purse', val: '₹12.5Cr', trend: 'Sold', icon: DollarSign, color: 'text-brand-neon' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
           <div key={i} className="glass-card p-6 bg-brand-charcoal/30 border border-white/5 rounded-3xl group hover:border-brand-neon/30 transition-all flex flex-col justify-between h-40 overflow-hidden relative">
              <div className="flex justify-between items-start relative z-10">
                 <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-brand-neon/20 transition-all">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">{stat.label}</p>
                    <p className="text-3xl font-black italic">{stat.val}</p>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 w-fit px-2 py-1 rounded-full relative z-10">
                 <TrendingUp className="w-3 h-3" /> {stat.trend} THIS WEEK
              </div>
              <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-0 group-hover:opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 transition-all`} />
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-card p-8 rounded-3xl bg-brand-charcoal/20 border border-white/5">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-display font-black italic uppercase">Participation Analytics</h3>
               <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
               </select>
            </div>
            {/* Real charts would be here via Recharts or D3. Mocking with styled bars. */}
            <div className="h-64 flex items-end justify-between gap-4 px-4 pt-8">
               {[60, 80, 45, 90, 70, 50, 85].map((h, i) => (
                 <div key={i} className="flex-1 group relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="w-full bg-gradient-to-t from-brand-neon/20 to-brand-neon rounded-t-xl group-hover:from-brand-blue group-hover:to-brand-blue/80 transition-all cursor-pointer"
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all text-[10px] font-black text-brand-neon">{h}%</div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between mt-6 px-1 text-[10px] font-mono text-white/40 uppercase">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
         </div>

         <div className="glass-card p-8 rounded-3xl bg-brand-charcoal/20 border border-white/5">
            <h3 className="text-xl font-display font-black italic uppercase mb-6">Recent Activity</h3>
            <div className="space-y-6">
               {[
                 { action: 'Bid Placed', user: 'Admin User', detail: '₹50,000 on Rohan Malhotra', time: '2m ago' },
                 { action: 'Match Update', user: 'Score Manager', detail: 'Raiders vs Gladiators (FT: 2-1)', time: '15m ago' },
                 { action: 'New Registration', user: 'System', detail: 'Aryan Sharma (Football U-17)', time: '1h ago' },
                 { action: 'Notice Published', user: 'Media', detail: 'Auction Schedule Updated', time: '3h ago' },
               ].map((log, i) => (
                 <div key={i} className="flex gap-4 items-start pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                       <History className="w-4 h-4 text-white/40" />
                    </div>
                    <div>
                       <div className="flex items-center gap-2">
                          <p className="text-xs font-black uppercase text-brand-neon">{log.action}</p>
                          <span className="text-[8px] font-mono text-white/20">• {log.time}</span>
                       </div>
                       <p className="text-[10px] text-white/60 mt-1">{log.detail}</p>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">View Full System Log</button>
         </div>
      </div>
    </div>
  );
}

function PlayerManagement({ players, teams }: { players: Player[], teams: Team[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Partial<Player> | null>(null);
  const [localPlayers, setLocalPlayers] = useState(players);

  useEffect(() => {
    setLocalPlayers(players);
  }, [players]);

  const filteredPlayers = localPlayers.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.teamId && teams.find(t => t.id === p.teamId)?.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this player?')) return;
    const success = await dataService.deletePlayer(id);
    if (success) {
      setLocalPlayers(prev => prev.filter(p => p.id !== id));
    } else {
      alert('Failed to delete player');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlayer) return;
    
    const success = await dataService.upsertPlayer(editingPlayer as Player);
    if (success) {
      alert('Player saved successfully!');
      setIsEditing(false);
      setEditingPlayer(null);
      const updatedData = await dataService.getPlayers();
      setLocalPlayers(updatedData);
    } else {
      alert('Failed to save player');
    }
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto glass-card p-10 rounded-[3rem] border border-brand-neon/20 bg-brand-charcoal/40 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center">
                 <UserPlus className="w-6 h-6 text-brand-neon" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">
                  {editingPlayer?.id ? 'Edit Player' : 'Enroll New Player'}
                </h3>
                <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest mt-1">SPL 2026 PLAYER DATABASE REGISTRATION</p>
              </div>
           </div>
           <button onClick={() => setIsEditing(false)} className="w-12 h-12 rounded-full hover:bg-white/5 flex items-center justify-center transition-all group">
              <X className="w-6 h-6 text-white/40 group-hover:text-white" />
           </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Full Name</label>
                 <input 
                   type="text" 
                   required
                   value={editingPlayer?.name || ''} 
                   onChange={e => setEditingPlayer({...editingPlayer, name: e.target.value})}
                   placeholder="Enter player's full name"
                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-neon outline-none transition-all placeholder:text-white/10"
                 />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Sport</label>
                   <select 
                     value={editingPlayer?.sport || 'Football'} 
                     onChange={e => setEditingPlayer({...editingPlayer, sport: e.target.value as SportType})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-neon outline-none transition-all appearance-none cursor-pointer"
                   >
                      <option value="Football">Football</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Basketball">Basketball</option>
                    </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Primary Role</label>
                   <input 
                     type="text" 
                     required
                     value={editingPlayer?.role || ''} 
                     onChange={e => setEditingPlayer({...editingPlayer, role: e.target.value})}
                     placeholder="e.g. Forward, All-rounder"
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-neon outline-none transition-all placeholder:text-white/10"
                   />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Age Category</label>
                   <select 
                     value={editingPlayer?.ageCategory || 'U11'} 
                     onChange={e => setEditingPlayer({...editingPlayer, ageCategory: e.target.value as AgeCategory})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-neon outline-none transition-all appearance-none cursor-pointer"
                   >
                      <option value="U11">U11 Division</option>
                      <option value="U13">U13 Division</option>
                      <option value="U15">U15 Division</option>
                      <option value="U19">U19 Division</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Gender Group</label>
                   <select 
                     value={editingPlayer?.gender || 'Boys'} 
                     onChange={e => setEditingPlayer({...editingPlayer, gender: e.target.value as Gender})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-neon outline-none transition-all appearance-none cursor-pointer"
                   >
                      <option value="Boys">Boys Division</option>
                      <option value="Girls">Girls Division</option>
                   </select>
                </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Profile Image URL</label>
                 <input 
                   type="text" 
                   value={editingPlayer?.photo || ''} 
                   onChange={e => setEditingPlayer({...editingPlayer, photo: e.target.value})}
                   placeholder="Enter image URL"
                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-neon outline-none transition-all placeholder:text-white/10"
                 />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Base Price (₹K)</label>
                   <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-neon font-black font-mono">₹</span>
                      <input 
                        type="number" 
                        value={editingPlayer?.basePrice || 0} 
                        onChange={e => setEditingPlayer({...editingPlayer, basePrice: parseInt(e.target.value)})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-6 py-4 focus:border-brand-neon outline-none transition-all font-mono"
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Auction Status</label>
                   <select 
                     value={editingPlayer?.status || 'In Auction'} 
                     onChange={e => setEditingPlayer({...editingPlayer, status: e.target.value as Player['status']})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-neon outline-none transition-all appearance-none cursor-pointer"
                   >
                      <option value="In Auction">ACTIVE IN AUCTION</option>
                      <option value="Sold">MARKED AS SOLD</option>
                      <option value="Unsold">MARKED AS UNSOLD</option>
                   </select>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/10 flex items-center gap-6">
                 {editingPlayer?.photo ? (
                    <img src={editingPlayer.photo} className="w-20 h-20 rounded-xl object-cover ring-2 ring-white/10" alt="Preview" />
                 ) : (
                    <div className="w-20 h-20 rounded-xl bg-brand-charcoal flex items-center justify-center border-2 border-white/5">
                       <User className="w-8 h-8 text-white/10" />
                    </div>
                 )}
                 <div>
                    <h4 className="text-sm font-black uppercase italic">{editingPlayer?.name || 'Preview Profile'}</h4>
                    <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Image preview will appear here</p>
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setIsEditing(false)} type="button" className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                    Cancel
                 </button>
                 <button type="submit" className="flex-[2] py-4 bg-brand-neon text-brand-dark font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-neon/20">
                    Commit to Database
                 </button>
              </div>
           </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="Search database by name, ID or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-brand-neon transition-all"
            />
         </div>
         <div className="flex gap-4">
            <button 
              onClick={() => { setEditingPlayer({ status: 'In Auction', basePrice: 100, sport: 'Football', ageCategory: 'U11', gender: 'Boys' }); setIsEditing(true); }}
              className="px-8 py-4 bg-brand-neon text-brand-dark rounded-2xl text-xs font-black flex items-center gap-2 hover:scale-[1.02] transition-all uppercase italic shadow-lg shadow-brand-neon/20"
            >
               <Plus className="w-4 h-4" /> ADD NEW PLAYER
            </button>
         </div>
      </div>

      <div className="glass-card overflow-hidden bg-brand-charcoal/20 border border-white/5 rounded-[2rem]">
         <div className="overflow-x-auto overflow-y-hidden">
           <table className="w-full text-left border-collapse">
             <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 border-b border-white/5">
                <tr>
                   <th className="p-8">Player Card</th>
                   <th className="p-8">Category / Role</th>
                   <th className="p-8">Team Status</th>
                   <th className="p-8">Auction Value</th>
                   <th className="p-8 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {filteredPlayers.map(player => (
                  <tr key={player.id} className="hover:bg-white/5 transition-colors group relative">
                    <td className="p-8">
                       <div className="flex items-center gap-6">
                          <div className="relative group/photo">
                            <img src={player.photo} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10 group-hover/photo:ring-brand-neon/50 transition-all" alt="" />
                            <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-all rounded-2xl">
                               <Plus className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <div>
                             <p className="text-[10px] font-mono text-brand-neon/60 uppercase tracking-widest mb-1">{player.id}</p>
                             <p className="text-lg font-black uppercase italic leading-none">{player.name}</p>
                             <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-white/40 uppercase tracking-widest">{player.sport}</span>
                                <span className="px-2 py-0.5 rounded bg-brand-blue/10 text-[8px] font-bold text-brand-blue uppercase tracking-widest">{player.gender}</span>
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="p-8">
                       <div>
                          <p className="text-sm font-bold text-white/80">{player.role}</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{player.ageCategory}</p>
                       </div>
                    </td>
                    <td className="p-8">
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${player.teamId ? 'bg-emerald-500' : 'bg-yellow-500'} animate-pulse`} />
                          <div>
                            <p className="text-xs font-bold">{player.teamId ? teams.find(t => t.id === player.teamId)?.name : 'FREE AGENT'}</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest">{player.status}</p>
                          </div>
                       </div>
                    </td>
                    <td className="p-8 font-mono">
                       <div className="space-y-1">
                          <p className="text-sm font-black text-brand-neon">₹{player.currentBid || '---'}</p>
                          <p className="text-[8px] text-white/30 uppercase tracking-widest">Base: ₹{player.basePrice}</p>
                       </div>
                    </td>
                    <td className="p-8 text-right">
                       <div className="flex justify-end gap-2">
                          <button 
                             onClick={() => { setEditingPlayer(player); setIsEditing(true); }}
                             className="p-3 bg-white/5 rounded-xl hover:bg-brand-neon hover:text-brand-dark transition-all"
                           >
                             <Settings className="w-4 h-4" />
                           </button>
                          <button 
                             onClick={() => handleDelete(player.id)}
                             className="p-3 bg-white/5 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                       </div>
                    </td>
                  </tr>
                ))}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}

function TeamLogo({ logo, className = "w-full h-full object-cover", teamName = "" }: { logo: string, className?: string, teamName?: string }) {
  const url = dataService.getPublicLogoUrl(logo);
  const isEmoji = !url.startsWith('http') && !url.startsWith('/');

  if (isEmoji) {
    return <span className="text-3xl flex items-center justify-center w-full h-full bg-white/5">{logo}</span>;
  }

  return <img src={url} className={className} alt={teamName} referrerPolicy="no-referrer" />;
}

function TeamManagement({ teams, setTeams }: { teams: Team[], setTeams: React.Dispatch<React.SetStateAction<Team[]>> }) {
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Partial<Team> | null>(null);

  const handleLogoUpload = async (teamId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(teamId);
    const { url, error } = await dataService.uploadImage(file);
    
    if (url) {
      const success = await dataService.updateTeamLogo(teamId, url);
      if (success) {
        setTeams(prev => prev.map(t => t.id === teamId ? { ...t, logo: url } : t));
      }
    } else {
      alert('Upload failed: ' + (error?.message || 'Unknown error'));
    }
    setIsUploading(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam) return;

    const payload = {
      ...editingTeam,
      purseRemaining: editingTeam.purseRemaining || 50,
      played: editingTeam.played || 0,
      wins: editingTeam.wins || 0,
      losses: editingTeam.losses || 0,
      draws: editingTeam.draws || 0,
      points: editingTeam.points || 0
    } as Team;

    const success = await dataService.upsertTeam(payload);
    if (success) {
      alert('Team saved successfully!');
      setIsEditing(false);
      const updated = await dataService.getTeams();
      setTeams(updated);
    } else {
      alert('Failed to save team');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will delete the team!')) return;
    const success = await dataService.deleteTeam(id);
    if (success) {
      setTeams(prev => prev.filter(t => t.id !== id));
    }
  };

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto glass-card p-10 rounded-[3rem] border border-white/10 space-y-8">
        <h3 className="text-2xl font-display font-black uppercase italic">{editingTeam?.id ? 'Edit Franchise' : 'Create Franchise'}</h3>
        <form onSubmit={handleSave} className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                 <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Team Name</label>
                 <input type="text" required value={editingTeam?.name || ''} onChange={e => setEditingTeam({...editingTeam, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Owner/Captain</label>
                 <input type="text" required value={editingTeam?.captain || ''} onChange={e => setEditingTeam({...editingTeam, captain: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
              </div>
           </div>
           <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                 <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Sport</label>
                 <select value={editingTeam?.sport || 'Football'} onChange={e => setEditingTeam({...editingTeam, sport: e.target.value as SportType})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Basketball">Basketball</option>
                    
                 </select>
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Gender</label>
                 <select value={editingTeam?.gender || 'Boys'} onChange={e => setEditingTeam({...editingTeam, gender: e.target.value as Gender})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                 </select>
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Age</label>
                 <select value={editingTeam?.ageCategory || 'U15'} onChange={e => setEditingTeam({...editingTeam, ageCategory: e.target.value as AgeCategory})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <option value="U11">U11</option>
                    <option value="U13">U13</option>
                    <option value="U15">U15</option>
                    <option value="U19">U19</option>
                 </select>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                 <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Theme Color (Hex)</label>
                 <input type="text" value={editingTeam?.color || '#1EFFB9'} onChange={e => setEditingTeam({...editingTeam, color: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Initial Purse (L)</label>
                 <input type="number" value={editingTeam?.purseRemaining || 50} onChange={e => setEditingTeam({...editingTeam, purseRemaining: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
              </div>
           </div>
           <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl uppercase tracking-widest font-black text-xs">Cancel</button>
              <button type="submit" className="flex-1 py-4 bg-brand-neon text-brand-dark rounded-2xl uppercase tracking-widest font-black text-xs">Commit</button>
           </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
          <h3 className="text-xl font-display font-black uppercase italic">Tournament Franchise List</h3>
          <button 
            onClick={() => { setEditingTeam({ color: '#1EFFB9', sport: 'Football', gender: 'Boys', ageCategory: 'U15' }); setIsEditing(true); }}
            className="px-8 py-4 bg-brand-neon text-brand-dark rounded-2xl text-xs font-black flex items-center gap-2 hover:scale-[1.02] transition-all uppercase italic shadow-lg shadow-brand-neon/20"
          >
             <Plus className="w-4 h-4" /> CREATE NEW FRANCHISE
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map(team => (
            <div key={team.id} className="glass-card p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] group hover:scale-[1.02] transition-all">
               <div className="bg-[#0A0A0A] m-[1px] rounded-[2.5rem] p-8 h-full flex flex-col relative overflow-hidden">
                  {/* Team Accent Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full opacity-20 transition-all group-hover:opacity-40" style={{ backgroundColor: team.color }} />
                  
                  <div className="flex justify-between items-start mb-8 relative z-10">
                     <div className="relative group/logo">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl group-hover:shadow-white/5 transition-all">
                           <TeamLogo logo={team.logo} className="w-full h-full object-contain" teamName={team.name} />
                           {isUploading === team.id && (
                             <div className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center">
                               <RefreshCcw className="w-6 h-6 text-brand-neon animate-spin" />
                             </div>
                           )}
                        </div>
                        <label className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-brand-neon text-brand-dark flex items-center justify-center cursor-pointer hover:scale-110 transition-all border-2 border-brand-dark shadow-lg">
                           <Plus className="w-4 h-4" />
                           <input 
                             type="file" 
                             className="hidden" 
                             accept="image/*"
                             onChange={(e) => handleLogoUpload(team.id, e)}
                             disabled={isUploading !== null}
                           />
                        </label>
                     </div>
                     <div className="text-right">
                        <div className="flex gap-2 justify-end mb-2">
                           <button 
                             onClick={() => { setEditingTeam(team); setIsEditing(true); }}
                             className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-brand-neon hover:text-brand-dark transition-all"
                           >
                             <Settings className="w-3 h-3" />
                           </button>
                           <button 
                             onClick={() => handleDelete(team.id)}
                             className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-red-500/20 hover:text-red-500 transition-all"
                           >
                             <Trash2 className="w-3 h-3" />
                           </button>
                        </div>
                        <h4 className="text-2xl font-black uppercase italic leading-none">{team.name}</h4>
                        <div className="flex justify-end gap-2 mt-2">
                           <span className="px-2 py-0.5 rounded bg-brand-blue/10 text-[8px] font-bold text-brand-blue uppercase tracking-widest">{team.gender}</span>
                           <span className="px-2 py-0.5 rounded bg-white/10 text-[8px] font-bold text-white uppercase tracking-widest">{team.ageCategory}</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6 relative z-10 flex-1">
                     <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-brand-neon/5 transition-all">
                        <div>
                           <p className="text-[10px] text-white/30 uppercase font-mono tracking-widest">Team Captain</p>
                           <p className="text-sm font-black">{team.captain}</p>
                        </div>
                        <Star className="w-4 h-4 text-brand-neon" fill="currentColor" />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                           <p className="text-[10px] text-white/30 uppercase font-mono tracking-widest">Matches Won</p>
                           <p className="text-xl font-black">{team.wins}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-brand-neon/10 border border-brand-neon/20">
                           <p className="text-[10px] text-brand-neon font-black uppercase font-mono tracking-widest">Points</p>
                           <p className="text-xl font-black text-brand-neon">{team.points}</p>
                        </div>
                     </div>

                     <div className="p-4 rounded-2xl bg-[#0F0F0F] border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                           <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Purse Remaining</p>
                           <p className="text-sm font-black text-emerald-500">₹{team.purseRemaining}L</p>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${(team.purseRemaining / 50) * 100}%` }}
                             className="h-full bg-emerald-500"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 flex gap-3 relative z-10 pt-6 border-t border-white/10">
                     <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">ROSTER</button>
                     <button className="px-6 py-3 bg-brand-neon text-brand-dark rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">EDIT</button>
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}

function AuctionControl({ players, teams }: { players: Player[], teams: Team[] }) {
  const [auctionPlayers, setAuctionPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isBidding, setIsBidding] = useState(false);
  const [timer, setTimer] = useState(60);
  const [selectedFranchise, setSelectedFranchise] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuctionPlayers(players.filter(p => p.status === 'In Auction'));
    if (players.length > 0 && !selectedPlayer) {
      setSelectedPlayer(players.find(p => p.status === 'In Auction') || players[0]);
    }
  }, [players]);

  useEffect(() => {
    let interval: any;
    if (isBidding && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsBidding(false);
    }
    return () => clearInterval(interval);
  }, [isBidding, timer]);

  const placeBid = async (team: Team, increase: number) => {
    if (!selectedPlayer) return;
    const currentBid = selectedPlayer.currentBid || selectedPlayer.basePrice;
    const newBid = currentBid + increase;

    // Check if team has enough purse
    if ((team.purseRemaining * 100000) < (newBid * 1000)) { // Assuming L and K conversion
       // Simplistic purse check - let's assume team.purseRemaining is in L (Lakhs) and bid is in K (Thousands)
       // alert(`Insufficient funds in ${team.name} purse!`);
       // return;
    }

    // Since we don't have a real-time listener for just this local state, we update locally and then push
    setSelectedPlayer({ ...selectedPlayer, currentBid: newBid, teamId: team.id });
    setSelectedFranchise(team);
    setTimer(60); // Reset timer on bid
    setIsBidding(true);
  };

  const handleSold = async () => {
    if (!selectedPlayer || !selectedFranchise) {
       alert('Select a winner first!');
       return;
    }

    setLoading(true);
    const success = await dataService.recordAuctionBid(selectedPlayer.id, selectedFranchise.id, selectedPlayer.currentBid || selectedPlayer.basePrice);
    
    if (success) {
       // Refresh local list or remove sold player
       alert(`${selectedPlayer.name} sold to ${selectedFranchise.name} for ₹${selectedPlayer.currentBid}!`);
       // Move to next player in queue
       const nextIndex = auctionPlayers.findIndex(p => p.id === selectedPlayer.id) + 1;
       if (nextIndex < auctionPlayers.length) {
         setSelectedPlayer(auctionPlayers[nextIndex]);
       }
       setIsBidding(false);
       setTimer(60);
       setSelectedFranchise(null);
    } else {
       alert('Error recording sale. Check connection.');
    }
    setLoading(false);
  };

  const handleUnsold = async () => {
    if (!selectedPlayer) return;
    
    const success = await dataService.upsertPlayer({ ...selectedPlayer, status: 'Unsold' });
    if (success) {
      alert('Player marked as UNSOLD');
      const nextIndex = auctionPlayers.findIndex(p => p.id === selectedPlayer.id) + 1;
      if (nextIndex < auctionPlayers.length) {
        setSelectedPlayer(auctionPlayers[nextIndex]);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col">
       <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
          {/* Main Visualizer Area */}
          <div className="lg:col-span-8 glass-card border border-brand-neon/20 bg-gradient-to-b from-brand-charcoal/40 to-brand-dark rounded-[3rem] p-8 flex flex-col relative overflow-hidden group shadow-[0_0_50px_-12px_rgba(30,255,185,0.15)] shadow-brand-neon/5">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
             
             {/* Auction HUD Top */}
             <div className="flex justify-between items-center relative z-10 mb-8 px-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-brand-neon/20 border border-brand-neon/30 flex items-center justify-center">
                      <Gavel className="w-6 h-6 text-brand-neon" />
                   </div>
                   <div>
                      <h3 className="text-xl font-display font-black uppercase italic leading-none tracking-tighter">Live Auction Center</h3>
                      <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest mt-1">Status: <span className="text-brand-neon">{isBidding ? 'Bidding Active' : 'Waiting for Auctioneer'}</span></p>
                   </div>
                </div>
                <div className={`text-4xl font-mono font-black border-2 border-brand-neon p-4 rounded-3xl ${timer < 10 ? 'text-red-500 border-red-500 animate-pulse' : 'text-brand-neon'}`}>
                   00:{timer.toString().padStart(2, '0')}
                </div>
             </div>

             {/* Player Spotlight */}
             <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPlayer?.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center gap-8 w-full max-w-xl"
                  >
                    <div className="relative group/player">
                       <div className="absolute inset-0 bg-brand-neon/20 blur-[100px] group-hover/player:blur-[120px] transition-all opacity-40" />
                       <div className="w-56 h-56 md:w-72 md:h-72 rounded-[3.5rem] overflow-hidden border-4 border-white/10 group-hover/player:border-brand-neon/50 transition-all relative z-10 shadow-2xl bg-brand-charcoal">
                          <img src={selectedPlayer?.photo} className="w-full h-full object-cover group-hover/player:scale-110 transition-all duration-700" alt="" />
                       </div>
                    </div>
                    <div className="text-center space-y-4">
                        <div className="inline-flex gap-4 items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 uppercase font-mono font-black text-xs tracking-widest italic group-hover:bg-brand-neon/10 transition-all">
                           <span className="text-brand-neon">{selectedPlayer?.sport}</span> 
                           <span className="text-white/20">|</span> 
                           <span>{selectedPlayer?.role}</span>
                           <span className="text-white/20">|</span>
                           <span className="text-brand-blue">{selectedPlayer?.ageCategory}</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic leading-none tracking-tighter">
                          {selectedPlayer?.name}
                        </h2>
                    </div>
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* HUD Bottom Bidding info */}
             <div className="relative z-10 bg-[#0F0F0F]/80 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 flex justify-between items-center mt-auto shadow-2xl">
                <div>
                   <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-1">Base Price</p>
                   <p className="text-3xl font-black font-mono">₹{selectedPlayer?.basePrice}</p>
                </div>
                <div className="text-center">
                   <p className="text-[10px] text-brand-neon font-black uppercase font-mono tracking-widest mb-1">Current Highest Bid</p>
                   <p className="text-6xl font-black font-mono text-brand-neon drop-shadow-[0_0_20px_rgba(30,255,185,0.4)] transition-all">
                     ₹{selectedPlayer?.currentBid || '---'}
                   </p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-1">Winning Franchise</p>
                    {selectedPlayer?.teamId ? (
                      <div className="flex items-center justify-end gap-3">
                         <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                            <TeamLogo logo={teams.find(t => t.id === selectedPlayer.teamId)?.logo || ''} className="w-full h-full object-contain" />
                         </div>
                         <p className="text-xl font-black uppercase italic">{teams.find(t => t.id === selectedPlayer.teamId)?.name}</p>
                      </div>
                    ) : (
                     <p className="text-xl font-black text-white/20 uppercase italic">Awaiting First Bid</p>
                   )}
                </div>
             </div>
          </div>

          {/* Right Hand Controls Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6 min-h-0">
             {/* Bidding Controls */}
             <div className="glass-card p-8 rounded-[2.5rem] bg-brand-charcoal/20 border border-white/5 space-y-6">
                <h4 className="text-xs uppercase font-black tracking-[0.3em] text-white/40 mb-2">Auctioneer Controls</h4>
                <div className="grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => { setIsBidding(true); setTimer(60); }}
                     disabled={isBidding}
                     className={`py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isBidding ? 'bg-brand-neon/10 text-brand-neon' : 'bg-brand-neon text-brand-dark hover:scale-105 active:scale-95 shadow-lg shadow-brand-neon/20'}`}
                   >
                     {isBidding ? 'TIMER RUNNING' : 'START TIMER'}
                   </button>
                   <button onClick={() => { setIsBidding(false); setTimer(60); }} className="py-6 rounded-2xl bg-white/5 border border-white/10 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                      <RefreshCcw className="w-4 h-4" /> RESET
                   </button>
                </div>

                <div className=" space-y-4">
                   <p className="text-[10px] text-white/40 uppercase font-mono text-center tracking-widest">Select Franchise to Place Bid</p>
                   <div className="grid grid-cols-4 gap-2">
                       {teams.map(team => (
                         <button 
                           key={team.id} 
                           onClick={() => setSelectedFranchise(team)}
                           className={`aspect-square rounded-xl bg-white/5 border flex items-center justify-center group transition-all overflow-hidden p-1 ${selectedFranchise?.id === team.id ? 'border-brand-neon ring-1 ring-brand-neon' : 'border-white/10 hover:border-brand-neon/50'}`}
                         >
                           <TeamLogo logo={team.logo} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                         </button>
                       ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                   <div className="grid grid-cols-3 gap-2">
                      {[100, 500, 1000].map(val => (
                        <button 
                          key={val} 
                          onClick={() => selectedFranchise && placeBid(selectedFranchise, val)}
                          disabled={!selectedFranchise}
                          className="py-4 rounded-xl bg-[#0F0F0F] border border-white/5 text-[10px] font-black font-mono hover:border-brand-blue hover:text-brand-blue transition-all disabled:opacity-30"
                        >
                          +{val}
                        </button>
                      ))}
                   </div>
                   <button 
                    onClick={handleSold}
                    className="py-6 rounded-2xl bg-emerald-500 text-brand-dark font-black text-xs uppercase tracking-[0.3em] italic hover:scale-[1.02] shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                   >
                     SOLD OUT!
                   </button>
                   <button 
                    onClick={handleUnsold}
                    className="py-4 rounded-2xl bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-[0.3em] italic hover:bg-red-500/10 hover:text-red-500 transition-all"
                   >
                     UNSOLD / NEXT
                   </button>
                </div>
             </div>

             {/* Upcoming Players list */}
             <div className="flex-1 glass-card p-8 rounded-[2.5rem] bg-brand-charcoal/20 border border-white/5 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs uppercase font-black tracking-[0.3em] text-white/40">Queue</h4>
                   <span className="text-[10px] font-mono text-white/20">{auctionPlayers.length} Remaining</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                   {auctionPlayers.map(player => (
                     <button 
                       key={player.id} 
                       onClick={() => { setSelectedPlayer(player); setTimer(60); setIsBidding(false); setSelectedFranchise(null); }}
                       className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 group ${
                         selectedPlayer?.id === player.id 
                         ? 'bg-brand-neon/10 border-brand-neon/40' 
                         : 'bg-white/5 border-white/5 hover:bg-white/10'
                       }`}
                     >
                        <img src={player.photo} className="w-10 h-10 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all bg-brand-charcoal" alt="" />
                        <div className="text-left">
                           <p className={`text-xs font-black uppercase italic ${selectedPlayer?.id === player.id ? 'text-brand-neon' : ''}`}>{player.name}</p>
                           <p className="text-[8px] text-white/30 uppercase tracking-widest">{player.sport} • {player.role}</p>
                        </div>
                     </button>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

function FixturesManagement() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSport, setActiveSport] = useState<SportType>('Football');
  const [activeGender, setActiveGender] = useState<Gender>('Boys');
  const [activeAge, setActiveAge] = useState<AgeCategory>('U15');
  const [isEditing, setIsEditing] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Partial<Match> | null>(null);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const data = await dataService.getMatches();
    setMatches(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMatch) return;
    
    // Set default values if new
    const payload = {
      ...editingMatch,
      sport: editingMatch.sport || activeSport,
      gender: editingMatch.gender || activeGender,
      ageCategory: editingMatch.ageCategory || activeAge,
      scoreA: editingMatch.scoreA || '0',
      scoreB: editingMatch.scoreB || '0',
      status: editingMatch.status || 'Upcoming'
    } as Match;

    const success = await dataService.upsertMatch(payload);
    if (success) {
      alert('Match saved successfully!');
      setIsEditing(false);
      setEditingMatch(null);
      loadMatches();
    } else {
      alert('Failed to save match');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this match?')) return;
    const success = await dataService.deleteMatch(id);
    if (success) {
      setMatches(prev => prev.filter(m => m.id !== id));
    }
  };

  const filteredMatches = matches.filter(m => m.sport === activeSport && m.gender === activeGender && m.ageCategory === activeAge);

  if (isEditing) {
     return (
        <div className="max-w-2xl mx-auto glass-card p-10 rounded-[3rem] border border-white/10 space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display font-black uppercase italic">{editingMatch?.id ? 'Edit Match' : 'Schedule Match'}</h3>
              <button onClick={() => setIsEditing(false)}><X /></button>
           </div>
           <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Team A</label>
                    <select 
                      value={editingMatch?.teamAId || ''} 
                      onChange={e => setEditingMatch({...editingMatch, teamAId: e.target.value})}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                    >
                       <option value="">Select Team A</option>
                       {TEAMS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Team B</label>
                    <select 
                      value={editingMatch?.teamBId || ''} 
                      onChange={e => setEditingMatch({...editingMatch, teamBId: e.target.value})}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                    >
                       <option value="">Select Team B</option>
                       {TEAMS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Date</label>
                    <input type="date" value={editingMatch?.date || ''} onChange={e => setEditingMatch({...editingMatch, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Time</label>
                    <input type="time" value={editingMatch?.time || ''} onChange={e => setEditingMatch({...editingMatch, time: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
                 </div>
              </div>
              <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Venue</label>
                  <input type="text" value={editingMatch?.venue || ''} onChange={e => setEditingMatch({...editingMatch, venue: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Field A, Court 2, etc." />
              </div>
              <button type="submit" className="w-full py-4 bg-brand-neon text-brand-dark font-black uppercase rounded-2xl">Confirm Schedule</button>
           </form>
        </div>
     )
  }

  if (loading) return <div className="p-20 text-center uppercase font-mono text-xs opacity-40">Loading Fixtures...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-1">
            <h3 className="text-xl font-display font-black uppercase italic">Fixture Management</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-mono">Manage scheduling for {activeSport} {activeAge} {activeGender}</p>
         </div>

         <div className="flex flex-wrap gap-4">
            <select 
              value={activeSport} 
              onChange={(e) => setActiveSport(e.target.value as SportType)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-brand-neon/50"
            >
              {['Football', 'Cricket', 'Basketball'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select 
              value={activeGender} 
              onChange={(e) => setActiveGender(e.target.value as Gender)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-brand-neon/50"
            >
              {['Boys', 'Girls'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select 
              value={activeAge} 
              onChange={(e) => setActiveAge(e.target.value as AgeCategory)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-brand-neon/50"
            >
              {['U11', 'U13', 'U15', 'U19'].map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <button 
              onClick={() => { setEditingMatch({ sport: activeSport, gender: activeGender, ageCategory: activeAge, date: new Date().toISOString().split('T')[0], venue: 'Main Stadium' }); setIsEditing(true); }}
              className="px-4 py-2 bg-brand-neon text-brand-dark rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Plus className="w-3 h-3" />
              Add Match
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMatches.length > 0 ? (
          filteredMatches.map(match => {
            const teamA = TEAMS.find(t => t.id === match.teamAId);
            const teamB = TEAMS.find(t => t.id === match.teamBId);
            return (
              <div key={match.id} className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-8 flex-1">
                  <div className="flex flex-col items-center gap-2 min-w-[100px]">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">#{match.id.slice(0, 5)}</span>
                    <div className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-white/40 uppercase tracking-widest">{match.status}</div>
                  </div>

                  <div className="flex items-center gap-4 flex-1 justify-center">
                    <div className="text-right flex-1">
                      <p className="text-sm font-black uppercase italic">{teamA?.name || 'TBD'}</p>
                    </div>
                    <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase italic text-white/20">VS</div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-black uppercase italic">{teamB?.name || 'TBD'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 pl-8 border-l border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">{match.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">{match.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { setEditingMatch(match); setIsEditing(true); }}
                      className="p-2 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-all"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(match.id)}
                      className="p-2 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass-card py-20 flex flex-col items-center justify-center text-white/10 italic text-sm">
            <Calendar className="w-12 h-12 mb-4 opacity-5" />
            No matches scheduled for this category
          </div>
        )}
      </div>
    </div>
  );
}
function LiveScoreCenter() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSport, setActiveSport] = useState<SportType>('Football');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const data = await dataService.getMatches();
    setMatches(data);
    setLoading(false);
  };

  const updateMatchScore = async (matchId: string, scoreA: string, scoreB: string, status: string = 'Live') => {
    const { error } = await supabase.from('matches').update({
       score_a: scoreA,
       score_b: scoreB,
       status: status,
       updated_at: new Date().toISOString()
    }).eq('id', matchId);

    if (error) {
       alert('Error updating score: ' + error.message);
    } else {
       setMatches(prev => prev.map(m => m.id === matchId ? { ...m, scoreA, scoreB, status } : m));
       if (selectedMatch?.id === matchId) {
          setSelectedMatch({ ...selectedMatch, scoreA, scoreB, status });
       }
    }
  };

  const filteredMatches = matches.filter(m => m.sport === activeSport);

  if (loading) return <div className="p-20 text-center uppercase font-mono text-xs opacity-40">Loading Matches...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <div className="lg:col-span-1 space-y-6">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
             {['Football', 'Cricket', 'Basketball'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setActiveSport(s as SportType)}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeSport === s ? 'bg-brand-neon text-brand-dark' : 'text-white/40 hover:text-white'}`}
                >
                  {s}
                </button>
             ))}
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
             {filteredMatches.map(match => (
                <button 
                  key={match.id}
                  onClick={() => setSelectedMatch(match)}
                  className={`w-full p-6 rounded-3xl border transition-all text-left group ${selectedMatch?.id === match.id ? 'bg-brand-neon/10 border-brand-neon/40' : 'bg-brand-charcoal/20 border-white/5 hover:border-white/10'}`}
                >
                   <div className="flex justify-between items-start mb-4">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${match.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white/40'}`}>{match.status}</span>
                      <span className="text-[10px] font-mono text-white/20">{match.date}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-black italic">{TEAMS.find(t => t.id === match.teamAId)?.name || 'Team A'}</span>
                      <span className="text-brand-neon font-black font-mono">{match.scoreA} - {match.scoreB}</span>
                      <span className="text-sm font-black italic text-right">{TEAMS.find(t => t.id === match.teamBId)?.name || 'Team B'}</span>
                   </div>
                </button>
             ))}
          </div>
       </div>

       <div className="lg:col-span-2">
          {selectedMatch ? (
             <div className="glass-card p-10 rounded-[3rem] border border-brand-neon/20 bg-brand-charcoal/20 space-y-8">
                <div className="flex justify-between items-center border-b border-white/10 pb-8">
                   <div className="space-y-1">
                      <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Match Dashboard</h3>
                      <p className="text-white/40 text-[10px] uppercase font-mono tracking-widest">{selectedMatch.sport} • {selectedMatch.venue}</p>
                   </div>
                   <div className="flex gap-4">
                      <button 
                        onClick={() => updateMatchScore(selectedMatch.id, selectedMatch.scoreA, selectedMatch.scoreB, 'Live')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedMatch.status === 'Live' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}
                      >
                         Go Live
                      </button>
                      <button 
                        onClick={() => updateMatchScore(selectedMatch.id, selectedMatch.scoreA, selectedMatch.scoreB, 'Finished')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedMatch.status === 'Finished' ? 'bg-white text-brand-dark' : 'bg-white/5 text-white/40 border border-white/10'}`}
                      >
                         End Match
                      </button>
                   </div>
                </div>

                <div className="flex items-center justify-around py-12 bg-white/5 rounded-[2.5rem] border border-white/5">
                   <div className="text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center p-4">
                         <TeamLogo logo={TEAMS.find(t => t.id === selectedMatch.teamAId)?.logo || ''} className="w-full h-full object-contain" />
                      </div>
                      <p className="text-lg font-black uppercase italic">{TEAMS.find(t => t.id === selectedMatch.teamAId)?.name}</p>
                      <div className="flex items-center justify-center gap-4">
                         <button 
                            onClick={() => updateMatchScore(selectedMatch.id, (parseInt(selectedMatch.scoreA) - 1).toString(), selectedMatch.scoreB)}
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-xl"
                         >-</button>
                         <span className="text-5xl font-black font-mono text-brand-neon">{selectedMatch.scoreA}</span>
                         <button 
                            onClick={() => updateMatchScore(selectedMatch.id, (parseInt(selectedMatch.scoreA) + 1).toString(), selectedMatch.scoreB)}
                            className="w-10 h-10 rounded-xl bg-brand-neon text-brand-dark hover:scale-110 flex items-center justify-center text-xl"
                         >+</button>
                      </div>
                   </div>

                   <div className="text-4xl font-display font-black text-white/10 italic">VS</div>

                   <div className="text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center p-4">
                         <TeamLogo logo={TEAMS.find(t => t.id === selectedMatch.teamBId)?.logo || ''} className="w-full h-full object-contain" />
                      </div>
                      <p className="text-lg font-black uppercase italic">{TEAMS.find(t => t.id === selectedMatch.teamBId)?.name}</p>
                      <div className="flex items-center justify-center gap-4">
                         <button 
                            onClick={() => updateMatchScore(selectedMatch.id, selectedMatch.scoreA, (parseInt(selectedMatch.scoreB) - 1).toString())}
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-xl"
                         >-</button>
                         <span className="text-5xl font-black font-mono text-brand-neon">{selectedMatch.scoreB}</span>
                         <button 
                            onClick={() => updateMatchScore(selectedMatch.id, selectedMatch.scoreA, (parseInt(selectedMatch.scoreB) + 1).toString())}
                            className="w-10 h-10 rounded-xl bg-brand-neon text-brand-dark hover:scale-110 flex items-center justify-center text-xl"
                         >+</button>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="glass-card p-6 rounded-3xl bg-brand-dark/50 border border-white/5 space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Event Timeline</h4>
                      <div className="space-y-4">
                         <p className="text-[10px] text-white/20 italic">Timeline logging coming soon...</p>
                      </div>
                   </div>
                   <div className="glass-card p-6 rounded-3xl bg-brand-dark/50 border border-white/5">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Quick Stats</h4>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 rounded-xl bg-white/5 text-center">
                            <p className="text-[8px] text-white/40 uppercase">Possession</p>
                            <p className="text-sm font-bold">54% - 46%</p>
                         </div>
                         <div className="p-4 rounded-xl bg-white/5 text-center">
                            <p className="text-[8px] text-white/40 uppercase">Shots</p>
                            <p className="text-sm font-bold">12 - 8</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          ) : (
             <div className="glass-card h-full rounded-[3.5rem] border border-white/5 bg-brand-charcoal/20 flex flex-col items-center justify-center text-center p-20 space-y-6">
                <Play className="w-16 h-16 text-white/5" />
                <div>
                   <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">No Match Selected</h3>
                   <p className="text-white/40 italic max-w-sm mt-2">Select a match from the sidebar to begin live score updates and timeline management.</p>
                </div>
             </div>
          )}
       </div>
    </div>
  );
}
function LeaderboardControl() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSport, setActiveSport] = useState<SportType>('Football');
  const [activeGender, setActiveGender] = useState<Gender>('Boys');
  const [activeAge, setActiveAge] = useState<AgeCategory>('U15');

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const data = await dataService.getTeams();
    setTeams(data);
    setLoading(false);
  };

  const updateStats = async (teamId: string, field: keyof Team, delta: number) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;

    const newValue = Math.max(0, (team[field] as number) + delta);
    const { error } = await supabase.from('teams').update({ [field]: newValue }).eq('id', teamId);
    
    if (error) {
       alert('Error updating: ' + error.message);
    } else {
       setTeams(prev => prev.map(t => t.id === teamId ? { ...t, [field]: newValue } : t));
    }
  };

  const filteredTeams = teams.filter(t => t.sport === activeSport && t.gender === activeGender && t.ageCategory === activeAge);

  if (loading) return <div className="p-20 text-center uppercase font-mono text-xs opacity-40">Loading Standings...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-1">
            <h3 className="text-xl font-display font-black uppercase italic">Standings & Point Management</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-mono">Manage records for {activeSport} {activeAge} {activeGender}</p>
         </div>

         <div className="flex flex-wrap gap-4">
            <select 
              value={activeSport} 
              onChange={(e) => setActiveSport(e.target.value as SportType)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none"
            >
              {['Football', 'Cricket', 'Basketball'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select 
              value={activeGender} 
              onChange={(e) => setActiveGender(e.target.value as Gender)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none"
            >
              {['Boys', 'Girls'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select 
              value={activeAge} 
              onChange={(e) => setActiveAge(e.target.value as AgeCategory)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none"
            >
              {['U11', 'U13', 'U15', 'U19'].map(a => <option key={a} value={a}>{a}</option>)}
            </select>
         </div>
      </div>

      <div className="glass-card rounded-[2.5rem] border border-white/5 overflow-hidden bg-brand-charcoal/10">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                     <th className="p-6 text-[10px] uppercase font-mono tracking-widest text-white/40">Franchise</th>
                     <th className="p-6 text-[10px] uppercase font-mono tracking-widest text-white/40 text-center">P</th>
                     <th className="p-6 text-[10px] uppercase font-mono tracking-widest text-white/40 text-center">W</th>
                     <th className="p-6 text-[10px] uppercase font-mono tracking-widest text-white/40 text-center">L</th>
                     <th className="p-6 text-[10px] uppercase font-mono tracking-widest text-white/40 text-center">D</th>
                     <th className="p-6 text-[10px] uppercase font-mono tracking-widest text-white/40 text-center">PTS</th>
                     <th className="p-6 text-[10px] uppercase font-mono tracking-widest text-white/40 text-right">Quick Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredTeams.sort((a, b) => b.points - a.points).map((team, idx) => (
                    <tr key={team.id} className="hover:bg-white/5 transition-all group">
                       <td className="p-6">
                          <div className="flex items-center gap-4">
                             <span className="text-xs font-mono font-black text-white/10">#{idx + 1}</span>
                             <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center p-2 border border-white/10">
                                <TeamLogo logo={team.logo} />
                             </div>
                             <div>
                                <p className="text-sm font-black uppercase italic leading-none">{team.name}</p>
                                <p className="text-[8px] text-white/20 uppercase font-mono mt-1">{team.captain}</p>
                             </div>
                          </div>
                       </td>
                       <td className="p-6 text-center font-mono text-sm">
                          <div className="flex items-center justify-center gap-2">
                             <button onClick={() => updateStats(team.id, 'played', -1)} className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center">-</button>
                             {team.played}
                             <button onClick={() => updateStats(team.id, 'played', 1)} className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center">+</button>
                          </div>
                       </td>
                       <td className="p-6 text-center font-mono text-sm text-emerald-500">
                          <div className="flex items-center justify-center gap-2">
                             <button onClick={() => updateStats(team.id, 'wins', -1)} className="w-5 h-5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 flex items-center justify-center">-</button>
                             {team.wins}
                             <button onClick={() => updateStats(team.id, 'wins', 1)} className="w-5 h-5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 flex items-center justify-center">+</button>
                          </div>
                       </td>
                       <td className="p-6 text-center font-mono text-sm text-red-500">
                          <div className="flex items-center justify-center gap-2">
                             <button onClick={() => updateStats(team.id, 'losses', -1)} className="w-5 h-5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center">-</button>
                             {team.losses}
                             <button onClick={() => updateStats(team.id, 'losses', 1)} className="w-5 h-5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center">+</button>
                          </div>
                       </td>
                       <td className="p-6 text-center font-mono text-sm text-white/20">
                          <div className="flex items-center justify-center gap-2">
                             <button onClick={() => updateStats(team.id, 'draws', -1)} className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center">-</button>
                             {team.draws}
                             <button onClick={() => updateStats(team.id, 'draws', 1)} className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center">+</button>
                          </div>
                       </td>
                       <td className="p-6 text-center font-mono text-xl font-black text-brand-neon">{team.points}</td>
                       <td className="p-6 text-right">
                          <div className="flex justify-end gap-1">
                             <button 
                               onClick={() => updateStats(team.id, 'points', 3)}
                               className="px-3 py-1 bg-brand-neon/10 text-brand-neon border border-brand-neon/20 rounded-lg text-[8px] font-black uppercase hover:bg-brand-neon hover:text-brand-dark transition-all"
                             >
                                +3 PTS
                             </button>
                             <button 
                               onClick={() => updateStats(team.id, 'points', 1)}
                               className="px-3 py-1 bg-white/5 text-white/40 border border-white/10 rounded-lg text-[8px] font-black uppercase hover:bg-white hover:text-brand-dark transition-all"
                             >
                                +1 PT
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {filteredTeams.length === 0 && (
            <div className="p-32 flex flex-col items-center justify-center text-center opacity-20 italic">
               <TrendingUp className="w-12 h-12 mb-4 opacity-5" />
               <p>No tournament records for this bracket</p>
            </div>
         )}
      </div>
    </div>
  );
}

function StatsModule() { return <Placeholder module="Advanced Statistics" description="D3-powered tournament analytics dashboard showing player heatmaps and team performance metrics." icon={TrendingUp} />; }
function RegistrationManager() { return null; }
function GalleryAdmin() { return <Placeholder module="Media Control" description="High-performance media center for uploading multi-category high-res match imagery and video highlights." icon={LucideImage} />; }
function NoticeManager() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', type: 'Info' as const });

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    const data = await dataService.getNotices();
    setNotices(data);
    setLoading(false);
  };

  const publishNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('notices').insert([{
       ...newNotice,
       created_at: new Date().toISOString()
    }]);

    if (error) {
       alert('Error publishing: ' + error.message);
    } else {
       alert('Notice published successfully!');
       setNewNotice({ title: '', content: '', type: 'Info' });
       loadNotices();
    }
  };

  const deleteNotice = async (id: string) => {
     if (!confirm('Delete this notice?')) return;
     const { error } = await supabase.from('notices').delete().eq('id', id);
     if (error) alert('Error: ' + error.message);
     else setNotices(prev => prev.filter(n => n.id !== id));
  };

  if (loading) return <div className="p-20 text-center uppercase font-mono text-xs opacity-40">Loading Notices...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
       <div className="space-y-8">
          <div className="glass-card p-10 rounded-[3rem] border border-brand-neon/20 bg-brand-charcoal/20">
             <h3 className="text-2xl font-display font-black uppercase italic italic mb-8">Broadcast New Notice</h3>
             <form onSubmit={publishNotice} className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Alert Level</label>
                   <div className="flex gap-4">
                      {['Info', 'Alert', 'Success'].map(t => (
                        <button 
                          key={t}
                          type="button"
                          onClick={() => setNewNotice({ ...newNotice, type: t as any })}
                          className={`flex-1 py-3 border rounded-xl text-[10px] font-black uppercase transition-all ${newNotice.type === t ? 'bg-brand-neon text-brand-dark border-brand-neon' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}
                        >
                          {t}
                        </button>
                      ))}
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Title</label>
                   <input 
                     type="text" 
                     required
                     value={newNotice.title}
                     onChange={e => setNewNotice({...newNotice, title: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-neon outline-none"
                     placeholder="e.g. Schedule Update..." 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Content</label>
                   <textarea 
                     required
                     value={newNotice.content}
                     onChange={e => setNewNotice({...newNotice, content: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 h-32 focus:border-brand-neon outline-none resize-none"
                     placeholder="Broadcasting details..."
                   />
                </div>
                <button type="submit" className="w-full py-4 bg-brand-neon text-brand-dark font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all">
                   Deploy Broadcast
                </button>
             </form>
          </div>
       </div>

       <div className="space-y-6">
          <h3 className="text-xl font-display font-black uppercase italic">Active Broadcasts</h3>
          <div className="space-y-4">
             {notices.map(notice => (
                <div key={notice.id} className="glass-card p-6 rounded-3xl border border-white/5 bg-white/5 hover:border-white/10 transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                         <div className={`w-2 h-2 rounded-full ${notice.type === 'Alert' ? 'bg-red-500' : notice.type === 'Success' ? 'bg-emerald-500' : 'bg-brand-blue'}`} />
                         <span className="text-[10px] font-mono font-black uppercase tracking-widest text-white/20">{notice.type}</span>
                      </div>
                      <button onClick={() => deleteNotice(notice.id)} className="text-white/10 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                   </div>
                   <h4 className="text-lg font-black uppercase italic leading-none mb-2">{notice.title}</h4>
                   <p className="text-sm text-white/60 line-clamp-2">{notice.content}</p>
                   <p className="text-[8px] uppercase font-mono text-white/20 mt-4">{new Date(notice.createdAt).toLocaleString()}</p>
                </div>
             ))}
             {notices.length === 0 && (
                <div className="p-20 text-center opacity-20 italic">No active notices</div>
             )}
          </div>
       </div>
    </div>
  );
}
function SettingsPanel() {
  const [config, setConfig] = useState<any>({
    schoolLogo: 'https://shalomhills.com/wp-content/themes/shalomhills/images/logo.png',
    eventName: 'Shalom Premier League',
    registrationStatus: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    const data = await dataService.getSiteConfig('branding');
    if (data) setConfig(data);
    setLoading(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    const { url, error } = await dataService.uploadImage(file);
    
    if (url) {
      const newConfig = { ...config, schoolLogo: url };
      const success = await dataService.updateSiteConfig('branding', newConfig);
      if (success) setConfig(newConfig);
    } else {
      alert('Upload failed: ' + (error?.message || 'Unknown error'));
    }
    setSaving(false);
  };

  if (loading) {
     return <div className="p-20 text-center"><RefreshCcw className="w-10 h-10 animate-spin mx-auto text-brand-neon mb-4" /><p className="text-white/40 uppercase tracking-widest text-xs font-black">Loading Configuration...</p></div>;
  }

  return (
    <div className="max-w-4xl space-y-8">
       <div className="glass-card p-10 rounded-[3rem] border border-white/5 bg-brand-charcoal/20">
          <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter mb-8 bg-gradient-to-r from-brand-neon to-white bg-clip-text text-transparent">Site Branding & Identity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Main School Logo</label>
                   <div className="relative group">
                      <div className="w-full aspect-video rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-neon/30">
                         {config.schoolLogo ? (
                           <img src={config.schoolLogo} className="max-h-full max-w-full object-contain p-8" alt="School Logo" />
                         ) : (
                           <LucideImage className="w-12 h-12 text-white/10" />
                         )}
                         {saving && <div className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center"><RefreshCcw className="w-8 h-8 text-brand-neon animate-spin" /></div>}
                      </div>
                      <label className="absolute inset-0 cursor-pointer">
                         <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={saving} />
                      </label>
                      <div className="absolute top-4 right-4 bg-brand-neon text-brand-dark px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none">Click to Change</div>
                   </div>
                   <p className="text-[10px] text-white/20 italic mt-2">Recommended: PNG with transparent background. Max size 2MB.</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Event Season Name</label>
                   <input 
                     type="text" 
                     value={config.eventName}
                     onChange={(e) => setConfig({ ...config, eventName: e.target.value })}
                     onBlur={() => dataService.updateSiteConfig('branding', config)}
                     className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-brand-neon transition-all font-mono text-sm"
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Registration Status</label>
                   <div className="flex gap-4">
                      <button 
                        onClick={() => { const nc = { ...config, registrationStatus: true }; setConfig(nc); dataService.updateSiteConfig('branding', nc); }}
                        className={`flex-1 py-4 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all ${config.registrationStatus ? 'bg-emerald-500 border-emerald-500 text-brand-dark' : 'bg-white/5 border-white/10 text-white/40'}`}
                      >
                         Open
                      </button>
                      <button 
                         onClick={() => { const nc = { ...config, registrationStatus: false }; setConfig(nc); dataService.updateSiteConfig('branding', nc); }}
                         className={`flex-1 py-4 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all ${!config.registrationStatus ? 'bg-red-500 border-red-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
                      >
                         Closed
                      </button>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 bg-brand-charcoal/20">
             <h4 className="text-lg font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-neon" /> Security & Access
             </h4>
             <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Change Admin Password</button>
          </div>
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 bg-brand-charcoal/20">
             <h4 className="text-lg font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3">
                <Database className="w-5 h-5 text-brand-blue" /> Data Management
             </h4>
             <button className="w-full py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Reset All Tournament Data</button>
          </div>
       </div>
    </div>
  );
}

function Placeholder({ module, description, icon: Icon }: any) {
  return (
    <div className="glass-card p-12 rounded-[3rem] border border-white/5 bg-brand-charcoal/20 flex flex-col items-center justify-center text-center space-y-6">
       <div className="w-24 h-24 rounded-[2.5rem] bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center">
          <Icon className="w-10 h-10 text-brand-neon" />
       </div>
       <div className="space-y-4 max-w-lg">
          <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter">{module}</h2>
          <p className="text-white/40 leading-relaxed italic">{description}</p>
       </div>
       <div className="pt-8 flex gap-4">
          <button className="px-10 py-5 bg-brand-neon text-brand-dark rounded-2xl font-black uppercase italic tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-neon/20">ACCESS CONTROL</button>
          <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all">DOCUMENTATION</button>
       </div>
    </div>
  );
}
