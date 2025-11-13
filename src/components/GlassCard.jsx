import React from 'react';

const GlassCard = ({ children, className = "", style = {}, ...props }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        padding: '1.5rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        position: 'relative',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;