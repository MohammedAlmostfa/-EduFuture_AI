// src/components/analysis/SectionCard.jsx
import React from 'react';

const SectionCard = ({
  icon,
  iconBgClass = 'bg-primary-container/10',
  iconColorClass = 'text-primary',
  title,
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-surface-container-lowest rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col ${className}`}
    >
      {/* رأس القسم */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/50">
        <div
          className={`${iconBgClass} ${iconColorClass} p-2 rounded-lg transition-colors duration-200`}
        >
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <h2 className="text-title-sm font-title-sm text-on-surface font-semibold">
          {title}
        </h2>
      </div>

      {/* المحتوى */}
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default SectionCard;