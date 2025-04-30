import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const REVENUE_API_BASE_URL = 'https://api.revenue.gov.in/v1';

/**
 * Fetch land record details by survey number / plot number
 * @param {string} surveyNumber - Survey number or Plot number
 * @returns {Promise} - API response with land record details
 */
export const getLandRecordBySurveyNumber = async (surveyNumber) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${REVENUE_API_BASE_URL}/land-records/survey/${surveyNumber}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Return mock data
    return {
      success: true,
      source: "Revenue Department",
      landRecord: {
        recordId: "LR-MH-2023-123456",
        surveyNumber: surveyNumber || "456/78",
        khasraNumber: "789/12",
        district: "Mumbai Suburban",
        taluka: "Andheri",
        village: "Malad",
        plotArea: "15000 sq ft",
        measurement: {
          length: "100 ft",
          width: "150 ft",
          totalArea: "15000 sq ft"
        },
        classification: "Residential",
        zone: "R1",
        boundaries: {
          north: "Survey No. 456/77",
          east: "Main Road",
          south: "Survey No. 456/79",
          west: "Survey No. 457/78"
        },
        marketValue: "₹ 3,75,00,000",
        annualValue: "₹ 15,00,000",
        currentOwners: [
          {
            name: "Sunrise Developers Pvt Ltd",
            ownershipShare: "100%",
            ownershipType: "Freehold",
            ownerSince: "2010-11-25"
          }
        ],
        previousOwners: [
          {
            name: "Golden Lands Pvt Ltd",
            ownershipPeriod: "2005-03-10 to 2010-11-25"
          }
        ],
        mutation: {
          mutationNumber: "MUT/MH/2010/45678",
          mutationDate: "2010-11-25",
          mutationType: "Sale",
          parties: {
            transferor: "Golden Lands Pvt Ltd",
            transferee: "Sunrise Developers Pvt Ltd"
          }
        },
        encumbrances: [],
        landUsePermission: "Residential Group Housing",
        waterSources: ["Borewell"],
        taxDetails: {
          propertyTaxId: "PTX-MH-456789",
          annualTaxAmount: "₹ 75,000",
          taxPaidUpTo: "2023-03-31",
          arrears: "₹ 0"
        },
        remarks: "Land convereted from agricultural to residential use in 2005",
        lastUpdated: "2022-09-15",
        recordStatus: "Active"
      }
    };
  } catch (error) {
    console.error('Error fetching Revenue Department land record:', error);
    throw error;
  }
};

/**
 * Fetch 7/12 extract (land ownership document) by survey number
 * @param {string} surveyNumber - Survey number
 * @returns {Promise} - API response with 7/12 extract details
 */
export const get712Extract = async (surveyNumber) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 920));
    
    // Return mock data
    return {
      success: true,
      source: "Revenue Department",
      extract712: {
        recordId: "712-MH-2023-123456",
        surveyNumber: surveyNumber || "456/78",
        village: "Malad",
        taluka: "Andheri",
        district: "Mumbai Suburban",
        totalArea: "15000 sq ft",
        assessment: "₹ 75,000",
        landClassification: "Residential",
        cultivableArea: "0 sq ft",
        nonCultivableArea: "15000 sq ft",
        irrigationSource: "None",
        cropsGrown: [],
        owners: [
          {
            name: "Sunrise Developers Pvt Ltd",
            ownershipShare: "100%",
            ownershipType: "Freehold",
            rights: "Full ownership rights",
            address: "101, Business Park, Andheri East, Mumbai - 400069",
            otherDetails: "CIN: U70100MH2005PTC123456"
          }
        ],
        encumbrances: [],
        mutations: [
          {
            mutationNumber: "MUT/MH/2010/45678",
            mutationDate: "2010-11-25",
            mutationType: "Sale",
            details: "Transfer from Golden Lands Pvt Ltd to Sunrise Developers Pvt Ltd"
          }
        ],
        leases: [],
        governmentOrders: [],
        disputes: [],
        remarks: "Land approved for residential development",
        issueDate: new Date().toISOString().split('T')[0],
        validityPeriod: "6 months",
        issuingAuthority: "Talathi Office, Andheri"
      }
    };
  } catch (error) {
    console.error('Error fetching Revenue Department 7/12 extract:', error);
    throw error;
  }
};

/**
 * Search land records by owner name
 * @param {string} ownerName - Owner name
 * @returns {Promise} - API response with land records associated with the owner
 */
export const searchLandRecordsByOwner = async (ownerName) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 980));
    
    // Return mock data
    return {
      success: true,
      source: "Revenue Department",
      searchCriteria: ownerName,
      totalResults: 3,
      landRecords: [
        {
          recordId: "LR-MH-2023-123456",
          surveyNumber: "456/78",
          khasraNumber: "789/12",
          village: "Malad",
          taluka: "Andheri",
          district: "Mumbai Suburban",
          plotArea: "15000 sq ft",
          classification: "Residential",
          currentOwner: "Sunrise Developers Pvt Ltd",
          ownershipShare: "100%",
          ownershipType: "Freehold",
          ownerSince: "2010-11-25",
          marketValue: "₹ 3,75,00,000"
        },
        {
          recordId: "LR-MH-2022-789012",
          surveyNumber: "123/45",
          khasraNumber: "678/90",
          village: "Goregaon",
          taluka: "Borivali",
          district: "Mumbai Suburban",
          plotArea: "25000 sq ft",
          classification: "Commercial",
          currentOwner: "Sunrise Developers Pvt Ltd",
          ownershipShare: "100%",
          ownershipType: "Freehold",
          ownerSince: "2019-07-15",
          marketValue: "₹ 8,50,00,000"
        },
        {
          recordId: "LR-MH-2021-345678",
          surveyNumber: "789/12",
          khasraNumber: "345/67",
          village: "Kandivali",
          taluka: "Borivali",
          district: "Mumbai Suburban",
          plotArea: "10000 sq ft",
          classification: "Residential",
          currentOwner: "Sunrise Developers Pvt Ltd",
          ownershipShare: "75%",
          ownershipType: "Freehold",
          ownerSince: "2015-09-30",
          marketValue: "₹ 2,25,00,000"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Revenue Department land records by owner:', error);
    throw error;
  }
};

/**
 * Verify land mutation status by mutation number
 * @param {string} mutationNumber - Mutation number
 * @returns {Promise} - API response with mutation details
 */
export const verifyMutationStatus = async (mutationNumber) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 750));
    
    // Return mock data
    return {
      success: true,
      source: "Revenue Department",
      mutationDetails: {
        mutationNumber: mutationNumber || "MUT/MH/2010/45678",
        mutationDate: "2010-11-25",
        mutationType: "Sale",
        surveyNumber: "456/78",
        village: "Malad",
        taluka: "Andheri",
        district: "Mumbai Suburban",
        landArea: "15000 sq ft",
        parties: {
          transferor: {
            name: "Golden Lands Pvt Ltd",
            address: "202, Golden Tower, BKC, Mumbai - 400051",
            identificationNumber: "CIN: U70100MH2000PTC654321"
          },
          transferee: {
            name: "Sunrise Developers Pvt Ltd",
            address: "101, Business Park, Andheri East, Mumbai - 400069",
            identificationNumber: "CIN: U70100MH2005PTC123456"
          }
        },
        considerationAmount: "₹ 2,50,00,000",
        stampDutyPaid: "₹ 12,50,000",
        documentReference: {
          registrationNumber: "REG/MH/2010/78901",
          registrationDate: "2010-11-25",
          documentType: "Sale Deed"
        },
        status: "Completed",
        approvalDetails: {
          approvedBy: "Revenue Officer, Andheri",
          approvalDate: "2010-12-15",
          orderNumber: "RO/MH/2010/98765"
        },
        remarks: "Mutation completed and land records updated",
        lastUpdated: "2010-12-15"
      }
    };
  } catch (error) {
    console.error('Error verifying Revenue Department mutation status:', error);
    throw error;
  }
};

/**
 * Get land conversion details by survey number
 * @param {string} surveyNumber - Survey number
 * @returns {Promise} - API response with land conversion details
 */
export const getLandConversionDetails = async (surveyNumber) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1050));
    
    // Return mock data
    return {
      success: true,
      source: "Revenue Department",
      landConversion: {
        conversionId: "CONV-MH-2005-12345",
        surveyNumber: surveyNumber || "456/78",
        applicationNumber: "APPNA/CON/2005/76543",
        applicationDate: "2005-01-15",
        district: "Mumbai Suburban",
        taluka: "Andheri",
        village: "Malad",
        landArea: "15000 sq ft",
        originalClassification: "Agricultural",
        convertedClassification: "Residential",
        applicant: {
          name: "Golden Lands Pvt Ltd",
          address: "202, Golden Tower, BKC, Mumbai - 400051",
          contactDetails: "contact@goldenlands.com",
          identificationNumber: "CIN: U70100MH2000PTC654321"
        },
        approvalStatus: "Approved",
        approvalDetails: {
          approvedBy: "District Collector, Mumbai Suburban",
          approvalDate: "2005-03-10",
          orderNumber: "DC/CONV/2005/123"
        },
        conversionFee: "₹ 15,00,000",
        paymentDetails: {
          receiptNumber: "RCT/2005/98765",
          paymentDate: "2005-02-20",
          paymentMode: "Demand Draft"
        },
        conditions: [
          "Development must comply with local zoning regulations",
          "15% of land area to be reserved for public utilities",
          "Development to be completed within 5 years"
        ],
        documents: [
          "NA Permission",
          "Building Plan Approval",
          "Environmental Clearance"
        ],
        remarks: "Conversion approved for residential group housing development",
        lastUpdated: "2005-03-10"
      }
    };
  } catch (error) {
    console.error('Error fetching Revenue Department land conversion details:', error);
    throw error;
  }
}; 