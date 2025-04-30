import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get return URL from location state or default to home page
  const from = location.state?.from || '/';
  
  // If already logged in, redirect to return URL
  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email.trim()) {
      return setError('Please enter your email');
    }
    
    if (!password) {
      return setError('Please enter your password');
    }
    
    try {
      setLoading(true);
      
      // For demo purposes, we'll accept any email/password with some basic validation
      // In a real application, this would call your authentication API
      if (password.length < 6) {
        throw new Error('Invalid credentials. Password should be at least 6 characters.');
      }
      
      // Login successful
      login({
        email,
        name: email.split('@')[0], // Extract name from email
        isAdmin: email.includes('admin'),
      });
      
      // Navigate to return URL after successful login
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to log in');
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
          <p className="text-muted mt-2">Sign in to your account</p>
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
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email address</label>
            </div>
            
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
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
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
            
            <div className="text-center mt-4">
              <p className="small mb-0">
                <a href="#" className="text-decoration-none">
                  Forgot password?
                </a>
              </p>
              <hr/>
              <p className="text-muted small mb-0">
                Don't have an account? 
                <Link to="/register" className="ms-1">
                  Create one
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

export default Login; 