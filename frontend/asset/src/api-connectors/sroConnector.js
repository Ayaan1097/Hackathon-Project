import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const SRO_API_BASE_URL = 'https://api.sro.gov.in/v1';

/**
 * Fetch property registration details by property ID or registration number
 * @param {string} propertyIdOrRegNumber - Property ID or Registration Number
 * @returns {Promise} - API response with property registration details
 */
export const getPropertyRegistrationDetails = async (propertyIdOrRegNumber) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${SRO_API_BASE_URL}/property/registration/${propertyIdOrRegNumber}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return {
      success: true,
      source: "SRO",
      registrationDetails: {
        registrationNumber: propertyIdOrRegNumber || "REG/MH/2018/12345",
        propertyId: "PROP-MH-2018-678901",
        registrationDate: "2018-04-12",
        propertyType: "Residential",
        propertyDescription: "3 BHK Apartment",
        propertyAddress: "Flat 703, Tower B, Sunshine Heights, Malad West, Mumbai, Maharashtra - 400064",
        surveyNumber: "Survey No. 456/78",
        area: "1500 sq ft",
        marketValue: "₹ 1,75,00,000",
        stampDutyPaid: "₹ 8,75,000",
        registrationFee: "₹ 30,000",
        parties: {
          sellers: [
            {
              name: "Rajesh Kumar",
              address: "123, Green Valley, Goregaon, Mumbai - 400063",
              identificationNumber: "AADHK1234A"
            }
          ],
          buyers: [
            {
              name: "Amit Shah",
              address: "456, Sea View Apartments, Bandra, Mumbai - 400050",
              identificationNumber: "BHTPS7890B"
            },
            {
              name: "Neha Shah",
              address: "456, Sea View Apartments, Bandra, Mumbai - 400050",
              identificationNumber: "AQTPN5678C"
            }
          ]
        },
        encumbrances: [],
        previousTransactions: [
          {
            registrationNumber: "REG/MH/2010/78901",
            transactionDate: "2010-09-15",
            transactionType: "Sale Deed",
            parties: {
              seller: "Mahesh Desai",
              buyer: "Rajesh Kumar"
            },
            consideration: "₹ 80,00,000"
          }
        ],
        registrarOffice: "Sub-Registrar Office, Malad, Mumbai",
        documentType: "Sale Deed",
        status: "Registered",
        remarks: "Clean title, no encumbrances found"
      }
    };
  } catch (error) {
    console.error('Error fetching SRO property registration details:', error);
    throw error;
  }
};

/**
 * Verify property ownership by property ID
 * @param {string} propertyId - Property ID
 * @returns {Promise} - API response with property ownership verification
 */
export const verifyPropertyOwnership = async (propertyId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 750));
    
    // Return mock data
    return {
      success: true,
      source: "SRO",
      ownershipVerification: {
        propertyId: propertyId || "PROP-MH-2018-678901",
        verificationDate: new Date().toISOString().split('T')[0],
        verificationStatus: "Verified",
        currentOwners: [
          {
            name: "Amit Shah",
            ownershipPercentage: "50%",
            ownerSince: "2018-04-12",
            identificationNumber: "BHTPS7890B"
          },
          {
            name: "Neha Shah",
            ownershipPercentage: "50%",
            ownerSince: "2018-04-12",
            identificationNumber: "AQTPN5678C"
          }
        ],
        propertyDetails: {
          propertyType: "Residential",
          propertyDescription: "3 BHK Apartment",
          propertyAddress: "Flat 703, Tower B, Sunshine Heights, Malad West, Mumbai, Maharashtra - 400064",
          area: "1500 sq ft"
        },
        lastTransactionDetails: {
          registrationNumber: "REG/MH/2018/12345",
          transactionDate: "2018-04-12",
          transactionType: "Sale Deed"
        },
        encumbranceStatus: "No active encumbrances",
        legalStatus: "Clear title",
        remarks: "Property ownership verified through SRO records"
      }
    };
  } catch (error) {
    console.error('Error verifying SRO property ownership:', error);
    throw error;
  }
};

/**
 * Search property transactions by owner name or identification number
 * @param {string} ownerNameOrId - Owner name or identification number
 * @returns {Promise} - API response with property transactions
 */
export const searchPropertyTransactionsByOwner = async (ownerNameOrId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 950));
    
    // Return mock data
    return {
      success: true,
      source: "SRO",
      searchCriteria: ownerNameOrId,
      totalResults: 3,
      transactions: [
        {
          registrationNumber: "REG/MH/2018/12345",
          transactionDate: "2018-04-12",
          transactionType: "Sale Deed",
          propertyId: "PROP-MH-2018-678901",
          propertyAddress: "Flat 703, Tower B, Sunshine Heights, Malad West, Mumbai, Maharashtra - 400064",
          propertyType: "Residential",
          consideration: "₹ 1,75,00,000",
          role: "Buyer"
        },
        {
          registrationNumber: "REG/KA/2020/56789",
          transactionDate: "2020-08-25",
          transactionType: "Sale Deed",
          propertyId: "PROP-KA-2020-123456",
          propertyAddress: "Villa 15, Green County, Electronic City, Bangalore, Karnataka - 560100",
          propertyType: "Residential",
          consideration: "₹ 2,25,00,000",
          role: "Buyer"
        },
        {
          registrationNumber: "REG/MH/2015/98765",
          transactionDate: "2015-11-03",
          transactionType: "Sale Deed",
          propertyId: "PROP-MH-2015-456789",
          propertyAddress: "Flat 502, Sunrise Towers, Andheri East, Mumbai, Maharashtra - 400069",
          propertyType: "Residential",
          consideration: "₹ 1,20,00,000",
          role: "Seller"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching SRO property transactions by owner:', error);
    throw error;
  }
};

/**
 * Get encumbrance certificate for a property
 * @param {string} propertyId - Property ID
 * @returns {Promise} - API response with encumbrance certificate details
 */
export const getEncumbranceCertificate = async (propertyId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Return mock data
    return {
      success: true,
      source: "SRO",
      encumbranceCertificate: {
        certificateNumber: "EC/MH/2023/56789",
        propertyId: propertyId || "PROP-MH-2018-678901",
        issueDate: new Date().toISOString().split('T')[0],
        validityPeriod: "6 months",
        periodCovered: "2018-04-12 to " + new Date().toISOString().split('T')[0],
        propertyDetails: {
          propertyType: "Residential",
          propertyDescription: "3 BHK Apartment",
          propertyAddress: "Flat 703, Tower B, Sunshine Heights, Malad West, Mumbai, Maharashtra - 400064",
          surveyNumber: "Survey No. 456/78",
          area: "1500 sq ft"
        },
        currentOwners: [
          {
            name: "Amit Shah",
            ownershipPercentage: "50%"
          },
          {
            name: "Neha Shah",
            ownershipPercentage: "50%"
          }
        ],
        transactions: [
          {
            registrationNumber: "REG/MH/2018/12345",
            transactionDate: "2018-04-12",
            transactionType: "Sale Deed",
            parties: {
              sellers: ["Rajesh Kumar"],
              buyers: ["Amit Shah", "Neha Shah"]
            },
            consideration: "₹ 1,75,00,000"
          }
        ],
        encumbrances: [],
        legalStatus: "Clear title, no encumbrances found",
        issuingAuthority: "Sub-Registrar Office, Malad, Mumbai",
        remarks: "This property has no registered encumbrances for the period mentioned"
      }
    };
  } catch (error) {
    console.error('Error fetching SRO encumbrance certificate:', error);
    throw error;
  }
}; 