import React from 'react';
import { Crown } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { UserProfileButton } from './UserProfileButton';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-dark text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <UserProfileButton />
        </div>
        <div className="flex items-center justify-center gap-2">
          <AnimatedText />
          <Crown className="text-primary h-6 w-6 mt-1" />
        </div>
      </div>
    </header>
  );
};