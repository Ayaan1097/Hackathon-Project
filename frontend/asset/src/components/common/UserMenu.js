import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };
  
  if (!currentUser) {
    return (
      <div className="d-flex">
        <Link to="/login" className="btn btn-sm btn-outline-light me-2">
          Sign In
        </Link>
        <Link to="/register" className="btn btn-sm btn-light">
          Register
        </Link>
      </div>
    );
  }
  
  // First letter of name for avatar
  const avatarInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U';
  
  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-link text-decoration-none text-white p-0 d-flex align-items-center"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div 
          className="rounded-circle text-white d-flex align-items-center justify-content-center me-2"
          style={{ 
            width: '32px', 
            height: '32px', 
            backgroundColor: '#8C96F0',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {avatarInitial}
        </div>
        <span className="d-none d-md-inline">{currentUser.name}</span>
        <i className="bi bi-chevron-down ms-1 small"></i>
      </button>
      
      <div className={`dropdown-menu dropdown-menu-end shadow-sm mt-2 ${isOpen ? 'show' : ''}`}>
        <div className="px-4 py-3 border-bottom">
          <div className="text-muted small">Signed in as</div>
          <div className="fw-bold">{currentUser.email}</div>
        </div>
        <Link to="/profile" className="dropdown-item py-2">
          <i className="bi bi-person me-2"></i>
          My Profile
        </Link>
        <Link to="/my-properties" className="dropdown-item py-2">
          <i className="bi bi-house-door me-2"></i>
          My Properties
        </Link>
        <Link to="/settings" className="dropdown-item py-2">
          <i className="bi bi-gear me-2"></i>
          Settings
        </Link>
        {currentUser.isAdmin && (
          <Link to="/admin" className="dropdown-item py-2">
            <i className="bi bi-shield-lock me-2"></i>
            Admin Panel
          </Link>
        )}
        <div className="dropdown-divider"></div>
        <button 
          className="dropdown-item py-2 text-danger" 
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu; 