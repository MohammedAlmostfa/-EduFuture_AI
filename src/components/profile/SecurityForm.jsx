// src/components/profile/SecurityForm.jsx
import React from 'react';
import InputField from '../ui/InputField';

// SVG Lock Icon
const LockIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const SecurityForm = ({ passwordData, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg">
      {/* Header with icon */}
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
        <LockIcon />
        <h2 className="text-lg font-semibold text-gray-800">الأمان وكلمة المرور</h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Current password - half width on medium screens */}
        <InputField
          id="currentPassword"
          label="كلمة المرور الحالية"
          type="password"
          placeholder="••••••••"
          value={passwordData.currentPassword}
          onChange={onChange}
          className="rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 md:w-1/2"
        />

        {/* New password & confirm - two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            id="newPassword"
            label="كلمة المرور الجديدة"
            type="password"
            placeholder="أدخل كلمة المرور الجديدة"
            value={passwordData.newPassword}
            onChange={onChange}
            className="rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <InputField
            id="confirmPassword"
            label="تأكيد كلمة المرور"
            type="password"
            placeholder="أعد إدخال كلمة المرور"
            value={passwordData.confirmPassword}
            onChange={onChange}
            className="rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityForm;