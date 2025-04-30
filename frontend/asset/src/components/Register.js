import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // If already logged in, redirect to home
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name.trim()) {
      return setError('Please enter your name');
    }
    
    if (!formData.email.trim()) {
      return setError('Please enter your email');
    }
    
    if (!formData.password) {
      return setError('Please enter a password');
    }
    
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (!agreeTerms) {
      return setError('You must agree to the terms and conditions');
    }
    
    try {
      setLoading(true);
      
      // In a real app, this would call your API to create a new user
      // For demo purposes, we'll just log in the user directly
      login({
        name: formData.name,
        email: formData.email,
        isAdmin: false
      });
      
      // Navigate to home after successful registration
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card card">
        <div className="card-header">
          <h3 className="fw-light mb-0">
            <span className="fw-bold" style={{ color: '#8C96F0' }}>ASSET</span>
            <span className="fw-bold">-GURU</span>
          </h3>
          <p className="text-muted mt-2">Create a new account</p>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Full Name</label>
            </div>
            
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email address</label>
            </div>
            
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="agreeTerms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            
            <button
              type="submit"
              className="btn-auth"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
            
            <div className="text-center mt-4">
              <hr />
              <p className="text-muted small mb-0">
                Already have an account? 
                <Link to="/login" className="ms-1">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="small text-muted">
            DORIS - Digital Online Registry Information System
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 