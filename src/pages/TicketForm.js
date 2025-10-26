import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ticketService } from '../utils/tickets';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TicketForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const ticket = ticketService.getById(id);
      if (ticket) {
        setFormData({
          title: ticket.title,
          description: ticket.description || '',
          status: ticket.status,
          priority: ticket.priority || 'medium'
        });
      } else {
        setToast({ message: 'Ticket not found', type: 'error' });
        setTimeout(() => navigate('/tickets'), 2000);
      }
    }
  }, [id, isEdit, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    } else if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
      newErrors.status = 'Status must be open, in_progress, or closed';
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      if (isEdit) {
        ticketService.update(id, formData);
        setToast({ message: 'Ticket updated successfully!', type: 'success' });
      } else {
        ticketService.create(formData);
        setToast({ message: 'Ticket created successfully!', type: 'success' });
      }
      
      setTimeout(() => navigate('/tickets'), 1000);
    } catch (error) {
      setToast({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div>
      <Navbar />
      
      <div style={{minHeight: '80vh', padding: '40px 0'}}>
        <div className="container">
          <div style={{marginBottom: '40px'}}>
            <h1 style={{fontSize: '2.5rem', marginBottom: '8px'}}>
              {isEdit ? 'Edit Ticket' : 'Create New Ticket'}
            </h1>
            <p style={{color: '#6b7280'}}>
              {isEdit ? 'Update ticket details below' : 'Fill in the details to create a new support ticket'}
            </p>
          </div>

          <div className="card" style={{maxWidth: '600px', margin: '0 auto'}}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter ticket title"
                  maxLength="100"
                />
                {errors.title && <div className="error-message">{errors.title}</div>}
                <div style={{fontSize: '12px', color: '#9ca3af', marginTop: '4px'}}>
                  {formData.title.length}/100 characters
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter ticket description (optional)"
                  rows="4"
                  maxLength="500"
                />
                {errors.description && <div className="error-message">{errors.description}</div>}
                <div style={{fontSize: '12px', color: '#9ca3af', marginTop: '4px'}}>
                  {formData.description.length}/500 characters
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.status && <div className="error-message">{errors.status}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div style={{display: 'flex', gap: '16px', marginTop: '32px'}}>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                  style={{flex: 1}}
                >
                  {loading ? 'Saving...' : (isEdit ? 'Update Ticket' : 'Create Ticket')}
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/tickets')}
                  className="btn btn-secondary"
                  style={{flex: 1}}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })} 
      />
    </div>
  );
};

export default TicketForm;