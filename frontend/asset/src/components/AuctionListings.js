import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuctionAlerts from './common/AuctionAlerts';

function AuctionListings() {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    propertyType: 'all',
    location: 'all',
    priceRange: [0, 20000000],
    discountRange: [10, 50],
    bank: 'all',
    sortBy: 'discount'
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="auction-listings-page py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Bank Auction Properties</li>
              </ol>
            </nav>
            <h2 className="mb-1">Bank Auction Properties</h2>
            <p className="text-muted">Find properties at below-market rates through bank auctions</p>
          </div>
        </div>

        {/* Auction Alerts Component */}
        <AuctionAlerts />

        {/* Advanced Filters Section */}
        <div className="row mb-4 mt-5">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">
                    <i className="bi bi-funnel-fill me-2"></i>
                    Advanced Filters
                  </h5>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Reset Filters
                  </button>
                </div>
                
                <div className="row g-3">
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label">Property Type</label>
                    <select 
                      className="form-select"
                      value={filters.propertyType}
                      onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                    >
                      <option value="all">All Types</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>
                  
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label">Location</label>
                    <select 
                      className="form-select"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    >
                      <option value="all">All Locations</option>
                      <option value="delhi">Delhi</option>
                      <option value="gurugram">Gurugram</option>
                      <option value="noida">Noida</option>
                      <option value="faridabad">Faridabad</option>
                      <option value="ghaziabad">Ghaziabad</option>
                    </select>
                  </div>
                  
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label">Bank</label>
                    <select 
                      className="form-select"
                      value={filters.bank}
                      onChange={(e) => setFilters({...filters, bank: e.target.value})}
                    >
                      <option value="all">All Banks</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                    </select>
                  </div>
                  
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label">Sort By</label>
                    <select 
                      className="form-select"
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    >
                      <option value="discount">Highest Discount</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="date_newest">Date: Newest First</option>
                      <option value="date_closing">Closing Soon</option>
                    </select>
                  </div>
                </div>
                
                <div className="row mt-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label d-flex justify-content-between">
                      <span>Price Range</span>
                      <span className="text-primary">₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}</span>
                    </label>
                    <div className="range-slider">
                      <input 
                        type="range" 
                        className="form-range" 
                        min="0" 
                        max="20000000" 
                        step="500000"
                        value={filters.priceRange[1]} 
                        onChange={(e) => setFilters({
                          ...filters, 
                          priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label d-flex justify-content-between">
                      <span>Discount Percentage</span>
                      <span className="text-primary">{filters.discountRange[0]}% - {filters.discountRange[1]}%</span>
                    </label>
                    <div className="range-slider">
                      <input 
                        type="range" 
                        className="form-range" 
                        min="10" 
                        max="50" 
                        step="5"
                        value={filters.discountRange[1]} 
                        onChange={(e) => setFilters({
                          ...filters, 
                          discountRange: [filters.discountRange[0], parseInt(e.target.value)]
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-primary px-4">
                    <i className="bi bi-search me-2"></i>
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Auction Calendar Quick Access */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="auction-calendar p-3">
              <h5 className="mb-3">Upcoming Auction Dates</h5>
              <div className="d-flex flex-wrap gap-2">
                {[
                  { date: '2023-08-15', count: 12 },
                  { date: '2023-08-18', count: 8 },
                  { date: '2023-08-22', count: 15 },
                  { date: '2023-08-25', count: 7 },
                  { date: '2023-08-30', count: 10 }
                ].map((auction, index) => (
                  <a href={`/auctions/date/${auction.date}`} key={index} className="auction-date-chip">
                    <div className="date">{new Date(auction.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</div>
                    <div className="count">{auction.count} properties</div>
                  </a>
                ))}
                <a href="/auction-calendar" className="auction-date-chip view-all">
                  <i className="bi bi-calendar3"></i>
                  <span>View Calendar</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Loading State or Auction Listings */}
        {isLoading ? (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading auction properties...</p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  All Auction Properties
                  <span className="ms-2 badge bg-primary">42 results</span>
                </h5>
                <div className="view-options">
                  <button className="btn btn-sm btn-outline-secondary me-2 active">
                    <i className="bi bi-grid-3x3-gap-fill"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-list-ul"></i>
                  </button>
                </div>
              </div>
              
              {/* The list would be populated from API data, currently using component */}
              <div className="alert alert-info">
                <i className="bi bi-info-circle-fill me-2"></i>
                To see the auction property listings, please refer to the AuctionAlerts component above.
              </div>
              
              {/* Pagination */}
              <nav aria-label="Page navigation" className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                  </li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
        
        {/* Informational Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 bg-light">
              <div className="card-body p-4">
                <h4 className="mb-4">Benefits of Bank Auction Properties</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex mb-3">
                      <div className="benefit-icon me-3">
                        <i className="bi bi-piggy-bank-fill"></i>
                      </div>
                      <div>
                        <h5>Below Market Price</h5>
                        <p className="mb-0">Properties are often available at 20-40% below the current market value.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex mb-3">
                      <div className="benefit-icon me-3">
                        <i className="bi bi-shield-check"></i>
                      </div>
                      <div>
                        <h5>Secure Investment</h5>
                        <p className="mb-0">Bank auctions provide a legal and transparent way to acquire property.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex mb-3">
                      <div className="benefit-icon me-3">
                        <i className="bi bi-file-earmark-text"></i>
                      </div>
                      <div>
                        <h5>Clear Title</h5>
                        <p className="mb-0">Properties sold through SARFAESI Act typically come with clear titles.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex mb-3">
                      <div className="benefit-icon me-3">
                        <i className="bi bi-bank2"></i>
                      </div>
                      <div>
                        <h5>Special Financing</h5>
                        <p className="mb-0">Some banks offer special financing options for auction properties.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5>Auction Process Overview</h5>
                  <div className="process-timeline mt-3">
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h6>Registration</h6>
                        <p>Register with the bank and pay earnest money deposit (EMD)</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h6>Property Inspection</h6>
                        <p>Schedule and conduct thorough inspection of the property</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h6>Bidding</h6>
                        <p>Participate in auction on specified date and time</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h6>Payment</h6>
                        <p>Pay the remaining amount within specified timeframe if bid is successful</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">5</div>
                      <div className="step-content">
                        <h6>Documentation</h6>
                        <p>Complete legal documentation and registration process</p>
                      </div>
                    </div>
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

export default AuctionListings; 