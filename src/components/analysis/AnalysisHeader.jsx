// src/components/analysis/AnalysisHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// SVG Icons
const AnalyticsIcon = () => (
  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const DescriptionIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const AnalysisHeader = ({ fileName, analysisDate, status = 'تم التحليل بنجاح' }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-6 transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left side: file info */}
        <div className="space-y-3">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-3">
            <AnalyticsIcon />
            {fileName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <DescriptionIcon />
              <span>{status} بواسطة EduFuture AI</span>
            </div>
            {analysisDate && (
              <div className="flex items-center gap-1.5">
                <CalendarIcon />
                <span>{analysisDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right side: back button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 bg-white rounded-xl px-5 py-2.5 text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-200 active:scale-95 group shadow-sm"
        >
          <ArrowIcon />
          العودة للوحة التحكم
        </button>
      </div>
    </div>
  );
};

export default AnalysisHeader;