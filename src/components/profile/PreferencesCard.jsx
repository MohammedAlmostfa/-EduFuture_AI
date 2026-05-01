// src/components/profile/PreferencesCard.jsx
import React, { useState } from 'react';

// SVG Icons
const SettingsIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LightModeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const DarkModeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const PreferencesCard = ({ language, onLanguageChange, theme, onThemeChange, notifications, onNotificationsChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(theme || 'light');

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg">
      {/* Header with icon */}
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
        <SettingsIcon />
        <h2 className="text-lg font-semibold text-gray-800">التفضيلات</h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Language */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">اللغة</p>
            <p className="text-xs text-gray-500 mt-0.5">تغيير لغة الواجهة</p>
          </div>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-gray-50 text-gray-700 border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Theme */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">المظهر</p>
            <p className="text-xs text-gray-500 mt-0.5">فاتح / داكن</p>
          </div>
          <div className="bg-gray-100 flex p-1 rounded-xl">
            <button
              onClick={() => handleThemeChange('light')}
              className={`px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 ${
                selectedTheme === 'light'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-200/70'
              }`}
            >
              <LightModeIcon />
              <span className="text-xs font-medium">فاتح</span>
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 ${
                selectedTheme === 'dark'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-200/70'
              }`}
            >
              <DarkModeIcon />
              <span className="text-xs font-medium">داكن</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">الإشعارات</p>
            <p className="text-xs text-gray-500 mt-0.5">تنبيهات البريد الإلكتروني</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => onNotificationsChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PreferencesCard;