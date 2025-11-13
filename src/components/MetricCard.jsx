import React from 'react';
import GlassCard from './GlassCard';

const MetricCard = ({ title, value, icon }) => {
  return (
    <GlassCard style={{ 
      cursor: 'pointer', 
      transition: 'all 0.3s ease',
      minHeight: '120px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <div>
          <p style={{ 
            color: '#374151', 
            fontSize: '0.875rem', 
            fontWeight: '500',
            marginBottom: '0.5rem',
            margin: 0
          }}>
            {title}
          </p>
          <p style={{ 
            fontSize: '1.875rem', 
            fontWeight: '700', 
            color: '#111827',
            margin: 0,
            lineHeight: '1.2'
          }}>
            {value}
          </p>
        </div>
        <div style={{ 
          padding: '0.75rem', 
          borderRadius: '0.5rem', 
          backgroundColor: '#dbeafe',
          flexShrink: 0
        }}>
          {icon && React.createElement(icon, { size: 24, style: { color: '#2563eb' } })}
        </div>
      </div>
    </GlassCard>
  );
};

export default MetricCard;