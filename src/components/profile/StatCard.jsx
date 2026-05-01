// src/components/profile/StatCard.jsx
import React from 'react';

const StatCard = ({ icon, iconBgColor, iconColor, label, value, unit }) => {
  const bgColorClass = {
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    yellow: 'bg-yellow-100',
  }[iconBgColor] || 'bg-gray-100';

  const textColorClass = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    yellow: 'text-yellow-600',
  }[iconColor] || 'text-gray-600';

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4">
      <div className={`${bgColorClass} ${textColorClass} p-3 rounded-lg flex-shrink-0`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {value} {unit && <span className="text-sm font-normal">{unit}</span>}
        </p>
      </div>
    </div>
  );
};

export default StatCard;