import React from 'react';
import { Flame, Zap } from 'lucide-react';
import { DailyCombo } from '../types';

interface DailyComboCardProps {
  combo: DailyCombo;
}

export const DailyComboCard: React.FC<DailyComboCardProps> = ({ combo }) => {
  const getConfidenceText = (confidence: 'high' | 'medium' | 'low') => {
    switch (confidence) {
      case 'high':
        return 'Confiance Élevée';
      case 'medium':
        return 'Confiance Moyenne';
      case 'low':
        return 'Confiance Faible';
    }
  };

  return (
    <div className="section-card bg-gradient-to-br from-primary to-primary-hover p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Flame size={24} className="text-white" />
        <h3 className="text-xl font-bold">COMBO DU JOUR</h3>
        <span className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">
          {getConfidenceText(combo.confidence)}
        </span>
      </div>

      <div className="space-y-4">
        {combo.matches.map((match) => (
          <div key={match.id} className="p-3 bg-white/10 rounded-lg">
            <div className="text-sm opacity-80">{match.league}</div>
            <div className="font-medium">
              {match.teams.home} vs {match.teams.away}
            </div>
            <div className="text-sm font-semibold text-white mt-1">
              {match.tip}
            </div>
          </div>
        ))}

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-white" />
            <span className="font-semibold">Cote Totale</span>
          </div>
          <span className="text-xl font-bold">{combo.totalOdds.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};