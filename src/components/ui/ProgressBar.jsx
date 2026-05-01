// src/components/ui/ProgressBar.jsx
import React from 'react';

/**
 * شريط تقدم متجاوب مع دعم RTL
 * @param {number} value - القيمة الحالية
 * @param {number} max - القيمة القصوى
 * @param {string} color - لون الشريط (أي لون CSS صالح)
 * @param {string} height - ارتفاع الشريط (مثل 'h-2' أو 'h-1.5')
 * @param {string} rounded - حجم الحواف المستديرة (مثل 'rounded-full' أو 'rounded-lg')
 * @param {string} className - كلاسات إضافية للحاوية الخارجية
 */
const ProgressBar = ({ 
  value, 
  max = 100, 
  color = '#4f46e5', // indigo-600 
  height = 'h-2',
  rounded = 'rounded-full',
  className = '' 
}) => {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div
      className={`w-full bg-gray-200 ${height} ${rounded} overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={`${height} ${rounded} transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%`, backgroundColor: color, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
      />
    </div>
  );
};

export default ProgressBar;