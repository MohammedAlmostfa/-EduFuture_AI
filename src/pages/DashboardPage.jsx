// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/layout/TopNavbar';
import Sidebar from '../components/layout/Sidebar';
import BottomNavbar from '../components/layout/BottomNavbar';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import BalanceCard from '../components/dashboard/BalanceCard';
import FileCard from '../components/dashboard/FileCard';
import UploadModal from '../components/dashboard/UploadModal';
import Toast from '../components/ui/Toast';
import ConfirmDialog from '../components/ui/ConfirmDialog';

// خدمة محاكاة API (نفس الأصل)
const fetchFilesFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'مقدمة في الذكاء الاصطناعي.pdf', date: '12 مايو 2024', status: 'completed' },
        { id: 2, name: 'تحليل البيانات الضخمة.docx', date: '14 مايو 2024', status: 'processing' },
        { id: 3, name: 'محاضرة الفيزياء الكمية.pdf', date: '10 مايو 2024', status: 'failed' },
      ]);
    }, 800);
  });
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [processingFileId, setProcessingFileId] = useState(null);

  const totalFilesQuota = 5;
  const usedFiles = files.length;
  const remainingFiles = totalFilesQuota - usedFiles;

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFilesFromAPI();
      setFiles(data);
    } catch (error) {
      showToast('حدث خطأ أثناء تحميل الملفات', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadConfirm = async (file) => {
    if (!file) return;
    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const newFile = {
        id: Date.now(),
        name: file.name,
        date: new Date().toLocaleDateString('ar-EG'),
        status: 'processing',
      };
      setFiles((prev) => [newFile, ...prev]);
      showToast(`تم رفع الملف "${file.name}" بنجاح، جاري المعالجة`, 'success');
    } catch (error) {
      showToast('فشل رفع الملف، حاول مرة أخرى', 'error');
    } finally {
      setIsUploading(false);
      setIsUploadModalOpen(false);
    }
  };

  const handleViewResult = useCallback((fileId) => {
    const file = files.find(f => f.id === fileId);
    showToast(`عرض نتيجة الملف: ${file?.name} (محاكاة)`, 'info');
  }, [files]);

  const handleRetry = useCallback(async (fileId) => {
    setProcessingFileId(fileId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFiles((prev) =>
        prev.map((file) =>
          file.id === fileId ? { ...file, status: 'completed' } : file
        )
      );
      showToast('تمت إعادة المعالجة بنجاح', 'success');
    } catch (error) {
      showToast('فشلت إعادة المعالجة', 'error');
    } finally {
      setProcessingFileId(null);
    }
  }, []);

  const handleDeleteRequest = useCallback((fileId) => {
    setDeleteTarget(fileId);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    const fileId = deleteTarget;
    if (!fileId) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const deletedFile = files.find(f => f.id === fileId);
      setFiles((prev) => prev.filter((file) => file.id !== fileId));
      showToast(`تم حذف الملف "${deletedFile?.name}" بنجاح`, 'success');
    } catch (error) {
      showToast('حدث خطأ أثناء الحذف', 'error');
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, files]);

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderEmptyState = () => {
    if (isLoading) return null;
    if (files.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="w-20 h-20 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg font-medium">لا توجد ملفات مرفوعة بعد</p>
          <p className="text-gray-400 text-sm mt-1">قم برفع أول ملف لك للبدء</p>
          <button
            onClick={handleUploadClick}
            className="mt-6 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-md shadow-indigo-200 active:scale-95 font-medium"
          >
            ارفع أول ملف لك
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div dir="rtl" className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen">
      <TopNavbar onLogout={handleLogout} />
      <Sidebar onUploadClick={handleUploadClick} />

      <main className="md:mr-64 p-5 md:p-8 pb-28 md:pb-8 max-w-7xl mx-auto">
        {/* Header للجوال */}
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            لوحة التحكم
          </h1>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* بطاقة الرصيد مع تحسينات */}
        <div className="mb-8">
          <BalanceCard used={usedFiles} total={totalFilesQuota} remaining={remainingFiles} />
        </div>

        {/* رأس قسم الملفات */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h2 className="text-xl font-semibold text-gray-800">أحدث الملفات</h2>
          <button
            onClick={handleUploadClick}
            className="hidden md:flex bg-indigo-600 text-white rounded-xl py-2.5 px-5 hover:bg-indigo-700 transition-all duration-200 active:scale-95 items-center gap-2 shadow-md shadow-indigo-200 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            رفع ملف جديد
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {renderEmptyState()}
            {files.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {files.map((file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onViewResult={handleViewResult}
                    onRetry={handleRetry}
                    onDelete={handleDeleteRequest}
                    isProcessing={processingFileId === file.id}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <FloatingActionButton onClick={handleUploadClick} />
      <BottomNavbar />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onConfirm={handleUploadConfirm}
        isUploading={isUploading}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذا الملف؟ لا يمكن التراجع عن هذا الإجراء."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DashboardPage;