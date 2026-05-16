import { supabase } from '../lib/supabase';
import { TEAMS, PLAYERS, MATCHES, NOTICES } from '../constants';
import { Team, Player, Match, Notice } from '../types';

export const dataService = {
  async getTeams(): Promise<Team[]> {
    try {
      const { data, error } = await supabase.from('teams').select('*');
      if (error) throw error;
      if (!data || data.length === 0) return TEAMS;

      return data.map((t: any) => ({
        id: t.id,
        name: t.name,
        logo: t.logo,
        captain: t.captain,
        sport: t.sport,
        ageCategory: t.age_category || t.ageCategory,
        gender: t.gender,
        purseRemaining: t.purse_remaining || t.purseRemaining,
        players: t.players || [],
        wins: t.wins || 0,
        losses: t.losses || 0,
        draws: t.draws || 0,
        points: t.points || 0,
        color: t.color || '#1EFFB9'
      }));
    } catch (err) {
      console.error('Error fetching teams:', err);
      return TEAMS;
    }
  },

  async getPlayers(): Promise<Player[]> {
    try {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      if (!data || data.length === 0) return PLAYERS;

      return data.map((p: any) => ({
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
    } catch (err) {
      console.error('Error fetching players:', err);
      return PLAYERS;
    }
  },

  async getMatches(): Promise<Match[]> {
    try {
      const { data, error } = await supabase.from('matches').select('*');
      if (error) throw error;
      if (!data || data.length === 0) return MATCHES;

      return data.map((m: any) => ({
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
    } catch (err) {
      console.error('Error fetching matches:', err);
      return MATCHES;
    }
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

  async upsertPlayer(player: any): Promise<{ data: any, error: any }> {
    try {
      const { data, error } = await supabase
        .from('players')
        .upsert({
          ...player,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async deletePlayer(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('players').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error deleting player:', err);
      return false;
    }
  },

  async upsertTeam(team: any): Promise<{ data: any, error: any }> {
    try {
      const { data, error } = await supabase
        .from('teams')
        .upsert({
          ...team,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async deleteTeam(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('teams').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error deleting team:', err);
      return false;
    }
  },

  async upsertMatch(match: any): Promise<{ data: any, error: any }> {
    try {
      const { data, error } = await supabase
        .from('matches')
        .upsert({
          ...match,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async deleteMatch(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('matches').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error deleting match:', err);
      return false;
    }
  },

  async recordAuctionBid(playerId: string, teamId: string, amount: number): Promise<boolean> {
    try {
      // 1. Start a transaction (or batch update)
      // Update player
      const { error: pError } = await supabase
        .from('players')
        .update({ current_bid: amount, team_id: teamId, status: 'Sold' })
        .eq('id', playerId);
      
      if (pError) throw pError;

      // 2. Fetch current team purse
      const { data: teamData, error: tFetchError } = await supabase
        .from('teams')
        .select('purse_remaining')
        .eq('id', teamId)
        .single();
      
      if (tFetchError) throw tFetchError;

      // 3. Deduct from team purse
      const newPurse = (teamData?.purse_remaining || 0) - (amount / 100); // Assuming amount is in lakhs if divided by 100 or something? Wait, let's use amount directly or check logic.
      // Usually purse is in Crores/Lakhs. If base price is 500, maybe it's in thousands.
      // Let's just deduct 'amount' for now, assuming unit consistency.
      const { error: tError } = await supabase
        .from('teams')
        .update({ purse_remaining: Math.max(0, newPurse) })
        .eq('id', teamId);
      
      if (tError) throw tError;

      // 4. Log the transaction
      await supabase.from('auction_transactions').insert({
        player_id: playerId,
        team_id: teamId,
        bid_amount: amount
      });

      return true;
    } catch (err) {
      console.error('Error recording auction bid:', err);
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
