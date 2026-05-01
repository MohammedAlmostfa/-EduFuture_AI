// src/components/profile/ProfileHeader.jsx
import React from 'react';

// SVG Icons
const EditIcon = () => (
  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const SchoolIcon = () => (
  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const ProfileHeader = ({ name, role, tags, avatar, onEditAvatar }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-lg">
      {/* Avatar with edit button */}
      <div className="relative group">
        <img
          alt={name}
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-sm object-cover"
          src={avatar}
        />
        <button
          onClick={onEditAvatar}
          className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full shadow-md hover:bg-indigo-700 transition-all duration-200 active:scale-95"
          aria-label="تعديل الصورة"
        >
          <EditIcon />
        </button>
      </div>

      {/* Info section */}
      <div className="text-center md:text-right flex-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{name}</h1>
        <p className="text-gray-600 flex items-center justify-center md:justify-start gap-1.5 mb-4 font-medium">
          <SchoolIcon />
          <span>{role}</span>
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;