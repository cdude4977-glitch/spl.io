import { SportType, Team, Player, Match, Notice, AgeCategory, Gender } from './types';

const generateTeams = (): Team[] => {
  const sports: SportType[] = ['Cricket', 'Football', 'Basketball'];
  const ages: AgeCategory[] = ['U11', 'U13', 'U15', 'U19'];
  const genders: Gender[] = ['Boys', 'Girls'];
  const teamNames = ['Hurricanes', 'Strikers', 'Tornados', 'Lightning'];
  const logos = [
    'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36%20(1).jpeg',
    'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36.jpeg',
    'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35%20(2).jpeg',
    'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35%20(1).jpeg'
  ];
  const colors = ['#3b82f6', '#eab308', '#22c55e', '#ef4444'];

  const teams: Team[] = [];
  sports.forEach(sport => {
    ages.forEach(age => {
      genders.forEach(gender => {
        teamNames.forEach((name, i) => {
          teams.push({
            id: `${sport[0].toLowerCase()}-${age.toLowerCase()}-${gender[0].toLowerCase()}-${i + 1}`,
            name: `${name} ${gender[0]} ${age}`,
            logo: logos[i],
            captain: 'Pending',
            sport,
            ageCategory: age,
            gender,
            purseRemaining: 50,
            players: [],
            played: 3,
            wins: 3 - i,
            losses: i,
            draws: 0,
            points: (3 - i) * 3,
            color: colors[i]
          });
        });
      });
    });
  });
  return teams;
};

export const TEAMS: Team[] = generateTeams();

export const PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Aryan Sharma',
    sport: 'Football',
    ageCategory: 'U15',
    gender: 'Boys',
    basePrice: 500,
    currentBid: 0,
    teamId: 'f-u15-b-1',
    role: 'Forward',
    status: 'In Auction',
    photo: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=200&h=200&auto=format&fit=crop',
    stats: { matches: 8, goals: 12 }
  },
  {
    id: 'p2',
    name: 'Vihaan Gupta',
    sport: 'Cricket',
    ageCategory: 'U15',
    gender: 'Boys',
    basePrice: 1000,
    currentBid: 0,
    teamId: 'c-u15-b-1',
    role: 'All Rounder',
    status: 'In Auction',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
    stats: { matches: 12, runs: 450, wickets: 15 }
  }
];

export const MATCHES: Match[] = [
  {
    id: 'm1',
    sport: 'Football',
    ageCategory: 'U15',
    gender: 'Boys',
    teamAId: 'f-u15-b-1',
    teamBId: 'f-u15-b-2',
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
    teamAId: 'b-u15-b-1',
    teamBId: 'b-u15-b-2',
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
    teamAId: 'c-u15-b-1',
    teamBId: 'c-u15-b-2',
    time: '10:00',
    date: '23 May 2026',
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
