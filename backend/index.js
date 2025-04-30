const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS to allow requests from both frontend ports
app.use(cors({
  origin: '*', // Allow all origins during development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import API routes
const apiRoutes = require('./routes/apiRoutes');

// Mount API routes
app.use('/api/v1', apiRoutes);

// Helper function to load property data from JSON files
const loadPropertyData = () => {
  try {
    // Load urban properties
    const urbanPropertiesPath = path.join(__dirname, 'data', 'urbanProperties.json');
    const urbanPropertiesData = fs.readFileSync(urbanPropertiesPath, 'utf8');
    const urbanProperties = JSON.parse(urbanPropertiesData);
    
    // Load rural properties
    const ruralPropertiesPath = path.join(__dirname, 'data', 'ruralProperties.json');
    const ruralPropertiesData = fs.readFileSync(ruralPropertiesPath, 'utf8');
    const ruralProperties = JSON.parse(ruralPropertiesData);
    
    console.log(`Loaded ${urbanProperties.length} urban properties and ${ruralProperties.length} rural properties from JSON files`);
    
    return { urbanProperties, ruralProperties };
  } catch (error) {
    console.error('Error loading property data:', error);
    // Return empty arrays as fallback
    return { urbanProperties: [], ruralProperties: [] };
  }
};

// Load property data from JSON files
const { urbanProperties, ruralProperties } = loadPropertyData();

// Utility function to filter properties
function filterProperties(properties, searchParams) {
  if (!searchParams || Object.keys(searchParams).length === 0) {
    return properties;
  }

  return properties.filter(property => {
    // Filter by property ID (exact match)
    if (searchParams.propertyId && property.id !== searchParams.propertyId) {
      return false;
    }
    
    // Filter by owner name (partial match, case-insensitive)
    if (searchParams.ownerName && !property.owner.toLowerCase().includes(searchParams.ownerName.toLowerCase())) {
      return false;
    }
    
    // Filter by registration number (exact match)
    if (searchParams.registrationNumber && property.registrationNumber !== searchParams.registrationNumber) {
      return false;
    }
    
    // Filter by khasra number (exact match, rural properties only)
    if (searchParams.khasraNumber && property.khasraNumber !== searchParams.khasraNumber) {
      return false;
    }
    
    // Filter by survey number (exact match, rural properties only)
    if (searchParams.surveyNumber && property.surveyNumber !== searchParams.surveyNumber) {
      return false;
    }
    
    // Filter by property type (exact match)
    if (searchParams.propertyType && searchParams.propertyType !== 'all' && property.type !== searchParams.propertyType) {
      return false;
    }
    
    // Filter by land type (exact match, rural properties only)
    if (searchParams.landType && searchParams.landType !== 'all' && 
        property.propertyDetails && property.propertyDetails.landType !== searchParams.landType) {
      return false;
    }
    
    // Filter by location (partial match across all address fields)
    if (searchParams.location) {
      const location = searchParams.location.toLowerCase();
      const addressString = Object.values(property.address).join(' ').toLowerCase();
      if (!addressString.includes(location)) {
        return false;
      }
    }
    
    return true;
  });
}

// Default route
const getRoot = (req, res) => {
  res.json({
    success: true,
    name: 'Property Unification Platform API',
    version: '1.0.0',
    endpoints: [
      '/',
      '/test',
      '/dummy-properties',
      '/urban-properties/search',
      '/rural-properties/search',
      '/api/v1/electricity/connection/:consumerNumber',
      '/api/v1/electricity/bill',
      '/api/v1/electricity/search',
      '/api/v1/electricity/report-issue',
      '/api/v1/electricity/solar/:consumerNumber',
      '/api/v1/water/connection/:consumerNumber',
      '/api/v1/water/bill',
      '/api/v1/water/search',
      '/api/v1/water/report-issue',
      '/api/v1/water/quality',
      '/api/v1/property-tax/details/:propertyId',
      '/api/v1/property-tax/history/:propertyId',
      '/api/v1/property-tax/estimate',
      '/api/v1/property-tax/search',
      '/api/v1/property-tax/receipt',
      '/api/v1/doris/property/:registrationNumber',
      '/api/v1/doris/search/owner',
      '/api/v1/doris/search/address',
      '/api/v1/cersai/encumbrance/:propertyId',
      '/api/v1/cersai/search/borrower',
      '/api/v1/cersai/check/:propertyId'
    ],
    message: 'API routes from apiRoutes.js are mounted at /api/v1'
  });
};

// Test route
const getTest = (req, res) => {
  res.json({
    success: true,
    message: 'Backend API is working!',
    timestamp: new Date().toISOString()
  });
};

// Dummy properties API
const getDummyProperties = (req, res) => {
  res.json({
    success: true,
    properties: [...urbanProperties, ...ruralProperties],
    totalResults: urbanProperties.length + ruralProperties.length,
    message: 'Dummy properties fetched successfully'
  });
};

// Urban property search API
const postUrbanPropertiesSearch = (req, res) => {
  try {
    const searchParams = req.body;
    console.log('⭐ Urban search request received with params:', JSON.stringify(searchParams, null, 2));

    // Introduce a small delay to simulate processing time
    setTimeout(() => {
      let results = filterProperties(urbanProperties, searchParams);
      
      console.log(`✅ Found ${results.length} matching urban properties`);
      
      if (results.length === 0) {
        console.log('No exact matches found, returning all urban properties as fallback.');
        results = urbanProperties;
      }

      res.json({
        success: true,
        properties: results,
        totalResults: results.length,
        message: 'Urban properties found successfully'
      });
    }, 500);

  } catch (error) {
    console.error('❌ Error searching urban properties:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching urban properties',
      error: error.message
    });
  }
};

// Rural property search API
const postRuralPropertiesSearch = (req, res) => {
  try {
    const searchParams = req.body;
    console.log('⭐ Rural search request received with params:', JSON.stringify(searchParams, null, 2));

    // Introduce a small delay to simulate processing time
    setTimeout(() => {
      let results = filterProperties(ruralProperties, searchParams);
      
      console.log(`✅ Found ${results.length} matching rural properties`);
      
      if (results.length === 0) {
        console.log('No exact matches found, returning all rural properties as fallback.');
        results = ruralProperties;
      }

      res.json({
        success: true,
        properties: results,
        totalResults: results.length,
        message: 'Rural properties found successfully'
      });
    }, 500);

  } catch (error) {
    console.error('❌ Error searching rural properties:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching rural properties',
      error: error.message
    });
  }
};

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    message: 'Backend server is running correctly'
  });
});

// Export the route handlers
module.exports = {
  '/': getRoot,
  '/test': getTest,
  '/dummy-properties': getDummyProperties,
  '/urban-properties/search': postUrbanPropertiesSearch,
  '/rural-properties/search': postRuralPropertiesSearch,
};

// Setup routes for old endpoints
app.get('/', getRoot);
app.get('/test', getTest);
app.get('/dummy-properties', getDummyProperties);
app.post('/urban-properties/search', postUrbanPropertiesSearch); 
app.post('/rural-properties/search', postRuralPropertiesSearch);

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
