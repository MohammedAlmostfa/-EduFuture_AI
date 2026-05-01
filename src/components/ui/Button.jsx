// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  fullWidth = false,
  icon = null
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const sizeStyles = 'px-4 py-2.5 text-sm';
  const fullWidthStyles = fullWidth ? 'w-full' : 'w-auto';
  
  const variants = {
    primary: 'bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-95 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:shadow-none',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-indigo-300 active:scale-95 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
    error: 'bg-red-600 text-white shadow-md shadow-red-200 hover:bg-red-700 active:scale-95 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed disabled:shadow-none',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${fullWidthStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;