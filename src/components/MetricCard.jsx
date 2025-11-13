import React from 'react';
import GlassCard from './GlassCard';

const MetricCard = ({ title, value, icon }) => {
  return (
    <GlassCard style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ 
            color: '#374151', 
            fontSize: '0.875rem', 
            fontWeight: '500',
            marginBottom: '0.25rem'
          }}>
            {title}
          </p>
          <p style={{ 
            fontSize: '1.875rem', 
            fontWeight: '700', 
            color: '#111827'
          }}>
            {value}
          </p>
        </div>
        <div style={{ 
          padding: '0.75rem', 
          borderRadius: '0.5rem', 
          backgroundColor: '#dbeafe'
        }}>
          {icon && React.createElement(icon, { size: 24, style: { color: '#2563eb' } })}
        </div>
      </div>
    </GlassCard>
  );
};

export default MetricCard;