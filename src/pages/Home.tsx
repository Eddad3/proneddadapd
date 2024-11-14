import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DailyComboCard } from '../components/DailyComboCard';
import { PredictionCard } from '../components/PredictionCard';
import { dailyCombos, dailyPredictions } from '../data/predictions';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Combo Section */}
          <div className="lg:col-span-1">
            <DailyComboCard combo={dailyCombos[0]} />
          </div>

          {/* Predictions List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Prédictions du Jour</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {dailyPredictions.map((prediction) => (
                <PredictionCard
                  key={prediction.id}
                  prediction={prediction}
                  variant={prediction.id === '1' ? 'highlight' : 'default'}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};