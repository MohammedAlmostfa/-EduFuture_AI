import { useState, useEffect, useCallback } from 'react';

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

export const useDashboard = () => {
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

  // دالة لتسجيل الخروج (سيتم تمريرها إلى TopNavbar)
  const handleLogout = () => {
    // سيتم استخدام navigate من المكون، لذلك سنعيدها كدالة تحتاج إلى navigate
    // لكن بدلاً من ربطها بالهوك، سنترك التنقل للمكون
    // لذلك سنعيد دالة فارغة أو سنستقبل callback
  };

  return {
    files,
    isLoading,
    isUploadModalOpen,
    isUploading,
    toast,
    deleteTarget,
    processingFileId,
    totalFilesQuota,
    usedFiles,
    remainingFiles,
    setIsUploadModalOpen,
    handleUploadClick,
    handleUploadConfirm,
    handleViewResult,
    handleRetry,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteCancel,
    showToast, // إذا احتجنا عرض toast من أي مكان (نادر)
    loadFiles, // إذا احتجنا إعادة تحميل
  };
};