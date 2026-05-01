// src/components/analysis/JobTags.jsx
import React from 'react';

const tagVariants = {
  primary: 'bg-primary-container/10 text-primary border-primary/30 hover:bg-primary-container/20',
  secondary: 'bg-secondary-container/10 text-secondary border-secondary/30 hover:bg-secondary-container/20',
  tertiary: 'bg-tertiary-container/10 text-tertiary border-tertiary/30 hover:bg-tertiary-container/20',
  neutral: 'bg-surface-variant text-on-surface-variant border-outline-variant/50 hover:bg-surface-container-high',
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
        <h3 className="font-title-sm text-title-sm text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">work</span>
          {title}
        </h3>
      )}
      <div className="flex flex-wrap gap-2.5">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className={`${tagVariants[getVariant(idx)]} px-3.5 py-1.5 rounded-full font-label-sm text-label-sm flex items-center gap-1.5 border transition-all duration-200 hover:scale-105 active:scale-95 cursor-default`}
          >
            {job.icon && (
              <span className="material-symbols-outlined text-base">{job.icon}</span>
            )}
            <span>{job.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTags;