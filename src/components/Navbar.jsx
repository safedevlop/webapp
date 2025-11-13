import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Wrench, AlertTriangle, Settings, Bell, User } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/vehicles', icon: Car, label: 'Vehicles' },
    { path: '/services', icon: Wrench, label: 'Services' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alerts' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="navbar-brand">
              <div className="navbar-logo">
                <span className="navbar-logo-text">FM</span>
              </div>
              <span className="navbar-title">Fleet Monitor</span>
            </div>
            <div className="navbar-nav">
              {navItems.map(({ path, icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                >
                  {React.createElement(icon, { size: 16, style: { marginRight: '0.5rem' } })}
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="navbar-right">
            <button className="navbar-button">
              <Bell size={20} />
            </button>
            <button className="navbar-button">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;