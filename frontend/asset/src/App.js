import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import './home-buttons.css';
import Axios from "axios";

// Import components
import Account from './components/common/ApiTest';
import Home from './components/Home';
import UrbanPropertySearch from './components/UrbanPropertySearch';
import RuralPropertySearch from './components/RuralPropertySearch';
import PropertyDetails from './components/PropertyDetails';
import Challenges from './components/Challenges';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import AuctionListings from './components/AuctionListings';
import FinancialStatus from './components/FinancialStatus';
import AuctionNotification from './components/common/AuctionNotification';
import ConnectionStatus from './components/common/ConnectionStatus';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/common/PrivateRoute';
import UserMenu from './components/common/UserMenu';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  const [data, setData] = useState();
  const [searchParams, setSearchParams] = useState({
    searchType: 'address',
    searchText: '',
    propertyType: 'all'
  });
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/getData");
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path === '/services') setActiveTab('services');
    else if (path === '/testimonials') setActiveTab('testimonials');
    else if (path === '/contact') setActiveTab('contact');
    else if (path === '/api-test') setActiveTab('account');
  }, [location]);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
          <div className="container">
            <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
              <img src="/property.jpg" alt="ASSET GURU Logo" className="navbar-logo me-2" />
              ASSET-GURU
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} to="/services">Services</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/testimonials' ? 'active' : ''}`} to="/testimonials">Testimonials</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/challenges' ? 'active' : ''}`} to="/challenges">About</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/auction-listings' ? 'active' : ''}`} to="/auction-listings">
                    <span className="position-relative">
                      Auctions
                      <span className="badge bg-danger rounded-pill position-absolute" style={{ top: '-8px', right: '-20px', fontSize: '0.65rem' }}>
                        New
                      </span>
                    </span>
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <AuctionNotification />
                </li>
                <li className="nav-item ms-lg-3">
                  <div className="btn-group">
                    <Link to="/urban-search" className="btn btn-light rounded-pill me-2">
                      <i className="bi bi-building me-2"></i>Urban Search
                    </Link>
                    <Link to="/rural-search" className="btn btn-success rounded-pill">
                      <i className="bi bi-tree me-2"></i>Rural Search
                    </Link>
                  </div>
                </li>
                <li className="nav-item ms-lg-3">
                  <UserMenu />
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/urban-search" element={<UrbanPropertySearch />} />
            <Route path="/rural-search" element={<RuralPropertySearch />} />
            <Route path="/property-details/:id" element={<PropertyDetails />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/auction-listings" element={<AuctionListings />} />
            
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/financial-status" element={<FinancialStatus />} />
              <Route path="/profile" element={<div className="container mt-4"><h2>My Profile</h2><p>Profile page coming soon</p></div>} />
              <Route path="/my-properties" element={<div className="container mt-4"><h2>My Properties</h2><p>Your property listings will appear here</p></div>} />
              <Route path="/settings" element={<div className="container mt-4"><h2>Account Settings</h2><p>Settings page coming soon</p></div>} />
              <Route path="/api-test" element={<Account />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<div className="container py-5 text-center"><h1>404</h1><p>Page not found</p></div>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer py-5" style={{ backgroundColor: "#121212" }}>
          <div className="container">
            <div className="row align-items-start">
              <div className="col-md-3 mb-4 mb-md-0">
                <div className="mb-3">
                  <span className="fs-4 fw-bold" style={{ color: "#FFFFE0" }}>ASSET</span>
                  <span className="fs-4 fw-bold text-white">-GURU</span>
                </div>
                <p className="text-white-50 small mb-3">
                  ASSET-GURU | The universe of property
                </p>
                <p className="text-white-50 small mb-3">
                  <span style={{ fontSize: "1.1rem" }}>℗</span> All rights reserved
                </p>
                <div className="d-flex gap-3 mb-3">
                  <a href="https://instagram.com" className="text-white-50">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://twitter.com" className="text-white-50">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="https://discord.com" className="text-white-50">
                    <i className="bi bi-discord"></i>
                  </a>
                </div>
              </div>

              <div className="col-md-3 mb-4 mb-md-0">
                <h5 className="text-white fw-bold mb-3">Resources</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="https://doris.delhigovt.nic.in/" className="text-white-50 text-decoration-none" target="_blank" rel="noopener noreferrer">DORIS - Delhi</a>
                  </li>
                  <li className="mb-2">
                    <a href="https://www.cersai.org.in/CERSAI/" className="text-white-50 text-decoration-none" target="_blank" rel="noopener noreferrer">CERSAI</a>
                  </li>
                  <li className="mb-2">
                    <a href="https://www.mca.gov.in/" className="text-white-50 text-decoration-none" target="_blank" rel="noopener noreferrer">MCA</a>
                  </li>
                  <li className="mb-2">
                    <a href="https://dolr.gov.in/" className="text-white-50 text-decoration-none" target="_blank" rel="noopener noreferrer">DOLR</a>
                  </li>
                </ul>
              </div>

              <div className="col-md-3 mb-4 mb-md-0">
                <h5 className="text-white fw-bold mb-3">Information</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none">Blog</a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none">Post Guidelines</a>
                  </li>
                  <li className="mb-2">
                    <a href="tel:7249889183" className="text-white-50 text-decoration-none">+91 7249889183</a>
                  </li>
                  <li className="mb-2">
                    <a href="mailto:p.amanworks@gmail.com" className="text-white-50 text-decoration-none">p.amanworks@gmail.com</a>
                  </li>
                </ul>
              </div>

              <div className="col-md-3">
                <h5 className="text-white fw-bold mb-3">Legal</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none">Terms and Conditions</a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none">Privacy policy</a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none">Cookie policy</a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none">Disclaimer</a>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="my-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", opacity: 0.3 }} />

            <div className="text-center text-white-50">
              <p className="mb-0">2025 Pixel Galaxies. All rights reserved. - ASSET-GURU</p>
            </div>
          </div>
        </footer>

        {/* Add connection status indicator */}
        <ConnectionStatus />
      </div>
    </AuthProvider>
  );
};

export default App;
