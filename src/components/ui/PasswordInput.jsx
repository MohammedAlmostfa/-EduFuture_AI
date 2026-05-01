// src/components/ui/PasswordInput.jsx
import React from 'react';
import InputField from './InputField';
import { useToggle } from '../../hooks/useToggle';

const PasswordInput = ({ id, label, placeholder, value, onChange, error, startIcon, showToggle = true }) => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const inputType = showPassword ? 'text' : 'password';
  
  let inputClassName = '';
  if (startIcon) inputClassName += ' pr-10';
  if (showToggle) inputClassName += ' pl-10';
  
  return (
    <div className="space-y-2">
      {label && <label htmlFor={id} className="block font-label-sm text-label-sm text-on-surface">{label}</label>}
      <div className="relative">
        {startIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-outline">{startIcon}</span>
        )}
        <InputField id={id} type={inputType} placeholder={placeholder} value={value} onChange={onChange} error={error} className={inputClassName} />
        {showToggle && (
          <button type="button" onClick={toggleShowPassword} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors" aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}>
            <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
          </button>
        )}
      </div>
      {error && <p className="font-label-sm text-label-sm text-error mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;