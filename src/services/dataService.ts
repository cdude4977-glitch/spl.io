import { supabase } from '../lib/supabase';
import { TEAMS, PLAYERS, MATCHES, NOTICES } from '../constants';
import { Team, Player, Match, Notice } from '../types';

export const dataService = {
  async getTeams(): Promise<Team[]> {
    try {
      const { data, error } = await supabase.from('teams').select('*');
      if (error) throw error;
      return (data as Team[]) || TEAMS;
    } catch (err) {
      console.error('Error fetching teams:', err);
      return TEAMS;
    }
  },

  async getPlayers(): Promise<Player[]> {
    try {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      return (data as Player[]) || PLAYERS;
    } catch (err) {
      console.error('Error fetching players:', err);
      return PLAYERS;
    }
  },

  async getMatches(): Promise<Match[]> {
    try {
      const { data, error } = await supabase.from('matches').select('*');
      if (error) throw error;
      return (data as Match[]) || MATCHES;
    } catch (err) {
      console.error('Error fetching matches:', err);
      return MATCHES;
    }
  },

  async getNotices(): Promise<Notice[]> {
    try {
      const { data, error } = await supabase.from('notices').select('*', { count: 'exact' });
      if (error) throw error;
      return (data as Notice[]) || NOTICES;
    } catch (err) {
      console.error('Error fetching notices:', err);
      return NOTICES;
    }
  },

  async testConnection() {
    try {
      const { data, error } = await supabase.from('teams').select('id').limit(1);
      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
};
