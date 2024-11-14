import { DailyCombo, Prediction } from '../types';

export const dailyPredictions: Prediction[] = [
  {
    id: '1',
    category: 'win',
    teams: {
      home: 'France',
      away: 'Israël',
    },
    tip: 'France',
    odds: 1.11,
    time: '20:45',
    league: 'UEFA Nations League'
  },
  {
    id: '2',
    category: 'draw',
    teams: {
      home: 'Belgique',
      away: 'Italie',
    },
    tip: 'Match Nul',
    odds: 3.20,
    time: '20:45',
    league: 'UEFA Nations League'
  },
  {
    id: '3',
    category: 'win',
    teams: {
      home: 'Grèce',
      away: 'Angleterre',
    },
    tip: 'Angleterre',
    odds: 1.66,
    time: '20:45',
    league: 'UEFA Nations League'
  },
  {
    id: '4',
    category: 'win',
    teams: {
      home: 'Irlande',
      away: 'Finlande',
    },
    tip: 'Irlande',
    odds: 1.66,
    time: '20:45',
    league: 'UEFA Nations League'
  },
  {
    id: '5',
    category: 'draw',
    teams: {
      home: 'Slovénie',
      away: 'Norvège',
    },
    tip: 'Match Nul',
    odds: 3.20,
    time: '20:45',
    league: 'UEFA Nations League'
  },
  {
    id: '6',
    category: 'win',
    teams: {
      home: 'Macédoine du Nord',
      away: 'Lettonie',
    },
    tip: 'Macédoine du Nord',
    odds: 1.46,
    time: '20:45',
    league: 'UEFA Nations League'
  },
  {
    id: '7',
    category: 'win',
    teams: {
      home: 'Kazakhstan',
      away: 'Autriche',
    },
    tip: 'Autriche',
    odds: 1.24,
    time: '16:00',
    league: 'UEFA Nations League'
  },
  {
    id: '8',
    category: 'win',
    teams: {
      home: 'Malte',
      away: 'Liechtenstein',
    },
    tip: 'Malte',
    odds: 1.35,
    time: '19:00',
    league: 'Match Amical International'
  }
];

// Select 4 events with odds <= 1.4 for the daily combo
const comboMatches = [
  dailyPredictions[0], // France vs Israël (1.11)
  dailyPredictions[7], // Malte vs Liechtenstein (1.35)
  dailyPredictions[6], // Kazakhstan vs Autriche (1.24)
  dailyPredictions[5], // Macédoine du Nord vs Lettonie (1.46)
];

export const dailyCombos: DailyCombo[] = [
  {
    id: 'combo1',
    matches: comboMatches,
    // Calculate total odds by multiplying the individual odds
    totalOdds: comboMatches.reduce((total, match) => total * (match.odds || 1), 1),
    confidence: 'high'
  }
];