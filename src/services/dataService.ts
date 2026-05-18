import { supabase } from '../lib/supabase';
import { TEAMS, PLAYERS, MATCHES, NOTICES } from '../constants';
import { Team, Player, Match, Notice } from '../types';

let teamsCache: Team[] | null = JSON.parse(localStorage.getItem('teams_cache') || 'null');
let playersCache: Player[] | null = JSON.parse(localStorage.getItem('players_cache') || 'null');
let matchesCache: Match[] | null = JSON.parse(localStorage.getItem('matches_cache') || 'null');

export const dataService = {
  async getTeams(forceRefresh = false): Promise<Team[]> {
    if (!forceRefresh && teamsCache) {
      // Background revalidation
      if (document.visibilityState === 'visible') {
        this.revalidateTeams();
      }
      return teamsCache;
    }
    return this.revalidateTeams();
  },

  async revalidateTeams(): Promise<Team[]> {
    try {
      const { data, error } = await supabase.from('teams').select('*');
      if (error) throw error;
      
      const teams = (!data || data.length === 0) ? TEAMS : data.map((t: any) => ({
        id: t.id,
        name: t.name,
        logo: t.logo,
        captain: t.captain,
        sport: t.sport,
        ageCategory: t.age_category || t.ageCategory,
        gender: t.gender,
        purseRemaining: t.purse_remaining || t.purseRemaining,
        players: t.players || [],
        played: t.played || 0,
        wins: t.wins || 0,
        losses: t.losses || 0,
        draws: t.draws || 0,
        points: t.points || 0,
        color: t.color || '#1EFFB9'
      }));
      
      teamsCache = teams;
      localStorage.setItem('teams_cache', JSON.stringify(teams));
      return teams;
    } catch (err) {
      console.error('Error fetching teams:', err);
      return TEAMS;
    }
  },

  async getPlayers(forceRefresh = false): Promise<Player[]> {
    if (!forceRefresh && playersCache) {
      if (document.visibilityState === 'visible') {
        this.revalidatePlayers();
      }
      return playersCache;
    }
    return this.revalidatePlayers();
  },

  async revalidatePlayers(): Promise<Player[]> {
    try {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;

      const players = (!data || data.length === 0) ? PLAYERS : data.map((p: any) => ({
        id: p.id,
        name: p.name,
        sport: p.sport,
        ageCategory: p.age_category || p.ageCategory,
        gender: p.gender,
        basePrice: p.base_price || p.basePrice || 0,
        currentBid: p.current_bid || p.currentBid || 0,
        teamId: p.team_id || p.teamId,
        role: p.role,
        status: p.status,
        photo: p.photo,
        stats: p.stats || {}
      }));

      playersCache = players;
      localStorage.setItem('players_cache', JSON.stringify(players));
      return players;
    } catch (err) {
      console.error('Error fetching players:', err);
      return PLAYERS;
    }
  },

  async getMatches(forceRefresh = false): Promise<Match[]> {
    if (!forceRefresh && matchesCache) {
      if (document.visibilityState === 'visible') {
        this.revalidateMatches();
      }
      return matchesCache;
    }
    return this.revalidateMatches();
  },

  async revalidateMatches(): Promise<Match[]> {
    try {
      const { data, error } = await supabase.from('matches').select('*');
      if (error) throw error;

      const matches = (!data || data.length === 0) ? MATCHES : data.map((m: any) => ({
        id: m.id,
        sport: m.sport,
        ageCategory: m.age_category || m.ageCategory,
        gender: m.gender,
        teamAId: m.team_a_id || m.teamAId,
        teamBId: m.team_b_id || m.teamBId,
        time: m.time,
        date: m.date,
        venue: m.venue,
        status: m.status,
        result: m.result,
        scoreA: m.score_a || m.scoreA,
        scoreB: m.score_b || m.scoreB
      }));

      matchesCache = matches;
      localStorage.setItem('matches_cache', JSON.stringify(matches));
      return matches;
    } catch (err) {
      console.error('Error fetching matches:', err);
      return MATCHES;
    }
  },

  getCachedTeams(): Team[] | null {
    return teamsCache;
  },

  getCachedPlayers(): Player[] | null {
    return playersCache;
  },

  getCachedMatches(): Match[] | null {
    return matchesCache;
  },

  async getNotices(): Promise<Notice[]> {
    try {
      const { data, error } = await supabase.from('notices').select('*', { count: 'exact' });
      if (error) throw error;
      return (data && data.length > 0) ? (data as Notice[]) : NOTICES;
    } catch (err) {
      console.error('Error fetching notices:', err);
      return NOTICES;
    }
  },

  async getSiteConfig(key: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('value')
        .eq('key', key)
        .single();
      if (error) throw error;
      return data?.value;
    } catch (err) {
      console.error(`Error fetching site config for ${key}:`, err);
      return null;
    }
  },

  getPublicLogoUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/')) return path; // Handle local assets or existing relative paths
    
    // If it doesn't look like a path or URL, it might be an emoji or fallback text
    // Only try Supabase if it looks like a filename/path (contains dot or dash/underscore)
    if (path.includes('.') || path.includes('/') || path.length > 10) {
      const { data } = supabase.storage.from('logos').getPublicUrl(path);
      return data.publicUrl;
    }
    
    return path; 
  }
};
