// src/components/analysis/JobTags.jsx
import React from 'react';

// SVG Icons mapping based on icon name
const getJobIcon = (iconName) => {
  const icons = {
    school: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    data_object: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    psychology: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    record_voice_over: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m-4-4h8m-4-8a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    work: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };
  return icons[iconName] || icons.work;
};

// Variants of colors (cycling or can be customized)
const tagVariants = {
  primary: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
  secondary: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
  tertiary: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200',
};

const JobTags = ({ jobs, title = 'الوظائف المناسبة' }) => {
  if (!jobs || jobs.length === 0) return null;

  const getVariant = (index) => {
    const variants = ['primary', 'secondary', 'tertiary', 'neutral'];
    return variants[index % variants.length];
  };

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-indigo-600">{getJobIcon('work')}</span>
          {title}
        </h3>
      )}
      <div className="flex flex-wrap gap-2.5">
        {jobs.map((job, idx) => {
          const variant = tagVariants[getVariant(idx)];
          return (
            <div
              key={idx}
              className={`${variant} px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 border transition-all duration-200 hover:scale-105 active:scale-95 cursor-default shadow-sm`}
            >
              {job.icon && (
                <span className="flex items-center">
                  {getJobIcon(job.icon)}
                </span>
              )}
              <span>{job.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobTags;