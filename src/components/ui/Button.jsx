import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, fullWidth = true }) => {
  const baseStyles = 'py-3 rounded-lg font-label-sm text-label-sm transition-all flex items-center justify-center gap-2';
  const fullWidthStyles = fullWidth ? 'w-full' : 'w-auto';
  
  const variants = {
    primary: 'bg-primary hover:bg-[#004ca3] active:scale-[0.98] active:shadow-[0_0_0_2px_rgba(0,88,190,0.3)] text-on-primary shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),_0px_2px_4px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),_0px_4px_6px_-2px_rgba(0,0,0,0.05)]',
    outline: 'bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low text-on-surface',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${fullWidthStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;