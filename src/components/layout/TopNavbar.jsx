// src/components/layout/TopNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TopNavbar = ({ onLogout }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 font-['Lexend'] text-base font-medium border-b border-gray-100 dark:border-gray-800 shadow-sm flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 rtl hidden md:flex">
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
        EduFuture AI
      </Link>
      <div className="flex gap-gutter items-center">
        <button className="text-gray-500 hover:text-blue-600 active:scale-95 duration-200">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
        <button onClick={onLogout} className="text-gray-500 hover:text-blue-600 active:scale-95 duration-200">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;