import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const CERSAI_API_BASE_URL = 'https://api.cersai.org.in/v1';

/**
 * Fetch encumbrance details by property ID
 * @param {string} propertyId - Property ID (can be registration number or survey number)
 * @returns {Promise} - API response with encumbrance details
 */
export const getEncumbranceByPropertyId = async (propertyId) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${CERSAI_API_BASE_URL}/encumbrance/${propertyId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Return mock data
    return {
      success: true,
      source: "CERSAI",
      encumbranceDetails: {
        propertyId: propertyId,
        propertyType: propertyId.startsWith('URB') ? 'Urban' : 'Rural',
        totalEncumbrances: 1,
        encumbrances: [
          {
            encumbranceId: "CERSAI-2015-123456",
            type: "Mortgage",
            lenderDetails: {
              name: propertyId.startsWith('URB') ? "HDFC Bank" : "State Bank of India",
              branchCode: propertyId.startsWith('URB') ? "HDFC0001234" : "SBIN0005678",
              branchAddress: propertyId.startsWith('URB') ? 
                "HDFC Bank, 123 Financial Street, Mumbai" : 
                "SBI, 456 Banking Road, Pune"
            },
            borrowerDetails: {
              name: propertyId.startsWith('URB') ? "Rajesh Kumar" : "Kisan Agricultural Co-op",
              identityType: propertyId.startsWith('URB') ? "Aadhar" : "PAN",
              identityNumber: propertyId.startsWith('URB') ? "XXXX-XXXX-1234" : "AABCK1234A"
            },
            loanDetails: {
              loanNumber: propertyId.startsWith('URB') ? "HDFC/HOME/2015/78901" : "SBI/AGRI/2015/12345",
              loanAmount: propertyId.startsWith('URB') ? "₹ 80,00,000" : "₹ 30,00,000",
              loanDate: "2015-08-10",
              loanPurpose: propertyId.startsWith('URB') ? "Home Loan" : "Agricultural Loan",
              interestRate: propertyId.startsWith('URB') ? "8.5%" : "7.5%",
              loanTenure: propertyId.startsWith('URB') ? "20 years" : "10 years"
            },
            securityDetails: {
              securityType: "Mortgage",
              securityDescription: propertyId.startsWith('URB') ? 
                "Apartment at 123 Main Street, Mumbai" : 
                "Agricultural Land in Baner, Pune",
              registrationNumber: propertyId.startsWith('URB') ? 
                "REG-MH-2020-12345" : 
                "KN-123/456",
              securityValue: propertyId.startsWith('URB') ? "₹ 1,50,00,000" : "₹ 50,00,000"
            },
            status: "Active",
            registrationDate: "2015-08-15",
            lastUpdated: "2023-01-10"
          }
        ],
        remarks: "Property has an active mortgage"
      }
    };
  } catch (error) {
    console.error('Error fetching CERSAI encumbrance details:', error);
    throw error;
  }
};

/**
 * Search encumbrances by borrower name
 * @param {string} borrowerName - Name of the borrower
 * @returns {Promise} - API response with encumbrance details
 */
export const searchEncumbrancesByBorrower = async (borrowerName) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 950));
    
    // Return mock data
    return {
      success: true,
      source: "CERSAI",
      totalResults: 2,
      encumbrances: [
        {
          encumbranceId: "CERSAI-2015-123456",
          borrowerName: borrowerName || "Rajesh Kumar",
          propertyType: "Urban",
          propertyDescription: "Apartment at 123 Main Street, Mumbai",
          lenderName: "HDFC Bank",
          loanAmount: "₹ 80,00,000",
          loanDate: "2015-08-10",
          status: "Active"
        },
        {
          encumbranceId: "CERSAI-2018-654321",
          borrowerName: borrowerName || "Rajesh Kumar",
          propertyType: "Commercial",
          propertyDescription: "Office Space at 456 Business Park, Pune",
          lenderName: "ICICI Bank",
          loanAmount: "₹ 1,20,00,000",
          loanDate: "2018-05-22",
          status: "Active"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching CERSAI encumbrances by borrower:', error);
    throw error;
  }
};

/**
 * Check if a property has any encumbrances
 * @param {string} propertyId - Property ID (can be registration number or survey number)
 * @returns {Promise} - API response with encumbrance status
 */
export const checkPropertyEncumbrance = async (propertyId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Mock data - For demo purpose we'll return encumbrance for specific IDs
    const hasEncumbrance = [
      'URB12345', 'RUR98765', 'REG-MH-2020-12345', 'KN-123/456', 'SN-78/90'
    ].includes(propertyId);
    
    return {
      success: true,
      source: "CERSAI",
      propertyId: propertyId,
      hasEncumbrance: hasEncumbrance,
      encumbranceCount: hasEncumbrance ? 1 : 0,
      message: hasEncumbrance ? 
        "Property has active encumbrances. Use getEncumbranceByPropertyId for details." : 
        "No encumbrances found for this property."
    };
  } catch (error) {
    console.error('Error checking CERSAI property encumbrance:', error);
    throw error;
  }
}; 