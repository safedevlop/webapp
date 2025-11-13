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
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '4rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: '#2563eb',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem'
              }}>
                <span style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}>
                  FM
                </span>
              </div>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                Fleet Monitor
              </span>
            </div>
            <div style={{
              display: 'flex',
              marginLeft: '2.5rem',
              gap: '2rem'
            }}>
              {navItems.map(({ path, icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  style={({ isActive }) => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.25rem 0.75rem 0.25rem',
                    borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: isActive ? '#111827' : '#6b7280',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  })}
                >
                  {React.createElement(icon, { size: 16, style: { marginRight: '0.5rem' } })}
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              color: '#9ca3af',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}>
              <Bell size={20} />
            </button>
            <button style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              color: '#9ca3af',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}>
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;