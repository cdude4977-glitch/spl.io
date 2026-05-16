import { SportType, Team, Player, Match, Notice } from './types';

export const TEAMS: Team[] = [
  // Cricket (8 categories)
  { id: 'c-u11-b', name: 'Hurricanes U11', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36%20(1).jpeg', captain: 'Pending', sport: 'Cricket', ageCategory: 'U11', gender: 'Boys', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#3b82f6' },
  { id: 'c-u11-g', name: 'Strikers U11', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36.jpeg', captain: 'Pending', sport: 'Cricket', ageCategory: 'U11', gender: 'Girls', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#eab308' },
  { id: 'c-u13-b', name: 'Tornados U13', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35%20(2).jpeg', captain: 'Pending', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#22c55e' },
  { id: 'c-u13-g', name: 'Lightning U13', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35%20(1).jpeg', captain: 'Pending', sport: 'Cricket', ageCategory: 'U13', gender: 'Girls', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#06b6d4' },
  { id: 'c-u15-b', name: 'Thunders U15', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35.jpeg', captain: 'Pending', sport: 'Cricket', ageCategory: 'U15', gender: 'Boys', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#15803d' },
  { id: 'c-u15-g', name: 'Stormers U15', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36%20(1).jpeg', captain: 'Pending', sport: 'Cricket', ageCategory: 'U15', gender: 'Girls', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#3b82f6' },
  { id: 'c-u19-b', name: 'Blaze U19', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36.jpeg', captain: 'Pending', sport: 'Cricket', ageCategory: 'U19', gender: 'Boys', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#eab308' },
  { id: 'c-u19-g', name: 'Heat U19', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35%20(2).jpeg', captain: 'Pending', sport: 'Cricket', ageCategory: 'U19', gender: 'Girls', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#22c55e' },

  // Football (Example)
  { id: 'f-u11-b', name: 'City FC U11', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.27.41%20(2).jpeg', captain: 'Pending', sport: 'Football', ageCategory: 'U11', gender: 'Boys', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#60a5fa' },
  { id: 'f-u15-b', name: 'Spurs FC U15', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.27.41%20(3).jpeg', captain: 'Pending', sport: 'Football', ageCategory: 'U15', gender: 'Boys', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#1e3a8a' },
  { id: 'f-u15-g', name: 'Blazers U15', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.27.41%20(4).jpeg', captain: 'Pending', sport: 'Football', ageCategory: 'U15', gender: 'Girls', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#ef4444' },

  // Basketball (Example)
  { id: 'b-u15-b', name: 'Warriors U15', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.25.02%20(1).jpeg', captain: 'Pending', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#1d4ed8' },
  { id: 'b-u19-g', name: 'Sonics U19', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.25.02.jpeg', captain: 'Pending', sport: 'Basketball', ageCategory: 'U19', gender: 'Girls', purseRemaining: 50, players: [], played: 0, wins: 0, losses: 0, draws: 0, points: 0, color: '#2563eb' },
];

export const PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Aryan Sharma',
    sport: 'Football',
    ageCategory: 'U15',
    gender: 'Boys',
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
    ageCategory: 'U15',
    gender: 'Boys',
    teamAId: 'f-u15-b',
    teamBId: 'f1',
    time: '16:00',
    date: '20 May 2026',
    venue: 'Main Stadium',
    status: 'Upcoming',
  },
  {
    id: 'm2',
    sport: 'Basketball',
    ageCategory: 'U15',
    gender: 'Boys',
    teamAId: 'b-u15-b',
    teamBId: 'b1',
    time: '18:30',
    date: '21 May 2026',
    venue: 'Indoor Court',
    status: 'Upcoming',
  },
  {
    id: 'm3',
    sport: 'Cricket',
    ageCategory: 'U15',
    gender: 'Boys',
    teamAId: 'c-u15-b',
    teamBId: 'c1',
    time: '10:00',
    date: '22 May 2026',
    venue: 'Cricket Ground',
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
