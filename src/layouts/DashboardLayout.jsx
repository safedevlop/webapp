import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Wrench, AlertTriangle, Settings, Bell, User } from 'lucide-react';

const DashboardLayout = () => {
  // Professional font styles
  const fontStyles = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '400',
    letterSpacing: '-0.01em'
  };
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/vehicles', icon: Car, label: 'Vehicles' },
    { path: '/services', icon: Wrench, label: 'Services' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alerts' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      ...fontStyles
    }}>
      {/* Navigation Bar */}
      <nav style={{ 
        backgroundColor: '#1e40af', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ 
          maxWidth: '80rem', 
          margin: '0 auto', 
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem'
        }}>
          {/* Logo and Brand */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '2.5rem' }}>
              <div style={{ 
                width: '2rem', 
                height: '2rem', 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem'
              }}>
                <span style={{ color: '#1e40af', fontWeight: 'bold', fontSize: '0.875rem' }}>FM</span>
              </div>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: 'white',
                ...fontStyles
              }}>
                Fleet Monitor
              </span>
            </div>
            
            {/* Navigation Links */}
            <div style={{ display: 'flex', gap: '2rem' }}>
              {navItems.map(({ path, icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    ...fontStyles,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: isActive ? 'white' : '#bfdbfe',
                    borderBottom: isActive ? '2px solid white' : '2px solid transparent'
                  })}
                >
                  {React.createElement(icon, { size: 16 })}
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* User Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ 
              padding: '0.5rem', 
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#bfdbfe',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}>
              <Bell size={20} />
            </button>
            <button style={{ 
              padding: '0.5rem', 
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#bfdbfe',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}>
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '1.5rem 1rem' 
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;