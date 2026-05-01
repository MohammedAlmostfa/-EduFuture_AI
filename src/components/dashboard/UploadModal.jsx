// src/components/dashboard/UploadModal.jsx
import React, { useState, useRef, useEffect } from 'react';

const UploadModal = ({ isOpen, onClose, onConfirm, isUploading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setUploadProgress(0);
      setDragActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen && !isUploading) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, isUploading, onClose]);

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
      setTimeout(() => {}, 300);
    }
  };

  // SVG Icons
  const CloudUploadIcon = () => (
    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const UploadFileIcon = () => (
    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const DescriptionIcon = () => (
    <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );

  const DeleteIcon = () => (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  const ProgressIcon = () => (
    <svg className="w-4 h-4 animate-spin text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 border border-gray-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 pb-3 border-b border-gray-100">
          <h2 id="upload-modal-title" className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <CloudUploadIcon />
            رفع ملف جديد
          </h2>
          {!isUploading && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
              aria-label="إغلاق"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-50 scale-[1.01]'
                  : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadFileIcon />
              <p className="text-gray-700 mb-2 font-medium">اسحب ملفك هنا أو انقر للاختيار</p>
              <p className="text-xs text-gray-500">يدعم PDF، DOCX، TXT (حجم أقصى 10MB)</p>
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
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-200">
              <DescriptionIcon />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {!isUploading && (
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:bg-red-50 rounded-full p-1.5 transition-colors"
                  aria-label="إزالة الملف"
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          )}

          {isUploading && (
            <div className="mt-2 animate-in fade-in duration-300">
              <div className="flex justify-between text-sm text-gray-600 mb-1.5">
                <span className="flex items-center gap-1">
                  <ProgressIcon />
                  جاري الرفع...
                </span>
                <span className="font-medium text-indigo-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-5 pt-3 border-t border-gray-100 bg-gray-50">
          {!isUploading && (
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200 font-medium"
            >
              إلغاء
            </button>
          )}
          <button
            onClick={handleConfirm}
            disabled={!selectedFile || isUploading}
            className={`px-5 py-2.5 rounded-xl bg-indigo-600 text-white transition-all duration-200 font-medium shadow-md shadow-indigo-200 ${
              !selectedFile || isUploading
                ? 'opacity-50 cursor-not-allowed shadow-none'
                : 'hover:bg-indigo-700 active:scale-95'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <ProgressIcon />
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