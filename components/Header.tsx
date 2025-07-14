
import React from 'react';
import { ShieldCheckIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-md px-4 py-3 sticky top-0 z-30">
      <div className="container mx-auto flex items-center gap-3">
        <ShieldCheckIcon className="w-8 h-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-100 tracking-wider">
          Firewatch
        </h1>
      </div>
    </header>
  );
};

export default Header;
