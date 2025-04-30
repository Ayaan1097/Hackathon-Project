import React from 'react';
import { Link } from 'react-router-dom';
import AuctionAlerts from './common/AuctionAlerts';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section py-5 text-white">
        <div className="container text-center">
          <div className="mb-4 d-flex justify-content-center">
            <img src="/property.jpg" alt="ASSET GURU Logo" className="hero-logo" />
          </div>
          <h1 className="display-4 fw-bold mb-3">ASSET-GURU</h1>
          <p className="lead mb-2">Standardized property search across DORIS, DOLR, CERSAI, and MCA21</p>
          <p className="lead-tagline mb-4">WHERE PRESTIGE MEETS PROPERTY.</p>
          <div className="d-flex justify-content-center">
            <Link to="/urban-search" className="c-button c-button--gooey me-3">
              Urban Search
              <div className="c-button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Link>
            <Link to="/rural-search" className="c-button c-button--gooey c-button--rural me-3">
              Rural Search
              <div className="c-button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Link>
            <Link to="/challenges" className="c-button c-button--gooey">
              Learn More
              <div className="c-button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* SVG filter for gooey effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="gooey-filter">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
            <feBlend in="SourceGraphic" in2="goo"></feBlend>
          </filter>
        </defs>
      </svg>

      {/* Features Section */}
      <section className="py-5 bg-light" id="features">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary text-uppercase fw-bold small">All in One Solution</h6>
            <h2 className="display-5 fw-bold mb-3">UNIFIED PROPERTY SEARCH</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              No more visiting multiple portals. ASSET-GURU brings all property information from various databases into one seamless interface.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-primary text-white mb-4">
                    <i className="bi bi-buildings"></i>
                  </div>
                  <h4>Urban Properties</h4>
                  <p className="text-muted">Comprehensive search for apartments, houses, commercial buildings, and other urban properties.</p>
                  <Link to="/urban-search" className="btn btn-outline-primary mt-3">Search Urban</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-success text-white mb-4">
                    <i className="bi bi-tree"></i>
                  </div>
                  <h4>Rural Properties</h4>
                  <p className="text-muted">Specialized search for agricultural lands, village properties, and rural real estate.</p>
                  <Link to="/rural-search" className="btn btn-outline-success mt-3">Search Rural</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-warning text-white mb-4">
                    <i className="bi bi-bank"></i>
                  </div>
                  <h4>Financial Status</h4>
                  <p className="text-muted">Get comprehensive loan information, encumbrances, and financial details of any property.</p>
                  <Link to="/financial-status" className="btn btn-outline-warning mt-3">View Reports</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Alerts Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-danger text-uppercase fw-bold small">Hot Deals</h6>
            <h2 className="display-5 fw-bold mb-3">BANK AUCTION PROPERTIES</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Find exclusive properties available through bank auctions at significantly below-market rates.
              Get notified about new listings that match your criteria.
            </p>
          </div>
          
          <AuctionAlerts />
          
          <div className="text-center mt-4">
            <Link to="/auction-listings" className="btn btn-primary btn-lg rounded-pill">
              <i className="bi bi-list-ul me-2"></i>View All Auction Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary text-uppercase fw-bold small">Why Choose Us?</h6>
            <h2 className="display-5 fw-bold mb-3">One Portal vs Multiple Portals</h2>
            <p className="lead text-muted">See how ASSET-GURU simplifies your property search journey</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm bg-light">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
                      <i className="bi bi-x-lg"></i>
                    </div>
                    <h3 className="fs-4 mb-0">Multiple Portals Approach</h3>
                  </div>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-x text-danger me-3"></i>
                      <p className="mb-0">Multiple logins and interfaces</p>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-x text-danger me-3"></i>
                      <p className="mb-0">Inconsistent data formats</p>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-x text-danger me-3"></i>
                      <p className="mb-0">Time-consuming manual cross-referencing</p>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-x text-danger me-3"></i>
                      <p className="mb-0">Different terminology and search parameters</p>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-x text-danger me-3"></i>
                      <p className="mb-0">Missing financial and loan information</p>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-x text-danger me-3"></i>
                      <p className="mb-0">No distinction between urban and rural needs</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: "#eef2ff" }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <h3 className="fs-4 mb-0">ASSET-GURU Approach</h3>
                  </div>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-check text-success me-3"></i>
                      <p className="mb-0">Single unified interface for all searches</p>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-check text-success me-3"></i>
                      <p className="mb-0">Standardized data presentation</p>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-check text-success me-3"></i>
                      <p className="mb-0">Automatic consolidation from multiple sources</p>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-check text-success me-3"></i>
                      <p className="mb-0">Consistent terminology and search experience</p>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-check text-success me-3"></i>
                      <p className="mb-0">Complete financial information including loans</p>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-check text-success me-3"></i>
                      <p className="mb-0">Specialized urban and rural search interfaces</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link to="/challenges" className="btn btn-primary btn-lg rounded-pill">
              <i className="bi bi-arrow-right-circle me-2"></i>Learn About Our Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 cta-section" id="contact">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-start mb-4 mb-lg-0">
              <h2 className="text-white fw-bold mb-3">Ready to simplify your property search?</h2>
              <p className="text-white-50 lead">Experience the future of property information access.</p>
            </div>
            <div className="col-lg-5 text-center text-lg-end">
              <Link to="/urban-search" className="c-button c-button--gooey me-3">
                Urban Search
                <div className="c-button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </Link>
              <Link to="/rural-search" className="c-button c-button--gooey c-button--rural">
                Rural Search
                <div className="c-button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 