
import React from 'react';
import { ShieldCheckIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-md px-4 py-3 sticky top-0 z-30">
      <div className="container mx-auto flex flex-col items-center gap-2">
        <img src="/firewatch-logo.png" alt="Firewatch Logo" className="h-16 w-16 mb-2" />
        <h1 className="text-3xl font-bold text-gray-100 tracking-wider text-center">
          Firewatch
        </h1>
      </div>
    </header>
  );
};

export default Header;
