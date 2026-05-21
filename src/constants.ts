import { SportType, Team, Player, Match, Notice, AgeCategory, Gender } from './types';

export const SPORT_SPREADSHEETS: Record<SportType, string> = {
  'Cricket': 'https://1drv.ms/x/c/ce8aecdefb123e28/IQBUagNvmOkRTbbJ9eq4rAswATatZpFpuPDMflnE9Ycr4nY?e=yMMAeF',
  'Football': 'https://1drv.ms/x/c/ce8aecdefb123e28/IQDac6lTHNczR7SvT5D1d4rfAX0VTV6C5K-uOFRL_s23pI4?e=HMX9Mi',
  'Basketball': 'https://1drv.ms/x/c/ce8aecdefb123e28/IQBv85UxgtqZQ48AAjh6vSnGARWnQ_o_RojtDvdxdd-ls48'
};

const generateTeams = (): Team[] => {
  const sports: SportType[] = ['Cricket', 'Football', 'Basketball'];
  const ages: AgeCategory[] = ['U11', 'U13', 'U15', 'U19'];
  const genders: Gender[] = ['Boys', 'Girls'];

  const teamDefinitions: Record<SportType, { name: string; logo: string; color: string }[]> = {
    'Cricket': [
      { name: 'Shalom Hurricanes', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36%20(1).jpeg', color: '#3b82f6' },
      { name: 'Shalom Tornados', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36.jpeg', color: '#eab308' },
      { name: 'Shalom Stormers', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35%20(2).jpeg', color: '#22c55e' },
      { name: 'Shalom Lightning', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35%20(1).jpeg', color: '#06b6d4' },
      { name: 'Shalom Thunders', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35.jpeg', color: '#15803d' },
      { name: 'Shalom Kings', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36%20(1).jpeg', color: '#facc15' },
      { name: 'Shalom Titans', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-19%20at%2016.37.23%20(2).jpeg', color: '#1e1b4b' },
      { name: 'Shalom Rangers', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-19%20at%2016.37.23%20(1).jpeg', color: '#b91c1c' }
    ],
    'Football': [
      { name: 'Shalom City', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.27.41%20(2).jpeg', color: '#60a5fa' },
      { name: 'Shalom United', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.27.41%20(4).jpeg', color: '#ef4444' },
      { name: 'Shalom Spurs', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.27.41%20(3).jpeg', color: '#1e3a8a' },
      { name: 'Shalom Athletico', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.27.40%20(3).jpeg', color: '#dc2626' },
      { name: 'Real Shalom', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.27.40%20(2).jpeg', color: '#111827' },
      { name: 'Shalom Blazers', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.36%20(1).jpeg', color: '#fb923c' }
    ],
    'Basketball': [
      { name: 'Shalom Hills Warriors', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.25.02%20(1).jpeg', color: '#1d4ed8' },
      { name: 'Shalom Hills Sonics', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.25.02.jpeg', color: '#2563eb' },
      { name: 'Shalom Hills Pacers', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.25.01%20(1).jpeg', color: '#fbbf24' },
      { name: 'Shalom Hills Thunder', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.32.35.jpeg', color: '#4338ca' },
      { name: 'Shalom Hills Swishers', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-19%20at%2019.08.23.jpeg', color: '#8b5cf6' },
      { name: 'Shalom Hills Spurs', logo: 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.27.41%20(3).jpeg', color: '#1e3a8a' }
    ]
  };

  const teams: Team[] = [];
  sports.forEach(sport => {
    ages.forEach(age => {
      genders.forEach(gender => {
        teamDefinitions[sport].forEach((def, i) => {
          const teamId = `${sport[0].toLowerCase()}-${age.toLowerCase()}-${gender[0].toLowerCase()}-${i + 1}`;
          teams.push({
            id: teamId,
            name: def.name,
            logo: def.logo,
            captain: 'TBD',
            sport,
            ageCategory: age,
            gender,
            purseRemaining: 50,
            players: [],
            played: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            points: 0,
            gf: 0,
            ga: 0,
            gd: 0,
            color: def.color
          });
        });
      });
    });
  });

  // --- Manual Overrides from User Images ---
  
  // Football U15 Boys
  const f_u15_b_overrides: Record<string, Partial<Team>> = {
    'f-u15-b-5': { played: 2, wins: 2, losses: 0, draws: 0, points: 6, gf: 8, ga: 2, gd: 6 }, // Real Shalom
    'f-u15-b-2': { played: 3, wins: 2, losses: 1, draws: 0, points: 6, gf: 11, ga: 9, gd: 2 }, // F.C Shalom (United)
    'f-u15-b-4': { played: 3, wins: 1, losses: 1, draws: 1, points: 4, gf: 12, ga: 6, gd: 6 }, // Shalom Athletico
    'f-u15-b-3': { played: 3, wins: 1, losses: 2, draws: 0, points: 3, gf: 10, ga: 17, gd: -7 }, // Shalom Spurs
    'f-u15-b-1': { played: 3, wins: 0, losses: 2, draws: 1, points: 1, gf: 2, ga: 9, gd: -7 }, // Shalom City
  };

  // Football U19 Boys
  const f_u19_b_overrides: Record<string, Partial<Team>> = {
    'f-u19-b-2': { played: 4, wins: 3, losses: 0, draws: 1, points: 10, gf: 11, ga: 6, gd: 5 }, // Shalom United
    'f-u19-b-4': { played: 4, wins: 2, losses: 1, draws: 1, points: 7, gf: 12, ga: 10, gd: 2 }, // Shalom Athletico
    'f-u19-b-1': { played: 4, wins: 1, losses: 2, draws: 0, points: 4, gf: 7, ga: 9, gd: -2 }, // Shalom City
    'f-u19-b-5': { played: 4, wins: 1, losses: 2, draws: 1, points: 4, gf: 8, ga: 11, gd: -3 }, // Real Shalom
    'f-u19-b-3': { played: 4, wins: 1, losses: 3, draws: 0, points: 3, gf: 9, ga: 11, gd: -2 }, // Shalom Spurs
  };

  // Basketball U11/U13 Girls
  const b_u11_u13_g_overrides: Record<string, Partial<Team>> = {
    'b-u11-g-3': { played: 3, wins: 3, losses: 0, draws: 0, points: 6 }, // Pacers
    'b-u11-g-1': { played: 3, wins: 2, losses: 1, draws: 0, points: 4 }, // Warriors
    'b-u11-g-2': { played: 3, wins: 2, losses: 1, draws: 0, points: 4 }, // Sonics
    'b-u11-g-5': { played: 3, wins: 1, losses: 2, draws: 0, points: 2 }, // Swishers
    'b-u13-g-3': { played: 3, wins: 3, losses: 0, draws: 0, points: 6 },
    'b-u13-g-1': { played: 3, wins: 2, losses: 1, draws: 0, points: 4 },
    'b-u13-g-2': { played: 3, wins: 2, losses: 1, draws: 0, points: 4 },
    'b-u13-g-5': { played: 3, wins: 1, losses: 2, draws: 0, points: 2 },
  };

  // Basketball U11/U13 Boys
  const b_u11_u13_b_overrides: Record<string, Partial<Team>> = {
    'b-u11-b-2': { played: 3, wins: 3, losses: 0, draws: 0, points: 6 }, // Sonics
    'b-u11-b-3': { played: 3, wins: 2, losses: 1, draws: 0, points: 4 }, // Pacers
    'b-u11-b-1': { played: 3, wins: 1, losses: 2, draws: 0, points: 2 }, // Warriors
    'b-u11-b-5': { played: 3, wins: 0, losses: 3, draws: 0, points: 0 }, // Swishers
    'b-u13-b-2': { played: 3, wins: 3, losses: 0, draws: 0, points: 6 },
    'b-u13-b-3': { played: 3, wins: 2, losses: 1, draws: 0, points: 4 },
    'b-u13-b-1': { played: 3, wins: 1, losses: 2, draws: 0, points: 2 },
    'b-u13-b-5': { played: 3, wins: 0, losses: 3, draws: 0, points: 0 },
  };

  // Basketball U15 Boys
  const b_u15_b_overrides: Record<string, Partial<Team>> = {
    'b-u15-b-2': { played: 3, wins: 3, losses: 0, draws: 0, points: 6 }, // Sonics
    'b-u15-b-5': { played: 3, wins: 2, losses: 1, draws: 0, points: 4 }, // Swishers
    'b-u15-b-1': { played: 3, wins: 2, losses: 1, draws: 0, points: 4 }, // Warriors
    'b-u15-b-3': { played: 3, wins: 0, losses: 3, draws: 0, points: 0 }, // Pacers
  };

  // Basketball U15/U18 Girls
  const b_u15_u18_g_overrides: Record<string, Partial<Team>> = {
    'b-u15-g-1': { played: 2, wins: 2, losses: 0, draws: 0, points: 4 }, // Warriors
    'b-u15-g-5': { played: 2, wins: 1, losses: 1, draws: 0, points: 2 }, // Swishers
    'b-u15-g-2': { played: 2, wins: 1, losses: 1, draws: 0, points: 2 }, // Sonics
    'b-u15-g-3': { played: 2, wins: 0, losses: 2, draws: 0, points: 0 }, // Pacers
    'b-u19-g-1': { played: 2, wins: 2, losses: 0, draws: 0, points: 4 }, // Adding U18/U19 girls overrides
    'b-u19-g-5': { played: 2, wins: 1, losses: 1, draws: 0, points: 2 },
    'b-u19-g-2': { played: 2, wins: 1, losses: 1, draws: 0, points: 2 },
    'b-u19-g-3': { played: 2, wins: 0, losses: 2, draws: 0, points: 0 },
  };

  // Basketball U18 Boys (Mapped to U19)
  const b_u18_b_overrides: Record<string, Partial<Team>> = {
    'b-u19-b-5': { played: 2, wins: 2, losses: 0, draws: 0, points: 4 }, // Swishers
    'b-u19-b-3': { played: 2, wins: 1, losses: 1, draws: 0, points: 2 }, // Pacers
    'b-u19-b-1': { played: 2, wins: 0, losses: 2, draws: 0, points: 0 }, // Warriors
    'b-u19-b-4': { played: 2, wins: 1, losses: 0, draws: 0, points: 2 }, // Thunder
    'b-u19-b-2': { played: 2, wins: 1, losses: 0, draws: 0, points: 2 }, // Sonics
    'b-u19-b-6': { played: 2, wins: 0, losses: 2, draws: 0, points: 0 }, // Spurs
  };

  // Cricket U11 Boys
  const c_u11_b_overrides: Record<string, Partial<Team>> = {
    'c-u11-b-1': { played: 2, wins: 1, losses: 1, draws: 0, points: 3 }, // Hurricanes
    'c-u11-b-5': { played: 2, wins: 1, losses: 1, draws: 0, points: 3 }, // Thunders
    'c-u11-b-3': { played: 2, wins: 1, losses: 1, draws: 0, points: 3 }, // Stormers
  };

  // Cricket U13 Boys
  const c_u13_b_overrides: Record<string, Partial<Team>> = {
    'c-u13-b-1': { played: 2, wins: 1, losses: 1, draws: 0, points: 3 }, // Hurricanes
    'c-u13-b-2': { played: 2, wins: 2, losses: 0, draws: 0, points: 6 }, // Tornados
    'c-u13-b-5': { played: 2, wins: 0, losses: 2, draws: 0, points: 0 }, // Thunders
    'c-u13-b-3': { played: 2, wins: 1, losses: 1, draws: 0, points: 3 }, // Stormers
    'c-u13-b-4': { played: 1, wins: 0, losses: 1, draws: 0, points: 0 }, // Lightning
    'c-u13-b-6': { played: 1, wins: 1, losses: 0, draws: 0, points: 3 }, // Kings
    'c-u13-b-7': { played: 1, wins: 1, losses: 0, draws: 0, points: 3 }, // Titans
    'c-u13-b-8': { played: 1, wins: 0, losses: 1, draws: 0, points: 0 }, // Rangers
  };

  // Cricket U15 Boys
  const c_u15_b_overrides: Record<string, Partial<Team>> = {
    'c-u15-b-1': { played: 1, wins: 0, losses: 1, draws: 0, points: 0 }, // Hurricanes
    'c-u15-b-3': { played: 1, wins: 0, losses: 1, draws: 0, points: 0 }, // Stormers
    'c-u15-b-4': { played: 1, wins: 1, losses: 0, draws: 0, points: 3 }, // Lightning
    'c-u15-b-2': { played: 1, wins: 1, losses: 0, draws: 0, points: 3 }, // Tornados
  };

  // Cricket U19 Boys
  const c_u19_b_overrides: Record<string, Partial<Team>> = {
    'c-u19-b-1': { played: 2, wins: 0, losses: 2, draws: 0, points: 0 }, // Hurricanes
    'c-u19-b-5': { played: 1, wins: 1, losses: 0, draws: 0, points: 3 }, // Thunders
    'c-u19-b-3': { played: 1, wins: 1, losses: 0, draws: 0, points: 3 }, // Stormers
  };

  // Football U13 & Girls
  const f_u13_g_overrides: Record<string, Partial<Team>> = {
    'f-u13-b-5': { played: 1, wins: 1, losses: 0, draws: 0, points: 3, gf: 2, ga: 1, gd: 1 }, // Real Shalom
    'f-u13-b-2': { played: 1, wins: 0, losses: 0, draws: 1, points: 1, gf: 3, ga: 3, gd: 0 }, // Shalom United
    'f-u13-b-4': { played: 1, wins: 0, losses: 0, draws: 1, points: 1, gf: 4, ga: 4, gd: 0 }, // Shalom Athletico
    'f-u13-b-3': { played: 1, wins: 0, losses: 0, draws: 1, points: 1, gf: 4, ga: 4, gd: 0 }, // Shalom Spurs
    'f-u13-b-6': { played: 1, wins: 0, losses: 0, draws: 1, points: 1, gf: 3, ga: 3, gd: 0 }, // Shalom Blazers
    'f-u13-b-1': { played: 1, wins: 0, losses: 1, draws: 0, points: 0, gf: 1, ga: 2, gd: -1 }, // Shalom City
  };

  teams.forEach(team => {
    if (f_u13_g_overrides[team.id]) Object.assign(team, f_u13_g_overrides[team.id]);
    if (f_u15_b_overrides[team.id]) Object.assign(team, f_u15_b_overrides[team.id]);
    if (f_u19_b_overrides[team.id]) Object.assign(team, f_u19_b_overrides[team.id]);
    if (b_u11_u13_g_overrides[team.id]) Object.assign(team, b_u11_u13_g_overrides[team.id]);
    if (b_u11_u13_b_overrides[team.id]) Object.assign(team, b_u11_u13_b_overrides[team.id]);
    if (b_u15_b_overrides[team.id]) Object.assign(team, b_u15_b_overrides[team.id]);
    if (b_u15_u18_g_overrides[team.id]) Object.assign(team, b_u15_u18_g_overrides[team.id]);
    if (b_u18_b_overrides[team.id]) Object.assign(team, b_u18_b_overrides[team.id]);
    if (c_u11_b_overrides[team.id]) Object.assign(team, c_u11_b_overrides[team.id]);
    if (c_u13_b_overrides[team.id]) Object.assign(team, c_u13_b_overrides[team.id]);
    if (c_u15_b_overrides[team.id]) Object.assign(team, c_u15_b_overrides[team.id]);
    if (c_u19_b_overrides[team.id]) Object.assign(team, c_u19_b_overrides[team.id]);
  });

  return teams;
};

export const TEAMS: Team[] = generateTeams();

export const PLAYERS: Player[] = [
  // --- U11 & 13 GIRLS (Mapped to U11 Girls) ---
  // Pacers
  { id: 'bp-g1', name: 'Dilisha Tyagi', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 300, currentBid: 0, teamId: 'b-u11-g-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g2', name: 'Ananya Goyal', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 10, currentBid: 0, teamId: 'b-u11-g-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g3', name: 'Khushi Yadav', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 60, currentBid: 0, teamId: 'b-u11-g-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g4', name: 'Charvika Mishra', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 30, currentBid: 0, teamId: 'b-u11-g-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Swishers
  { id: 'bp-g5', name: 'Sanskriti Thaman', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 300, currentBid: 0, teamId: 'b-u11-g-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g6', name: 'Rafiya Khan', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 100, currentBid: 0, teamId: 'b-u11-g-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g7', name: 'Navaanya Anand', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 30, currentBid: 0, teamId: 'b-u11-g-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g8', name: 'Anaisha Bajaj', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 20, currentBid: 0, teamId: 'b-u11-g-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Warriors
  { id: 'bp-g9', name: 'Gungun', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 300, currentBid: 0, teamId: 'b-u11-g-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g10', name: 'Mehr Fatima Nadeem', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 100, currentBid: 0, teamId: 'b-u11-g-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g11', name: 'Annahita', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 20, currentBid: 0, teamId: 'b-u11-g-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g12', name: 'Vani Singh', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 30, currentBid: 0, teamId: 'b-u11-g-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Sonics
  { id: 'bp-g13', name: 'Sarakshi Sharma', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 300, currentBid: 0, teamId: 'b-u11-g-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g14', name: 'Daksha Yadav', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 35, currentBid: 0, teamId: 'b-u11-g-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g15', name: 'Shanaya Gandhi', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 75, currentBid: 0, teamId: 'b-u11-g-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g16', name: 'Arya Sharma', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', basePrice: 30, currentBid: 0, teamId: 'b-u11-g-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },

  // --- U11 & 13 BOYS (Mapped to U11 Boys) ---
  // Pacers
  { id: 'bp-b1', name: 'Aadvik Kumar', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u11-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b2', name: 'Ivaan Sahany', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 15, currentBid: 0, teamId: 'b-u11-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b3', name: 'Reyansh Sehagal', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 30, currentBid: 0, teamId: 'b-u11-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b4', name: 'Advik Budania', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 100, currentBid: 0, teamId: 'b-u11-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Swishers
  { id: 'bp-b5', name: 'Ridhaan Gupta', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u11-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b6', name: 'Advit Singh', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 60, currentBid: 0, teamId: 'b-u11-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b7', name: 'Aayush Ubana', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 25, currentBid: 0, teamId: 'b-u11-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b8', name: 'Aditya Jain', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 100, currentBid: 0, teamId: 'b-u11-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Warriors
  { id: 'bp-b9', name: 'Prayag Yadav', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u11-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b10', name: 'Devyansh', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 40, currentBid: 0, teamId: 'b-u11-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b11', name: 'Daivik Kant', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 45, currentBid: 0, teamId: 'b-u11-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b12', name: 'Sahil Naqvi', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 100, currentBid: 0, teamId: 'b-u11-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b13', name: 'Yuvraaj Bhatt', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 10, currentBid: 0, teamId: 'b-u11-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Sonics
  { id: 'bp-b14', name: 'Divyansh Goyal', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u11-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b15', name: 'Dhairya Kadd', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 100, currentBid: 0, teamId: 'b-u11-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b16', name: 'Viraj Tripathi', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 10, currentBid: 0, teamId: 'b-u11-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b17', name: 'Lakshay Kansal', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', basePrice: 30, currentBid: 0, teamId: 'b-u11-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },

  // --- U15 BOYS ---
  // Pacers
  { id: 'bp-b18', name: 'Bhomik Yadav', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u15-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b19', name: 'Apurv Verma', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 100, currentBid: 0, teamId: 'b-u15-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b20', name: 'Neil Tyagi', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 10, currentBid: 0, teamId: 'b-u15-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Swishers
  { id: 'bp-b21', name: 'Arunodaya Singh', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u15-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b22', name: 'Reyhaan Shahzad', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 50, currentBid: 0, teamId: 'b-u15-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b23', name: 'Anish Singh', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 10, currentBid: 0, teamId: 'b-u15-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Warriors
  { id: 'bp-b24', name: 'Abhinav Yadav', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u15-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b25', name: 'Arnav Yadav', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 85, currentBid: 0, teamId: 'b-u15-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b26', name: 'Viraaj Bhargava', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 100, currentBid: 0, teamId: 'b-u15-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Sonics
  { id: 'bp-b27', name: 'Arjun Singh', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u15-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b28', name: 'Ansh', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 100, currentBid: 0, teamId: 'b-u15-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b29', name: 'Daiwik Yadav', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', basePrice: 60, currentBid: 0, teamId: 'b-u15-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },

  // --- U15 & 18 GIRLS (Mapped to U15 Girls) ---
  // Pacers
  { id: 'bp-g17', name: 'Ditya Ahuja', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 300, currentBid: 0, teamId: 'b-u15-g-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g18', name: 'Aashita Singh', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 25, currentBid: 0, teamId: 'b-u15-g-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g19', name: 'Himanshi', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 120, currentBid: 0, teamId: 'b-u15-g-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g20', name: 'Saanvi', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 45, currentBid: 0, teamId: 'b-u15-g-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Swishers
  { id: 'bp-g21', name: 'Saavi', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 300, currentBid: 0, teamId: 'b-u15-g-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g22', name: 'Vartika Jadwanshi', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 10, currentBid: 0, teamId: 'b-u15-g-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g23', name: 'Vaibhavi', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 65, currentBid: 0, teamId: 'b-u15-g-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g24', name: 'Aahna Singla', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 75, currentBid: 0, teamId: 'b-u15-g-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Warriors
  { id: 'bp-g25', name: 'Anushka Chopra', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 300, currentBid: 0, teamId: 'b-u15-g-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g26', name: 'Nandini Pandey', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 90, currentBid: 0, teamId: 'b-u15-g-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g27', name: 'Ridhi', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 110, currentBid: 0, teamId: 'b-u15-g-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g28', name: 'Siddhiksha', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 20, currentBid: 0, teamId: 'b-u15-g-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Sonics
  { id: 'bp-g29', name: 'Harshika', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 300, currentBid: 0, teamId: 'b-u15-g-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g30', name: 'Aaira', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 40, currentBid: 0, teamId: 'b-u15-g-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g31', name: 'Yahvi Gupta', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 250, currentBid: 0, teamId: 'b-u15-g-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-g32', name: 'Kashish', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', basePrice: 35, currentBid: 0, teamId: 'b-u15-g-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },

  // --- U18 BOYS (Mapped to U19 Boys) ---
  // Pacers
  { id: 'bp-b30', name: 'Jatin Karkra', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u19-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b31', name: 'Ayaan Kakkar', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 395, currentBid: 0, teamId: 'b-u19-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b32', name: 'Arnav Rao', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 50, currentBid: 0, teamId: 'b-u19-b-3', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Swishers
  { id: 'bp-b33', name: 'Ansh', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u19-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b34', name: 'Abhinav Yadav', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 330, currentBid: 0, teamId: 'b-u19-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b35', name: 'Anant Tyagi', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 115, currentBid: 0, teamId: 'b-u19-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b36', name: 'Harshit Chabra', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 10, currentBid: 0, teamId: 'b-u19-b-5', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Warriors
  { id: 'bp-b37', name: 'Viaan Lochab', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u19-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b38', name: 'Lakshya Chaudhary', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 200, currentBid: 0, teamId: 'b-u19-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b39', name: 'Hardik Nasa', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 30, currentBid: 0, teamId: 'b-u19-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b40', name: 'Aryan Kansal', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 150, currentBid: 0, teamId: 'b-u19-b-1', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  // Sonics
  { id: 'bp-b41', name: 'Grahish Sheoran', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 300, currentBid: 0, teamId: 'b-u19-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b42', name: 'Akshat', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 50, currentBid: 0, teamId: 'b-u19-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b43', name: 'Shaurya Sewani', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 320, currentBid: 0, teamId: 'b-u19-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
  { id: 'bp-b44', name: 'Anshul Pandey', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', basePrice: 125, currentBid: 0, teamId: 'b-u19-b-2', role: 'Player', status: 'In Auction', photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=200&auto=format&fit=crop', stats: { matches: 0, points: 0 } },
];

export const MATCHES: Match[] = [
  // --- CRICKET 20 MAY (WED) ---
  { id: 'c-u13-wed-1', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-1', teamBId: 'c-u13-b-3', time: '06:00 - 06:30 AM', date: '20 May 2026', venue: 'Cricket Ground', status: 'Completed', score: 'Hurricanes won by 1 wicket', winnerId: 'c-u13-b-1', motm: 'Sahi Singh (10 runs, 1 wkt)' },
  { id: 'c-u13-wed-2', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-5', teamBId: 'c-u13-b-2', time: '06:30 - 07:00 AM', date: '20 May 2026', venue: 'Cricket Ground', status: 'Completed', score: 'Tornados won by 6 wickets', winnerId: 'c-u13-b-2', motm: 'Harsit Jha (14 runs, 1 wkt)' },
  { id: 'c-u11-wed-1', sport: 'Cricket', ageCategory: 'U11', gender: 'Boys', teamAId: 'c-u11-b-1', teamBId: 'c-u11-b-5', time: '07:00 - 07:30 AM', date: '20 May 2026', venue: 'Cricket Ground', status: 'Completed', score: 'Thunders won by 20 runs', winnerId: 'c-u11-b-5', motm: 'Ahsan Ul Huq (15 runs, 1 wkt)' },
  { id: 'c-u11-wed-2', sport: 'Cricket', ageCategory: 'U11', gender: 'Boys', teamAId: 'c-u11-b-1', teamBId: 'c-u11-b-3', time: '07:30 - 08:00 AM', date: '20 May 2026', venue: 'Cricket Ground', status: 'Completed', score: 'Hurricanes won by 16 runs', winnerId: 'c-u11-b-1', motm: 'Devansh (16 runs, 1 wkt)' },
  // Evening
  { id: 'c-u19-wed-1', sport: 'Cricket', ageCategory: 'U19', gender: 'Boys', teamAId: 'c-u19-b-1', teamBId: 'c-u19-b-3', time: '04:00 - 04:30 PM', date: '20 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u19-wed-2', sport: 'Cricket', ageCategory: 'U19', gender: 'Boys', teamAId: 'c-u19-b-1', teamBId: 'c-u19-b-5', time: '04:30 - 05:00 PM', date: '20 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u15-wed-1', sport: 'Cricket', ageCategory: 'U15', gender: 'Boys', teamAId: 'c-u15-b-1', teamBId: 'c-u15-b-4', time: '05:00 - 05:30 PM', date: '20 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u15-wed-2', sport: 'Cricket', ageCategory: 'U15', gender: 'Boys', teamAId: 'c-u15-b-2', teamBId: 'c-u15-b-3', time: '05:30 - 06:00 PM', date: '20 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },

  // --- CRICKET 21 MAY (THUR) ---
  { id: 'c-u13-thu-1', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-1', teamBId: 'c-u13-b-2', time: '06:00 - 06:30 AM', date: '21 May 2026', venue: 'Cricket Ground (Pool A)', status: 'Completed', score: 'Tornados won by 7 wickets', winnerId: 'c-u13-b-2', motm: 'Harshit Jha (39 runs)' },
  { id: 'c-u13-thu-2', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-5', teamBId: 'c-u13-b-3', time: '06:30 - 07:00 AM', date: '21 May 2026', venue: 'Cricket Ground (Pool A)', status: 'Completed', score: 'Stormers won by 4 wickets', winnerId: 'c-u13-b-3', motm: 'Dhruv Yadav (25 runs)' },
  { id: 'c-u13-thu-3', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-6', teamBId: 'c-u13-b-4', time: '07:00 - 07:30 AM', date: '21 May 2026', venue: 'Cricket Ground (Pool B)', status: 'Completed', score: 'Kings won by 5 wickets', winnerId: 'c-u13-b-6', motm: 'Tegh Singh (25 runs, 1 wkt)' },
  { id: 'c-u13-thu-4', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-7', teamBId: 'c-u13-b-8', time: '07:30 - 08:00 AM', date: '21 May 2026', venue: 'Cricket Ground (Pool B)', status: 'Completed', score: 'Titans won by 6 wickets', winnerId: 'c-u13-b-7', motm: 'Rudraksh (40 runs)' },
  { id: 'c-u11-thu-1', sport: 'Cricket', ageCategory: 'U11', gender: 'Boys', teamAId: 'c-u11-b-5', teamBId: 'c-u11-b-3', time: '08:00 - 08:30 AM', date: '21 May 2026', venue: 'Cricket Ground', status: 'Completed', score: 'Stormers won by 19 runs', winnerId: 'c-u11-b-3', motm: 'Evaan (3 wickts)' },
  { id: 'c-u19-thu-1', sport: 'Cricket', ageCategory: 'U19', gender: 'Boys', teamAId: 'c-u19-b-5', teamBId: 'c-u19-b-3', time: '04:00 - 04:30 PM', date: '21 May 2026', venue: 'Cricket Ground', status: 'Completed', score: 'Stormers won by 5 wickets', winnerId: 'c-u19-b-3', motm: 'Gaurv Yadav (26 runs)' },
  { id: 'c-u19-thu-2', sport: 'Cricket', ageCategory: 'U19', gender: 'Boys', teamAId: 'c-u19-b-5', teamBId: 'c-u19-b-1', time: '04:30 - 05:00 PM', date: '21 May 2026', venue: 'Cricket Ground', status: 'Completed', score: 'Thunders won by 6 wickets', winnerId: 'c-u19-b-5', motm: 'Moksh (51 runs)' },
  { id: 'c-u15-thu-1', sport: 'Cricket', ageCategory: 'U15', gender: 'Boys', teamAId: 'c-u15-b-1', teamBId: 'c-u15-b-4', time: '05:00 - 05:30 PM', date: '21 May 2026', venue: 'Cricket Ground', status: 'Completed', score: 'Lightning won by 7 wickets', winnerId: 'c-u15-b-4', motm: 'Aarav Mane (22 runs)' },
  { id: 'c-u15-thu-2', sport: 'Cricket', ageCategory: 'U15', gender: 'Boys', teamAId: 'c-u15-b-3', teamBId: 'c-u15-b-2', time: '05:30 - 06:00 PM', date: '21 May 2026', venue: 'Cricket Ground', status: 'Completed', score: 'Tornados won by 12 runs', winnerId: 'c-u15-b-2', motm: 'Harish (43 runs)' },

  // --- CRICKET 22 MAY (FRI) ---
  { id: 'c-u13-fri-1', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-1', teamBId: 'c-u13-b-5', time: '06:00 - 06:30 AM', date: '22 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u13-fri-2', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-2', teamBId: 'c-u13-b-3', time: '06:30 - 07:00 AM', date: '22 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u13-fri-3', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-6', teamBId: 'c-u13-b-7', time: '07:00 - 07:30 AM', date: '22 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u13-fri-4', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-4', teamBId: 'c-u13-b-8', time: '07:30 - 08:00 AM', date: '22 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u11-final', sport: 'Cricket', ageCategory: 'U11', gender: 'Boys', teamAId: 'TBD', teamBId: 'TBD', time: '08:00 - 08:30 AM', date: '22 May 2026', venue: 'Cricket Ground', status: 'Upcoming', score: 'FINAL' },
  { id: 'c-u19-fri-1', sport: 'Cricket', ageCategory: 'U19', gender: 'Boys', teamAId: 'c-u19-b-3', teamBId: 'c-u19-b-5', time: '04:00 - 04:30 PM', date: '22 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u19-fri-2', sport: 'Cricket', ageCategory: 'U19', gender: 'Boys', teamAId: 'c-u19-b-3', teamBId: 'c-u19-b-1', time: '04:30 - 05:00 PM', date: '22 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u15-fri-1', sport: 'Cricket', ageCategory: 'U15', gender: 'Boys', teamAId: 'c-u15-b-1', teamBId: 'c-u15-b-3', time: '05:00 - 05:30 PM', date: '22 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u15-fri-2', sport: 'Cricket', ageCategory: 'U15', gender: 'Boys', teamAId: 'c-u15-b-2', teamBId: 'c-u15-b-4', time: '05:30 - 06:00 PM', date: '22 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },

  // --- CRICKET 23 MAY (SAT) ---
  { id: 'c-u13-sat-1', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-6', teamBId: 'c-u13-b-8', time: '06:00 - 06:30 AM', date: '23 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u13-sat-2', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'c-u13-b-4', teamBId: 'c-u13-b-7', time: '06:30 - 07:00 AM', date: '23 May 2026', venue: 'Cricket Ground', status: 'Upcoming' },
  { id: 'c-u13-final', sport: 'Cricket', ageCategory: 'U13', gender: 'Boys', teamAId: 'TBD', teamBId: 'TBD', time: '07:00 - 07:30 AM', date: '23 May 2026', venue: 'Cricket Ground', status: 'Upcoming', score: 'FINAL' },
  { id: 'c-u15-final', sport: 'Cricket', ageCategory: 'U15', gender: 'Boys', teamAId: 'TBD', teamBId: 'TBD', time: '07:45 - 08:30 AM', date: '23 May 2026', venue: 'Cricket Ground', status: 'Upcoming', score: 'FINAL' },

  // --- OTHER SPORTS (Existing results kept) ---
  { id: 'f-u19-res-1', sport: 'Football', ageCategory: 'U19', gender: 'Boys', teamAId: 'f-u19-b-2', teamBId: 'f-u19-b-5', time: '08:00 AM', date: '21 May 2026', venue: 'Ground 1', status: 'Completed', score: 'United won 4-1', winnerId: 'f-u19-b-2' },
  { id: 'f-u19-res-2', sport: 'Football', ageCategory: 'U19', gender: 'Boys', teamAId: 'f-u19-b-2', teamBId: 'f-u19-b-1', time: '08:30 AM', date: '21 May 2026', venue: 'Ground 1', status: 'Completed', score: 'Match Draw 1-1' },
  { id: 'f-u19-res-3', sport: 'Football', ageCategory: 'U19', gender: 'Boys', teamAId: 'f-u19-b-3', teamBId: 'f-u19-b-1', time: '09:00 AM', date: '21 May 2026', venue: 'Ground 1', status: 'Completed', score: 'Spurs won 3-2', winnerId: 'f-u19-b-3' },
  { id: 'f-u19-res-4', sport: 'Football', ageCategory: 'U19', gender: 'Boys', teamAId: 'f-u19-b-3', teamBId: 'f-u19-b-4', time: '09:30 AM', date: '21 May 2026', venue: 'Ground 1', status: 'Completed', score: 'Athletico won 4-3', winnerId: 'f-u19-b-4' },
  { id: 'f-u19-res-5', sport: 'Football', ageCategory: 'U19', gender: 'Boys', teamAId: 'f-u19-b-5', teamBId: 'f-u19-b-4', time: '10:00 AM', date: '21 May 2026', venue: 'Ground 1', status: 'Completed', score: 'Match Draw 3-3' },
  
  { id: 'f-u15-res-1', sport: 'Football', ageCategory: 'U15', gender: 'Boys', teamAId: 'f-u15-b-2', teamBId: 'f-u15-b-1', time: '10:30 AM', date: '21 May 2026', venue: 'Ground 1', status: 'Completed', score: 'FC Shalom won 4-1', winnerId: 'f-u15-b-2' },
  { id: 'f-u15-res-2', sport: 'Football', ageCategory: 'U15', gender: 'Boys', teamAId: 'f-u15-b-2', teamBId: 'f-u15-b-4', time: '11:00 AM', date: '21 May 2026', venue: 'Ground 1', status: 'Completed', score: 'FC Shalom won 3-2', winnerId: 'f-u15-b-2' },
  { id: 'f-u15-res-3', sport: 'Football', ageCategory: 'U15', gender: 'Boys', teamAId: 'f-u15-b-1', teamBId: 'f-u15-b-5', time: '11:30 AM', date: '21 May 2026', venue: 'Ground 1', status: 'Completed', score: 'Real Shalom won 4-0', winnerId: 'f-u15-b-5' },
  { id: 'f-u15-res-4', sport: 'Football', ageCategory: 'U15', gender: 'Boys', teamAId: 'f-u15-b-3', teamBId: 'f-u15-b-4', time: '12:00 PM', date: '21 May 2026', venue: 'Ground 1', status: 'Completed', score: 'Athletico won 9-2', winnerId: 'f-u15-b-4' },

  { id: 'fm1', sport: 'Football', ageCategory: 'U19', gender: 'Boys', teamAId: 'f-u19-b-4', teamBId: 'f-u19-b-2', time: '06:00 - 06:30 AM', date: '20 May 2026', venue: 'Ground 1', status: 'Completed', winnerId: 'f-u19-b-2', score: 'United won 3-2' },
  { id: 'fm2', sport: 'Football', ageCategory: 'U19', gender: 'Boys', teamAId: 'f-u19-b-4', teamBId: 'f-u19-b-1', time: '06:30 - 07:00 AM', date: '20 May 2026', venue: 'Ground 1', status: 'Completed', winnerId: 'f-u19-b-4', score: 'Athletico won 3-1' },
  { id: 'bm1', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', teamAId: 'b-u15-b-3', teamBId: 'b-u15-b-1', time: '06:00 - 06:30 AM', date: '20 May 2026', venue: 'Court 1', status: 'Completed', winnerId: 'b-u15-b-1', score: 'Warriors won' },
  { id: 'bm5', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', teamAId: 'b-u11-g-3', teamBId: 'b-u11-g-1', time: '06:00 - 06:30 AM', date: '20 May 2026', venue: 'Court 2', status: 'Completed', winnerId: 'b-u11-g-3', score: 'Pacers won' },
  { id: 'bm6', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', teamAId: 'b-u11-g-5', teamBId: 'b-u11-g-2', time: '06:30 - 07:00 AM', date: '20 May 2026', venue: 'Court 2', status: 'Completed', winnerId: 'b-u11-g-5', score: 'Swishers won' },
  { id: 'bm7', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', teamAId: 'b-u11-g-3', teamBId: 'b-u11-g-5', time: '07:00 - 07:30 AM', date: '21 May 2026', venue: 'Court 2', status: 'Completed', winnerId: 'b-u11-g-3', score: 'Pacers won' },
  { id: 'bm8', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', teamAId: 'b-u11-g-1', teamBId: 'b-u11-g-2', time: '07:30 - 08:00 AM', date: '21 May 2026', venue: 'Court 2', status: 'Completed', winnerId: 'b-u11-g-1', score: 'Warriors won' },

  // --- BASKETBALL 21 MAY (THUR) ---
  // Court 1 (U18/U19 Boys)
  { id: 'b-u19-thu-1', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', teamAId: 'b-u19-b-3', teamBId: 'b-u19-b-5', time: '06:00 - 06:30 AM', date: '21 May 2026', venue: 'Court 1', status: 'Upcoming' },
  { id: 'b-u19-thu-2', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', teamAId: 'b-u19-b-1', teamBId: 'b-u19-b-5', time: '06:30 - 07:00 AM', date: '21 May 2026', venue: 'Court 1', status: 'Upcoming' },
  { id: 'b-u19-thu-3', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', teamAId: 'b-u19-b-3', teamBId: 'b-u19-b-1', time: '07:00 - 07:30 AM', date: '21 May 2026', venue: 'Court 1', status: 'Upcoming' },
  { id: 'b-u19-thu-4', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', teamAId: 'b-u19-b-4', teamBId: 'b-u19-b-6', time: '07:30 - 08:00 AM', date: '21 May 2026', venue: 'Court 1', status: 'Upcoming' },
  { id: 'b-u19-thu-5', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', teamAId: 'b-u19-b-2', teamBId: 'b-u19-b-4', time: '08:00 - 08:30 AM', date: '21 May 2026', venue: 'Court 1', status: 'Upcoming' },
  { id: 'b-u19-thu-6', sport: 'Basketball', ageCategory: 'U19', gender: 'Boys', teamAId: 'b-u19-b-6', teamBId: 'b-u19-b-2', time: '08:30 - 09:00 AM', date: '21 May 2026', venue: 'Court 1', status: 'Upcoming' },
  
  // Court 2 (U15/U18 Girls -> mapped to U15 Girls)
  { id: 'b-u15g-thu-1', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', teamAId: 'b-u15-g-3', teamBId: 'b-u15-g-1', time: '06:00 - 06:30 AM', date: '21 May 2026', venue: 'Court 2', status: 'Upcoming' },
  { id: 'b-u15g-thu-2', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', teamAId: 'b-u15-g-5', teamBId: 'b-u15-g-2', time: '06:30 - 07:00 AM', date: '21 May 2026', venue: 'Court 2', status: 'Upcoming' },
  { id: 'b-u15g-thu-3', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', teamAId: 'b-u15-g-2', teamBId: 'b-u15-g-1', time: '07:00 - 07:30 AM', date: '21 May 2026', venue: 'Court 2', status: 'Upcoming' },
  { id: 'b-u15g-thu-4', sport: 'Basketball', ageCategory: 'U15', gender: 'Girls', teamAId: 'b-u15-g-3', teamBId: 'b-u15-g-5', time: '07:30 - 08:00 AM', date: '21 May 2026', venue: 'Court 2', status: 'Upcoming' },

  // Court 3 (Mixed)
  { id: 'b-u11g-thu-1', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', teamAId: 'b-u11-g-1', teamBId: 'b-u11-g-5', time: '06:00 - 06:30 AM', date: '21 May 2026', venue: 'Court 3', status: 'Upcoming' },
  { id: 'b-u11g-thu-2', sport: 'Basketball', ageCategory: 'U11', gender: 'Girls', teamAId: 'b-u11-g-5', teamBId: 'b-u11-g-3', time: '06:30 - 07:00 AM', date: '21 May 2026', venue: 'Court 3', status: 'Upcoming' },
  { id: 'b-u15b-thu-1', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', teamAId: 'b-u15-b-1', teamBId: 'b-u15-b-2', time: '07:00 - 07:30 AM', date: '21 May 2026', venue: 'Court 3', status: 'Upcoming' },
  { id: 'b-u15b-thu-2', sport: 'Basketball', ageCategory: 'U15', gender: 'Boys', teamAId: 'b-u15-b-2', teamBId: 'b-u15-b-3', time: '07:30 - 08:00 AM', date: '21 May 2026', venue: 'Court 3', status: 'Upcoming' },
  { id: 'b-u11b-thu-1', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', teamAId: 'b-u11-b-1', teamBId: 'b-u11-b-5', time: '08:00 - 08:30 AM', date: '21 May 2026', venue: 'Court 3', status: 'Upcoming' },
  { id: 'b-u11b-thu-2', sport: 'Basketball', ageCategory: 'U11', gender: 'Boys', teamAId: 'b-u11-b-2', teamBId: 'b-u11-b-3', time: '08:30 - 09:00 AM', date: '21 May 2026', venue: 'Court 3', status: 'Upcoming' },
  
  // Football U15
  { id: 'fm7', sport: 'Football', ageCategory: 'U15', gender: 'Boys', teamAId: 'f-u15-b-5', teamBId: 'f-u15-b-2', time: '08:00 AM', date: '20 May 2026', venue: 'Ground 1', status: 'Completed', winnerId: 'f-u15-b-5', score: 'Real Shalom won 4-2' },
  { id: 'fm8', sport: 'Football', ageCategory: 'U15', gender: 'Boys', teamAId: 'f-u15-b-1', teamBId: 'f-u15-b-4', time: '09:00 AM', date: '20 May 2026', venue: 'Ground 1', status: 'Completed', score: 'Draw 1-1' },
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
