import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AddServiceForm from '../components/AddServiceForm';
import { serviceRecordService, vehicleService } from '../lib/supabase';

const Services = () => {
  const [showModal, setShowModal] = useState(false);
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [servicesData, vehiclesData] = await Promise.all([
        serviceRecordService.getAll(),
        vehicleService.getAll()
      ]);
      setServices(servicesData);
      setVehicles(vehiclesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleServiceAdded = () => {
    fetchData();
  };

  const handleStatusChange = async (serviceId, newStatus) => {
    try {
      await serviceRecordService.update(serviceId, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert(`Error updating status: ${error.message || error}`);
    }
  };

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

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.125rem',
        color: '#6b7280'
      }}>
        Loading services...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          color: '#111827',
          margin: 0,
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
                  <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{getVehicleModel(service.vehicle_id)}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{service.type}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{service.mechanic}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>Rs {service.cost}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <select 
                      value={service.status}
                      onChange={(e) => handleStatusChange(service.id, e.target.value)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        border: '1px solid #d1d5db',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        ...getStatusStyle(service.status)
                      }}
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <AddServiceForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        vehicles={vehicles}
        onServiceAdded={handleServiceAdded}
      />
    </div>
  );
};

export default Services;