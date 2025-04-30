// Import the mock data generators from frontend
// In a real application, this would be your database models or external APIs
const path = require('path');
const fs = require('fs');

// Read the electricityBoardConnector.js file to extract mock data generation
const electricityConnectorPath = path.join(__dirname, '../../frontend/asset/src/api-connectors/electricityBoardConnector.js');
let electricityMockData = {};

try {
  if (fs.existsSync(electricityConnectorPath)) {
    // We need to extract the mocked data from the connector for demo purposes
    // In a real application, this would be data from a database or external API
    console.log('Using mock data from electricityBoardConnector.js');
  } else {
    // If file doesn't exist, we'll use simpler mock data
    console.log('Using fallback mock data for electricity endpoints');
  }
} catch (err) {
  console.error('Error checking for electricity connector:', err);
}

// Mock electricity connection data
const getElectricityConnectionDetails = async (req, res) => {
  try {
    const { consumerNumber } = req.params;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const data = {
      success: true,
      source: "Electricity Board",
      connectionDetails: {
        consumerNumber: consumerNumber || "EB-12345678",
        consumerName: "Ramesh Sharma",
        connectionAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
        connectionType: "Residential",
        sanctionedLoad: "5 kW",
        supplyType: "Single Phase",
        connectionStatus: "Active",
        meterDetails: {
          meterNumber: "ELMS-98765",
          meterType: "Smart Meter",
          lastReading: "13678 kWh",
          lastReadingDate: "2023-04-02"
        },
        billingHistory: [
          {
            billNumber: "EB-2023-04-56789",
            billingPeriod: "Mar 01, 2023 to Mar 31, 2023",
            billAmount: "₹ 1,692.65",
            paymentStatus: "Paid"
          }
        ]
      }
    };
    
    res.json(data);
  } catch (error) {
    console.error('Error in getElectricityConnectionDetails:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch electricity connection details',
      error: error.message
    });
  }
};

const getElectricityBillDetails = async (req, res) => {
  try {
    const { billNumber, consumerNumber } = req.query;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const data = {
      success: true,
      source: "Electricity Board",
      searchCriteria: billNumber ? { billNumber } : { consumerNumber },
      billDetails: {
        billNumber: billNumber || "EB-2023-04-56789",
        consumerNumber: consumerNumber || "EB-12345678",
        billStatus: "Paid",
        billDetails: {
          billingPeriod: "Mar 01, 2023 to Mar 31, 2023",
          unitsConsumed: "210 kWh",
          billAmount: "₹ 1,607.00",
          dueDate: "Apr 25, 2023"
        }
      }
    };
    
    res.json(data);
  } catch (error) {
    console.error('Error in getElectricityBillDetails:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch electricity bill details',
      error: error.message
    });
  }
};

const searchElectricityConnections = async (req, res) => {
  try {
    const { searchText, searchType } = req.query;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    const data = {
      success: true,
      source: "Electricity Board",
      searchCriteria: {
        searchText,
        searchType
      },
      totalResults: 2,
      connections: [
        {
          consumerNumber: "EB-12345678",
          consumerName: "Ramesh Sharma",
          connectionAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Residential",
          connectionStatus: "Active"
        },
        {
          consumerNumber: "EB-45678901",
          consumerName: "Patel Housing Society",
          connectionAddress: "16/B, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Residential",
          connectionStatus: "Active"
        }
      ]
    };
    
    res.json(data);
  } catch (error) {
    console.error('Error in searchElectricityConnections:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search electricity connections',
      error: error.message
    });
  }
};

const reportElectricityIssue = async (req, res) => {
  try {
    const complaintData = req.body;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 950));
    
    // Generate a complaint ID
    const complaintId = `EBCOMP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    
    const data = {
      success: true,
      source: "Electricity Board",
      message: "Complaint registered successfully",
      complaintDetails: {
        complaintId,
        registrationDateTime: new Date().toISOString(),
        consumerNumber: complaintData.consumerNumber || "EB-12345678",
        complaintType: complaintData.complaintType || "Power Outage",
        status: "Registered",
        expectedResolutionTime: "Within 4 hours"
      }
    };
    
    res.json(data);
  } catch (error) {
    console.error('Error in reportElectricityIssue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to report electricity issue',
      error: error.message
    });
  }
};

const getSolarNetMeteringDetails = async (req, res) => {
  try {
    const { consumerNumber } = req.params;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const data = {
      success: true,
      source: "Electricity Board",
      consumerNumber: consumerNumber || "EB-12345678",
      solarConnectionStatus: "Not Available",
      message: "No solar or net metering connection found for this consumer number."
    };
    
    res.json(data);
  } catch (error) {
    console.error('Error in getSolarNetMeteringDetails:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch solar net metering details',
      error: error.message
    });
  }
};

module.exports = {
  getElectricityConnectionDetails,
  getElectricityBillDetails,
  searchElectricityConnections,
  reportElectricityIssue,
  getSolarNetMeteringDetails
}; 