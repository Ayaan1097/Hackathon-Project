import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const MCA21_API_BASE_URL = 'https://api.mca21.gov.in/v1';

/**
 * Fetch company details by CIN (Corporate Identity Number)
 * @param {string} cin - Corporate Identity Number
 * @returns {Promise} - API response with company details
 */
export const getCompanyByCIN = async (cin) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${MCA21_API_BASE_URL}/company/${cin}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Return mock data
    return {
      success: true,
      source: "MCA21",
      companyDetails: {
        cin: cin || "U72200MH2000PTC123456",
        companyName: "Techno Solutions Private Limited",
        registrationNumber: "123456",
        registeredAddress: "123, Corporate Park, Andheri East, Mumbai, Maharashtra - 400093",
        dateOfIncorporation: "2000-06-15",
        authorizedCapital: "₹ 10,00,00,000",
        paidUpCapital: "₹ 5,00,00,000",
        companyStatus: "Active",
        companyCategory: "Private",
        companySubCategory: "Limited by Shares",
        registrarOfCompanies: "ROC-Mumbai",
        principalBusinessActivity: "Information Technology Services",
        directors: [
          {
            name: "Aarav Mehta",
            din: "00123456",
            designation: "Managing Director",
            dateOfAppointment: "2000-06-15"
          },
          {
            name: "Priya Sharma",
            din: "00789012",
            designation: "Director",
            dateOfAppointment: "2005-08-22"
          },
          {
            name: "Vikram Singh",
            din: "00345678",
            designation: "Director",
            dateOfAppointment: "2010-03-14"
          }
        ],
        shareholdingPattern: {
          promoters: "65%",
          publicInstitutions: "20%",
          foreignInvestors: "10%",
          others: "5%"
        }
      }
    };
  } catch (error) {
    console.error('Error fetching MCA21 company details:', error);
    throw error;
  }
};

/**
 * Fetch company properties by CIN (Corporate Identity Number)
 * @param {string} cin - Corporate Identity Number
 * @returns {Promise} - API response with company property details
 */
export const getCompanyProperties = async (cin) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      success: true,
      source: "MCA21",
      cin: cin || "U72200MH2000PTC123456",
      companyName: "Techno Solutions Private Limited",
      totalProperties: 3,
      properties: [
        {
          propertyId: "PROP-MH-2005-001",
          propertyType: "Commercial",
          description: "Corporate Office",
          address: "123, Corporate Park, Andheri East, Mumbai, Maharashtra - 400093",
          area: "15,000 sq ft",
          acquisitionDate: "2005-03-10",
          acquisitionValue: "₹ 12,50,00,000",
          currentMarketValue: "₹ 25,00,00,000",
          registrationNumber: "REG-MH-2005-45678",
          status: "Owned",
          encumbrance: "None"
        },
        {
          propertyId: "PROP-MH-2010-002",
          propertyType: "Commercial",
          description: "Development Center",
          address: "456, Tech Park, Pune, Maharashtra - 411057",
          area: "20,000 sq ft",
          acquisitionDate: "2010-08-15",
          acquisitionValue: "₹ 15,00,00,000",
          currentMarketValue: "₹ 32,00,00,000",
          registrationNumber: "REG-MH-2010-78901",
          status: "Owned",
          encumbrance: "Mortgage with HDFC Bank"
        },
        {
          propertyId: "PROP-KA-2018-003",
          propertyType: "Commercial",
          description: "Research Center",
          address: "789, Innovation Hub, Electronic City, Bangalore, Karnataka - 560100",
          area: "25,000 sq ft",
          acquisitionDate: "2018-05-20",
          acquisitionValue: "₹ 22,00,00,000",
          currentMarketValue: "₹ 35,00,00,000",
          registrationNumber: "REG-KA-2018-12345",
          status: "Owned",
          encumbrance: "None"
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching MCA21 company properties:', error);
    throw error;
  }
};

/**
 * Search companies by director name or DIN (Director Identification Number)
 * @param {string} directorNameOrDIN - Director name or DIN
 * @returns {Promise} - API response with companies linked to the director
 */
export const searchCompaniesByDirector = async (directorNameOrDIN) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Return mock data
    return {
      success: true,
      source: "MCA21",
      searchCriteria: directorNameOrDIN,
      totalResults: 3,
      companies: [
        {
          cin: "U72200MH2000PTC123456",
          companyName: "Techno Solutions Private Limited",
          registeredAddress: "123, Corporate Park, Andheri East, Mumbai, Maharashtra - 400093",
          companyStatus: "Active",
          directorRole: "Managing Director",
          appointmentDate: "2000-06-15"
        },
        {
          cin: "L17110MH1973PLC123789",
          companyName: "Global Textiles Limited",
          registeredAddress: "456, Industrial Area, Lower Parel, Mumbai, Maharashtra - 400013",
          companyStatus: "Active",
          directorRole: "Director",
          appointmentDate: "2008-09-12"
        },
        {
          cin: "U45200KA2015PTC345678",
          companyName: "Skyline Constructions Private Limited",
          registeredAddress: "789, Builder's Hub, Whitefield, Bangalore, Karnataka - 560066",
          companyStatus: "Active",
          directorRole: "Director",
          appointmentDate: "2015-11-05"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching MCA21 companies by director:', error);
    throw error;
  }
}; 