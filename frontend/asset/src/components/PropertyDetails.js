import React from 'react';

function PropertyDetails() {
  // This would be populated from real API responses
  const mockProperty = {
    id: 'PROP123456',
    type: 'urban',
    status: 'active',
    name: 'Sunbeam Apartments, Flat 302',
    address: {
      street: '45 Gandhi Road',
      city: 'Mumbai',
      district: 'Mumbai City',
      state: 'Maharashtra',
      pincode: '400001'
    },
    owner: {
      name: 'Rajesh Sharma',
      contact: '+91 98765 43210',
      idType: 'Aadhaar',
      ownership: 'Full'
    },
    registration: {
      number: 'REG-MH-2018-45678',
      date: '2018-07-15',
      authority: 'Sub-Registrar Office, Mumbai City'
    },
    financialStatus: {
      hasLoan: true,
      loanDetails: [
        {
          lender: 'ICICI Bank',
          accountNumber: 'LOAN12345678',
          originalAmount: '₹ 45,00,000',
          currentBalance: '₹ 32,45,000',
          startDate: '2018-08-01',
          status: 'Active'
        }
      ],
      taxDues: '₹ 25,000',
      encumbrances: 'None'
    },
    propertyDetails: {
      area: '1200 sq. ft.',
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2015,
      amenities: ['Lift', 'Parking', 'Security', 'Power Backup'],
      marketValue: '₹ 1,25,00,000'
    }
  };

  return (
    <div className="property-details-section py-5">
      <div className="container">
        <div className="card shadow-lg border-0 overflow-hidden">
          <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-primary me-2">Urban Property</span>
              <h3 className="card-title mb-0 fs-4">{mockProperty.name}</h3>
              <p className="text-muted small mb-0">
                ID: {mockProperty.id} &bull; Last Updated: Today, 10:15 AM
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-download me-1"></i>Download
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-printer me-1"></i>Print
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-share me-1"></i>Share
              </button>
            </div>
          </div>
          
          <div className="card-body p-0">
            <div className="row g-0">
              <div className="col-lg-8 p-4">
                <div className="unified-data">
                  <div className="sources-info mb-4">
                    <h5 className="mb-2">Consolidated Information</h5>
                    <div className="sources-badges">
                      <span className="badge bg-light text-dark me-2">DORIS</span>
                      <span className="badge bg-light text-dark me-2">DLR</span>
                      <span className="badge bg-light text-dark me-2">CERSAI</span>
                      <span className="badge bg-light text-dark">MCA21</span>
                    </div>
                  </div>
                  
                  <div className="row g-4">
                    {/* Registration Details */}
                    <div className="col-md-6">
                      <div className="info-card">
                        <h5>
                          <i className="bi bi-file-earmark-text me-2 text-primary"></i>
                          Registration Details
                        </h5>
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <th scope="row">Registration No.</th>
                              <td>{mockProperty.registration.number}</td>
                            </tr>
                            <tr>
                              <th scope="row">Registration Date</th>
                              <td>{mockProperty.registration.date}</td>
                            </tr>
                            <tr>
                              <th scope="row">Registering Authority</th>
                              <td>{mockProperty.registration.authority}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Ownership Details */}
                    <div className="col-md-6">
                      <div className="info-card">
                        <h5>
                          <i className="bi bi-person me-2 text-primary"></i>
                          Ownership Details
                        </h5>
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <th scope="row">Current Owner</th>
                              <td>{mockProperty.owner.name}</td>
                            </tr>
                            <tr>
                              <th scope="row">Contact</th>
                              <td>{mockProperty.owner.contact}</td>
                            </tr>
                            <tr>
                              <th scope="row">Ownership Type</th>
                              <td>{mockProperty.owner.ownership}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Financial Status - Important highlight for loans */}
                    <div className="col-12">
                      <div className="info-card loan-info">
                        <h5>
                          <i className="bi bi-bank me-2 text-primary"></i>
                          Financial Status
                        </h5>
                        {mockProperty.financialStatus.hasLoan ? (
                          <>
                            <div className="loan-alert alert alert-warning mb-3">
                              <i className="bi bi-exclamation-triangle me-2"></i>
                              This property has an active loan from {mockProperty.financialStatus.loanDetails[0].lender}.
                            </div>
                            <h6>Loan Details</h6>
                            <table className="table table-sm">
                              <tbody>
                                <tr>
                                  <th scope="row">Lender</th>
                                  <td>{mockProperty.financialStatus.loanDetails[0].lender}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Account Number</th>
                                  <td>{mockProperty.financialStatus.loanDetails[0].accountNumber}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Original Amount</th>
                                  <td>{mockProperty.financialStatus.loanDetails[0].originalAmount}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Current Balance</th>
                                  <td>{mockProperty.financialStatus.loanDetails[0].currentBalance}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Start Date</th>
                                  <td>{mockProperty.financialStatus.loanDetails[0].startDate}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Status</th>
                                  <td><span className="badge bg-warning text-dark">Active</span></td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        ) : (
                          <div className="loan-alert alert alert-success">
                            <i className="bi bi-check-circle me-2"></i>
                            No active loans or financial encumbrances on this property.
                          </div>
                        )}
                        <div className="other-financials mt-3">
                          <p><strong>Property Tax Dues:</strong> {mockProperty.financialStatus.taxDues}</p>
                          <p><strong>Other Encumbrances:</strong> {mockProperty.financialStatus.encumbrances}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Property Details */}
                    <div className="col-12">
                      <div className="info-card">
                        <h5>
                          <i className="bi bi-building me-2 text-primary"></i>
                          Property Details
                        </h5>
                        <div className="row">
                          <div className="col-md-6">
                            <table className="table table-sm">
                              <tbody>
                                <tr>
                                  <th scope="row">Property Type</th>
                                  <td>Residential Apartment</td>
                                </tr>
                                <tr>
                                  <th scope="row">Area</th>
                                  <td>{mockProperty.propertyDetails.area}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Bedrooms</th>
                                  <td>{mockProperty.propertyDetails.bedrooms}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Bathrooms</th>
                                  <td>{mockProperty.propertyDetails.bathrooms}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="col-md-6">
                            <table className="table table-sm">
                              <tbody>
                                <tr>
                                  <th scope="row">Year Built</th>
                                  <td>{mockProperty.propertyDetails.yearBuilt}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Amenities</th>
                                  <td>{mockProperty.propertyDetails.amenities.join(', ')}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Estimated Value</th>
                                  <td>{mockProperty.propertyDetails.marketValue}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4 bg-light p-4">
                <div className="sidebar-info">
                  <h5 className="mb-3">Property Location</h5>
                  <div className="map-placeholder mb-4">
                    <div className="bg-secondary text-white d-flex justify-content-center align-items-center" style={{height: "200px"}}>
                      <div className="text-center">
                        <i className="bi bi-map fs-1"></i>
                        <p className="mb-0">Map View</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="address-details mb-4">
                    <h6>Complete Address</h6>
                    <p className="mb-1">
                      {mockProperty.name}<br />
                      {mockProperty.address.street}<br />
                      {mockProperty.address.city}, {mockProperty.address.district}<br />
                      {mockProperty.address.state} - {mockProperty.address.pincode}
                    </p>
                  </div>
                  
                  <hr />
                  
                  <div className="history-timeline mb-4">
                    <h6>Property History</h6>
                    <ul className="timeline">
                      <li className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h6 className="mb-0">Property Registered</h6>
                          <p className="small text-muted mb-0">July 15, 2018</p>
                          <p className="small">Initial registration to current owner</p>
                        </div>
                      </li>
                      <li className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h6 className="mb-0">Loan Initiated</h6>
                          <p className="small text-muted mb-0">August 1, 2018</p>
                          <p className="small">Home loan from ICICI Bank</p>
                        </div>
                      </li>
                      <li className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h6 className="mb-0">Tax Assessment</h6>
                          <p className="small text-muted mb-0">April 10, 2023</p>
                          <p className="small">Latest property tax assessment</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="attached-documents">
                    <h6>Available Documents</h6>
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span><i className="bi bi-file-pdf me-2 text-danger"></i>Sale Deed</span>
                        <a href="#" className="btn btn-sm btn-outline-primary"><i className="bi bi-download"></i></a>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span><i className="bi bi-file-pdf me-2 text-danger"></i>Property Tax Receipt</span>
                        <a href="#" className="btn btn-sm btn-outline-primary"><i className="bi bi-download"></i></a>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span><i className="bi bi-file-pdf me-2 text-danger"></i>Encumbrance Certificate</span>
                        <a href="#" className="btn btn-sm btn-outline-primary"><i className="bi bi-download"></i></a>
                      </li>
                    </ul>
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

export default PropertyDetails; 