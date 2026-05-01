// src/components/dashboard/BalanceCard.jsx
import React from 'react';
import ProgressBar from '../ui/ProgressBar';

// SVG Icons
const WalletIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10H21M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BalanceCard = ({ used, total }) => {
  const remaining = total - used;
  const percentage = total > 0 ? (used / total) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Card header: title + counter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <WalletIcon />
          رصيدي
        </h2>
        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
          {used} / {total} ملفات
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <ProgressBar value={used} max={total} color="#4f46e5" /> {/* indigo-600 */}
      </div>

      {/* Info text */}
      <p className="text-sm text-gray-500 flex items-center gap-1.5">
        <InfoIcon />
        لديك {remaining} ملفات متبقية في رصيدك الحالي.
      </p>
    </div>
  );
};

export default BalanceCard;