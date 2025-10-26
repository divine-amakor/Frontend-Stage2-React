import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = auth.login(formData.email, formData.password);
    
    if (result.success) {
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setToast({ message: result.error, type: 'error' });
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
      <div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', background: '#f8fafc'}}>
        <div className="container">
          <div className="card" style={{maxWidth: '400px', margin: '0 auto'}}>
            <h2 style={{textAlign: 'center', marginBottom: '32px', fontSize: '2rem'}}>
              Welcome Back
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>

              <button type="submit" className="btn btn-primary" style={{width: '100%', marginBottom: '20px'}}>
                Login
              </button>
            </form>

            <p style={{textAlign: 'center', color: '#6b7280'}}>
              Don't have an account?{' '}
              <Link to="/auth/signup" style={{color: '#4f46e5', textDecoration: 'none'}}>
                Sign up
              </Link>
            </p>

            <div style={{marginTop: '20px', padding: '16px', background: '#f3f4f6', borderRadius: '8px'}}>
              <p style={{fontSize: '14px', color: '#6b7280', marginBottom: '8px'}}>Test Credentials:</p>
              <p style={{fontSize: '14px'}}>Email: admin@ticketflow.com</p>
              <p style={{fontSize: '14px'}}>Password: admin123</p>
              <p style={{fontSize: '12px', color: '#9ca3af', marginTop: '8px'}}>Or create a new account to get started</p>
            </div>
          </div>
        </div>
      </div>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })} 
      />
    </div>
  );
};

export default Login;