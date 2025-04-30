import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AuctionNotification() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      title: "New Auction Property",
      message: "3BHK Luxury Apartment in Vasant Kunj at 30% below market",
      time: "10 minutes ago",
      read: false,
      link: "/property-details/prop-123"
    },
    {
      id: 2,
      title: "Auction Ending Soon",
      message: "Commercial Space in South Extension ends in 24 hours",
      time: "2 hours ago",
      read: false,
      link: "/property-details/prop-456"
    },
    {
      id: 3,
      title: "Price Drop Alert",
      message: "Agricultural Land near Gurugram price reduced by 5%",
      time: "1 day ago",
      read: true,
      link: "/property-details/prop-789"
    }
  ];
  
  useEffect(() => {
    // Simulate API call to fetch notifications
    setNotifications(mockNotifications);
    
    // Count unread notifications
    const unread = mockNotifications.filter(n => !n.read).length;
    setUnreadCount(unread);
    
    // Effect for handling clicks outside the dropdown to close it
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.notifications-dropdown')) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);
  
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };
  
  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
    
    // Update unread count
    setUnreadCount(prev => Math.max(0, prev - 1));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };
  
  return (
    <div className="auction-notification position-relative notifications-dropdown">
      <button 
        className="btn btn-link nav-link position-relative p-0" 
        onClick={toggleDropdown}
      >
        <i className="bi bi-bell-fill"></i>
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {unreadCount}
            <span className="visually-hidden">unread notifications</span>
          </span>
        )}
      </button>
      
      {showDropdown && (
        <div className="dropdown-menu notification-dropdown-menu dropdown-menu-end show">
          <div className="dropdown-header d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Auction Notifications</h6>
            {unreadCount > 0 && (
              <button className="btn btn-link btn-sm p-0 text-decoration-none" onClick={markAllAsRead}>
                Mark all read
              </button>
            )}
          </div>
          
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <Link 
                  key={notification.id}
                  to={notification.link}
                  className={`dropdown-item notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="d-flex">
                    <div className="notification-icon">
                      <i className="bi bi-building"></i>
                    </div>
                    <div className="notification-content">
                      <h6 className="notification-title">{notification.title}</h6>
                      <p className="notification-text mb-0">{notification.message}</p>
                      <small className="notification-time text-muted">{notification.time}</small>
                    </div>
                    {!notification.read && <div className="unread-indicator"></div>}
                  </div>
                </Link>
              ))
            ) : (
              <div className="dropdown-item text-center py-3">
                <p className="text-muted mb-0">No notifications</p>
              </div>
            )}
          </div>
          
          <div className="dropdown-divider"></div>
          
          <Link to="/auction-listings" className="dropdown-item text-center view-all">
            View All Auction Properties
          </Link>
        </div>
      )}
    </div>
  );
}

export default AuctionNotification; 