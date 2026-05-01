// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/layout/TopNavbar';
import Sidebar from '../components/layout/Sidebar';
import BottomNavbar from '../components/layout/BottomNavbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import StatCard from '../components/profile/StatCard';
import PreferencesCard from '../components/profile/PreferencesCard';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import SecurityForm from '../components/profile/SecurityForm';
import Button from '../components/ui/Button';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // State للمعلومات الشخصية
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'أحمد محمد',
    email: 'ahmed@student.edu',
    phone: '+966 50 123 4567',
    bio: 'طالب شغوف بالذكاء الاصطناعي وتطبيقاته في مجال التعليم. أبحث دائمًا عن طرق جديدة لتحسين تجربة التعلم.',
  });

  // State لكلمات المرور
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State للتفضيلات
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

  return (
    <div dir="rtl" className="bg-background min-h-screen transition-colors duration-300">
      <TopNavbar onLogout={handleLogout} />
      <Sidebar onUploadClick={handleUploadClick} />

      <main className="md:mr-64 p-6 md:p-8 pb-28 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <ProfileHeader
            name={personalInfo.fullName}
            role="طالب متميز"
            tags={['علوم الحاسب', 'سنة ثالثة']}
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuA76E3OcQ7aJfJjxpRtKrg1QbVJy-ltaq5sIbWrzL8zrxkq1kM8vEdO-Pu78oTybnEzbOX6aPEh0a4LpU6e6to7Ba3O_n9nAn59XTq8azYGQmcbvUopVi4TtmPtrzDe3zufFdCyMMhjAw1gR-YUXdj0tPy96B1cagIbPSqJNdd1upXsYc7gvPH1XmD2DVwhk2DAlsPgmXwxoXzOJLazCbJd0iT8CcX1Eoxtzkt-oQxM5rePGo-lYTy9uQobn2GWaUZx0LN-QNjvtE20"
            onEditAvatar={handleEditAvatar}
          />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column: Stats + Preferences */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <StatCard
                icon="analytics"
                label="الملفات المحللة"
                value="42"
                color="primary"
              />
              <StatCard
                icon="account_balance_wallet"
                label="الرصيد المتبقي"
                value="150"
                color="secondary"
              />
              <StatCard
                icon="calendar_today"
                label="عضو منذ"
                value="أكتوبر 2023"
                color="tertiary"
              />
              <PreferencesCard
                language={preferences.language}
                onLanguageChange={(val) => setPreferences(prev => ({ ...prev, language: val }))}
                theme={preferences.theme}
                onThemeChange={(val) => setPreferences(prev => ({ ...prev, theme: val }))}
                notifications={preferences.notifications}
                onNotificationsChange={(val) => setPreferences(prev => ({ ...prev, notifications: val }))}
              />
            </div>

            {/* Right Column: Forms */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <PersonalInfoForm formData={personalInfo} onChange={handlePersonalChange} />
              <SecurityForm passwordData={passwords} onChange={handlePasswordChange} />
              <div className="flex justify-start">
                <Button onClick={handleSaveAll} variant="primary" className="gap-2">
                  <span className="material-symbols-outlined text-base">save</span>
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default ProfilePage;