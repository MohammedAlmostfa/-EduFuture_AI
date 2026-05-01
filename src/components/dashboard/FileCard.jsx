// src/components/dashboard/FileCard.jsx
import React from 'react';

const statusConfig = {
  completed: {
    label: 'مكتمل',
    icon: 'check_circle',
    bgClass: 'bg-[#D1FAE5]',
    textClass: 'text-[#065F46]',
    iconClass: 'text-[#065F46]',
  },
  processing: {
    label: 'قيد المعالجة',
    icon: 'progress_activity',
    bgClass: 'bg-[#FEF3C7]',
    textClass: 'text-[#92400E]',
    iconClass: 'text-[#92400E] animate-spin',
  },
  failed: {
    label: 'فشل',
    icon: 'error',
    bgClass: 'bg-[#FEE2E2]',
    textClass: 'text-[#991B1B]',
    iconClass: 'text-[#991B1B]',
  },
};

const FileCard = ({ file, onViewResult, onRetry, onDelete, isProcessing = false }) => {
  const { name, date, status, id } = file;
  const config = statusConfig[status];

  const isFailed = status === 'failed';
  const isProcessingFile = status === 'processing' || isProcessing;

  const handleAction = () => {
    if (isProcessingFile) return;
    if (isFailed && onRetry) onRetry(id);
    else if (onViewResult) onViewResult(id);
  };

  const handleDelete = () => {
    if (isProcessingFile) return;
    onDelete(id);
  };

  return (
    <div
      className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
      dir="rtl"
    >
      {/* رأس البطاقة */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="material-symbols-outlined text-primary shrink-0 text-2xl">description</span>
          <h3
            className="font-label-sm text-label-sm text-on-surface font-semibold truncate max-w-[180px] md:max-w-[220px]"
            title={name}
          >
            {name}
          </h3>
        </div>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${config.bgClass} ${config.textClass}`}
        >
          <span className={`material-symbols-outlined text-base ${config.iconClass}`}>
            {config.icon}
          </span>
          <span>{config.label}</span>
        </div>
      </div>

      {/* التاريخ */}
      <div className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1.5">
        <span className="material-symbols-outlined text-base">calendar_today</span>
        <span>{date}</span>
      </div>

      {/* الأزرار - تحسين التباعد والحجم */}
      <div className="flex justify-between items-center mt-2 gap-3">
        <button
          onClick={handleAction}
          disabled={isProcessingFile}
          aria-disabled={isProcessingFile}
          className={`flex-1 rounded-lg py-2.5 text-label-sm font-label-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
            isProcessingFile
              ? 'bg-outline-variant/30 text-outline cursor-not-allowed'
              : 'border border-primary text-primary hover:bg-primary/10 active:scale-95'
          }`}
        >
          {isProcessingFile ? (
            <>
              <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
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
          className={`text-error rounded-full p-2 transition-all duration-200 ${
            isProcessingFile
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-error-container/50 active:scale-95'
          }`}
        >
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>
      </div>

      {/* رسالة لقارئات الشاشة */}
      {isProcessingFile && (
        <div className="sr-only" role="status">
          جاري معالجة الملف، يرجى الانتظار
        </div>
      )}
    </div>
  );
};

export default FileCard;