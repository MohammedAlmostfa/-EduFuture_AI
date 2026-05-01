import React from 'react';

const Divider = ({ text = 'أو' }) => {
  return (
    <div className="relative flex items-center mb-6">
      <div className="flex-grow border-t border-surface-variant"></div>
      <span className="flex-shrink-0 mx-4 font-label-sm text-label-sm text-on-surface-variant">
        {text}
      </span>
      <div className="flex-grow border-t border-surface-variant"></div>
    </div>
  );
};

export default Divider;