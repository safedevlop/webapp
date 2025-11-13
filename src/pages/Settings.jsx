import GlassCard from '../components/GlassCard';

const Settings = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: '#111827',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        Settings
      </h2>
      <GlassCard>
        <p style={{ 
          color: '#374151',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          Settings page coming soon...
        </p>
      </GlassCard>
    </div>
  );
};

export default Settings;