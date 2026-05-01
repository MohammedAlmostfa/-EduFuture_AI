// src/components/profile/ProfileHeader.jsx
import React from 'react';

const ProfileHeader = ({ name, role, tags, avatar, onEditAvatar }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col md:flex-row items-center gap-6 border border-gray-100">
      <div className="relative">
        <img
          alt={name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-sm object-cover"
          src={avatar}
        />
        <button
          onClick={onEditAvatar}
          className="absolute bottom-0 right-0 bg-[#3B82F6] text-white p-2 rounded-full shadow-sm hover:bg-blue-600 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
        </button>
      </div>
      <div className="text-center md:text-right flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
        <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-4 font-medium">
          <span className="material-symbols-outlined text-[#3B82F6]" style={{ fontSize: 18 }}>school</span>
          {role}
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;