// src/components/dashboard/FileCard.jsx
import React from 'react';

// SVG Icons
const DescriptionIcon = () => (
  <svg className="w-6 h-6 text-indigo-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ProgressIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const statusConfig = {
  completed: {
    label: 'مكتمل',
    icon: <CheckCircleIcon />,
    bgClass: 'bg-green-50',
    textClass: 'text-green-700',
    iconClass: 'text-green-600',
  },
  processing: {
    label: 'قيد المعالجة',
    icon: <ProgressIcon />,
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-700',
    iconClass: 'text-yellow-600',
  },
  failed: {
    label: 'فشل',
    icon: <ErrorIcon />,
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
    iconClass: 'text-red-600',
  },
};

const FileCard = ({ file, onViewResult, onRetry, onDelete, isProcessing = false }) => {
  const { name, date, status, id } = file;
  const config = statusConfig[status];

  const isFailed = status === 'failed';
  // either status 'processing' or external processing flag (e.g., after retry)
  const isProcessingFile = status === 'processing' || isProcessing;

  const handleAction = () => {
    if (isProcessingFile) return;
    if (isFailed && onRetry) onRetry(id);
    else if (onViewResult) onViewResult(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isProcessingFile) return;
    onDelete(id);
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4"
      dir="rtl"
    >
      {/* Card header: name + status badge */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <DescriptionIcon />
          <h3
            className="text-sm font-semibold text-gray-800 truncate max-w-[180px] md:max-w-[220px]"
            title={name}
          >
            {name}
          </h3>
        </div>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${config.bgClass} ${config.textClass}`}
        >
          <span className={`flex items-center ${config.iconClass}`}>{config.icon}</span>
          <span>{config.label}</span>
        </div>
      </div>

      {/* Date */}
      <div className="text-xs text-gray-500 flex items-center gap-1.5">
        <CalendarIcon />
        <span>{date}</span>
      </div>

      {/* Actions: primary button + delete */}
      <div className="flex justify-between items-center mt-2 gap-3">
        <button
          onClick={handleAction}
          disabled={isProcessingFile}
          aria-disabled={isProcessingFile}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
            isProcessingFile
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:scale-95'
          }`}
        >
          {isProcessingFile ? (
            <>
              <ProgressIcon />
              <span>جاري المعالجة...</span>
            </>
          ) : isFailed ? (
            'إعادة المحاولة'
          ) : (
            'عرض النتيجة'
          )}
        </button>

        <button
          onClick={handleDelete}
          disabled={isProcessingFile}
          aria-label="حذف الملف"
          className={`text-red-500 rounded-full p-2 transition-all duration-200 ${
            isProcessingFile
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-red-50 active:scale-95'
          }`}
        >
          <DeleteIcon />
        </button>
      </div>

      {/* Screen reader announcement for a11y */}
      {isProcessingFile && (
        <div className="sr-only" role="status">
          جاري معالجة الملف، يرجى الانتظار
        </div>
      )}
    </div>
  );
};

export default FileCard;