// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ onUploadClick }) => {
  const navItems = [
    { to: '/dashboard', icon: 'dashboard', label: 'لوحة التحكم', end: true },
    { to: '/analysis/new', icon: 'analytics', label: 'تحليل جديد' },
    { to: '/profile', icon: 'person', label: 'الملف الشخصي' },
    { to: '/settings', icon: 'settings', label: 'الإعدادات' },
  ];

  // SVG icons mapping
  const getIcon = (iconName) => {
    const icons = {
      dashboard: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      analytics: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      person: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      settings: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      upload: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    };
    return icons[iconName] || icons.dashboard;
  };

  return (
    <aside className="bg-white border-l border-gray-200 w-64 fixed top-0 right-0 h-full z-40 hidden md:flex flex-col shadow-xl shadow-gray-200/50">
      {/* Header section */}
      <div className="text-center pt-8 pb-6 px-4 border-b border-gray-100">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl mx-auto mb-4 my-20 flex items-center justify-center shadow-md shadow-indigo-200 rotate-3 transition-transform hover:rotate-0 duration-300">
         <img src="/src/assets/logo.png" alt="EduFuture AI Logo" className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          EduFuture AI
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-medium">منصة التعليم الذكي</p>
      </div>

      {/* Upload Button */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={onUploadClick}
          className="w-full bg-indigo-600 text-white rounded-xl py-2.5 px-4 hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-md shadow-indigo-200 active:scale-95"
        >
          {getIcon('upload')}
          رفع ملف جديد
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
              }`
            }
          >
            <span className="flex-shrink-0">{getIcon(item.icon)}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">© 2024 EduFuture AI</p>
      </div>
    </aside>
  );
};

export default Sidebar;