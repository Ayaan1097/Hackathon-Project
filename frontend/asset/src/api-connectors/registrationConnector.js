import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const REGISTRATION_API_BASE_URL = 'https://api.registration.gov.in/v1';

/**
 * Fetch property registration details by document/registration number
 * @param {string} registrationNumber - Property registration document number
 * @returns {Promise} - API response with registration details
 */
export const getPropertyRegistrationDetails = async (registrationNumber) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${REGISTRATION_API_BASE_URL}/registrations/${registrationNumber}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Return mock data
    return {
      success: true,
      source: "Registration Department",
      registration: {
        registrationNumber: registrationNumber || "MH-MUM-REG-2022-12345",
        documentType: "Sale Deed",
        documentDate: "2022-03-15",
        registrationDate: "2022-03-20",
        registrationOffice: "Joint Sub-Registrar Mumbai 5",
        propertyDetails: {
          propertyType: "Residential Apartment",
          propertyDescription: "Flat No. 701, 7th Floor, Sunshine Apartments",
          address: {
            line1: "Plot No. 456/78, Sunshine Apartments, Flat No. 701",
            line2: "Main Street, Malad West",
            city: "Mumbai",
            district: "Mumbai Suburban",
            state: "Maharashtra",
            pincode: "400064"
          },
          surveyNumber: "456/78",
          totalArea: "1200 sq ft",
          boundariesDescription: {
            east: "Open Space",
            west: "Internal Road",
            north: "Plot No. 456/77",
            south: "Plot No. 456/79"
          }
        },
        parties: {
          executant: {
            name: "Jayesh Patel",
            address: "123, Old Avenue, Andheri East, Mumbai - 400069",
            contactNumber: "+91-XXXXXXXXXX",
            panNumber: "XXXXX1234X",
            aadhaarNumber: "XXXX-XXXX-1234"
          },
          claimant: {
            name: "Rajiv Sharma",
            address: "456, New Lane, Borivali West, Mumbai - 400092",
            contactNumber: "+91-XXXXXXXXXX",
            panNumber: "XXXXX5678X",
            aadhaarNumber: "XXXX-XXXX-5678"
          },
          witnesses: [
            {
              name: "Amit Kumar",
              address: "789, Main Road, Goregaon East, Mumbai - 400063",
              contactNumber: "+91-XXXXXXXXXX"
            },
            {
              name: "Priya Desai",
              address: "101, Park Street, Kandivali West, Mumbai - 400067",
              contactNumber: "+91-XXXXXXXXXX"
            }
          ]
        },
        financialDetails: {
          marketValue: "₹ 1,25,00,000",
          considerationAmount: "₹ 1,20,00,000",
          stampDuty: {
            percentage: "6%",
            amount: "₹ 7,20,000",
            receiptNumber: "MHSD-2022-789012",
            paymentDate: "2022-03-18"
          },
          registrationFee: {
            amount: "₹ 30,000",
            receiptNumber: "MHRF-2022-345678",
            paymentDate: "2022-03-18"
          },
          totalPaid: "₹ 7,50,000"
        },
        legalDetails: {
          encumbrances: "No encumbrances reported",
          pendingLitigation: "No pending litigation reported",
          propertyRestrictions: "No restrictions found"
        },
        previousTransactions: [
          {
            registrationNumber: "MH-MUM-REG-2015-67890",
            transactionType: "Sale Deed",
            registrationDate: "2015-06-10",
            executant: "Sunrise Developers Pvt Ltd",
            claimant: "Jayesh Patel",
            considerationAmount: "₹ 75,00,000"
          }
        ],
        documentStatus: "Registered",
        verificationStatus: "Verified",
        digitalSignatures: [
          {
            name: "Joint Sub-Registrar",
            designation: "Sub-Registrar Grade I",
            signatureTimestamp: "2022-03-20T14:30:45+05:30"
          }
        ],
        documentHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        lastUpdated: "2022-03-20"
      }
    };
  } catch (error) {
    console.error('Error fetching Registration Department property registration details:', error);
    throw error;
  }
};

/**
 * Search property registrations by person name (as executant or claimant)
 * @param {string} personName - Name of the person to search for
 * @param {string} role - Role of the person ('executant', 'claimant', or 'any')
 * @returns {Promise} - API response with registration search results
 */
export const searchRegistrationsByPerson = async (personName, role = 'any') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Return mock data
    return {
      success: true,
      source: "Registration Department",
      searchCriteria: {
        personName,
        role
      },
      totalResults: 3,
      registrations: [
        {
          registrationNumber: "MH-MUM-REG-2022-12345",
          documentType: "Sale Deed",
          registrationDate: "2022-03-20",
          registrationOffice: "Joint Sub-Registrar Mumbai 5",
          propertyDescription: "Flat No. 701, 7th Floor, Sunshine Apartments, Malad West, Mumbai",
          role: role === 'any' || role === 'claimant' ? 'claimant' : 'executant',
          otherParty: role === 'executant' ? 'Jayesh Patel' : 'Rajiv Sharma',
          considerationAmount: "₹ 1,20,00,000"
        },
        {
          registrationNumber: "MH-MUM-REG-2020-23456",
          documentType: "Sale Deed",
          registrationDate: "2020-09-15",
          registrationOffice: "Joint Sub-Registrar Mumbai 7",
          propertyDescription: "Flat No. 505, 5th Floor, Golden Heights, Kandivali East, Mumbai",
          role: role === 'any' || role === 'claimant' ? 'claimant' : 'executant',
          otherParty: role === 'executant' ? 'Meena Patel' : 'Rajiv Sharma',
          considerationAmount: "₹ 85,00,000"
        },
        {
          registrationNumber: "MH-MUM-REG-2018-34567",
          documentType: "Gift Deed",
          registrationDate: "2018-05-22",
          registrationOffice: "Joint Sub-Registrar Mumbai 3",
          propertyDescription: "Agricultural Land, Survey No. 123/4, Village Manori, Mumbai",
          role: role === 'any' || role === 'executant' ? 'executant' : 'claimant',
          otherParty: role === 'claimant' ? 'Sunil Sharma' : 'Rajiv Sharma',
          considerationAmount: "Gift - No Consideration"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Registration Department registrations by person:', error);
    throw error;
  }
};

/**
 * Search property registrations by property address
 * @param {string} addressSearchText - Address text to search for
 * @returns {Promise} - API response with registration search results
 */
export const searchRegistrationsByAddress = async (addressSearchText) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 950));
    
    // Return mock data
    return {
      success: true,
      source: "Registration Department",
      searchCriteria: {
        addressSearchText
      },
      totalResults: 2,
      registrations: [
        {
          registrationNumber: "MH-MUM-REG-2022-12345",
          documentType: "Sale Deed",
          registrationDate: "2022-03-20",
          registrationOffice: "Joint Sub-Registrar Mumbai 5",
          propertyAddress: "Flat No. 701, 7th Floor, Sunshine Apartments, Plot No. 456/78, Main Street, Malad West, Mumbai - 400064",
          executant: "Jayesh Patel",
          claimant: "Rajiv Sharma",
          considerationAmount: "₹ 1,20,00,000"
        },
        {
          registrationNumber: "MH-MUM-REG-2015-67890",
          documentType: "Sale Deed",
          registrationDate: "2015-06-10",
          registrationOffice: "Joint Sub-Registrar Mumbai 5",
          propertyAddress: "Flat No. 701, 7th Floor, Sunshine Apartments, Plot No. 456/78, Main Street, Malad West, Mumbai - 400064",
          executant: "Sunrise Developers Pvt Ltd",
          claimant: "Jayesh Patel",
          considerationAmount: "₹ 75,00,000"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Registration Department registrations by address:', error);
    throw error;
  }
};

/**
 * Get property transaction history by property description/address
 * @param {string} propertyIdentifier - Property address or description
 * @returns {Promise} - API response with property transaction history
 */
export const getPropertyTransactionHistory = async (propertyIdentifier) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      success: true,
      source: "Registration Department",
      propertyDescription: "Flat No. 701, 7th Floor, Sunshine Apartments, Plot No. 456/78, Main Street, Malad West, Mumbai - 400064",
      totalTransactions: 3,
      transactions: [
        {
          registrationNumber: "MH-MUM-REG-2022-12345",
          documentType: "Sale Deed",
          registrationDate: "2022-03-20",
          registrationOffice: "Joint Sub-Registrar Mumbai 5",
          executant: "Jayesh Patel",
          claimant: "Rajiv Sharma",
          considerationAmount: "₹ 1,20,00,000",
          marketValue: "₹ 1,25,00,000",
          stampDuty: "₹ 7,20,000",
          registrationFee: "₹ 30,000"
        },
        {
          registrationNumber: "MH-MUM-REG-2015-67890",
          documentType: "Sale Deed",
          registrationDate: "2015-06-10",
          registrationOffice: "Joint Sub-Registrar Mumbai 5",
          executant: "Sunrise Developers Pvt Ltd",
          claimant: "Jayesh Patel",
          considerationAmount: "₹ 75,00,000",
          marketValue: "₹ 78,00,000",
          stampDuty: "₹ 4,50,000",
          registrationFee: "₹ 25,000"
        },
        {
          registrationNumber: "MH-MUM-REG-2010-78901",
          documentType: "Development Agreement",
          registrationDate: "2010-03-25",
          registrationOffice: "Joint Sub-Registrar Mumbai 5",
          executant: "Original Land Owner (Sharma Family)",
          claimant: "Sunrise Developers Pvt Ltd",
          considerationAmount: "₹ 2,00,00,000 + 4 Flats",
          marketValue: "₹ 2,50,00,000",
          stampDuty: "₹ 15,00,000",
          registrationFee: "₹ 50,000"
        }
      ],
      propertyValuationTrend: [
        {
          year: "2010",
          valuationAmount: "₹ 2,50,00,000",
          transactionType: "Development Agreement"
        },
        {
          year: "2015",
          valuationAmount: "₹ 78,00,000",
          transactionType: "Sale Deed (Individual Flat)"
        },
        {
          year: "2022",
          valuationAmount: "₹ 1,25,00,000",
          transactionType: "Sale Deed (Individual Flat)"
        }
      ],
      lastUpdated: "2022-03-20"
    };
  } catch (error) {
    console.error('Error fetching Registration Department property transaction history:', error);
    throw error;
  }
};

/**
 * Verify document authenticity by document hash/registration number
 * @param {string} verificationParam - Document hash or registration number
 * @param {string} verificationType - Type of verification ('documentHash' or 'registrationNumber')
 * @returns {Promise} - API response with verification result
 */
export const verifyDocumentAuthenticity = async (verificationParam, verificationType = 'registrationNumber') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Return mock data
    return {
      success: true,
      source: "Registration Department",
      verificationCriteria: {
        parameter: verificationParam,
        type: verificationType
      },
      verificationResult: {
        authentic: true,
        registrationNumber: verificationType === 'registrationNumber' ? verificationParam : "MH-MUM-REG-2022-12345",
        documentHash: verificationType === 'documentHash' ? verificationParam : "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        documentType: "Sale Deed",
        registrationDate: "2022-03-20",
        registrationOffice: "Joint Sub-Registrar Mumbai 5",
        propertyDescription: "Flat No. 701, 7th Floor, Sunshine Apartments, Malad West, Mumbai",
        executant: "Jayesh Patel",
        claimant: "Rajiv Sharma",
        digitalSignatureVerified: true,
        blockchainVerification: {
          verified: true,
          blockchainId: "MH-REG-BC-2022-12345",
          timestampRecorded: "2022-03-20T15:10:25+05:30"
        },
        remarksOnVerification: "Document authenticity verified successfully"
      },
      lastVerified: "2023-05-15T10:30:45+05:30"
    };
  } catch (error) {
    console.error('Error verifying Registration Department document authenticity:', error);
    throw error;
  }
}; 