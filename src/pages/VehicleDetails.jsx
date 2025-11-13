import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import GlassCard from '../components/GlassCard';
import { vehicles } from '../data/vehicles';
import { services } from '../data/services';

const VehicleDetails = () => {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.id === parseInt(id));
  const vehicleServices = services.filter(s => s.vehicleId === parseInt(id));

  const temperatureData = [
    { time: '00:00', temp: 85 },
    { time: '04:00', temp: 82 },
    { time: '08:00', temp: 90 },
    { time: '12:00', temp: 95 },
    { time: '16:00', temp: 88 },
    { time: '20:00', temp: 86 }
  ];

  if (!vehicle) {
    return <div className="text-white">Vehicle not found</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Service': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Maintenance': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img 
              src={vehicle.image} 
              alt={vehicle.model}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-white">{vehicle.model}</h1>
              <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(vehicle.status)}`}>
                {vehicle.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[#E0E1DD]">
              <div>
                <p className="text-sm opacity-70">Vehicle ID</p>
                <p className="font-medium">#{vehicle.id}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Mileage</p>
                <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Last Service</p>
                <p className="font-medium">{vehicle.lastService}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Next Service</p>
                <p className="font-medium">{vehicle.nextService}</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-lg font-semibold text-white mb-4">Engine Temperature (24h)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={temperatureData}>
            <XAxis dataKey="time" stroke="#E0E1DD" />
            <YAxis stroke="#E0E1DD" />
            <Line type="monotone" dataKey="temp" stroke="#00A8E8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard>
        <h3 className="text-lg font-semibold text-white mb-4">Service History</h3>
        <div className="space-y-3">
          {vehicleServices.map(service => (
            <div key={service.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">{service.type}</p>
                <p className="text-[#E0E1DD]/70 text-sm">{service.date} • {service.mechanic}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">${service.cost}</p>
                <p className="text-[#E0E1DD]/70 text-sm">{service.status}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default VehicleDetails;