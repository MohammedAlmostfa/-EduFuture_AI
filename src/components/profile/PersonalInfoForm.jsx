// src/components/profile/PersonalInfoForm.jsx
import React from 'react';
import InputField from '../ui/InputField'; // نعيد استخدام InputField مع className

const PersonalInfoForm = ({ formData, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">المعلومات الشخصية</h2>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            id="fullName"
            label="الاسم الكامل"
            value={formData.fullName}
            onChange={onChange}
            className="bg-gray-50 border-gray-200 focus:bg-white focus:border-[#3B82F6] rounded-lg"
          />
          <InputField
            id="email"
            label="البريد الإلكتروني"
            type="email"
            value={formData.email}
            onChange={onChange}
            className="bg-gray-50 border-gray-200 focus:bg-white focus:border-[#3B82F6] rounded-lg"
          />
        </div>
        <InputField
          id="phone"
          label="رقم الهاتف"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          className="bg-gray-50 border-gray-200 focus:bg-white focus:border-[#3B82F6] rounded-lg md:w-1/2"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="bio">نبذة شخصية</label>
          <textarea
            id="bio"
            rows="3"
            value={formData.bio}
            onChange={onChange}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:bg-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all w-full resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;