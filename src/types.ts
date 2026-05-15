export type SportType = 'Football' | 'Cricket' | 'Basketball';

export interface Player {
  id: string;
  name: string;
  sport: SportType;
  ageCategory: 'Under 14' | 'Under 15' | 'Under 17' | 'Open';
  basePrice: number;
  currentBid: number;
  teamId: string | null;
  role: string;
  status: 'In Auction' | 'Sold' | 'Unsold';
  photo: string;
  stats: {
    matches?: number;
    goals?: number;
    runs?: number;
    wickets?: number;
    points?: number;
    assists?: number;
  };
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  captain: string;
  sport: SportType;
  purseRemaining: number;
  players: string[]; // Player IDs
  wins: number;
  losses: number;
  points: number;
  color: string;
}

export interface Match {
  id: string;
  sport: SportType;
  teamAId: string;
  teamBId: string;
  time: string;
  date: string;
  venue: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  result?: string;
  scoreA?: string;
  scoreB?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'High' | 'Normal';
}
