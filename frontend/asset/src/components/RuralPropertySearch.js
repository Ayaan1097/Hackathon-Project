import React, { useState, useEffect } from 'react';
import LocationSearchInput from './common/LocationSearchInput';
import PropertyResults from './common/PropertyResults';
import { searchRuralProperties, checkBackendHealth } from '../services/locationService';

function RuralPropertySearch() {
  const [searchParams, setSearchParams] = useState({
    searchType: 'id',
    propertyId: '',
    ownerName: '',
    address: {
      village: '',
      tehsil: '',
      district: '',
      state: '',
      pincode: ''
    },
    khasraNumber: '',
    surveyNumber: '',
    landType: 'all',
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

    // If we have a complete suggestion with village/tehsil/district data, update the address fields
    if (suggestion && suggestion.placeName) {
      const placeNameParts = suggestion.placeName.split(',').map(part => part.trim());
      
      if (placeNameParts.length >= 2) {
        // Try to extract village/tehsil and state
        const possibleVillage = placeNameParts[0];
        const possibleTehsil = placeNameParts.length > 2 ? placeNameParts[1] : '';
        const possibleState = placeNameParts[placeNameParts.length - 1];
        
        setSearchParams(prev => ({
          ...prev,
          address: {
            ...prev.address,
            village: possibleVillage,
            tehsil: possibleTehsil,
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
      const response = await searchRuralProperties(searchParams);
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
        village: '',
        tehsil: '',
        district: '',
        state: '',
        pincode: ''
      },
      khasraNumber: '',
      surveyNumber: '',
      landType: 'all',
      location: ''
    });
    setResults([]);
    setHasSearched(false);
  };

  // List of land types from the JSON data
  const landTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'Agricultural', label: 'Agricultural Land' },
    { value: 'Farmhouse', label: 'Farmhouse' },
    { value: 'Orchard', label: 'Orchard' },
    { value: 'Dairy Farm', label: 'Dairy Farm' },
    { value: 'Poultry Farm', label: 'Poultry Farm' },
    { value: 'Plantation', label: 'Plantation' },
    { value: 'Fishery', label: 'Fishery' }
  ];

  return (
    <div className="rural-search">
      {!backendStatus.healthy && backendStatus.checked && (
        <div className="alert alert-warning mb-4">
          <strong>Warning:</strong> Backend server appears to be offline. Please make sure the server is running at <code>http://localhost:5000</code>
        </div>
      )}
      
      <div className="card shadow-lg border-0">
        <div className="card-header bg-white border-0 py-3">
          <h3 className="card-title mb-0 fs-4 text-success">
            <i className="bi bi-tree me-2"></i>Rural Property Search
          </h3>
          <p className="text-muted small mb-0">Search for properties in villages, panchayats, and rural areas</p>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-bold">Search By:</label>
              <div className="search-type-options">
                <label className="search-option rural">
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
                <label className="search-option rural">
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
                <label className="search-option rural">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="searchType"
                    value="address"
                    checked={searchParams.searchType === 'address'}
                    onChange={handleChange}
                  />
                  <span>Village/Location</span>
                </label>
                <label className="search-option rural">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="searchType"
                    value="khasra"
                    checked={searchParams.searchType === 'khasra'}
                    onChange={handleChange}
                  />
                  <span>Khasra Number</span>
                </label>
                <label className="search-option rural">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="searchType"
                    value="survey"
                    checked={searchParams.searchType === 'survey'}
                    onChange={handleChange}
                  />
                  <span>Survey Number</span>
                </label>
                <label className="search-option rural">
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
                  placeholder="Enter rural property ID (e.g., RUR98765)"
                />
                <small className="form-text text-muted">Example format: RUR98765</small>
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
                  placeholder="Enter owner's name or organization"
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
                  placeholder="Enter village, tehsil or any rural landmark"
                  required
                />
                <div className="form-text text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  Search for rural properties by location
                </div>
              </div>
            )}

            {searchParams.searchType === 'address' && (
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="village" className="form-label">Village:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="village"
                    name="address.village"
                    value={searchParams.address.village}
                    onChange={handleChange}
                    placeholder="Enter village name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="tehsil" className="form-label">Tehsil/Taluka:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tehsil"
                    name="address.tehsil"
                    value={searchParams.address.tehsil}
                    onChange={handleChange}
                    placeholder="Enter tehsil or taluka"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="district" className="form-label">District:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="district"
                    name="address.district"
                    value={searchParams.address.district}
                    onChange={handleChange}
                    placeholder="Enter district"
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

            {searchParams.searchType === 'khasra' && (
              <div className="mb-3">
                <label htmlFor="khasraNumber" className="form-label">Khasra Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="khasraNumber"
                  name="khasraNumber"
                  value={searchParams.khasraNumber}
                  onChange={handleChange}
                  placeholder="Enter khasra number"
                />
                <small className="form-text text-muted">Example format: KN-123/456</small>
              </div>
            )}

            {searchParams.searchType === 'survey' && (
              <div className="mb-3">
                <label htmlFor="surveyNumber" className="form-label">Survey Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="surveyNumber"
                  name="surveyNumber"
                  value={searchParams.surveyNumber}
                  onChange={handleChange}
                  placeholder="Enter survey number"
                />
                <small className="form-text text-muted">Example format: SN-78/90</small>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="landType" className="form-label">Land Type:</label>
              <select
                className="form-select"
                id="landType"
                name="landType"
                value={searchParams.landType}
                onChange={handleChange}
              >
                {landTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-success">
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
          propertyType="rural"
        />
      )}
    </div>
  );
}

export default RuralPropertySearch; 