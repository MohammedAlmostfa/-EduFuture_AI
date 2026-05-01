// src/components/layout/TopNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TopNavbar = ({ onLogout }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm flex justify-between items-center h-16 px-6 md:px-8 w-full sticky top-0 z-50 rtl">
      {/* Logo مع تدرج لوني */}
      <Link 
        to="/" 
        className="flex items-center gap-2 group"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
          <img src="/src/assets/logo.png" alt="EduFuture AI Logo" className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          EduFuture AI
        </span>
      </Link>

      {/* أزرار التحكم */}
      <div className="flex gap-2 items-center">
        {/* زر الحساب الشخصي */}
        <button 
          className="relative p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          aria-label="الحساب الشخصي"
          title="الحساب الشخصي"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        {/* زر تسجيل الخروج */}
        <button 
          onClick={onLogout}
          className="relative p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          aria-label="تسجيل الخروج"
          title="تسجيل الخروج"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;