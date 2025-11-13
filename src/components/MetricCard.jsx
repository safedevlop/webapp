import React from 'react';
import GlassCard from './GlassCard';

const MetricCard = ({ title, value, icon }) => {
  return (
    <GlassCard className="metric-card">
      <div className="metric-card-content">
        <div className="metric-card-info">
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
        <div className="metric-card-icon">
          {icon && React.createElement(icon, { size: 24, style: { color: '#2563eb' } })}
        </div>
      </div>
    </GlassCard>
  );
};

export default MetricCard;