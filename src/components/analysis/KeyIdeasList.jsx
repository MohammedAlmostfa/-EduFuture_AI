// src/components/analysis/KeyIdeasList.jsx
import React from 'react';

// SVG Icons
const LightbulbIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:text-indigo-700 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const KeyIdeasList = ({ ideas, title = 'الأفكار الرئيسية' }) => {
  if (!ideas || ideas.length === 0) return null;

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <LightbulbIcon />
          {title}
        </h3>
      )}
      <ul className="space-y-3">
        {ideas.map((idea, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <CheckCircleIcon />
            <span className="text-sm text-gray-700 leading-relaxed">
              {idea}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyIdeasList;