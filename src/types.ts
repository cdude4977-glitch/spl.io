export type SportType = 'Football' | 'Cricket' | 'Basketball';

export type AgeCategory = 'U11' | 'U13' | 'U15' | 'U19';
export type Gender = 'Boys' | 'Girls';

export interface Player {
  id: string;
  name: string;
  sport: SportType;
  ageCategory: AgeCategory;
  gender: Gender;
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
  ageCategory: AgeCategory;
  gender: Gender;
  purseRemaining: number;
  players: string[]; // Player IDs
  played: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  gf: number;
  ga: number;
  gd: number;
  color: string;
}

export interface Match {
  id: string;
  sport: SportType;
  ageCategory: AgeCategory;
  gender: Gender;
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
