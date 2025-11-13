import { useState } from 'react';
import { Plus } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { services } from '../data/services';
import { vehicles } from '../data/vehicles';

const Services = () => {
  const [showModal, setShowModal] = useState(false);

  const getVehicleModel = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.model : 'Unknown';
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': 
        return { backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' };
      case 'In Progress': 
        return { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
      default: 
        return { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          color: '#111827',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          Service Records
        </h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          <Plus size={20} />
          <span>Add Service</span>
        </button>
      </div>

      <GlassCard>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#374151', fontWeight: '600' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#374151', fontWeight: '600' }}>Vehicle</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#374151', fontWeight: '600' }}>Service Type</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#374151', fontWeight: '600' }}>Mechanic</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#374151', fontWeight: '600' }}>Cost</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#374151', fontWeight: '600' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{service.date}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{getVehicleModel(service.vehicleId)}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{service.type}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{service.mechanic}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>${service.cost}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      ...getStatusStyle(service.status)
                    }}>
                      {service.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default Services;