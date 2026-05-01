// src/components/ui/Toast.jsx
import React, { useEffect } from 'react';

const toastTypeConfig = {
  success: {
    icon: 'check_circle',
    bgClass: 'bg-[#D1FAE5]',
    textClass: 'text-[#065F46]',
    borderClass: 'border-[#065F46]/20',
  },
  error: {
    icon: 'error',
    bgClass: 'bg-[#FEE2E2]',
    textClass: 'text-[#991B1B]',
    borderClass: 'border-[#991B1B]/20',
  },
  info: {
    icon: 'info',
    bgClass: 'bg-[#DBEAFE]',
    textClass: 'text-[#1E40AF]',
    borderClass: 'border-[#1E40AF]/20',
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
        <span className="material-symbols-outlined">{config.icon}</span>
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="mr-2 hover:opacity-70 transition"
          aria-label="إغلاق الإشعار"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>
    </div>
  );
};

export default Toast;