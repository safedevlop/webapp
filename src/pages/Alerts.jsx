import { X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { alerts } from '../data/services';
import { vehicles } from '../data/vehicles';

const Alerts = () => {
  const getVehicleModel = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.model : 'Unknown';
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case 'critical': 
        return { backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' };
      case 'warning': 
        return { backgroundColor: '#fef3c7', color: '#d97706', border: '1px solid #fde68a' };
      case 'info': 
        return { backgroundColor: '#dbeafe', color: '#2563eb', border: '1px solid #bfdbfe' };
      default: 
        return { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: '#111827',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        Fleet Alerts
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alerts.map(alert => (
          <GlassCard key={alert.id} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  ...getAlertStyle(alert.type)
                }}>
                  {alert.type}
                </span>
                <div>
                  <p style={{ 
                    color: '#111827', 
                    fontWeight: '500',
                    marginBottom: '0.25rem',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}>
                    {alert.message}
                  </p>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.875rem',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}>
                    {getVehicleModel(alert.vehicleId)} • {alert.date}
                  </p>
                </div>
              </div>
              <button style={{ 
                padding: '0.5rem', 
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                color: '#6b7280',
                transition: 'all 0.2s'
              }}>
                <X size={20} />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Alerts;