// src/components/dashboard/UploadModal.jsx
import React, { useState, useRef, useEffect } from 'react';

const UploadModal = ({ isOpen, onClose, onConfirm, isUploading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // إعادة تعيين الحالة عند إغلاق المودال
  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setUploadProgress(0);
      setDragActive(false);
    }
  }, [isOpen]);

  // إغلاق المودال عند الضغط على Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen && !isUploading) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, isUploading, onClose]);

  // منع تمرير الخلفية عند فتح المودال
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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleConfirm = async () => {
    if (selectedFile && !isUploading) {
      // محاكاة تقدم الرفع - تبدأ من 0 إلى 90 ثم تقفز إلى 100 عند الانتهاء
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 150);
      await onConfirm(selectedFile);
      clearInterval(interval);
      setUploadProgress(100);
      // ننتظر قليلاً قبل إغلاق المودال (لإظهار اكتمال التقدم)
      setTimeout(() => {
        // الإغلاق سيتم عبر onClose من الأب بعد رفع isUploading
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isUploading) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100"
      >
        {/* Header - توحيد التباعد */}
        <div className="flex justify-between items-center p-6 pb-4 border-b border-outline-variant">
          <h2 id="upload-modal-title" className="font-title-sm text-title-sm text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">cloud_upload</span>
            رفع ملف جديد
          </h2>
          {!isUploading && (
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface transition-colors rounded-full p-1 hover:bg-surface-container"
              aria-label="إغلاق"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Body - تحسين المسافات */}
        <div className="p-6 space-y-5">
          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-primary bg-primary-container/10 scale-[1.02]'
                  : 'border-outline-variant hover:border-primary hover:bg-surface-container/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="material-symbols-outlined text-6xl text-outline mb-4 block">upload_file</span>
              <p className="text-on-surface-variant mb-2 font-medium">اسحب ملفك هنا أو انقر للاختيار</p>
              <p className="text-label-sm text-on-surface-variant">يدعم PDF، DOCX، TXT (حجم أقصى 10MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
                aria-label="اختر ملف"
              />
            </div>
          ) : (
            <div className="bg-surface-container rounded-xl p-4 flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-primary">description</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-on-surface truncate">{selectedFile.name}</p>
                <p className="text-label-sm text-on-surface-variant mt-0.5">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {!isUploading && (
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-error hover:bg-error-container rounded-full p-1.5 transition-colors"
                  aria-label="إزالة الملف"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              )}
            </div>
          )}

          {/* شريط التقدم أثناء الرفع - تحسين العرض */}
          {isUploading && (
            <div className="mt-2 animate-in fade-in duration-300">
              <div className="flex justify-between text-sm text-on-surface-variant mb-1.5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  جاري الرفع...
                </span>
                <span className="font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-outline-variant rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer - توحيد الأزرار */}
        <div className="flex justify-end gap-3 p-6 pt-4 border-t border-outline-variant bg-surface-container-lowest">
          {!isUploading && (
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-outline text-on-surface-variant hover:bg-surface-container transition-all duration-200 font-medium"
            >
              إلغاء
            </button>
          )}
          <button
            onClick={handleConfirm}
            disabled={!selectedFile || isUploading}
            className={`px-5 py-2.5 rounded-xl bg-primary text-on-primary transition-all duration-200 font-medium ${
              !selectedFile || isUploading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:opacity-90 active:scale-95 shadow-sm'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                رفع...
              </span>
            ) : (
              'رفع الملف'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;