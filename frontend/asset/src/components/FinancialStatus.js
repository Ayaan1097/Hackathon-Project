import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyReport from './common/PropertyReport';
import BulkReportGenerator from './common/BulkReportGenerator';

function FinancialStatus() {
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentReportProperty, setCurrentReportProperty] = useState(null);
  const [showBulkReportModal, setShowBulkReportModal] = useState(false);
  const [currentBulkProperties, setCurrentBulkProperties] = useState([]);
  
  // Mock property data with financial information
  const mockProperties = [
    {
      id: 'prop-001',
      type: 'Apartment',
      title: '3BHK Luxury Apartment in Vasant Kunj',
      address: {
        street: 'B-24, Vasant Kunj',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110070'
      },
      owner: 'Rajesh Kumar',
      propertyDetails: {
        area: '1850 sq.ft.',
        bedrooms: 3,
        bathrooms: 2,
        yearBuilt: 2015,
        price: 9500000
      },
      hasLoan: true,
      loanDetails: {
        lender: 'HDFC Bank',
        originalAmount: 7600000,
        outstandingAmount: 5200000,
        interestRate: 8.5,
        startDate: '2018-06-15',
        endDate: '2033-06-15',
        emiAmount: 74500
      },
      verificationStatus: {
        doris: true,
        dlr: true,
        cersai: true,
        verifiedOn: '2023-05-10'
      }
    },
    {
      id: 'prop-002',
      type: 'Commercial',
      title: 'Office Space in Connaught Place',
      address: {
        street: 'N-12, Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001'
      },
      owner: 'Sharma Enterprises',
      propertyDetails: {
        area: '2500 sq.ft.',
        yearBuilt: 2005,
        price: 18500000
      },
      hasLoan: true,
      loanDetails: {
        lender: 'State Bank of India',
        originalAmount: 12000000,
        outstandingAmount: 8500000,
        interestRate: 9.2,
        startDate: '2020-02-20',
        endDate: '2035-02-20',
        emiAmount: 122000
      },
      verificationStatus: {
        doris: true,
        dlr: true,
        cersai: true,
        verifiedOn: '2023-03-22'
      }
    },
    {
      id: 'prop-003',
      type: 'Land',
      title: 'Agricultural Land near Gurugram',
      address: {
        street: 'Khasra No. 135/2',
        city: 'Sohna',
        state: 'Haryana',
        pincode: '122103'
      },
      owner: 'Suresh Singh',
      propertyDetails: {
        area: '2.5 Acres',
        landType: 'Agricultural',
        price: 8000000
      },
      hasLoan: false,
      verificationStatus: {
        doris: false,
        dlr: true,
        cersai: true,
        verifiedOn: '2023-01-15'
      }
    },
    {
      id: 'prop-004',
      type: 'House',
      title: 'Independent House in Greater Kailash',
      address: {
        street: 'E-45, Greater Kailash-I',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110048'
      },
      owner: 'Ananya Mehta',
      propertyDetails: {
        area: '3200 sq.ft.',
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2010,
        price: 25000000
      },
      hasLoan: true,
      loanDetails: {
        lender: 'ICICI Bank',
        originalAmount: 15000000,
        outstandingAmount: 12500000,
        interestRate: 8.75,
        startDate: '2019-08-10',
        endDate: '2039-08-10',
        emiAmount: 152000
      },
      verificationStatus: {
        doris: true,
        dlr: true,
        cersai: true,
        verifiedOn: '2023-04-05'
      }
    }
  ];

  // Load properties
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call to fetch properties with financial data
    setTimeout(() => {
      setProperties(mockProperties);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Handle property selection
  const handlePropertySelection = (propertyId) => {
    setSelectedProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProperties(properties.map(p => p.id));
    } else {
      setSelectedProperties([]);
    }
  };

  // Filter properties by search term
  const filteredProperties = properties.filter(property => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      property.title.toLowerCase().includes(searchTermLower) ||
      property.address.city.toLowerCase().includes(searchTermLower) ||
      property.owner.toLowerCase().includes(searchTermLower) ||
      property.id.toLowerCase().includes(searchTermLower)
    );
  });

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Generate report for a specific property
  const handleGenerateReport = (property) => {
    setCurrentReportProperty(property);
    setShowReportModal(true);
  };

  // Calculate loan status color and text
  const getLoanStatusInfo = (property) => {
    if (!property.hasLoan) {
      return { color: 'success', text: 'No Loan' };
    }
    
    const ratio = property.loanDetails.outstandingAmount / property.propertyDetails.price;
    
    if (ratio < 0.3) {
      return { color: 'success', text: 'Low LTV' };
    } else if (ratio < 0.6) {
      return { color: 'warning', text: 'Medium LTV' };
    } else {
      return { color: 'danger', text: 'High LTV' };
    }
  };

  // Update the button click handler for bulk reports
  const handleGenerateBulkReport = () => {
    if (selectedProperties.length === 0) return;
    
    // Get the selected properties data
    const selectedPropertiesData = properties.filter(p => selectedProperties.includes(p.id));
    setCurrentBulkProperties(selectedPropertiesData);
    setShowBulkReportModal(true);
  };

  return (
    <div className="financial-status-page py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Financial Status</li>
              </ol>
            </nav>
            <h2 className="mb-1">Financial Status Reports</h2>
            <p className="text-muted">View and generate financial reports for your properties</p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by property name, location, or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <button
              className="btn btn-primary"
              disabled={selectedProperties.length === 0}
              onClick={handleGenerateBulkReport}
            >
              <i className="bi bi-file-earmark-text me-2"></i>
              Generate Bulk Report ({selectedProperties.length})
            </button>
          </div>
        </div>

        {/* Properties Table */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading property financial data...</p>
          </div>
        ) : (
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedProperties.length === properties.length && properties.length > 0}
                            onChange={handleSelectAll}
                          />
                        </div>
                      </th>
                      <th>Property</th>
                      <th>Location</th>
                      <th>Owner</th>
                      <th>Market Value</th>
                      <th>Loan Status</th>
                      <th>Verification</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProperties.length > 0 ? (
                      filteredProperties.map(property => {
                        const loanStatus = getLoanStatusInfo(property);
                        return (
                          <tr key={property.id}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={selectedProperties.includes(property.id)}
                                  onChange={() => handlePropertySelection(property.id)}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="property-icon me-2">
                                  <i className={`bi ${
                                    property.type === 'Apartment' ? 'bi-building' :
                                    property.type === 'Commercial' ? 'bi-shop' :
                                    property.type === 'Land' ? 'bi-geo-alt' : 'bi-house'
                                  }`}></i>
                                </div>
                                <div>
                                  <p className="mb-0 fw-medium">{property.title}</p>
                                  <p className="mb-0 small text-muted">{property.id}</p>
                                </div>
                              </div>
                            </td>
                            <td>{property.address.city}, {property.address.state}</td>
                            <td>{property.owner}</td>
                            <td>{formatCurrency(property.propertyDetails.price)}</td>
                            <td>
                              <span className={`badge bg-${loanStatus.color}`}>
                                {loanStatus.text}
                              </span>
                              {property.hasLoan && (
                                <p className="mb-0 small text-muted mt-1">
                                  {formatCurrency(property.loanDetails.outstandingAmount)}
                                </p>
                              )}
                            </td>
                            <td>
                              <div className="verification-badges">
                                {property.verificationStatus.doris && (
                                  <span className="badge bg-success me-1">DORIS</span>
                                )}
                                {property.verificationStatus.dlr && (
                                  <span className="badge bg-success me-1">DLR</span>
                                )}
                                {property.verificationStatus.cersai && (
                                  <span className="badge bg-success">CERSAI</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleGenerateReport(property)}
                                >
                                  <i className="bi bi-file-earmark-text"></i>
                                </button>
                                <Link
                                  to={`/property-details/${property.id}`}
                                  className="btn btn-sm btn-outline-secondary"
                                >
                                  <i className="bi bi-info-circle"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          <p className="mb-0">No properties found matching your search criteria.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Financial Overview Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h4 className="mb-4">Financial Overview</h4>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Portfolio Value</h5>
                  <span className="fs-4 text-primary">
                    <i className="bi bi-buildings"></i>
                  </span>
                </div>
                <h3 className="mb-3">
                  {formatCurrency(
                    properties.reduce((total, property) => total + property.propertyDetails.price, 0)
                  )}
                </h3>
                <p className="card-text text-muted mb-0">Total value of {properties.length} properties</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Outstanding Loans</h5>
                  <span className="fs-4 text-danger">
                    <i className="bi bi-cash-coin"></i>
                  </span>
                </div>
                <h3 className="mb-3">
                  {formatCurrency(
                    properties
                      .filter(property => property.hasLoan)
                      .reduce((total, property) => total + property.loanDetails.outstandingAmount, 0)
                  )}
                </h3>
                <p className="card-text text-muted mb-0">
                  {properties.filter(property => property.hasLoan).length} properties with active loans
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Net Equity</h5>
                  <span className="fs-4 text-success">
                    <i className="bi bi-graph-up-arrow"></i>
                  </span>
                </div>
                <h3 className="mb-3">
                  {formatCurrency(
                    properties.reduce((total, property) => {
                      const propertyValue = property.propertyDetails.price;
                      const loanAmount = property.hasLoan ? property.loanDetails.outstandingAmount : 0;
                      return total + (propertyValue - loanAmount);
                    }, 0)
                  )}
                </h3>
                <p className="card-text text-muted mb-0">
                  Property value minus outstanding loans
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Distribution Chart */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Loan-to-Value Distribution</h5>
                <div className="ltv-distribution mt-4">
                  <div className="progress" style={{ height: '25px' }}>
                    {properties.length > 0 && (
                      <>
                        <div 
                          className="progress-bar bg-success" 
                          style={{ 
                            width: `${(properties.filter(p => !p.hasLoan).length / properties.length) * 100}%` 
                          }}
                        >
                          No Loan
                        </div>
                        <div 
                          className="progress-bar bg-info" 
                          style={{ 
                            width: `${(properties.filter(p => p.hasLoan && p.loanDetails.outstandingAmount / p.propertyDetails.price < 0.3).length / properties.length) * 100}%` 
                          }}
                        >
                          &lt;30%
                        </div>
                        <div 
                          className="progress-bar bg-warning" 
                          style={{ 
                            width: `${(properties.filter(p => p.hasLoan && p.loanDetails.outstandingAmount / p.propertyDetails.price >= 0.3 && p.loanDetails.outstandingAmount / p.propertyDetails.price < 0.6).length / properties.length) * 100}%` 
                          }}
                        >
                          30-60%
                        </div>
                        <div 
                          className="progress-bar bg-danger" 
                          style={{ 
                            width: `${(properties.filter(p => p.hasLoan && p.loanDetails.outstandingAmount / p.propertyDetails.price >= 0.6).length / properties.length) * 100}%` 
                          }}
                        >
                          &gt;60%
                        </div>
                      </>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span className="small text-muted">Low Risk</span>
                    <span className="small text-muted">High Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Modal */}
        {showReportModal && currentReportProperty && (
          <div className="report-modal">
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Property Report</h5>
                    <button type="button" className="btn-close" onClick={() => setShowReportModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <PropertyReport 
                      property={currentReportProperty} 
                      onClose={() => setShowReportModal(false)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Report Modal */}
        {showBulkReportModal && currentBulkProperties.length > 0 && (
          <div className="report-modal">
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Bulk Property Report</h5>
                    <button type="button" className="btn-close" onClick={() => setShowBulkReportModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <BulkReportGenerator 
                      properties={currentBulkProperties} 
                      onClose={() => setShowBulkReportModal(false)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinancialStatus; 