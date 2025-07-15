
import React from 'react';
import { ShieldCheckIcon, GithubIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-md px-4 py-3 sticky top-0 z-30">
      <div className="container mx-auto flex flex-col items-center gap-2 relative">
        <a href="https://github.com/severian42/Firewatch" target="_blank" rel="noopener noreferrer" className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-full">
          <GithubIcon className="w-8 h-8" />
        </a>
        <img src="/firewatch-logo.png" alt="Firewatch Logo" className="h-16 w-16 mb-2" />
        <h1 className="text-3xl font-bold text-gray-100 tracking-wider text-center">
          Firewatch
        </h1>
      </div>
    </header>
  );
};

export default Header;
