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
    <div className="fixed top-4 left-4 right-4 z-50">
      <nav className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#00A8E8] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="text-white font-bold text-xl">Fleet Monitor</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map(({ path, icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#00A8E8]/20 text-[#00A8E8] shadow-lg'
                        : 'text-[#E0E1DD]/80 hover:bg-white/10 hover:text-[#E0E1DD]'
                    }`
                  }
                >
                  {React.createElement(icon, { size: 18 })}
                  <span className="text-sm font-medium">{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 hover:shadow-lg">
              <Bell size={18} className="text-[#E0E1DD]" />
            </button>
            <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 hover:shadow-lg">
              <User size={18} className="text-[#E0E1DD]" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;