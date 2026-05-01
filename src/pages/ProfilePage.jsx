import React from 'react';
import TopNavbar from '../components/layout/TopNavbar';
import Sidebar from '../components/layout/Sidebar';
import BottomNavbar from '../components/layout/BottomNavbar';
import Button from '../components/ui/Button';
import { useProfile } from '../hooks/useProfile';
import { profileData } from '../data/profileData';

// Helper component for rendering icon from SVG string
const Icon = ({ svg, className = "w-5 h-5" }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

// ============================================================
// ProfileHeader Component (pure presentation)
// ============================================================
const ProfileHeader = ({ name, role, tags, avatar, onEditAvatar }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="h-28 bg-gradient-to-r from-indigo-500 to-indigo-700 relative"></div>
      <div className="px-6 pb-6 relative">
        <div className="flex justify-between items-end -mt-12 mb-4">
          <div className="relative group">
            <img
              src={avatar || profileData.defaultAvatar}
              alt={name}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-md object-cover"
            />
            <button
              onClick={onEditAvatar}
              className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-1.5 shadow-md hover:bg-indigo-700 transition-all duration-200"
              aria-label={profileData.profileHeader.editAvatarLabel}
            >
              <Icon svg={profileData.icons.editAvatarSvg} className="w-3.5 h-3.5 text-white" />
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
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-indigo-600 text-sm font-medium mt-1">{role}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// StatCard Component (pure presentation)
// ============================================================
const StatCard = ({ icon, label, value, color }) => {
  const getIconSvg = () => {
    switch (icon) {
      case 'analytics':
        return profileData.icons.analyticsSvg;
      case 'account_balance_wallet':
        return profileData.icons.walletSvg;
      case 'calendar_today':
        return profileData.icons.calendarSvg;
      default:
        return profileData.icons.analyticsSvg;
    }
  };

  const colorClasses = {
    primary: 'bg-indigo-50 text-indigo-600',
    secondary: 'bg-green-50 text-green-600',
    tertiary: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 transition-all hover:shadow-md">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color] || colorClasses.primary}`}>
        <Icon svg={getIconSvg()} className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

// ============================================================
// PreferencesCard Component (pure presentation)
// ============================================================
const PreferencesCard = ({ language, onLanguageChange, theme, onThemeChange, notifications, onNotificationsChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Icon svg={profileData.icons.preferencesSvg} />
        {profileData.preferences.title}
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">{profileData.preferences.languageLabel}</label>
          <div className="flex gap-2">
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${language === 'ar' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {profileData.preferences.languageOptions.ar}
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${language === 'en' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {profileData.preferences.languageOptions.en}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">{profileData.preferences.themeLabel}</label>
          <div className="flex gap-2">
            <button
              onClick={() => onThemeChange('light')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${theme === 'light' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {profileData.preferences.themeOptions.light}
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {profileData.preferences.themeOptions.dark}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">{profileData.preferences.notificationsLabel}</label>
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
// PersonalInfoForm Component (pure presentation)
// ============================================================
const PersonalInfoForm = ({ formData, onChange }) => {
  const fields = profileData.personalInfo.fields;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Icon svg={profileData.icons.personalInfoSvg} />
        {profileData.personalInfo.title}
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor={fields.fullName.id} className="block text-sm font-medium text-gray-700 mb-1">{fields.fullName.label}</label>
          <input
            type={fields.fullName.type}
            id={fields.fullName.id}
            value={formData.fullName}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor={fields.email.id} className="block text-sm font-medium text-gray-700 mb-1">{fields.email.label}</label>
          <input
            type={fields.email.type}
            id={fields.email.id}
            value={formData.email}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor={fields.phone.id} className="block text-sm font-medium text-gray-700 mb-1">{fields.phone.label}</label>
          <input
            type={fields.phone.type}
            id={fields.phone.id}
            value={formData.phone}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor={fields.bio.id} className="block text-sm font-medium text-gray-700 mb-1">{fields.bio.label}</label>
          <textarea
            id={fields.bio.id}
            rows={fields.bio.rows}
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
// SecurityForm Component (pure presentation)
// ============================================================
const SecurityForm = ({ passwordData, onChange }) => {
  const fields = profileData.security.fields;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Icon svg={profileData.icons.securitySvg} />
        {profileData.security.title}
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor={fields.currentPassword.id} className="block text-sm font-medium text-gray-700 mb-1">{fields.currentPassword.label}</label>
          <input
            type={fields.currentPassword.type}
            id={fields.currentPassword.id}
            value={passwordData.currentPassword}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor={fields.newPassword.id} className="block text-sm font-medium text-gray-700 mb-1">{fields.newPassword.label}</label>
          <input
            type={fields.newPassword.type}
            id={fields.newPassword.id}
            value={passwordData.newPassword}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor={fields.confirmPassword.id} className="block text-sm font-medium text-gray-700 mb-1">{fields.confirmPassword.label}</label>
          <input
            type={fields.confirmPassword.type}
            id={fields.confirmPassword.id}
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
// Main ProfilePage Component (consumes the hook)
// ============================================================
const ProfilePage = () => {
  const {
    personalInfo,
    passwords,
    preferences,
    handlePersonalChange,
    handlePasswordChange,
    handlePreferencesChange,
    handleSaveAll,
    handleLogout,
    handleUploadClick,
    handleEditAvatar,
  } = useProfile();

  return (
    <div dir="rtl" className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen">
      <TopNavbar onLogout={handleLogout} />
      <Sidebar onUploadClick={handleUploadClick} />

      <main className="md:mr-64 p-5 md:p-8 pb-28 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <ProfileHeader
            name={personalInfo.fullName}
            role={profileData.profileHeader.defaultRole}
            tags={profileData.profileHeader.defaultTags}
            avatar={personalInfo.avatar} // assuming avatar exists in personalInfo from hook
            onEditAvatar={handleEditAvatar}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-1 flex flex-col gap-6">
              <StatCard
                icon={profileData.statCards.analytics.iconName}
                label={profileData.statCards.analytics.label}
                value={profileData.statCards.analytics.value}
                color={profileData.statCards.analytics.color}
              />
              <StatCard
                icon={profileData.statCards.balance.iconName}
                label={profileData.statCards.balance.label}
                value={profileData.statCards.balance.value}
                color={profileData.statCards.balance.color}
              />
              <StatCard
                icon={profileData.statCards.memberSince.iconName}
                label={profileData.statCards.memberSince.label}
                value={profileData.statCards.memberSince.value}
                color={profileData.statCards.memberSince.color}
              />
              <PreferencesCard
                language={preferences.language}
                onLanguageChange={(val) => handlePreferencesChange('language', val)}
                theme={preferences.theme}
                onThemeChange={(val) => handlePreferencesChange('theme', val)}
                notifications={preferences.notifications}
                onNotificationsChange={(val) => handlePreferencesChange('notifications', val)}
              />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <PersonalInfoForm formData={personalInfo} onChange={handlePersonalChange} />
              <SecurityForm passwordData={passwords} onChange={handlePasswordChange} />
              <div className="flex justify-start">
                <Button onClick={handleSaveAll} variant="primary" className="gap-2 shadow-md shadow-indigo-200">
                  <Icon svg={profileData.icons.saveIconSvg} />
                  {profileData.saveButton.text}
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