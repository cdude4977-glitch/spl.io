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
  },

  async uploadImage(file: File, bucket: string = 'logos'): Promise<{ url: string | null, error: any }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

      return { url: data.publicUrl, error: null };
    } catch (err) {
      console.error('Error uploading image:', err);
      return { url: null, error: err };
    }
  },

  async updateTeamLogo(teamId: string, logoUrl: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('teams')
        .update({ logo: logoUrl })
        .eq('id', teamId);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error updating team logo:', err);
      return false;
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

  async updateSiteConfig(key: string, value: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('site_config')
        .upsert({ key, value, updated_at: new Error().stack?.includes('Admin') ? new Date().toISOString() : undefined });
      // The updated_at should be handled by DB trigger preferably, but manually for now
      if (error) throw error;
      return true;
    } catch (err) {
      console.error(`Error updating site config for ${key}:`, err);
      return false;
    }
  }
};
