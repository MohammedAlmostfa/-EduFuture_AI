// src/components/profile/SecurityForm.jsx
import React from 'react';
import InputField from '../ui/InputField';

const SecurityForm = ({ passwordData, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">الأمان وكلمة المرور</h2>
      <div className="flex flex-col gap-5">
        <InputField
          id="currentPassword"
          label="كلمة المرور الحالية"
          type="password"
          placeholder="••••••••"
          value={passwordData.currentPassword}
          onChange={onChange}
          className="bg-gray-50 border-gray-200 focus:bg-white focus:border-[#3B82F6] rounded-lg md:w-1/2"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
          <InputField
            id="newPassword"
            label="كلمة المرور الجديدة"
            type="password"
            placeholder="أدخل كلمة المرور الجديدة"
            value={passwordData.newPassword}
            onChange={onChange}
            className="bg-gray-50 border-gray-200 focus:bg-white focus:border-[#3B82F6] rounded-lg"
          />
          <InputField
            id="confirmPassword"
            label="تأكيد كلمة المرور"
            type="password"
            placeholder="أعد إدخال كلمة المرور"
            value={passwordData.confirmPassword}
            onChange={onChange}
            className="bg-gray-50 border-gray-200 focus:bg-white focus:border-[#3B82F6] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityForm;