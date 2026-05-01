// src/components/profile/PersonalInfoForm.jsx
import React from 'react';
import InputField from '../ui/InputField';

// SVG User Icon
const UserIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PersonalInfoForm = ({ formData, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg">
      {/* Header with icon */}
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
        <UserIcon />
        <h2 className="text-lg font-semibold text-gray-800">المعلومات الشخصية</h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Two column layout for name & email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            id="fullName"
            label="الاسم الكامل"
            value={formData.fullName}
            onChange={onChange}
            className="rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <InputField
            id="email"
            label="البريد الإلكتروني"
            type="email"
            value={formData.email}
            onChange={onChange}
            className="rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Phone number - half width on medium screens */}
        <InputField
          id="phone"
          label="رقم الهاتف"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          className="rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 md:w-1/2"
        />

        {/* Bio textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="bio">
            نبذة شخصية
          </label>
          <textarea
            id="bio"
            rows="3"
            value={formData.bio}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
            placeholder="اكتب نبذة مختصرة عنك..."
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;