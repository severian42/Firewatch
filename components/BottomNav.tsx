

import React from 'react';
import type { Screen, NavItem } from '../types';

interface BottomNavProps {
  navItems: readonly NavItem[];
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ navItems, activeScreen, setActiveScreen }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg">
      <div className="flex justify-around max-w-2xl mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
              activeScreen === item.id ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            {item.icon}
            <span className={`text-xs mt-1 ${activeScreen === item.id ? 'font-bold' : ''}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
