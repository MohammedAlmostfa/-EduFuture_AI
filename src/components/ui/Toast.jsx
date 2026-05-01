// src/components/ui/Toast.jsx
import React, { useEffect } from 'react';

// SVG Icons
const SuccessIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const toastTypeConfig = {
  success: {
    icon: <SuccessIcon />,
    bgClass: 'bg-green-50',
    textClass: 'text-green-700',
    borderClass: 'border-green-500',
  },
  error: {
    icon: <ErrorIcon />,
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
    borderClass: 'border-red-500',
  },
  info: {
    icon: <InfoIcon />,
    bgClass: 'bg-indigo-50',
    textClass: 'text-indigo-700',
    borderClass: 'border-indigo-500',
  },
};

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const config = toastTypeConfig[type] || toastTypeConfig.success;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300"
      role="alert"
      aria-live="polite"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-r-4 ${config.bgClass} ${config.textClass} ${config.borderClass} max-w-[90vw] sm:max-w-sm`}
      >
        <span className="flex items-center">{config.icon}</span>
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="mr-2 hover:opacity-70 transition-all active:scale-90"
          aria-label="إغلاق الإشعار"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Toast;