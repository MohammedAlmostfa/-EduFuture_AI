// src/components/ui/ConfirmDialog.jsx
import React, { useEffect } from 'react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  // منع تمرير الخلفية
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // إغلاق عند Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
    >
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="p-5 pb-2">
          <h3 id="confirm-dialog-title" className="font-title-sm text-title-sm text-on-surface">
            {title}
          </h3>
        </div>

        {/* Message */}
        <div className="px-5 pb-5">
          <p id="confirm-dialog-message" className="text-on-surface-variant">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-5 pt-0">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-outline text-on-surface-variant hover:bg-surface-container transition"
            autoFocus
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-error text-on-error hover:opacity-90 transition active:scale-95"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;