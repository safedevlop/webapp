import { useState, useEffect } from 'react';
import { User, Bell, Shield, Truck, Save, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/GlassCard';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: 'Fleet Manager',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.user_metadata?.name || '',
        email: user.email || '',
        role: user.user_metadata?.role || 'Fleet Manager',
        phone: user.user_metadata?.phone || ''
      });
    }
  }, [user]);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    maintenanceReminders: true,
    serviceNotifications: true
  });

  const [fleetSettings, setFleetSettings] = useState({
    autoAssignServices: true,
    maintenanceThreshold: 5000,
    alertFrequency: 'daily'
  });

  const handleSave = async () => {
    try {
      const { error } = await updateProfile({
        name: profile.name,
        role: profile.role,
        phone: profile.phone
      });
      
      if (error) {
        alert('Error saving settings: ' + error.message);
      } else {
        alert('Settings saved successfully!');
      }
    } catch (error) {
      alert('Error saving settings: ' + error.message);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="settings-title">Settings</h2>
        <button onClick={handleSave} className="settings-save-btn">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="settings-grid">
        <GlassCard>
          <div className="settings-section">
            <div className="settings-section-header">
              <User size={20} style={{ color: '#2563eb' }} />
              <h3 className="settings-section-title">Profile Information</h3>
            </div>
            
            <div className="profile-avatar">
              <div className="avatar-circle">
                <User size={32} style={{ color: '#6b7280' }} />
              </div>
              <button className="avatar-upload-btn">
                <Camera size={16} />
                Change Photo
              </button>
            </div>

            <div className="settings-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  value={profile.role}
                  onChange={(e) => setProfile({...profile, role: e.target.value})}
                  className="form-input"
                >
                  <option value="Fleet Manager">Fleet Manager</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="settings-section">
            <div className="settings-section-header">
              <Bell size={20} style={{ color: '#2563eb' }} />
              <h3 className="settings-section-title">Notifications</h3>
            </div>
            
            <div className="settings-form">
              <div className="form-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={notifications.emailAlerts}
                    onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                  Email Alerts
                </label>
              </div>
              <div className="form-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={notifications.smsAlerts}
                    onChange={(e) => setNotifications({...notifications, smsAlerts: e.target.checked})}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                  SMS Alerts
                </label>
              </div>
              <div className="form-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={notifications.maintenanceReminders}
                    onChange={(e) => setNotifications({...notifications, maintenanceReminders: e.target.checked})}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                  Maintenance Reminders
                </label>
              </div>
              <div className="form-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={notifications.serviceNotifications}
                    onChange={(e) => setNotifications({...notifications, serviceNotifications: e.target.checked})}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                  Service Notifications
                </label>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="settings-section">
            <div className="settings-section-header">
              <Truck size={20} style={{ color: '#2563eb' }} />
              <h3 className="settings-section-title">Fleet Management</h3>
            </div>
            
            <div className="settings-form">
              <div className="form-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={fleetSettings.autoAssignServices}
                    onChange={(e) => setFleetSettings({...fleetSettings, autoAssignServices: e.target.checked})}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                  Auto-assign Services
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Maintenance Threshold (km)</label>
                <input
                  type="number"
                  value={fleetSettings.maintenanceThreshold}
                  onChange={(e) => setFleetSettings({...fleetSettings, maintenanceThreshold: parseInt(e.target.value)})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Alert Frequency</label>
                <select
                  value={fleetSettings.alertFrequency}
                  onChange={(e) => setFleetSettings({...fleetSettings, alertFrequency: e.target.value})}
                  className="form-input"
                >
                  <option value="realtime">Real-time</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="settings-section">
            <div className="settings-section-header">
              <Shield size={20} style={{ color: '#2563eb' }} />
              <h3 className="settings-section-title">Security</h3>
            </div>
            
            <div className="settings-form">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="form-input"
                />
              </div>
              <button className="password-change-btn">
                Change Password
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Settings;