import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AuctionAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    propertyTypes: [],
    locations: [],
    priceRange: {
      min: 0,
      max: 10000000
    },
    discountThreshold: 20, // Minimum % below market rate
    notificationType: ['email', 'app']
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Mock auction data - would come from API in production
  const mockAuctions = [
    {
      id: 'auc-001',
      propertyId: 'prop-123',
      type: 'Apartment',
      title: '3BHK Luxury Apartment in Vasant Kunj',
      address: 'Vasant Kunj, New Delhi',
      marketValue: 9500000,
      auctionPrice: 6650000,
      discount: 30,
      bank: 'State Bank of India',
      auctionDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      highlights: ['Prime Location', 'Ready to Move', 'Gated Community']
    },
    {
      id: 'auc-002',
      propertyId: 'prop-456',
      type: 'Commercial',
      title: 'Retail Space in South Extension',
      address: 'South Extension Part 2, New Delhi',
      marketValue: 15000000,
      auctionPrice: 11250000,
      discount: 25,
      bank: 'HDFC Bank',
      auctionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
      highlights: ['High Footfall', 'Corner Property', 'Parking Available']
    },
    {
      id: 'auc-003',
      propertyId: 'prop-789',
      type: 'Land',
      title: 'Agricultural Land near Gurugram',
      address: 'Sohna Road, Gurugram',
      marketValue: 8000000,
      auctionPrice: 5200000,
      discount: 35,
      bank: 'Punjab National Bank',
      auctionDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      highlights: ['Near Highway', 'Fertile Soil', 'Water Source Available']
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch auction alerts
    setTimeout(() => {
      setAlerts(mockAuctions);
    }, 1000);

    // Check if user is already subscribed (from localStorage in this demo)
    const savedSubscription = localStorage.getItem('auctionAlertsSubscription');
    if (savedSubscription) {
      const parsed = JSON.parse(savedSubscription);
      setIsSubscribed(true);
      setEmail(parsed.email || '');
      setPhone(parsed.phone || '');
      setPreferences(parsed.preferences || preferences);
    }
  }, []);

  const handleSubscribe = () => {
    if (!email) {
      alert('Please enter your email to subscribe');
      return;
    }
    
    // Save subscription to localStorage (would be API call in production)
    const subscription = {
      email,
      phone,
      preferences
    };
    localStorage.setItem('auctionAlertsSubscription', JSON.stringify(subscription));
    setIsSubscribed(true);
    
    // Show success message
    alert('You have successfully subscribed to Auction Alerts!');
  };

  const handleUnsubscribe = () => {
    if (window.confirm('Are you sure you want to unsubscribe from Auction Alerts?')) {
      localStorage.removeItem('auctionAlertsSubscription');
      setIsSubscribed(false);
      setShowPreferences(false);
    }
  };

  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  const handlePropertyTypeChange = (type) => {
    setPreferences(prev => {
      const newTypes = prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type];
      
      return {
        ...prev,
        propertyTypes: newTypes
      };
    });
  };

  const handleLocationChange = (location) => {
    setPreferences(prev => {
      const newLocations = prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location];
      
      return {
        ...prev,
        locations: newLocations
      };
    });
  };

  const formatIndianRupees = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getTimeRemaining = (auctionDate) => {
    const now = new Date();
    const timeRemaining = auctionDate - now;
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} days, ${hours} hours`;
    } else if (hours > 0) {
      return `${hours} hours`;
    } else {
      return 'Ending soon';
    }
  };

  return (
    <div className="auction-alerts">
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-custom d-flex justify-content-between align-items-center">
              <div>
                <h4 className="alert-heading mb-1">
                  <i className="bi bi-megaphone-fill me-2"></i>
                  Bank Auction Alerts
                </h4>
                <p className="mb-0">Get notified about properties available at 20-40% below market rates!</p>
              </div>
              <div className="d-flex align-items-center">
                {isSubscribed ? (
                  <>
                    <button 
                      className="btn btn-outline-primary me-2" 
                      onClick={togglePreferences}
                    >
                      <i className={`bi bi-sliders me-2`}></i>
                      {showPreferences ? 'Hide Preferences' : 'Edit Preferences'}
                    </button>
                    <button 
                      className="btn btn-outline-danger" 
                      onClick={handleUnsubscribe}
                    >
                      <i className="bi bi-bell-slash me-2"></i>
                      Unsubscribe
                    </button>
                  </>
                ) : (
                  <button 
                    className="btn auction-subscribe-btn" 
                    onClick={togglePreferences}
                  >
                    <i className="bi bi-bell-fill me-2"></i>
                    Subscribe to Alerts
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {showPreferences && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="card shadow-sm preferences-card">
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    <i className="bi bi-gear-fill me-2"></i>
                    Alert Preferences
                  </h5>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Your Email (required)</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone (for SMS alerts)</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Property Types</label>
                      <div className="d-flex flex-wrap gap-2">
                        {['Apartment', 'House', 'Commercial', 'Land', 'Industrial'].map(type => (
                          <div key={type} className="form-check form-check-inline">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id={`type-${type}`}
                              checked={preferences.propertyTypes.includes(type)}
                              onChange={() => handlePropertyTypeChange(type)}
                            />
                            <label className="form-check-label" htmlFor={`type-${type}`}>{type}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Locations</label>
                      <div className="d-flex flex-wrap gap-2">
                        {['Delhi', 'Gurugram', 'Noida', 'Faridabad', 'Ghaziabad'].map(location => (
                          <div key={location} className="form-check form-check-inline">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id={`location-${location}`}
                              checked={preferences.locations.includes(location)}
                              onChange={() => handleLocationChange(location)}
                            />
                            <label className="form-check-label" htmlFor={`location-${location}`}>{location}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Minimum Discount Threshold</label>
                      <div className="d-flex align-items-center">
                        <input 
                          type="range" 
                          className="form-range flex-grow-1 me-2" 
                          min="10" 
                          max="50" 
                          step="5"
                          value={preferences.discountThreshold}
                          onChange={(e) => setPreferences({...preferences, discountThreshold: parseInt(e.target.value)})}
                        />
                        <span className="discount-label">{preferences.discountThreshold}% off</span>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price Range</label>
                      <div className="d-flex gap-2 align-items-center">
                        <input 
                          type="number" 
                          className="form-control" 
                          placeholder="Min"
                          value={preferences.priceRange.min}
                          onChange={(e) => setPreferences({
                            ...preferences, 
                            priceRange: {...preferences.priceRange, min: parseInt(e.target.value) || 0}
                          })}
                        />
                        <span>to</span>
                        <input 
                          type="number" 
                          className="form-control" 
                          placeholder="Max"
                          value={preferences.priceRange.max}
                          onChange={(e) => setPreferences({
                            ...preferences, 
                            priceRange: {...preferences.priceRange, max: parseInt(e.target.value) || 0}
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <label className="form-label">Notification Preferences</label>
                      <div className="d-flex flex-wrap gap-2">
                        {[
                          { id: 'email', label: 'Email Alerts', icon: 'bi-envelope' },
                          { id: 'sms', label: 'SMS Alerts', icon: 'bi-phone' },
                          { id: 'app', label: 'In-App Notifications', icon: 'bi-app-indicator' },
                          { id: 'weekly', label: 'Weekly Digest', icon: 'bi-calendar-week' }
                        ].map(option => (
                          <div key={option.id} className="form-check form-check-inline">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id={`notif-${option.id}`}
                              checked={preferences.notificationType.includes(option.id)}
                              onChange={() => {
                                setPreferences(prev => {
                                  const types = prev.notificationType.includes(option.id)
                                    ? prev.notificationType.filter(t => t !== option.id)
                                    : [...prev.notificationType, option.id];
                                  return { ...prev, notificationType: types };
                                });
                              }}
                            />
                            <label className="form-check-label" htmlFor={`notif-${option.id}`}>
                              <i className={`bi ${option.icon} me-1`}></i> {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <button 
                      className="btn btn-primary" 
                      onClick={handleSubscribe}
                    >
                      {isSubscribed ? 'Update Preferences' : 'Subscribe Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12 mb-4">
            <h5 className="border-start border-4 border-primary ps-3 mb-0">
              Featured Auction Properties
              <span className="badge bg-danger ms-2">Hot Deals</span>
            </h5>
          </div>
        </div>

        <div className="row">
          {alerts.length > 0 ? (
            alerts.map(auction => (
              <div key={auction.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card auction-card h-100">
                  <div className="discount-badge">
                    <span>{auction.discount}% OFF</span>
                  </div>
                  <div className="card-img-container">
                    <div className="auction-timer">
                      <i className="bi bi-alarm-fill me-1"></i>
                      {getTimeRemaining(auction.auctionDate)}
                    </div>
                    <img 
                      src={auction.imageUrl} 
                      alt={auction.title} 
                      className="card-img-top"
                    />
                    <div className="auction-bank">
                      <i className="bi bi-bank me-1"></i>
                      {auction.bank}
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mb-2">{auction.title}</h5>
                    <p className="location mb-2">
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      {auction.address}
                    </p>
                    <div className="prices mb-3">
                      <div className="market-price">
                        <span className="text-muted">Market Value:</span>
                        <span className="value text-decoration-line-through">{formatIndianRupees(auction.marketValue)}</span>
                      </div>
                      <div className="auction-price">
                        <span className="text-muted">Auction Starting Price:</span>
                        <span className="value text-primary fw-bold">{formatIndianRupees(auction.auctionPrice)}</span>
                      </div>
                    </div>
                    <p className="savings alert alert-success py-1 px-2 mb-3">
                      <i className="bi bi-piggy-bank-fill me-1"></i>
                      Save {formatIndianRupees(auction.marketValue - auction.auctionPrice)}
                    </p>
                    <div className="highlights mb-3">
                      {auction.highlights.map((highlight, index) => (
                        <span key={index} className="badge bg-light text-dark me-1 mb-1">
                          <i className="bi bi-check-circle-fill text-success me-1"></i>
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between">
                      <Link 
                        to={`/property-details/${auction.propertyId}`} 
                        state={{ property: auction }} 
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="bi bi-info-circle me-1"></i>
                        Property Details
                      </Link>
                      <a 
                        href={`/auction-participate/${auction.id}`} 
                        className="btn btn-primary btn-sm"
                      >
                        <i className="bi bi-hammer me-1"></i>
                        Participate
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading auction properties...</p>
            </div>
          )}
        </div>
        
        <div className="row mt-2">
          <div className="col-12 text-center">
            <Link 
              to="/auction-listings" 
              className="btn btn-outline-primary"
            >
              <i className="bi bi-list-ul me-2"></i>
              View All Auction Properties
            </Link>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-light border-0">
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="mb-2">How Bank Auctions Work</h5>
                    <p className="mb-0">
                      Bank auctions typically occur when property owners default on their loans. 
                      Banks sell these properties at discounted rates to recover their funds. 
                      This creates opportunities for buyers to purchase property significantly below market value.
                    </p>
                  </div>
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <a href="#" className="btn btn-sm btn-link text-decoration-none">
                      <i className="bi bi-book me-1"></i>
                      Learn More About Auctions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionAlerts; 