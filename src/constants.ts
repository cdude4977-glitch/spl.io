import { SportType, Team, Player, Match, Notice } from './types';

export const TEAMS: Team[] = [
  // Cricket (5 teams)
  { id: 'c1', name: 'Shalom Hurricanes', logo: '/input_file_0.png', captain: 'Pending', sport: 'Cricket', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#3b82f6' },
  { id: 'c2', name: 'Shalom Tornados', logo: '/input_file_1.png', captain: 'Pending', sport: 'Cricket', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#eab308' },
  { id: 'c3', name: 'Shalom Stromers', logo: '/input_file_2.png', captain: 'Pending', sport: 'Cricket', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#22c55e' },
  { id: 'c4', name: 'Shalom Lightning', logo: '/input_file_3.png', captain: 'Pending', sport: 'Cricket', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#06b6d4' },
  { id: 'c5', name: 'Shalom Thunders', logo: '/input_file_4.png', captain: 'Pending', sport: 'Cricket', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#15803d' },

  // Football (5 teams)
  { id: 'f1', name: 'Shalom City FC', logo: '/input_file_5.png', captain: 'Pending', sport: 'Football', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#60a5fa' },
  { id: 'f2', name: 'Shalom Blazers', logo: '/input_file_6.png', captain: 'Pending', sport: 'Football', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#ef4444' },
  { id: 'f3', name: 'Shalom Spurs FC', logo: '/input_file_7.png', captain: 'Pending', sport: 'Football', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#1e3a8a' },
  { id: 'f4', name: 'Shalom Athletico FC', logo: '/input_file_8.png', captain: 'Pending', sport: 'Football', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#dc2626' },
  { id: 'f5', name: 'Real Shalom FC', logo: '/input_file_9.png', captain: 'Pending', sport: 'Football', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#111827' },

  // Basketball (4 teams)
  { id: 'b1', name: 'Shalom Hills Warriors', logo: '/input_file_10.png', captain: 'Pending', sport: 'Basketball', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#1d4ed8' },
  { id: 'b2', name: 'Shalom Hills Sonics', logo: '/input_file_11.png', captain: 'Pending', sport: 'Basketball', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#2563eb' },
  { id: 'b3', name: 'Shalom Hills Pacers', logo: '/input_file_12.png', captain: 'Pending', sport: 'Basketball', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#fbbf24' },
  { id: 'b4', name: 'Shalom Hills Rovers', logo: '/input_file_13.png', captain: 'Pending', sport: 'Basketball', purseRemaining: 50, players: [], wins: 0, losses: 0, points: 0, color: '#4338ca' },
];

export const PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Aryan Sharma',
    sport: 'Football',
    ageCategory: 'Under 15',
    basePrice: 500,
    currentBid: 0,
    teamId: 'f1',
    role: 'Forward',
    status: 'In Auction',
    photo: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=200&h=200&auto=format&fit=crop',
    stats: { matches: 8, goals: 12 }
  },
];

export const MATCHES: Match[] = [
  {
    id: 'm1',
    sport: 'Football',
    teamAId: 'f1',
    teamBId: 'f2',
    time: '16:00',
    date: '20 May 2026',
    venue: 'Main Stadium',
    status: 'Upcoming',
  },
  {
    id: 'm2',
    sport: 'Basketball',
    teamAId: 'b1',
    teamBId: 'b2',
    time: '18:30',
    date: '21 May 2026',
    venue: 'Indoor Court',
    status: 'Upcoming',
  }
];

export const NOTICES: Notice[] = [
  {
    id: 'n1',
    title: 'Registration Deadline Extended!',
    content: 'The deadline for all sports registrations has been extended to 18 May 2026 due to popular demand.',
    date: '12 May 2026',
    priority: 'High'
  },
  {
    id: 'n2',
    title: 'Auction Day Schedule',
    content: 'The live auction will begin at 10:00 AM sharp on 19 May at the School Auditorium.',
    date: '10 May 2026',
    priority: 'Normal'
  }
];
