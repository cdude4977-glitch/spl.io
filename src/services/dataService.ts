import { TEAMS, PLAYERS, MATCHES, NOTICES } from '../constants';
import { Team, Player, Match, Notice } from '../types';

export const dataService = {
  async getTeams(): Promise<Team[]> {
    return TEAMS;
  },

  async getPlayers(): Promise<Player[]> {
    return PLAYERS;
  },

  async getMatches(): Promise<Match[]> {
    return MATCHES;
  },

  getCachedTeams(): Team[] | null {
    return TEAMS;
  },

  getCachedPlayers(): Player[] | null {
    return PLAYERS;
  },

  getCachedMatches(): Match[] | null {
    return MATCHES;
  },

  async getNotices(): Promise<Notice[]> {
    return NOTICES;
  },

  async getSiteConfig(key: string): Promise<any> {
    if (key === 'event_dates') {
      return { start: "20 May 2026", end: "23 May 2026" };
    }
    return null;
  },

  getPublicLogoUrl(path: string): string {
    if (!path) return '';
    return path;
  }
};
