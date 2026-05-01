import React from 'react';
import Button from './Button';

const SocialButton = ({ icon, children, onClick }) => {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <span className="material-symbols-outlined">{icon}</span>;
    }
    return icon;
  };

  return (
    <Button variant="outline" onClick={onClick} fullWidth>
      {icon && (
        <span className="flex items-center justify-center ml-2">
          {renderIcon()}
        </span>
      )}
      {children}
    </Button>
  );
};

export default SocialButton;