// src/components/profile/PreferencesCard.jsx
import React, { useState } from 'react';

const PreferencesCard = ({ language, onLanguageChange, theme, onThemeChange, notifications, onNotificationsChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(theme || 'light');

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">التفضيلات</h2>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-900">اللغة</p>
            <p className="text-xs text-gray-500 mt-0.5">تغيير لغة الواجهة</p>
          </div>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-gray-50 text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-900">المظهر</p>
            <p className="text-xs text-gray-500 mt-0.5">فاتح / داكن</p>
          </div>
          <div className="bg-gray-50 flex p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => handleThemeChange('light')}
              className={`px-3 py-1 rounded flex items-center justify-center transition-colors ${
                selectedTheme === 'light' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:bg-gray-200/50'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>light_mode</span>
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`px-3 py-1 rounded flex items-center justify-center transition-colors ${
                selectedTheme === 'dark' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:bg-gray-200/50'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>dark_mode</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-900">الإشعارات</p>
            <p className="text-xs text-gray-500 mt-0.5">تنبيهات البريد الإلكتروني</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => onNotificationsChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PreferencesCard;