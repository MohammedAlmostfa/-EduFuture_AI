// src/components/dashboard/BalanceCard.jsx
import React from 'react';
import ProgressBar from '../ui/ProgressBar';

const BalanceCard = ({ used, total }) => {
  const remaining = total - used;
  const percentage = total > 0 ? (used / total) * 100 : 0;

  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* رأس البطاقة */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-title-sm text-title-sm text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
          رصيدي
        </h2>
        <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
          {used} / {total} ملفات
        </span>
      </div>

      {/* شريط التقدم */}
      <div className="mb-3">
        <ProgressBar value={used} max={total} color="#3B82F6" />
      </div>

      {/* النص السفلي */}
      <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
        <span className="material-symbols-outlined text-base text-outline">info</span>
        لديك {remaining} ملفات متبقية في رصيدك الحالي.
      </p>
    </div>
  );
};

export default BalanceCard;