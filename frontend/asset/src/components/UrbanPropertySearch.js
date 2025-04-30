import React, { useState, useEffect } from 'react';
import LocationSearchInput from './common/LocationSearchInput';
import PropertyResults from './common/PropertyResults';
import { searchUrbanProperties, checkBackendHealth } from '../services/locationService';

function UrbanPropertySearch() {
  const [searchParams, setSearchParams] = useState({
    searchType: 'id',
    propertyId: '',
    ownerName: '',
    address: {
      street: '',
      locality: '',
      city: '',
      state: '',
      pincode: ''
    },
    registrationNumber: '',
    propertyType: 'all',
    location: ''
  });

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ checked: false, healthy: false });

  // Check backend health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkBackendHealth();
      setBackendStatus({ checked: true, healthy: isHealthy });
    };
    
    checkHealth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSearchParams(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSearchParams(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLocationChange = (value, suggestion) => {
    setSearchParams(prev => ({
      ...prev,
      location: value
    }));

    // If we have a complete suggestion with city/state data, update the address fields
    if (suggestion && suggestion.placeName) {
      const placeNameParts = suggestion.placeName.split(',').map(part => part.trim());
      
      if (placeNameParts.length >= 2) {
        // Try to extract city and state
        const possibleCity = placeNameParts[0];
        const possibleState = placeNameParts[placeNameParts.length - 1];
        
        setSearchParams(prev => ({
          ...prev,
          address: {
            ...prev.address,
            city: possibleCity,
            state: possibleState
          }
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check backend health before submitting
    if (!backendStatus.healthy) {
      const isHealthy = await checkBackendHealth();
      setBackendStatus({ checked: true, healthy: isHealthy });
      
      if (!isHealthy) {
        setSearchError({ 
          message: 'Backend server is not running. Please start the server at http://localhost:5000'
        });
        return;
      }
    }
    
    setIsLoading(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      const response = await searchUrbanProperties(searchParams);
      if (response && response.properties) {
        setResults(response.properties);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error searching properties:', error);
      let errorMessage = 'Failed to search properties';
      
      if (error.message && error.message.includes('Network Error')) {
        errorMessage = 'Network error: Please check if the backend server is running at http://localhost:5000';
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = `Server error (${error.response.status}): ${error.response.data?.message || error.message}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check if the backend is running.';
      }
      
      setSearchError({ message: errorMessage });
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({
      searchType: 'id',
      propertyId: '',
      ownerName: '',
      address: {
        street: '',
        locality: '',
        city: '',
        state: '',
        pincode: ''
      },
      registrationNumber: '',
      propertyType: 'all',
      location: ''
    });
    setResults([]);
    setHasSearched(false);
  };

  // List of property types from the JSON data
  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Commercial', label: 'Commercial Space' },
    { value: 'Independent House', label: 'Independent House' },
    { value: 'Plot', label: 'Plot' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Shop', label: 'Shop' }
  ];

  return (
    <div className="urban-search">
      {!backendStatus.healthy && backendStatus.checked && (
        <div className="alert alert-warning mb-4">
          <strong>Warning:</strong> Backend server appears to be offline. Please make sure the server is running at <code>http://localhost:5000</code>
        </div>
      )}
      
      <div className="card shadow-lg border-0">
        <div className="card-header bg-white border-0 py-3">
          <h3 className="card-title mb-0 fs-4 text-primary">
            <i className="bi bi-buildings me-2"></i>Urban Property Search
          </h3>
          <p className="text-muted small mb-0">Search for properties in cities, municipalities, and urban development areas</p>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-bold">Search By:</label>
              <div className="search-type-options">
                <label className="search-option">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="searchType"
                    value="id"
                    checked={searchParams.searchType === 'id'}
                    onChange={handleChange}
                  />
                  <span>Property ID</span>
                </label>
                <label className="search-option">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="searchType"
                    value="owner"
                    checked={searchParams.searchType === 'owner'}
                    onChange={handleChange}
                  />
                  <span>Owner's Name</span>
                </label>
                <label className="search-option">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="searchType"
                    value="address"
                    checked={searchParams.searchType === 'address'}
                    onChange={handleChange}
                  />
                  <span>Address</span>
                </label>
                <label className="search-option">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="searchType"
                    value="registration"
                    checked={searchParams.searchType === 'registration'}
                    onChange={handleChange}
                  />
                  <span>Registration Number</span>
                </label>
                <label className="search-option">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="searchType"
                    value="location"
                    checked={searchParams.searchType === 'location'}
                    onChange={handleChange}
                  />
                  <span>Location Search</span>
                </label>
              </div>
            </div>

            {searchParams.searchType === 'id' && (
              <div className="mb-3">
                <label htmlFor="propertyId" className="form-label">Property ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyId"
                  name="propertyId"
                  value={searchParams.propertyId}
                  onChange={handleChange}
                  placeholder="Enter urban property ID (e.g., URB12345)"
                />
               
              </div>
            )}

            {searchParams.searchType === 'owner' && (
              <div className="mb-3">
                <label htmlFor="ownerName" className="form-label">Owner's Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="ownerName"
                  name="ownerName"
                  value={searchParams.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner's name or business name"
                />
              </div>
            )}

            {searchParams.searchType === 'location' && (
              <div className="mb-3">
                <LocationSearchInput
                  label="Location"
                  id="location"
                  value={searchParams.location}
                  onChange={handleLocationChange}
                  placeholder="Enter city, locality or landmark"
                  required
                />
                <div className="form-text text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  Search for urban properties by location
                </div>
              </div>
            )}

            {searchParams.searchType === 'address' && (
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="street" className="form-label">Street/Building:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="address.street"
                    value={searchParams.address.street}
                    onChange={handleChange}
                    placeholder="Enter street name or building"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="locality" className="form-label">Locality/Area:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="locality"
                    name="address.locality"
                    value={searchParams.address.locality}
                    onChange={handleChange}
                    placeholder="Enter locality or area"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">City:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="address.city"
                    value={searchParams.address.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">State:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="address.state"
                    value={searchParams.address.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="pincode" className="form-label">PIN Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    name="address.pincode"
                    value={searchParams.address.pincode}
                    onChange={handleChange}
                    placeholder="Enter PIN code"
                  />
                </div>
              </div>
            )}

            {searchParams.searchType === 'registration' && (
              <div className="mb-3">
                <label htmlFor="registrationNumber" className="form-label">Registration Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={searchParams.registrationNumber}
                  onChange={handleChange}
                  placeholder="Enter property registration number"
                />
                <small className="form-text text-muted">Example format: PUN-AP-2022-123456</small>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="propertyType" className="form-label">Property Type:</label>
              <select
                className="form-select"
                id="propertyType"
                name="propertyType"
                value={searchParams.propertyType}
                onChange={handleChange}
              >
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-search me-2"></i>Search Properties
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                <i className="bi bi-x-circle me-2"></i>Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {hasSearched && (
        <PropertyResults
          results={results}
          isLoading={isLoading}
          error={searchError}
          propertyType="urban"
        />
      )}
    </div>
  );
}

export default UrbanPropertySearch; 