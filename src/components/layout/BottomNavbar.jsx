// src/components/layout/BottomNavbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNavbar = () => {
  const items = [
    { to: '/dashboard', icon: 'home', label: 'الرئيسية', fill: true },
    { to: '/my-files', icon: 'description', label: 'ملفاتي', fill: false },
    { to: '/analysis', icon: 'psychology', label: 'التحليل', fill: false },
    { to: '/profile', icon: 'person', label: 'الملف الشخصي', fill: false },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md dark:bg-gray-900/80 font-['Lexend'] text-[10px] font-bold rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden rtl">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center rounded-xl px-4 py-1 scale-110 duration-150 active:bg-gray-50 ${
              isActive
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                : 'text-gray-400 dark:text-gray-500'
            }`
          }
        >
          <span
            className="material-symbols-outlined"
            style={item.fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {item.icon}
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavbar;