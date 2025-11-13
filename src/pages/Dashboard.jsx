import { Car, Wrench, AlertTriangle, Gauge } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import MetricCard from '../components/MetricCard';
import GlassCard from '../components/GlassCard';
import { dashboardMetrics, mileageData, serviceData } from '../data/vehicles';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-metrics">
        <MetricCard
          title="Active Vehicles"
          value={dashboardMetrics.activeVehicles}
          icon={Car}
        />
        <MetricCard
          title="In Service"
          value={dashboardMetrics.vehiclesInService}
          icon={Wrench}
        />
        <MetricCard
          title="Maintenance Due"
          value={dashboardMetrics.maintenanceDue}
          icon={AlertTriangle}
        />
        <MetricCard
          title="Total Mileage"
          value={`${dashboardMetrics.totalMileage.toLocaleString()} km`}
          icon={Gauge}
        />
      </div>

      <div className="dashboard-charts">
        <GlassCard>
          <h3 className="chart-title">Mileage Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mileageData}>
              <XAxis dataKey="month" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Line type="monotone" dataKey="mileage" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h3 className="chart-title">Services Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceData}>
              <XAxis dataKey="month" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Bar dataKey="services" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;