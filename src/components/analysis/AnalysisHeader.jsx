// src/components/analysis/AnalysisHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnalysisHeader = ({ fileName, analysisDate, status = 'تم التحليل بنجاح' }) => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-4 border-b border-outline-variant">
      <div className="space-y-2">
        <h1 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
          {fileName}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-label-sm font-label-sm text-outline">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-base">description</span>
            <span>{status} بواسطة EduFuture AI</span>
          </div>
          {analysisDate && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              <span>{analysisDate}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 bg-surface-container rounded-xl px-5 py-2.5 text-on-surface font-medium border border-outline-variant hover:bg-primary-container hover:text-primary hover:border-primary transition-all duration-200 active:scale-95 group"
      >
        <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform duration-200">
          arrow_forward
        </span>
        العودة للوحة التحكم
      </button>
    </header>
  );
};

export default AnalysisHeader;