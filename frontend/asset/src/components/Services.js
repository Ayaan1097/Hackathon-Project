import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
  return (
    <div className="services-page">
      {/* Services Header */}
      <header className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">Our Services</h1>
          <p className="lead mb-0">Comprehensive property information solutions</p>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-5" id="services">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">What We Offer</h2>
            <p className="lead text-muted">Comprehensive property information at your fingertips</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-house"></i>
                </div>
                <h4>Property Verification</h4>
                <p>Verify property details and ownership across multiple government databases including DORIS, DLR, CERSAI, and MCA21 with a single search.</p>
                <ul className="list-unstyled mt-3">
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Ownership verification</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Legal status check</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Document authenticity</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-person-badge"></i>
                </div>
                <h4>Owner Identification</h4>
                <p>Identify property owners and their contact information securely with our comprehensive database integration and privacy-compliant systems.</p>
                <ul className="list-unstyled mt-3">
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Secure identification</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Privacy-compliant</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Multi-source verification</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h4>Location Services</h4>
                <p>Find properties by location across rural and urban areas with detailed mapping and geospatial data integration for comprehensive results.</p>
                <ul className="list-unstyled mt-3">
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Rural mapping</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Urban property location</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Geospatial integration</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-card-checklist"></i>
                </div>
                <h4>Registration Verification</h4>
                <p>Verify property registration status and documentation across all relevant government databases with instant access to critical information.</p>
                <ul className="list-unstyled mt-3">
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Document validation</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Registration status</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Historical records</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <h4>Document Access</h4>
                <p>Access property-related documents across multiple platforms with our unified document repository and standardized presentation formats.</p>
                <ul className="list-unstyled mt-3">
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Unified document access</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Standardized formats</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Secure retrieval</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h4>Market Analysis</h4>
                <p>Get insights on property valuations and market trends with our data-driven analytics and comprehensive market comparison tools.</p>
                <ul className="list-unstyled mt-3">
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Valuation estimates</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Market trends</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Regional comparisons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Search Tools */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Specialized Search Tools</h2>
            <p className="lead text-muted">Tailored solutions for different property types</p>
          </div>

          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-5">
                  <h3 className="card-title mb-4"><i className="bi bi-buildings me-2 text-primary"></i>Urban Property Search</h3>
                  <p className="card-text">Our urban property search is designed specifically for city properties, apartments, commercial buildings, and other urban real estate:</p>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Apartment and building lookup</li>
                    <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Commercial property verification</li>
                    <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Urban land records integration</li>
                    <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Municipal approvals checking</li>
                  </ul>
                  <Link to="/urban-search" className="btn btn-primary mt-3">
                    <i className="bi bi-building me-2"></i>Try Urban Search
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-5">
                  <h3 className="card-title mb-4"><i className="bi bi-tree me-2 text-success"></i>Rural Property Search</h3>
                  <p className="card-text">Our rural property search caters specifically to agricultural lands, village properties, and rural real estate:</p>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Agricultural land records</li>
                    <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Village property mapping</li>
                    <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Land use classification</li>
                    <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Revenue record integration</li>
                  </ul>
                  <Link to="/rural-search" className="btn btn-success mt-3">
                    <i className="bi bi-tree me-2"></i>Try Rural Search
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 cta-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-start mb-4 mb-lg-0">
              <h2 className="text-white fw-bold mb-3">Ready to experience our services?</h2>
              <p className="text-white-50 lead">Get started with our comprehensive property search today.</p>
            </div>
            <div className="col-lg-5 text-center text-lg-end">
              <Link to="/urban-search" className="btn btn-light btn-lg px-4 me-sm-3 rounded-pill">
                <i className="bi bi-building me-2"></i>Urban Search
              </Link>
              <Link to="/rural-search" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                <i className="bi bi-tree me-2"></i>Rural Search
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services; 