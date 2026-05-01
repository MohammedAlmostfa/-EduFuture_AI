// src/components/ui/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ value, max = 100, color = '#3B82F6', className = '' }) => {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div
      className={`w-full bg-outline-variant rounded-full h-2 overflow-hidden ${className}`}
      dir="rtl"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
};

export default ProgressBar;