import axios from 'axios';

// MapMyIndia API configuration
const API_KEY = process.env.REACT_APP_MAPMYINDIA_API_KEY || 'your_api_key_here';
const BASE_URL = 'https://apis.mapmyindia.com/advancedmaps/v1';

// Define the backend API URL
const API_BASE_URL = 'http://localhost:5000';

/**
 * Search for a location using MapMyIndia API
 * @param {string} locationQuery - The location to search for (e.g., "Pune, Maharashtra")
 * @param {string} refLocation - Optional reference location as "lat,lng"
 * @returns {Promise} - The API response with location data
 */
export const searchLocation = async (locationQuery, refLocation = '28.61,77.23') => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/search`, {
      params: {
        keywords: locationQuery,
        refLocation: refLocation
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};

/**
 * Get location suggestions as user types
 * @param {string} input - The user input to get suggestions for
 * @returns {Promise} - The API response with location suggestions
 */
export const getLocationSuggestions = async (input) => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/autosuggest`, {
      params: {
        q: input
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    throw error;
  }
};

/**
 * Get details about a specific location using its place ID
 * @param {string} placeId - The eLoc or place ID from MapMyIndia
 * @returns {Promise} - The API response with detailed location information
 */
export const getLocationDetails = async (placeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/place_detail`, {
      params: {
        place_id: placeId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location details:', error);
    throw error;
  }
};

/**
 * Search for properties in urban areas
 * @param {Object} searchParams - Search parameters including location
 * @returns {Promise} - Response with property data from the backend
 */
export const searchUrbanProperties = async (searchParams) => {
  try {
    // Map frontend search params to backend expected format
    const mappedParams = {};
    
    if (searchParams.searchType === 'id' && searchParams.propertyId) {
      mappedParams.propertyId = searchParams.propertyId;
    } 
    
    if (searchParams.searchType === 'owner' && searchParams.ownerName) {
      mappedParams.ownerName = searchParams.ownerName;
    }
    
    if (searchParams.searchType === 'registration' && searchParams.registrationNumber) {
      mappedParams.registrationNumber = searchParams.registrationNumber;
    }
    
    if (searchParams.searchType === 'location' && searchParams.location) {
      mappedParams.location = searchParams.location;
    }
    
    if (searchParams.searchType === 'address') {
      mappedParams.location = Object.values(searchParams.address)
        .filter(val => val)
        .join(', ');
    }

    console.log('Sending request to:', `${API_BASE_URL}/urban-properties/search`);
    console.log('With params:', mappedParams);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/urban-properties/search`, mappedParams);
      console.log('Received response:', response.data);
      return response.data;
    } catch (axiosError) {
      console.error('Axios error details:', {
        message: axiosError.message,
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        url: axiosError.config?.url
      });
      throw axiosError;
    }
  } catch (error) {
    console.error('Error searching urban properties:', error);
    throw error;
  }
};

/**
 * Search for properties in rural areas
 * @param {Object} searchParams - Search parameters including location
 * @returns {Promise} - Response with property data from the backend
 */
export const searchRuralProperties = async (searchParams) => {
  try {
    // Map frontend search params to backend expected format
    const mappedParams = {};
    
    if (searchParams.searchType === 'id' && searchParams.propertyId) {
      mappedParams.propertyId = searchParams.propertyId;
    } 
    
    if (searchParams.searchType === 'owner' && searchParams.ownerName) {
      mappedParams.ownerName = searchParams.ownerName;
    }
    
    if (searchParams.searchType === 'khasra' && searchParams.khasraNumber) {
      mappedParams.khasraNumber = searchParams.khasraNumber;
    }
    
    if (searchParams.searchType === 'survey' && searchParams.surveyNumber) {
      mappedParams.surveyNumber = searchParams.surveyNumber;
    }
    
    if (searchParams.searchType === 'location' && searchParams.location) {
      mappedParams.location = searchParams.location;
    }
    
    if (searchParams.searchType === 'address') {
      mappedParams.location = Object.values(searchParams.address)
        .filter(val => val)
        .join(', ');
    }

    console.log('Sending request to:', `${API_BASE_URL}/rural-properties/search`);
    console.log('With params:', mappedParams);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/rural-properties/search`, mappedParams);
      console.log('Received response:', response.data);
      return response.data;
    } catch (axiosError) {
      console.error('Axios error details:', {
        message: axiosError.message,
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        url: axiosError.config?.url
      });
      throw axiosError;
    }
  } catch (error) {
    console.error('Error searching rural properties:', error);
    throw error;
  }
};

/**
 * Get property details by ID
 * @param {string} propertyId - The ID of the property to fetch
 * @returns {Promise} - Response with property details
 */
export const getPropertyDetails = async (propertyId) => {
  try {
    // Determine if it's a rural or urban property based on ID prefix
    const isRural = propertyId.startsWith('RUR');
    const endpoint = isRural ? 'rural-properties' : 'urban-properties';
    
    const url = `${API_BASE_URL}/${endpoint}/search`;
    const response = await axios.post(url, { propertyId });
    
    if (response.data && response.data.properties && response.data.properties.length > 0) {
      return { property: response.data.properties[0] };
    }
    
    throw new Error('Property not found');
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};

/**
 * Check if the backend server is running
 * @returns {Promise<boolean>} - True if backend is healthy, false otherwise
 */
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`, {
      timeout: 5000 // 5 second timeout
    });
    return response.data.status === 'healthy';
  } catch (error) {
    console.error('Backend health check failed:', error.message);
    return false;
  }
}; 