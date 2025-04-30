import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const DLR_API_BASE_URL = 'https://api.dlr.gov.in/v1';

/**
 * Fetch land record details by khasra/survey number
 * @param {string} surveyNumber - Khasra/Survey number
 * @param {string} village - Village name
 * @param {string} tehsil - Tehsil name
 * @returns {Promise} - API response with land record details
 */
export const getLandRecordBySurveyNumber = async (surveyNumber, village, tehsil) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${DLR_API_BASE_URL}/land-record`, {
    //   params: { surveyNumber, village, tehsil }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      success: true,
      source: "DLR",
      landRecordDetails: {
        surveyNumber: surveyNumber,
        khasraNumber: `KN-${surveyNumber}`,
        landType: "Agricultural",
        area: "5 acres",
        location: {
          village: village || "Baner",
          tehsil: tehsil || "Pune",
          district: "Pune",
          state: "Maharashtra"
        },
        ownerDetails: {
          name: "Kisan Agricultural Co-op",
          fatherName: "Not Applicable",
          identityType: "PAN",
          identityNumber: "AABCK1234A",
          ownershipPercentage: "100%",
          ownershipSince: "2010-05-18"
        },
        landClassification: {
          irrigationType: "Canal",
          soilType: "Black soil",
          cultivationType: "Multi-crop"
        },
        mutationHistory: [
          {
            mutationNumber: "MUT-2010-12345",
            date: "2010-05-18",
            previousOwner: "Ramesh Patil",
            newOwner: "Kisan Agricultural Co-op",
            reason: "Sale"
          },
          {
            mutationNumber: "MUT-2005-67890",
            date: "2005-11-30",
            previousOwner: "Suresh Jadhav",
            newOwner: "Ramesh Patil",
            reason: "Inheritance"
          }
        ],
        encumbrances: [
          {
            type: "Bank Loan",
            lender: "State Bank of India",
            documentNumber: "LOAN-2015-6789",
            amount: "₹ 30,00,000",
            startDate: "2015-08-10",
            status: "Active"
          }
        ],
        mapURL: "https://example.com/maps/land-record-123.png"
      }
    };
  } catch (error) {
    console.error('Error fetching DLR land record:', error);
    throw error;
  }
};

/**
 * Search land records by owner name
 * @param {string} ownerName - Name of the land owner
 * @returns {Promise} - API response with land records
 */
export const searchLandRecordsByOwner = async (ownerName) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Return mock data
    return {
      success: true,
      source: "DLR",
      totalResults: 2,
      landRecords: [
        {
          surveyNumber: "SN-78/90",
          khasraNumber: "KN-123/456",
          landType: "Agricultural",
          area: "5 acres",
          location: {
            village: "Baner",
            tehsil: "Pune",
            district: "Pune",
            state: "Maharashtra"
          },
          ownerName: "Kisan Agricultural Co-op",
          ownershipSince: "2010-05-18",
          hasEncumbrances: true
        },
        {
          surveyNumber: "SN-45/67",
          khasraNumber: "KN-456/789",
          landType: "Horticultural",
          area: "7 acres",
          location: {
            village: "Manchar",
            tehsil: "Ambegaon",
            district: "Pune",
            state: "Maharashtra"
          },
          ownerName: "Kisan Agricultural Co-op",
          ownershipSince: "2012-03-22",
          hasEncumbrances: false
        }
      ]
    };
  } catch (error) {
    console.error('Error searching DLR land records by owner:', error);
    throw error;
  }
};

/**
 * Search land records by village/tehsil
 * @param {string} village - Village name
 * @param {string} tehsil - Tehsil name
 * @returns {Promise} - API response with land records
 */
export const searchLandRecordsByLocation = async (village, tehsil) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Return mock data
    return {
      success: true,
      source: "DLR",
      totalResults: 3,
      landRecords: [
        {
          surveyNumber: "SN-78/90",
          khasraNumber: "KN-123/456",
          landType: "Agricultural",
          area: "5 acres",
          location: {
            village: village || "Baner",
            tehsil: tehsil || "Pune",
            district: "Pune",
            state: "Maharashtra"
          },
          ownerName: "Kisan Agricultural Co-op",
          ownershipSince: "2010-05-18",
          hasEncumbrances: true
        },
        {
          surveyNumber: "SN-91/23",
          khasraNumber: "KN-789/012",
          landType: "Mixed Use",
          area: "2 acres",
          location: {
            village: village || "Baner",
            tehsil: tehsil || "Pune",
            district: "Pune",
            state: "Maharashtra"
          },
          ownerName: "Ramesh Patil",
          ownershipSince: "2015-09-12",
          hasEncumbrances: false
        },
        {
          surveyNumber: "SN-34/56",
          khasraNumber: "KN-345/678",
          landType: "Residential",
          area: "1.5 acres",
          location: {
            village: village || "Baner",
            tehsil: tehsil || "Pune",
            district: "Pune",
            state: "Maharashtra"
          },
          ownerName: "Paras Housing Society",
          ownershipSince: "2008-11-03",
          hasEncumbrances: false
        }
      ]
    };
  } catch (error) {
    console.error('Error searching DLR land records by location:', error);
    throw error;
  }
}; 