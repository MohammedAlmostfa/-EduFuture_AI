import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useProfile = () => {
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'أحمد محمد',
    email: 'ahmed@student.edu',
    phone: '+966 50 123 4567',
    bio: 'طالب شغوف بالذكاء الاصطناعي وتطبيقاته في مجال التعليم. أبحث دائمًا عن طرق جديدة لتحسين تجربة التعلم.',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    language: 'ar',
    theme: 'light',
    notifications: true,
  });

  const handlePersonalChange = (e) => {
    const { id, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswords(prev => ({ ...prev, [id]: value }));
  };

  const handlePreferencesChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAll = () => {
    console.log('تم حفظ المعلومات:', { personalInfo, passwords, preferences });
    alert('تم حفظ التغييرات بنجاح (محاكاة)');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleEditAvatar = () => {
    alert('تغيير الصورة (محاكاة)');
  };

  return {
    // State
    personalInfo,
    passwords,
    preferences,
    isUploadModalOpen,
    // Setters
    setIsUploadModalOpen,
    // Handlers
    handlePersonalChange,
    handlePasswordChange,
    handlePreferencesChange,
    handleSaveAll,
    handleLogout,
    handleUploadClick,
    handleEditAvatar,
  };
};