// src/components/ui/FloatingActionButton.jsx
import React from 'react';

const FloatingActionButton = ({ onClick, icon = 'add' }) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-24 left-6 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40 hover:opacity-90 transition-opacity"
    >
      <span className="material-symbols-outlined text-[24px]">{icon}</span>
    </button>
  );
};

export default FloatingActionButton;