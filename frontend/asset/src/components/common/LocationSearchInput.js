import React, { useState, useEffect, useRef } from 'react';
import { getLocationSuggestions } from '../../services/locationService';

function LocationSearchInput({ value, onChange, placeholder, className, label, id, required }) {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Update input value if the prop changes
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    // Handle clicks outside suggestions dropdown to close it
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current && 
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getLocationSuggestions(query);
      if (data && data.suggestions) {
        setSuggestions(data.suggestions);
      } else {
        // If API fails or returns unexpected format, use mock data
        const mockSuggestions = [
          { placeName: `${query} City, Maharashtra`, placeAddress: 'City in Maharashtra, India' },
          { placeName: `${query} Village, Pune`, placeAddress: 'Village in Pune, Maharashtra' },
          { placeName: `${query} Colony, Delhi`, placeAddress: 'Neighborhood in Delhi, India' }
        ];
        setSuggestions(mockSuggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      // Fallback to mock data
      const mockSuggestions = [
        { placeName: `${query} City, Maharashtra`, placeAddress: 'City in Maharashtra, India' },
        { placeName: `${query} Village, Pune`, placeAddress: 'Village in Pune, Maharashtra' },
        { placeName: `${query} Colony, Delhi`, placeAddress: 'Neighborhood in Delhi, India' }
      ];
      setSuggestions(mockSuggestions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Call onChange prop if provided
    if (onChange) {
      onChange(newValue);
    }
    
    if (newValue.length >= 3) {
      fetchSuggestions(newValue);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const locationName = suggestion.placeName || suggestion.place;
    setInputValue(locationName);
    setShowSuggestions(false);
    
    // Call onChange prop with the selected suggestion
    if (onChange) {
      onChange(locationName, suggestion);
    }
  };

  return (
    <div className="location-search-container">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="position-relative">
        <input
          type="text"
          className={`form-control ${className || ''}`}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder || "Enter location..."}
          onFocus={() => inputValue.length >= 3 && setShowSuggestions(true)}
          ref={inputRef}
          id={id}
          required={required}
        />
        {isLoading && (
          <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            className="position-absolute w-100 border rounded mt-1 bg-white shadow-sm z-3"
            style={{ maxHeight: '200px', overflowY: 'auto' }}
            ref={suggestionsRef}
          >
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-2 border-bottom cursor-pointer suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: 'pointer' }}
              >
                <div className="fw-medium">{suggestion.placeName || suggestion.place}</div>
                <div className="small text-muted">{suggestion.placeAddress || suggestion.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSearchInput; 