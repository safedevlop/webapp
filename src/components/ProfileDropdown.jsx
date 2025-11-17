import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="profile-avatar">
          <User size={20} />
        </div>
        <div className="profile-info">
          <span className="profile-name">{user?.user_metadata?.name || 'User'}</span>
          <span className="profile-role">{user?.user_metadata?.role || 'Fleet Manager'}</span>
        </div>
        <ChevronDown size={16} className={`profile-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="profile-menu">
          <div className="profile-menu-header">
            <div className="profile-menu-avatar">
              <User size={24} />
            </div>
            <div className="profile-menu-info">
              <span className="profile-menu-name">{user?.user_metadata?.name || 'User'}</span>
              <span className="profile-menu-email">{user?.email}</span>
            </div>
          </div>
          
          <div className="profile-menu-divider"></div>
          
          <div className="profile-menu-items">
            <Link to="/settings" className="profile-menu-item" onClick={() => setIsOpen(false)}>
              <Settings size={16} />
              Settings
            </Link>
            <button className="profile-menu-item logout" onClick={handleSignOut}>
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;