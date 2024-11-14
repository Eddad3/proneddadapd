import React from 'react';

export const AnimatedText: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <span className="text-4xl font-bold relative group">
        <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-[length:200%_100%] bg-clip-text text-transparent">
          PRONEDDAD
        </span>
        <span className="text-transparent">PRONEDDAD</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-700 origin-left group-hover:scale-x-100"></span>
      </span>
    </div>
  );
};