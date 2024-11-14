import React from 'react';
import { Trophy, Timer, Award } from 'lucide-react';
import { Prediction } from '../types';

interface PredictionCardProps {
  prediction: Prediction;
  variant?: 'default' | 'highlight';
}

const getOddsColor = (odds: number) => {
  if (odds <= 1.5) {
    return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
  }
  return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
};

const getOddsLabel = (odds: number) => {
  if (odds <= 1.5) {
    return 'Sûr';
  }
  return '';
};

export const PredictionCard: React.FC<PredictionCardProps> = ({
  prediction,
  variant = 'default'
}) => {
  const isHighOdds = prediction.odds && prediction.odds > 1.5;
  
  return (
    <div 
      className={`section-card p-4 ${
        variant === 'highlight' 
          ? 'bg-gradient-to-br from-secondary to-secondary-hover text-dark'
          : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium flex items-center gap-1">
          <Trophy size={16} className="text-primary" />
          {prediction.league}
        </span>
        <span className="text-sm flex items-center gap-1">
          <Timer size={16} className="text-gray-400" />
          {prediction.time}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="text-lg font-semibold">
          {prediction.teams.home} vs {prediction.teams.away}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award 
              size={18} 
              className={prediction.odds && prediction.odds <= 1.5 ? 'text-emerald-500' : 'text-amber-500'} 
            />
            <span className="font-medium">Notre Pronostic: {prediction.tip}</span>
          </div>
          {prediction.odds && (
            <div className="flex items-center gap-2">
              {prediction.odds <= 1.5 && (
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                  variant === 'highlight' 
                    ? 'bg-white/80 text-dark border-dark/10' 
                    : getOddsColor(prediction.odds)
                }`}>
                  {getOddsLabel(prediction.odds)}
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                variant === 'highlight' 
                  ? 'bg-white/80 text-dark' 
                  : `${isHighOdds ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}`
              }`}>
                Cote: {prediction.odds.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};