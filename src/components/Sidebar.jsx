import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Wrench, AlertTriangle, Settings, Bell, User } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/vehicles', icon: Car, label: 'Vehicles' },
    { path: '/services', icon: Wrench, label: 'Services' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alerts' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div style={{ 
      position: 'fixed', 
      top: '1rem', 
      left: '1rem', 
      right: '1rem', 
      zIndex: 50 
    }}>
      <nav style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(16px)', 
        border: '1px solid rgba(255, 255, 255, 0.2)', 
        borderRadius: '1rem', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          height: '4rem', 
          padding: '0 1.5rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '2rem', 
                height: '2rem', 
                backgroundColor: '#00A8E8', 
                borderRadius: '0.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>FM</span>
              </div>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>Fleet Monitor</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {navItems.map(({ path, icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    transition: 'all 0.2s',
                    backgroundColor: isActive ? 'rgba(0, 168, 232, 0.2)' : 'transparent',
                    color: isActive ? '#00A8E8' : 'rgba(224, 225, 221, 0.8)',
                    textDecoration: 'none',
                    boxShadow: isActive ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                  })}
                >
                  {React.createElement(icon, { size: 18 })}
                  <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button style={{ 
              padding: '0.5rem', 
              borderRadius: '0.75rem', 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              border: 'none',
              color: '#E0E1DD',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <Bell size={18} />
            </button>
            <button style={{ 
              padding: '0.5rem', 
              borderRadius: '0.75rem', 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              border: 'none',
              color: '#E0E1DD',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <User size={18} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;