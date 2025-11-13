import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { vehicles } from '../data/vehicles';

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': 
        return { backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' };
      case 'In Service': 
        return { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
      case 'Maintenance': 
        return { backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' };
      default: 
        return { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search 
            style={{ 
              position: 'absolute', 
              left: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#6b7280' 
            }} 
            size={20} 
          />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              color: '#111827',
              fontSize: '0.875rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          />
        </div>
        <div style={{ position: 'relative', width: '200px' }}>
          <Filter 
            style={{ 
              position: 'absolute', 
              left: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#6b7280' 
            }} 
            size={20} 
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              paddingLeft: '2.5rem',
              paddingRight: '2rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              color: '#111827',
              fontSize: '0.875rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="In Service">In Service</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {filteredVehicles.map(vehicle => (
          <Link key={vehicle.id} to={`/vehicles/${vehicle.id}`} style={{ textDecoration: 'none' }}>
            <GlassCard style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    color: '#111827',
                    margin: 0
                  }}>
                    {vehicle.model}
                  </h3>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    ...getStatusStyle(vehicle.status)
                  }}>
                    {vehicle.status}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>
                    Mileage: {vehicle.mileage.toLocaleString()} km
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>
                    Last Service: {vehicle.lastService}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>
                    Next Service: {vehicle.nextService}
                  </p>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;