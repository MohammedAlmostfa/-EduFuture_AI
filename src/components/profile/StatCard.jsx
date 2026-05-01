// src/components/profile/StatCard.jsx
import React from 'react';

// SVG Icons mapping based on icon name
const getIcon = (iconName) => {
  const icons = {
    analytics: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    account_balance_wallet: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10H21M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    calendar_today: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };
  return icons[iconName] || icons.analytics;
};

// Color configurations
const colorConfig = {
  primary: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
  },
  secondary: {
    bg: 'bg-green-50',
    text: 'text-green-600',
  },
  tertiary: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
  },
};

const StatCard = ({ icon, label, value, color = 'primary', unit = '' }) => {
  const colors = colorConfig[color] || colorConfig.primary;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex items-center gap-4 transition-all hover:shadow-lg">
      <div className={`${colors.bg} ${colors.text} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
        {getIcon(icon)}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">
          {value}
          {unit && <span className="text-sm font-normal text-gray-500 mr-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
};

export default StatCard;