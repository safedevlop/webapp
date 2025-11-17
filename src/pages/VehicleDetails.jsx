import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Calendar, Gauge, Wrench, AlertTriangle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { vehicleService, serviceRecordService } from '../lib/supabase';
import { vehicles as staticVehicles } from '../data/vehicles';
import { services as staticServices } from '../data/services';

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [vehicleServices, setVehicleServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehicleData, servicesData] = await Promise.all([
          vehicleService.getById(parseInt(id)),
          serviceRecordService.getByVehicleId(parseInt(id))
        ]);
        
        // Use database data if available, otherwise fallback to static data
        if (vehicleData) {
          setVehicle(vehicleData);
          setVehicleServices(servicesData || []);
        } else {
          // Fallback to static data
          const staticVehicle = staticVehicles.find(v => v.id === parseInt(id));
          const staticVehicleServices = staticServices.filter(s => s.vehicleId === parseInt(id));
          setVehicle(staticVehicle);
          setVehicleServices(staticVehicleServices);
        }
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
        // Fallback to static data on error
        const staticVehicle = staticVehicles.find(v => v.id === parseInt(id));
        const staticVehicleServices = staticServices.filter(s => s.vehicleId === parseInt(id));
        setVehicle(staticVehicle);
        setVehicleServices(staticVehicleServices);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const temperatureData = [
    { time: '00:00', temp: 85 },
    { time: '04:00', temp: 82 },
    { time: '08:00', temp: 90 },
    { time: '12:00', temp: 95 },
    { time: '16:00', temp: 88 },
    { time: '20:00', temp: 86 }
  ];

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
        Loading vehicle details...
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        color: '#374151',
        fontSize: '1.125rem'
      }}>
        Vehicle not found
      </div>
    );
  }

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Link 
          to="/vehicles" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: '#2563eb',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          <ArrowLeft size={16} />
          Back to Vehicles
        </Link>
      </div>

      <GlassCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '700', 
              color: '#111827',
              margin: 0
            }}>
              {vehicle.model}
            </h1>
            <span style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500',
              ...getStatusStyle(vehicle.status)
            }}>
              {vehicle.status}
            </span>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                padding: '0.5rem', 
                borderRadius: '0.5rem', 
                backgroundColor: '#dbeafe' 
              }}>
                <Gauge size={20} style={{ color: '#2563eb' }} />
              </div>
              <div>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Registration
                </p>
                <p style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#111827',
                  margin: 0
                }}>
                  {vehicle.reg_number}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                padding: '0.5rem', 
                borderRadius: '0.5rem', 
                backgroundColor: '#dbeafe' 
              }}>
                <Gauge size={20} style={{ color: '#2563eb' }} />
              </div>
              <div>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Total Mileage
                </p>
                <p style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#111827',
                  margin: 0
                }}>
                  {vehicle.mileage.toLocaleString()} km
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                padding: '0.5rem', 
                borderRadius: '0.5rem', 
                backgroundColor: '#dcfce7' 
              }}>
                <Calendar size={20} style={{ color: '#16a34a' }} />
              </div>
              <div>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Last Service
                </p>
                <p style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#111827',
                  margin: 0
                }}>
                  {vehicle.lastService}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                padding: '0.5rem', 
                borderRadius: '0.5rem', 
                backgroundColor: '#fef3c7' 
              }}>
                <AlertTriangle size={20} style={{ color: '#d97706' }} />
              </div>
              <div>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Next Service
                </p>
                <p style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#111827',
                  margin: 0
                }}>
                  {vehicle.nextService}
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: '#111827', 
          marginBottom: '1rem',
          margin: 0
        }}>
          Engine Temperature (24h)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={temperatureData}>
            <XAxis dataKey="time" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: '#111827', 
          marginBottom: '1rem',
          margin: 0
        }}>
          Service History
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          {vehicleServices.length > 0 ? (
            vehicleServices.map(service => (
              <div 
                key={service.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    padding: '0.5rem', 
                    borderRadius: '0.5rem', 
                    backgroundColor: '#dbeafe' 
                  }}>
                    <Wrench size={16} style={{ color: '#2563eb' }} />
                  </div>
                  <div>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: '#111827',
                      margin: 0
                    }}>
                      {service.type}
                    </p>
                    <p style={{ 
                      fontSize: '0.75rem', 
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {service.date} • {service.mechanic}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#111827',
                    margin: 0
                  }}>
                    Rs {service.cost}
                  </p>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: '#16a34a',
                    margin: 0
                  }}>
                    {service.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              No service history available for this vehicle.
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default VehicleDetails;