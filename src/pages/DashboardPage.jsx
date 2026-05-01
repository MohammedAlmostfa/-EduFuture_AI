import React from 'react';
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
import { useDashboard } from '../hooks/useDashboard';
import { dashboardData } from '../data/dashboardData';

// مكونات SVG بسيطة
const EmptyIcon = () => <div dangerouslySetInnerHTML={{ __html: dashboardData.emptyState.iconSvg }} />;
const UserAvatarIcon = () => <div dangerouslySetInnerHTML={{ __html: dashboardData.icons.userAvatarSvg }} />;
const PlusIcon = () => <div dangerouslySetInnerHTML={{ __html: dashboardData.icons.plusIconSvg }} />;

const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    files,
    isLoading,
    isUploadModalOpen,
    isUploading,
    toast,
    deleteTarget,
    processingFileId,
    usedFiles,
    remainingFiles,
    totalFilesQuota,
    setIsUploadModalOpen,
    handleUploadClick,
    handleUploadConfirm,
    handleViewResult,
    handleRetry,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteCancel,
    setToast, // تأكد من إضافتها من hook إذا كانت موجودة
  } = useDashboard();

  const handleLogout = () => {
    navigate('/login');
  };

  const renderEmptyState = () => {
    if (isLoading) return null;
    if (files.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="w-20 h-20 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <EmptyIcon />
          </div>
          <p className="text-gray-600 text-lg font-medium">{dashboardData.emptyState.title}</p>
          <p className="text-gray-400 text-sm mt-1">{dashboardData.emptyState.subtitle}</p>
          <button
            onClick={handleUploadClick}
            className="mt-6 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-md shadow-indigo-200 active:scale-95 font-medium"
          >
            {dashboardData.emptyState.buttonText}
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
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {dashboardData.pageTitle}
          </h1>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
            <UserAvatarIcon />
          </div>
        </div>

        <div className="mb-8">
          <BalanceCard used={usedFiles} total={totalFilesQuota} remaining={remainingFiles} />
        </div>

        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h2 className="text-xl font-semibold text-gray-800">{dashboardData.fileSectionTitle}</h2>
          <button
            onClick={handleUploadClick}
            className="hidden md:flex bg-indigo-600 text-white rounded-xl py-2.5 px-5 hover:bg-indigo-700 transition-all duration-200 active:scale-95 items-center gap-2 shadow-md shadow-indigo-200 font-medium"
          >
            <PlusIcon />
            {dashboardData.uploadButtonText}
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-2xl shadow-sm">
            <div dangerouslySetInnerHTML={{ __html: dashboardData.loadingSpinner }} />
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
        title={dashboardData.confirmDialog.title}
        message={dashboardData.confirmDialog.message}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DashboardPage;