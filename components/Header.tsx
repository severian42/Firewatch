
import React from 'react';
import { GithubIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-900 via-red-900 to-orange-900 border-b border-orange-700 shadow-lg px-4 py-4 sticky top-0 z-30">
      <div className="container mx-auto flex justify-center items-center relative">
        <a href="https://github.com/severian42/Firewatch" target="_blank" rel="noopener noreferrer" className="absolute right-0 p-2 text-orange-300 hover:text-orange-100 transition-colors rounded-full">
          <GithubIcon className="w-8 h-8" />
        </a>
        <img 
          src="/firewatch-logo.png" 
          alt="Firewatch - Civil Rights Protection" 
          className="h-24 w-24 drop-shadow-lg hover:scale-105 transition-transform duration-300" 
        />
      </div>
    </header>
  );
};

export default Header;
