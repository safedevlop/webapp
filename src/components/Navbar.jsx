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
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Fleet Monitor</span>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map(({ path, icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  {React.createElement(icon, { size: 16, className: "mr-2" })}
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
              <Bell size={20} />
            </button>
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;