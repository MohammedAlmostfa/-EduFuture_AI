// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/layout/TopNavbar';
import Sidebar from '../components/layout/Sidebar';
import BottomNavbar from '../components/layout/BottomNavbar';
import Button from '../components/ui/Button';

// ============================================================
// ProfileHeader Component
// ============================================================
const ProfileHeader = ({ name, role, tags, avatar, onEditAvatar }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      {/* Cover area with gradient */}
      <div className="h-28 bg-gradient-to-r from-indigo-500 to-indigo-700 relative"></div>
      
      <div className="px-6 pb-6 relative">
        {/* Avatar */}
        <div className="flex justify-between items-end -mt-12 mb-4">
          <div className="relative group">
            <img
              src={avatar}
              alt={name}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-md object-cover"
            />
            <button
              onClick={onEditAvatar}
              className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-1.5 shadow-md hover:bg-indigo-700 transition-all duration-200"
              aria-label="تغيير الصورة"
            >
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* User info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-indigo-600 text-sm font-medium mt-1">{role}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// StatCard Component
// ============================================================
const StatCard = ({ icon, label, value, color }) => {
  const getIcon = () => {
    const icons = {
      analytics: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      account_balance_wallet: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10H21M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      calendar_today: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[icon] || icons.analytics;
  };

  const colorClasses = {
    primary: 'bg-indigo-50 text-indigo-600',
    secondary: 'bg-green-50 text-green-600',
    tertiary: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 transition-all hover:shadow-md">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color] || colorClasses.primary}`}>
        {getIcon()}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

// ============================================================
// PreferencesCard Component
// ============================================================
const PreferencesCard = ({ language, onLanguageChange, theme, onThemeChange, notifications, onNotificationsChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        التفضيلات
      </h3>
      <div className="space-y-4">
        {/* Language */}
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">اللغة</label>
          <div className="flex gap-2">
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${language === 'ar' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              عربي
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${language === 'en' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              English
            </button>
          </div>
        </div>
        {/* Theme */}
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">المظهر</label>
          <div className="flex gap-2">
            <button
              onClick={() => onThemeChange('light')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${theme === 'light' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              فاتح
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              داكن
            </button>
          </div>
        </div>
        {/* Notifications */}
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">الإشعارات</label>
          <button
            onClick={() => onNotificationsChange(!notifications)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${notifications ? 'bg-indigo-600' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PersonalInfoForm Component
// ============================================================
const PersonalInfoForm = ({ formData, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        المعلومات الشخصية
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">نبذة عني</label>
          <textarea
            id="bio"
            rows="3"
            value={formData.bio}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SecurityForm Component
// ============================================================
const SecurityForm = ({ passwordData, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        تغيير كلمة المرور
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور الحالية</label>
          <input
            type="password"
            id="currentPassword"
            value={passwordData.currentPassword}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور الجديدة</label>
          <input
            type="password"
            id="newPassword"
            value={passwordData.newPassword}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">تأكيد كلمة المرور الجديدة</label>
          <input
            type="password"
            id="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Main ProfilePage Component
// ============================================================
const ProfilePage = () => {
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
    <div dir="rtl" className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen">
      <TopNavbar onLogout={handleLogout} />
      <Sidebar onUploadClick={handleUploadClick} />

      <main className="md:mr-64 p-5 md:p-8 pb-28 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <ProfileHeader
            name={personalInfo.fullName}
            role="طالب متميز"
            tags={['علوم الحاسب', 'سنة ثالثة']}
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuA76E3OcQ7aJfJjxpRtKrg1QbVJy-ltaq5sIbWrzL8zrxkq1kM8vEdO-Pu78oTybnEzbOX6aPEh0a4LpU6e6to7Ba3O_n9nAn59XTq8azYGQmcbvUopVi4TtmPtrzDe3zufFdCyMMhjAw1gR-YUXdj0tPy96B1cagIbPSqJNdd1upXsYc7gvPH1XmD2DVwhk2DAlsPgmXwxoXzOJLazCbJd0iT8CcX1Eoxtzkt-oQxM5rePGo-lYTy9uQobn2GWaUZx0LN-QNjvtE20"
            onEditAvatar={handleEditAvatar}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <StatCard icon="analytics" label="الملفات المحللة" value="42" color="primary" />
              <StatCard icon="account_balance_wallet" label="الرصيد المتبقي" value="150" color="secondary" />
              <StatCard icon="calendar_today" label="عضو منذ" value="أكتوبر 2023" color="tertiary" />
              <PreferencesCard
                language={preferences.language}
                onLanguageChange={(val) => setPreferences(prev => ({ ...prev, language: val }))}
                theme={preferences.theme}
                onThemeChange={(val) => setPreferences(prev => ({ ...prev, theme: val }))}
                notifications={preferences.notifications}
                onNotificationsChange={(val) => setPreferences(prev => ({ ...prev, notifications: val }))}
              />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <PersonalInfoForm formData={personalInfo} onChange={handlePersonalChange} />
              <SecurityForm passwordData={passwords} onChange={handlePasswordChange} />
              <div className="flex justify-start">
                <Button onClick={handleSaveAll} variant="primary" className="gap-2 shadow-md shadow-indigo-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
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