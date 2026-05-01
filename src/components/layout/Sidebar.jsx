// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ onUploadClick }) => {
  const navItems = [
    { to: '/dashboard', icon: 'dashboard', label: 'لوحة التحكم', exact: true },
    { to: '/my-files', icon: 'folder_open', label: 'ملفاتي' },
    { to: '/analysis', icon: 'analytics', label: 'تحليل جديد' },
    { to: '/settings', icon: 'settings', label: 'الإعدادات' },
  ];

  return (
    <aside className="bg-white dark:bg-gray-900 font-['Lexend'] text-sm font-semibold right-0 h-full w-64 border-l border-gray-200 dark:border-gray-800 shadow-lg fixed top-0 flex flex-col p-4 z-40 rtl hidden md:flex">
      <div className="mb-container-padding text-center">
        <div className="w-16 h-16 rounded-full bg-surface-container mx-auto mb-unit flex items-center justify-center">
          <span className="material-symbols-outlined text-outline">account_circle</span>
        </div>
        <h2 className="text-lg font-black text-blue-600">EduFuture AI</h2>
        <p className="text-label-sm font-label-sm text-on-surface-variant">منصة التعليم الذكي</p>
      </div>

      <button
        onClick={onUploadClick}
        className="bg-primary text-on-primary rounded-lg py-2 px-4 mb-container-padding hover:opacity-90 transition-opacity"
      >
        رفع ملف جديد
      </button>

      <nav className="flex flex-col gap-unit flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;