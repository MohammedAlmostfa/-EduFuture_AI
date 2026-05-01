// src/components/layout/BottomNavbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNavbar = () => {
  const items = [
    { to: '/dashboard', icon: 'dashboard', label: 'لوحة التحكم', end: true },
    { to: '/analysis/new', icon: 'analytics', label: 'تحليل جديد' },
    { to: '/profile', icon: 'person', label: 'الملف الشخصي' },
    { to: '/settings', icon: 'settings', label: 'الإعدادات' },
  ];

  // SVG icons mapping
  const getIcon = (iconName, isActive) => {
    const activeColor = "#4f46e5"; // indigo-600
    const inactiveColor = "#6b7280"; // gray-500

    const icons = {
      dashboard: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      analytics: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      person: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      settings: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    };
    const IconComponent = icons[iconName] || icons.dashboard;
    // Clone element to add dynamic stroke color
    return React.cloneElement(IconComponent, {
      stroke: isActive ? activeColor : inactiveColor,
    });
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 md:hidden rtl">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center rounded-xl px-3 py-1.5 transition-all duration-200 active:scale-95 min-w-[70px] ${
              isActive
                ? 'text-indigo-600 bg-indigo-50/80 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {getIcon(item.icon, isActive)}
              <span className="text-[11px] font-medium mt-1.5 leading-none">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavbar;