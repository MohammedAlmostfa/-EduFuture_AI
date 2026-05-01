// src/components/analysis/KeyIdeasList.jsx
import React from 'react';

const KeyIdeasList = ({ ideas, title = 'الأفكار الرئيسية' }) => {
  if (!ideas || ideas.length === 0) return null;

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="font-title-sm text-title-sm text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">lightbulb</span>
          {title}
        </h3>
      )}
      <ul className="space-y-3">
        {ideas.map((idea, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <span className="material-symbols-outlined text-primary mt-0.5 text-lg group-hover:scale-110 transition-transform duration-200">
              check_circle
            </span>
            <span className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              {idea}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyIdeasList;