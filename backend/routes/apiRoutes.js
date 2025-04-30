const express = require('express');
const router = express.Router();

// Import controllers
const electricityController = require('../controllers/electricityController');

// Electricity Board Routes
router.get('/electricity/connection/:consumerNumber', electricityController.getElectricityConnectionDetails);
router.get('/electricity/bill', electricityController.getElectricityBillDetails);
router.get('/electricity/search', electricityController.searchElectricityConnections);
router.post('/electricity/report-issue', electricityController.reportElectricityIssue);
router.get('/electricity/solar/:consumerNumber', electricityController.getSolarNetMeteringDetails);

// Water Supply Routes
router.get('/water/connection/:consumerNumber', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'getWaterConnectionDetails',
    params: {
      consumerNumber: req.params.consumerNumber
    }
  });
});

router.get('/water/bill', (req, res) => {
  const { billNumber, consumerNumber } = req.query;
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'getWaterBillDetails',
    params: {
      billNumber,
      consumerNumber
    }
  });
});

router.get('/water/search', (req, res) => {
  const { searchText, searchType } = req.query;
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'searchWaterConnections',
    params: {
      searchText,
      searchType
    }
  });
});

router.post('/water/report-issue', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'reportWaterIssue',
    params: req.body
  });
});

router.get('/water/quality', (req, res) => {
  const { areaCode, testPeriod } = req.query;
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'getWaterQualityReports',
    params: {
      areaCode,
      testPeriod
    }
  });
});

// Property Tax Routes
router.get('/property-tax/details/:propertyId', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'getPropertyTaxDetails',
    params: {
      propertyId: req.params.propertyId
    }
  });
});

router.get('/property-tax/history/:propertyId', (req, res) => {
  const { years } = req.query;
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'getPropertyTaxPaymentHistory',
    params: {
      propertyId: req.params.propertyId,
      years: years || 5
    }
  });
});

router.post('/property-tax/estimate', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'calculatePropertyTaxEstimate',
    params: req.body
  });
});

router.get('/property-tax/search', (req, res) => {
  const { searchText, searchType } = req.query;
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'searchProperties',
    params: {
      searchText,
      searchType
    }
  });
});

router.get('/property-tax/receipt', (req, res) => {
  const { propertyId, assessmentYear } = req.query;
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'generatePropertyTaxReceipt',
    params: {
      propertyId,
      assessmentYear
    }
  });
});

// DORIS Routes
router.get('/doris/property/:registrationNumber', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'getPropertyByRegistrationNumber',
    params: {
      registrationNumber: req.params.registrationNumber
    }
  });
});

router.get('/doris/search/owner', (req, res) => {
  const { ownerName } = req.query;
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'searchPropertiesByOwnerName',
    params: {
      ownerName
    }
  });
});

router.post('/doris/search/address', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'searchPropertiesByAddress',
    params: req.body
  });
});

// CERSAI Routes
router.get('/cersai/encumbrance/:propertyId', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'getEncumbranceByPropertyId',
    params: {
      propertyId: req.params.propertyId
    }
  });
});

router.get('/cersai/search/borrower', (req, res) => {
  const { borrowerName } = req.query;
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'searchEncumbrancesByBorrower',
    params: {
      borrowerName
    }
  });
});

router.get('/cersai/check/:propertyId', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    endpoint: 'checkPropertyEncumbrance',
    params: {
      propertyId: req.params.propertyId
    }
  });
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'API Routes are working!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 