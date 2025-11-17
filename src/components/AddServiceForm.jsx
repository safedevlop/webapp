import { useState } from 'react';
import { X } from 'lucide-react';
import { serviceRecordService } from '../lib/supabase';

const AddServiceForm = ({ isOpen, onClose, vehicles, onServiceAdded }) => {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    type: '',
    mechanic: '',
    cost: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Completed'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceData = {
        ...formData,
        vehicle_id: parseInt(formData.vehicle_id),
        cost: parseFloat(formData.cost)
      };

      await serviceRecordService.create(serviceData);
      onServiceAdded();
      onClose();
      setFormData({
        vehicle_id: '',
        type: '',
        mechanic: '',
        cost: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Completed'
      });
    } catch (error) {
      console.error('Error adding service:', error);
      alert(`Error adding service: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay">
      <div className="form-popup">
        <div className="form-header">
          <h2>Add Service</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="simple-form">
          <div className="field">
            <label>Vehicle</label>
            <select name="vehicle_id" value={formData.vehicle_id} onChange={handleChange} required>
              <option value="">Select Vehicle</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.model} - {vehicle.reg_number || vehicle.regNumber}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Service Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Oil Change, Brake Service, etc."
              required
            />
          </div>

          <div className="field">
            <label>Mechanic</label>
            <input
              type="text"
              name="mechanic"
              value={formData.mechanic}
              onChange={handleChange}
              placeholder="Mechanic name"
              required
            />
          </div>

          <div className="field">
            <label>Cost (Rs)</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div className="field">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="save-btn">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;