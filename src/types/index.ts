export interface Prediction {
  id: string;
  category: string;
  teams: {
    home: string;
    away: string;
  };
  tip: string;
  odds?: number;
  time?: string;
  league?: string;
}

export interface DailyCombo {
  id: string;
  matches: Prediction[];
  totalOdds: number;
  confidence: 'high' | 'medium' | 'low';
}

export type PredictionCategory = 'win' | 'draw' | 'btts' | 'under' | 'over' | 'doubleChance';</content></file>

<boltAction type="start">
<command>npm run dev</command>