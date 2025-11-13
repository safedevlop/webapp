import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Wrench, AlertTriangle, Settings, Bell, User } from 'lucide-react';

const DashboardLayout = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/vehicles', icon: Car, label: 'Vehicles' },
    { path: '/services', icon: Wrench, label: 'Services' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alerts' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <div className="dashboard-nav-container">
          <div className="dashboard-nav-left">
            <div className="dashboard-brand">
              <div className="dashboard-logo">
                <span className="dashboard-logo-text">FM</span>
              </div>
              <span className="dashboard-title">Fleet Monitor</span>
            </div>
            
            <div className="dashboard-nav-links">
              {navItems.map(({ path, icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => `dashboard-nav-link ${isActive ? 'active' : ''}`}
                >
                  {React.createElement(icon, { size: 16 })}
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="dashboard-nav-right">
            <button className="dashboard-nav-button">
              <Bell size={20} />
            </button>
            <button className="dashboard-nav-button">
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;