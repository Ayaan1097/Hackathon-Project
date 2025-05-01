import axios from 'axios';

// Define the backend API URL with fallback options
// Trying several common port configurations
const API_BASE_URL = process.env.REACT_APP_API_URL || 
                     'https://asset-guru.onrender.com/api/v1';

// Add fallback URLs to try if main URL fails
const FALLBACK_URLS = [
  // Standard API endpoints
  'https://asset-guru.onrender.com/api/v1',
  'https://asset-guru.onrender.com/api',
  // Alternate ports for development
  'https://asset-guru.onrender.com/api/v1',
  'https://asset-guru.onrender.com/api/v1',
  'https://asset-guru.onrender.com/api/v1',
  'https://asset-guru.onrender.com/api/v1',
  // Direct connections to index.js endpoints
  'https://asset-guru.onrender.com'
];

// Track connection status
let isConnected = false;
let activeBaseUrl = API_BASE_URL;

// Create an axios instance for API calls
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: false // Disable credentials for cross-origin requests
});

// Use the mock connectors if backend isn't available
const useMockData = (endpoint) => {
  console.log(`Using mock data for endpoint: ${endpoint}`);
  
  // Import the appropriate connector based on the endpoint
  if (endpoint.includes('electricity')) {
    try {
      // Dynamically import the electricity connector
      const { 
        getElectricityConnectionDetails,
        getElectricityBillDetails,
        searchElectricityConnections,
        reportElectricityIssue,
        getSolarNetMeteringDetails
      } = require('../api-connectors/electricityBoardConnector');
      
      // Map the mock functions to endpoints
      const mockFunctions = {
        '/electricity/connection': getElectricityConnectionDetails,
        '/electricity/bill': getElectricityBillDetails,
        '/electricity/search': searchElectricityConnections,
        '/electricity/report-issue': reportElectricityIssue,
        '/electricity/solar': getSolarNetMeteringDetails
      };
      
      // Find the matching function
      for (const [key, func] of Object.entries(mockFunctions)) {
        if (endpoint.includes(key)) {
          return func;
        }
      }
    } catch (error) {
      console.error('Error importing electricity connector:', error);
    }
  }
  
  // Return a generic mock response if no specific mock is found
  return async () => ({
    success: true, 
    message: "Using mock data - backend connection failed",
    data: { 
      source: `Mock Data (Offline Mode)`,
      message: "This is mock data shown because the backend API is unavailable"
    }
  });
};

// Function to try fallback URLs if main URL fails
const tryFallbackUrls = async (originalError, requestConfig) => {
  console.log('Trying fallback URLs...');
  
  for (const fallbackUrl of FALLBACK_URLS) {
    try {
      console.log(`Trying fallback URL: ${fallbackUrl}`);
      // Create a temporary axios instance with fallback URL
      const tempClient = axios.create({
        baseURL: fallbackUrl,
        headers: apiClient.defaults.headers,
        timeout: apiClient.defaults.timeout,
        withCredentials: false
      });
      
      // Clone the request config but remove the baseURL
      const configCopy = { ...requestConfig };
      delete configCopy.baseURL;
      
      const response = await tempClient(configCopy);
      
      // If successful, update the main apiClient baseURL for future requests
      console.log(`Fallback URL ${fallbackUrl} worked! Updating base URL.`);
      apiClient.defaults.baseURL = fallbackUrl;
      activeBaseUrl = fallbackUrl;
      isConnected = true;
      
      return response;
    } catch (fallbackError) {
      console.log(`Fallback URL ${fallbackUrl} failed:`, fallbackError.message);
      // Continue to next fallback URL
    }
  }
  
  // If all fallbacks fail, throw the original error
  isConnected = false;
  throw originalError;
};

// Intercept requests to add auth headers if needed
apiClient.interceptors.request.use(
  (config) => {
    // Log request details to help debug network issues
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, 
                config.params || config.data);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Handle global response interceptors
apiClient.interceptors.response.use(
  (response) => {
    isConnected = true;
    console.log(`API Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  async (error) => {
    // Extract original request config
    const originalRequest = error.config;
    
    // If it's a network error (like CORS or server down), try fallback URLs
    if (!error.response || error.code === 'ERR_NETWORK') {
      console.error('Network error - attempting fallback URLs:', error.message);
      
      try {
        return await tryFallbackUrls(error, originalRequest);
      } catch (fallbackError) {
        console.error('All fallbacks failed:', fallbackError.message);
        isConnected = false;
        
        // Get endpoint from the URL
        const endpoint = originalRequest.url || '';
        
        // Use mock data as fallback
        const mockFunction = useMockData(endpoint);
        
        // Extract any parameters from the request
        let params = {};
        if (originalRequest.params) {
          params = originalRequest.params;
        } else if (originalRequest.url && originalRequest.url.includes('/')) {
          // Extract ID from URL for restful endpoints
          const parts = originalRequest.url.split('/');
          if (parts.length > 0) {
            const lastPart = parts[parts.length - 1];
            if (lastPart && lastPart !== '') {
              params.id = lastPart;
            }
          }
        }
        
        try {
          // Call the mock function with parameters
          const mockData = await mockFunction(params);
          return { data: mockData };
        } catch (mockError) {
          console.error('Error using mock data:', mockError);
          return { 
            data: { 
              success: false, 
              message: "Backend connection failed and mock data unavailable",
              error: mockError.message
            } 
          };
        }
      }
    }
    
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

// Export connection status helper
export const isApiConnected = () => isConnected;
export const getActiveBaseUrl = () => activeBaseUrl;

// ===== Electricity Board API Services =====
export const getElectricityConnectionDetails = async (consumerNumber) => {
  try {
    const response = await apiClient.get(`/electricity/connection/${consumerNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching electricity connection details:', error);
    throw error;
  }
};

export const getElectricityBillDetails = async (billNumber, consumerNumber) => {
  try {
    let params = {};
    if (billNumber) params.billNumber = billNumber;
    if (consumerNumber) params.consumerNumber = consumerNumber;
    
    const response = await apiClient.get('/electricity/bill', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching electricity bill details:', error);
    throw error;
  }
};

export const searchElectricityConnections = async (searchText, searchType = 'address') => {
  try {
    const response = await apiClient.get('/electricity/search', { 
      params: { searchText, searchType } 
    });
    return response.data;
  } catch (error) {
    console.error('Error searching electricity connections:', error);
    throw error;
  }
};

export const reportElectricityIssue = async (complaintData) => {
  try {
    const response = await apiClient.post('/electricity/report-issue', complaintData);
    return response.data;
  } catch (error) {
    console.error('Error reporting electricity issue:', error);
    throw error;
  }
};

export const getSolarNetMeteringDetails = async (consumerNumber) => {
  try {
    const response = await apiClient.get(`/electricity/solar/${consumerNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching solar net metering details:', error);
    throw error;
  }
};

// ===== Water Supply API Services =====
export const getWaterConnectionDetails = async (consumerNumber) => {
  try {
    const response = await apiClient.get(`/water/connection/${consumerNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching water connection details:', error);
    throw error;
  }
};

export const getWaterBillDetails = async (billNumber, consumerNumber) => {
  try {
    let params = {};
    if (billNumber) params.billNumber = billNumber;
    if (consumerNumber) params.consumerNumber = consumerNumber;
    
    const response = await apiClient.get('/water/bill', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching water bill details:', error);
    throw error;
  }
};

export const searchWaterConnections = async (searchText, searchType = 'address') => {
  try {
    const response = await apiClient.get('/water/search', { 
      params: { searchText, searchType } 
    });
    return response.data;
  } catch (error) {
    console.error('Error searching water connections:', error);
    throw error;
  }
};

export const reportWaterIssue = async (complaintData) => {
  try {
    const response = await apiClient.post('/water/report-issue', complaintData);
    return response.data;
  } catch (error) {
    console.error('Error reporting water issue:', error);
    throw error;
  }
};

export const getWaterQualityReports = async (areaCode, testPeriod = 'last-month') => {
  try {
    const response = await apiClient.get('/water/quality', {
      params: { areaCode, testPeriod }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching water quality reports:', error);
    throw error;
  }
};

// ===== Property Tax API Services =====
export const getPropertyTaxDetails = async (propertyId) => {
  try {
    const response = await apiClient.get(`/property-tax/details/${propertyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property tax details:', error);
    throw error;
  }
};

export const getPropertyTaxPaymentHistory = async (propertyId, years = 5) => {
  try {
    const response = await apiClient.get(`/property-tax/history/${propertyId}`, {
      params: { years }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching property tax payment history:', error);
    throw error;
  }
};

export const calculatePropertyTaxEstimate = async (propertyDetails) => {
  try {
    const response = await apiClient.post('/property-tax/estimate', propertyDetails);
    return response.data;
  } catch (error) {
    console.error('Error calculating property tax estimate:', error);
    throw error;
  }
};

export const searchProperties = async (searchText, searchType = 'address') => {
  try {
    const response = await apiClient.get('/property-tax/search', {
      params: { searchText, searchType }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
};

export const generatePropertyTaxReceipt = async (propertyId, assessmentYear) => {
  try {
    const response = await apiClient.get('/property-tax/receipt', {
      params: { propertyId, assessmentYear }
    });
    return response.data;
  } catch (error) {
    console.error('Error generating property tax receipt:', error);
    throw error;
  }
};

// ===== DORIS API Services =====
export const getPropertyByRegistrationNumber = async (registrationNumber) => {
  try {
    const response = await apiClient.get(`/doris/property/${registrationNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching DORIS property details:', error);
    throw error;
  }
};

export const searchPropertiesByOwnerName = async (ownerName) => {
  try {
    const response = await apiClient.get('/doris/search/owner', {
      params: { ownerName }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching DORIS properties by owner:', error);
    throw error;
  }
};

export const searchPropertiesByAddress = async (addressParams) => {
  try {
    const response = await apiClient.post('/doris/search/address', addressParams);
    return response.data;
  } catch (error) {
    console.error('Error searching DORIS properties by address:', error);
    throw error;
  }
};

// ===== CERSAI API Services =====
export const getEncumbranceByPropertyId = async (propertyId) => {
  try {
    const response = await apiClient.get(`/cersai/encumbrance/${propertyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching CERSAI encumbrance details:', error);
    throw error;
  }
};

export const searchEncumbrancesByBorrower = async (borrowerName) => {
  try {
    const response = await apiClient.get('/cersai/search/borrower', {
      params: { borrowerName }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching CERSAI encumbrances by borrower:', error);
    throw error;
  }
};

export const checkPropertyEncumbrance = async (propertyId) => {
  try {
    const response = await apiClient.get(`/cersai/check/${propertyId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking CERSAI property encumbrance:', error);
    throw error;
  }
};

// ===== Test API Service =====
export const testApiConnection = async () => {
  try {
    // Try multiple endpoints to ensure we have a connection
    try {
      // First attempt: Try the standard test endpoint
      const response = await apiClient.get('/test');
      return response.data;
    } catch (error) {
      // Second attempt: Try the root endpoint
      try {
        const rootResponse = await apiClient.get('/');
        return rootResponse.data;
      } catch (secondError) {
        // Final attempt: Just make a HEAD request to check if the server is up
        const headResponse = await apiClient.head('/');
        return { success: true, message: 'Connection verified', method: 'HEAD' };
      }
    }
  } catch (error) {
    console.error('Error testing API connection:', error);
    isConnected = false;
    throw error;
  }
}; 