// src/components/ui/FloatingActionButton.jsx
import React from 'react';

// SVG Add Icon
const AddIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

// يمكن توسيع الخريطة لأيقونات أخرى مستقبلاً
const getIcon = (iconName) => {
  const icons = {
    add: <AddIcon />,
    // يمكن إضافة أيقونات أخرى هنا مثل 'edit', 'upload', etc.
  };
  return icons[iconName] || <AddIcon />;
};

const FloatingActionButton = ({ onClick, icon = 'add' }) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-24 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 flex items-center justify-center z-40 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label="إضافة جديدة"
    >
      {getIcon(icon)}
    </button>
  );
};

export default FloatingActionButton;