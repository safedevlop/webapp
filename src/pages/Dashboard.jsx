import { useState, useEffect } from 'react';
import { Car, Wrench, AlertTriangle, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import MetricCard from '../components/MetricCard';
import GlassCard from '../components/GlassCard';
import { vehicleService, serviceRecordService } from '../lib/supabase';
import { dashboardMetrics, mileageData, serviceData } from '../data/vehicles';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(dashboardMetrics);
  const [chartData, setChartData] = useState({ revenueData: mileageData, serviceData });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [vehicles, services] = await Promise.all([
          vehicleService.getAll(),
          serviceRecordService.getAll()
        ]);

        if (vehicles.length > 0) {
          const activeVehicles = vehicles.filter(v => v.status === 'Active').length;
          const vehiclesInService = vehicles.filter(v => v.status === 'In Service').length;
          const maintenanceDue = vehicles.filter(v => {
            if (!v.next_service) return false;
            const nextService = new Date(v.next_service);
            const today = new Date();
            const diffTime = nextService - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 30;
          }).length;
          const totalRevenue = services.reduce((sum, s) => sum + (s.cost || 0), 0);

          setMetrics({
            activeVehicles,
            vehiclesInService,
            maintenanceDue,
            totalRevenue
          });

          // Calculate average revenue trend per month from service costs
          const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const revenueByMonth = {};
          
          services.forEach(service => {
            const month = new Date(service.date).toLocaleDateString('en-US', { month: 'short' });
            if (!revenueByMonth[month]) revenueByMonth[month] = [];
            revenueByMonth[month].push(service.cost || 0);
          });

          const revenueTrend = months.map(month => {
            const monthRevenues = revenueByMonth[month] || [];
            const avgRevenue = monthRevenues.length > 0 
              ? Math.round(monthRevenues.reduce((sum, cost) => sum + cost, 0) / monthRevenues.length)
              : 0;
            return {
              month,
              revenue: avgRevenue
            };
          });

          // Calculate services per month from actual data
          const servicesByMonth = {};
          services.forEach(service => {
            const month = new Date(service.date).toLocaleDateString('en-US', { month: 'short' });
            servicesByMonth[month] = (servicesByMonth[month] || 0) + 1;
          });

          const servicesChart = months.map(month => ({
            month,
            services: servicesByMonth[month] || 0
          }));

          setChartData({
            revenueData: revenueTrend,
            serviceData: servicesChart
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-metrics">
        <MetricCard
          title="Active Vehicles"
          value={metrics.activeVehicles}
          icon={Car}
        />
        <MetricCard
          title="In Service"
          value={metrics.vehiclesInService}
          icon={Wrench}
        />
        <MetricCard
          title="Maintenance Due"
          value={metrics.maintenanceDue}
          icon={AlertTriangle}
        />
        <MetricCard
          title="Total Revenue"
          value={`Rs ${metrics.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
        />
      </div>

      <div className="dashboard-charts">
        <GlassCard>
          <h3 className="chart-title">Average Revenue Trend Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.revenueData}>
              <XAxis dataKey="month" stroke="#374151" />
              <YAxis stroke="#374151" tickFormatter={(value) => Math.round(value)} />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h3 className="chart-title">Total Servicing Done Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.serviceData}>
              <XAxis dataKey="month" stroke="#374151" />
              <YAxis stroke="#374151" tickFormatter={(value) => Math.round(value)} />
              <Bar dataKey="services" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;