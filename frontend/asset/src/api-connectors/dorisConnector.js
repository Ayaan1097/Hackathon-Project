import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const DORIS_API_BASE_URL = 'https://api.doris.gov.in/v1';

/**
 * Fetch property details from DORIS by registration number
 * @param {string} registrationNumber - Property registration number
 * @returns {Promise} - API response with property details
 */
export const getPropertyByRegistrationNumber = async (registrationNumber) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${DORIS_API_BASE_URL}/property/${registrationNumber}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return {
      success: true,
      source: "DORIS",
      propertyDetails: {
        registrationNumber: registrationNumber,
        registrationDate: "2021-03-15",
        propertyType: "Residential",
        address: {
          street: "123 Main Street",
          city: "Mumbai",
          district: "Mumbai City",
          state: "Maharashtra",
          pincode: "400001"
        },
        ownerDetails: {
          name: "Rajesh Kumar",
          identityType: "Aadhar",
          identityNumber: "XXXX-XXXX-1234",
          contactDetails: {
            phone: "9876543210",
            email: "rajesh.kumar@example.com"
          }
        },
        propertyValue: {
          marketValue: "₹ 1,50,00,000",
          stampDuty: "₹ 9,00,000",
          registrationFee: "₹ 30,000"
        },
        documentDetails: {
          documentType: "Sale Deed",
          documentNumber: "SD-2021-78901",
          executionDate: "2021-03-10",
          scanUrl: "https://example.com/documents/SD-2021-78901.pdf"
        },
        previousOwners: [
          {
            name: "Suresh Patel",
            transferDate: "2015-05-22",
            documentNumber: "SD-2015-45678"
          }
        ],
        encumbrances: [] // No encumbrances found in DORIS
      }
    };
  } catch (error) {
    console.error('Error fetching DORIS property details:', error);
    throw error;
  }
};

/**
 * Search properties in DORIS by owner name
 * @param {string} ownerName - Name of the property owner
 * @returns {Promise} - API response with property details
 */
export const searchPropertiesByOwnerName = async (ownerName) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      success: true,
      source: "DORIS",
      totalResults: 2,
      properties: [
        {
          registrationNumber: "REG-MH-2021-78901",
          registrationDate: "2021-03-15",
          propertyType: "Residential",
          address: {
            street: "123 Main Street",
            city: "Mumbai",
            district: "Mumbai City",
            state: "Maharashtra",
            pincode: "400001"
          },
          ownerName: "Rajesh Kumar",
          documentType: "Sale Deed",
          propertyValue: "₹ 1,50,00,000"
        },
        {
          registrationNumber: "REG-MH-2018-12345",
          registrationDate: "2018-11-05",
          propertyType: "Commercial",
          address: {
            street: "456 Business Park",
            city: "Pune",
            district: "Pune",
            state: "Maharashtra",
            pincode: "411001"
          },
          ownerName: "Rajesh Kumar",
          documentType: "Sale Deed",
          propertyValue: "₹ 2,25,00,000"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching DORIS properties by owner:', error);
    throw error;
  }
};

/**
 * Search properties in DORIS by address
 * @param {Object} addressParams - Address parameters for search
 * @returns {Promise} - API response with property details
 */
export const searchPropertiesByAddress = async (addressParams) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Return mock data
    return {
      success: true,
      source: "DORIS",
      totalResults: 1,
      properties: [
        {
          registrationNumber: "REG-MH-2021-78901",
          registrationDate: "2021-03-15",
          propertyType: "Residential",
          address: {
            street: addressParams.street || "123 Main Street",
            city: addressParams.city || "Mumbai",
            district: addressParams.district || "Mumbai City",
            state: addressParams.state || "Maharashtra",
            pincode: addressParams.pincode || "400001"
          },
          ownerName: "Rajesh Kumar",
          documentType: "Sale Deed",
          propertyValue: "₹ 1,50,00,000"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching DORIS properties by address:', error);
    throw error;
  }
}; 