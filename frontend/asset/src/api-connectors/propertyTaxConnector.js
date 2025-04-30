import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const PROPERTY_TAX_API_BASE_URL = 'https://api.propertytax.gov.in/v1';

/**
 * Fetch property tax details by property ID
 * @param {string} propertyId - Property tax unique ID
 * @returns {Promise} - API response with property tax details
 */
export const getPropertyTaxDetails = async (propertyId) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${PROPERTY_TAX_API_BASE_URL}/properties/${propertyId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 750));
    
    // Return mock data
    return {
      success: true,
      source: "Property Tax Department",
      propertyDetails: {
        propertyId: propertyId || "PTX-12345678",
        propertyUniqueId: "PTUID-876543",
        assessmentNumber: "PT-ASM-2010-45678",
        propertyAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
        propertyType: "Residential",
        propertySubType: "Apartment",
        zoneDetails: {
          zoneName: "Zone C",
          wardNumber: "15",
          area: "Borivali West"
        },
        constructionDetails: {
          constructionType: "RCC Building",
          constructionYear: "2005",
          buildUpArea: "1200 sq.ft.",
          carpetArea: "1050 sq.ft.",
          floors: "5",
          totalUnits: "20",
          propertyAge: "18 years"
        },
        ownerDetails: {
          primaryOwner: "Ramesh Sharma",
          ownershipPercentage: "100%",
          ownershipType: "Individual",
          contactInformation: {
            mobileNumber: "+91-9876543210",
            emailId: "ramesh.sharma@email.com",
            alternateContactNumber: "+91-9876123450"
          },
          identityDetails: {
            aadharNumber: "XXXX-XXXX-7890",
            panNumber: "ABCPS1234D"
          }
        },
        propertyUsage: {
          usageType: "Self-Occupied",
          occupancyStatus: "Occupied",
          rentalStatus: "Not Applicable"
        },
        taxationDetails: {
          annualRatableValue: "₹ 90,000",
          applicableTaxRate: "12%",
          standardDeduction: "10%",
          applicableRebates: [
            {
              rebateType: "Early Payment Rebate",
              rebatePercentage: "4%",
              applicableUntil: "June 30, 2023"
            },
            {
              rebateType: "Online Payment Rebate",
              rebatePercentage: "1%",
              applicableUntil: "March 31, 2024"
            }
          ],
          exemptions: [],
          assessmentYear: "2023-2024"
        },
        currentTaxDetails: {
          taxYear: "2023-2024",
          totalTaxPayable: "₹ 9,720",
          taxComponents: {
            generalTax: "₹ 8,100",
            waterTax: "₹ 900",
            sewerageTax: "₹ 450",
            educationCess: "₹ 270"
          },
          penaltyAmount: "₹ 0",
          arrears: "₹ 0",
          totalAmountDue: "₹ 9,720",
          paymentStatus: "Pending",
          dueDate: "June 30, 2023",
          lastPaidDate: "",
          receiptNumber: ""
        },
        taxHistory: [
          {
            taxYear: "2022-2023",
            taxAmount: "₹ 9,180",
            paymentStatus: "Paid",
            paymentDate: "May 20, 2022",
            paymentMode: "Online Banking",
            transactionId: "PTX-TRN-2022-56789",
            receiptNumber: "PTXR-2022-76543"
          },
          {
            taxYear: "2021-2022",
            taxAmount: "₹ 8,820",
            paymentStatus: "Paid",
            paymentDate: "June 15, 2021",
            paymentMode: "Credit Card",
            transactionId: "PTX-TRN-2021-45678",
            receiptNumber: "PTXR-2021-65432"
          },
          {
            taxYear: "2020-2021",
            taxAmount: "₹ 8,400",
            paymentStatus: "Paid",
            paymentDate: "April 25, 2020",
            paymentMode: "Online Banking",
            transactionId: "PTX-TRN-2020-34567",
            receiptNumber: "PTXR-2020-54321"
          }
        ],
        propertyHistory: [
          {
            eventType: "Assessment Revision",
            eventDate: "April 01, 2023",
            details: "Annual assessment revision as per Municipal guidelines",
            previousValue: "₹ 85,000",
            revisedValue: "₹ 90,000",
            approvedBy: "Municipal Assessor"
          },
          {
            eventType: "Ownership Update",
            eventDate: "May 15, 2020",
            details: "Updated email contact information",
            previousValue: "ramesh.s@oldmail.com",
            revisedValue: "ramesh.sharma@email.com",
            approvedBy: "Tax Department Administrator"
          },
          {
            eventType: "Initial Assessment",
            eventDate: "June 10, 2010",
            details: "First-time property assessment",
            previousValue: "N/A",
            revisedValue: "₹ 60,000",
            approvedBy: "Municipal Assessor"
          }
        ],
        documents: [
          {
            documentType: "Property Registration Deed",
            documentNumber: "REG-2010-12345",
            issueDate: "March 15, 2010",
            issuingAuthority: "Sub-Registrar Office, Borivali"
          },
          {
            documentType: "Tax Assessment Notice",
            documentNumber: "TAN-2023-54321",
            issueDate: "April 10, 2023",
            issuingAuthority: "Mumbai Municipal Corporation - Property Tax Department"
          },
          {
            documentType: "Building Completion Certificate",
            documentNumber: "BCC-2005-9876",
            issueDate: "December 20, 2005",
            issuingAuthority: "Mumbai Municipal Corporation - Building Department"
          }
        ],
        lastUpdated: "April 10, 2023"
      }
    };
  } catch (error) {
    console.error('Error fetching Property Tax details:', error);
    throw error;
  }
};

/**
 * Get property tax payment history
 * @param {string} propertyId - Property tax unique ID
 * @param {number} years - Number of years of history to retrieve (default: 5)
 * @returns {Promise} - API response with property tax payment history
 */
export const getPropertyTaxPaymentHistory = async (propertyId, years = 5) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Generate tax history entries based on the number of years requested
    const currentYear = new Date().getFullYear();
    const paymentHistory = [];
    
    for (let i = 0; i < years; i++) {
      const year = currentYear - i;
      const previousYear = year - 1;
      const taxYear = `${previousYear}-${year}`;
      
      // Generate dynamic tax amount that increases over time
      const baseAmount = 8000 + (i * 300);
      const taxAmount = `₹ ${baseAmount.toLocaleString('en-IN')}`;
      
      // Generate realistic payment dates
      const monthOptions = ["April", "May", "June"];
      const paymentMonth = monthOptions[Math.floor(Math.random() * monthOptions.length)];
      const paymentDay = Math.floor(5 + Math.random() * 25);
      
      // Generate payment modes
      const paymentModes = ["Online Banking", "Credit Card", "Mobile App", "Cash at Counter"];
      const paymentMode = paymentModes[Math.floor(Math.random() * paymentModes.length)];
      
      // Generate transaction and receipt numbers
      const transactionId = `PTX-TRN-${previousYear}-${Math.floor(10000 + Math.random() * 90000)}`;
      const receiptNumber = `PTXR-${previousYear}-${Math.floor(10000 + Math.random() * 90000)}`;
      
      paymentHistory.push({
        taxYear,
        assessmentNumber: "PT-ASM-2010-45678",
        propertyId: propertyId || "PTX-12345678",
        taxAmount,
        paymentStatus: "Paid",
        paymentDate: `${paymentMonth} ${paymentDay}, ${previousYear}`,
        paymentMode,
        transactionId,
        receiptNumber,
        paymentDetails: {
          paidBy: "Ramesh Sharma",
          paymentLocation: paymentMode === "Cash at Counter" ? "Property Tax Office, Ward 15" : "N/A",
          paymentBank: paymentMode === "Online Banking" ? "HDFC Bank" : 
                      paymentMode === "Credit Card" ? "ICICI Bank" : "N/A",
          processingFees: "₹ 0.00"
        },
        taxBreakup: {
          generalTax: `₹ ${Math.floor(baseAmount * 0.85).toLocaleString('en-IN')}`,
          waterTax: `₹ ${Math.floor(baseAmount * 0.09).toLocaleString('en-IN')}`,
          sewerageTax: `₹ ${Math.floor(baseAmount * 0.04).toLocaleString('en-IN')}`,
          educationCess: `₹ ${Math.floor(baseAmount * 0.02).toLocaleString('en-IN')}`
        },
        discountsApplied: {
          earlyPaymentDiscount: paymentMonth === "April" ? `₹ ${Math.floor(baseAmount * 0.04).toLocaleString('en-IN')}` : "₹ 0.00",
          onlinePaymentDiscount: paymentMode !== "Cash at Counter" ? `₹ ${Math.floor(baseAmount * 0.01).toLocaleString('en-IN')}` : "₹ 0.00"
        },
        receiptUrl: `https://propertytax.gov.in/receipts/${receiptNumber}`,
        paymentVerificationCode: `${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      });
    }
    
    // Return mock data
    return {
      success: true,
      source: "Property Tax Department",
      searchCriteria: {
        propertyId: propertyId || "PTX-12345678",
        years
      },
      propertyAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
      ownerName: "Ramesh Sharma",
      totalRecords: years,
      paymentHistory
    };
  } catch (error) {
    console.error('Error fetching Property Tax payment history:', error);
    throw error;
  }
};

/**
 * Calculate property tax estimate based on property details
 * @param {Object} propertyDetails - Property details for tax calculation
 * @returns {Promise} - API response with property tax estimate
 */
export const calculatePropertyTaxEstimate = async (propertyDetails) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Extract property details or use defaults
    const {
      propertyType = "Residential",
      areaInSqFt = 1200,
      constructionYear = 2005,
      zoneName = "Zone C",
      usageType = "Self-Occupied"
    } = propertyDetails;
    
    // Simple tax calculation logic (mocked)
    const baseRate = propertyType === "Residential" ? 15 : 
                     propertyType === "Commercial" ? 25 : 
                     propertyType === "Industrial" ? 20 : 10;
    
    const zoneMultiplier = zoneName === "Zone A" ? 1.5 :
                          zoneName === "Zone B" ? 1.2 :
                          zoneName === "Zone C" ? 1 : 0.8;
    
    const ageOfProperty = new Date().getFullYear() - constructionYear;
    const depreciationFactor = Math.max(0.7, 1 - (ageOfProperty * 0.01));
    
    const usageMultiplier = usageType === "Self-Occupied" ? 1 :
                           usageType === "Rented" ? 1.5 : 1.2;
    
    // Calculate Annual Rateable Value (ARV)
    const arvPerSqFt = baseRate * zoneMultiplier * depreciationFactor * usageMultiplier;
    const annualRateableValue = Math.round(arvPerSqFt * areaInSqFt);
    
    // Calculate tax components
    const generalTax = Math.round(annualRateableValue * 0.1);
    const waterTax = Math.round(annualRateableValue * 0.01);
    const sewerageTax = Math.round(annualRateableValue * 0.005);
    const educationCess = Math.round(annualRateableValue * 0.003);
    
    // Calculate total tax
    const totalTax = generalTax + waterTax + sewerageTax + educationCess;
    
    // Return mock data
    return {
      success: true,
      source: "Property Tax Department",
      estimatedTaxDetails: {
        calculationDate: new Date().toISOString(),
        taxYear: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`,
        estimateValidity: "30 days",
        estimateDisclaimer: "This is an estimate only. The final tax amount may vary based on official assessment by the municipal authority.",
        propertyDetails: {
          propertyType,
          areaInSqFt,
          constructionYear,
          ageOfProperty,
          zoneName,
          usageType,
          calculationParameters: {
            baseRate: `₹ ${baseRate} per sq.ft.`,
            zoneMultiplier,
            depreciationFactor: depreciationFactor.toFixed(2),
            usageMultiplier: usageMultiplier.toFixed(2),
            arvPerSqFt: `₹ ${arvPerSqFt.toFixed(2)} per sq.ft.`
          }
        },
        assessmentDetails: {
          annualRateableValue: `₹ ${annualRateableValue.toLocaleString('en-IN')}`,
          taxRates: {
            generalTaxRate: "10%",
            waterTaxRate: "1%",
            sewerageTaxRate: "0.5%",
            educationCessRate: "0.3%"
          }
        },
        taxComponents: {
          generalTax: `₹ ${generalTax.toLocaleString('en-IN')}`,
          waterTax: `₹ ${waterTax.toLocaleString('en-IN')}`,
          sewerageTax: `₹ ${sewerageTax.toLocaleString('en-IN')}`,
          educationCess: `₹ ${educationCess.toLocaleString('en-IN')}`
        },
        taxSummary: {
          totalTaxPayable: `₹ ${totalTax.toLocaleString('en-IN')}`,
          availableRebates: [
            {
              rebateType: "Early Payment Rebate",
              rebatePercentage: "4%",
              rebateAmount: `₹ ${Math.round(totalTax * 0.04).toLocaleString('en-IN')}`,
              validUntil: "June 30, 2023"
            },
            {
              rebateType: "Online Payment Rebate",
              rebatePercentage: "1%",
              rebateAmount: `₹ ${Math.round(totalTax * 0.01).toLocaleString('en-IN')}`,
              validUntil: "March 31, 2024"
            }
          ],
          potentialSavings: `₹ ${Math.round(totalTax * 0.05).toLocaleString('en-IN')}`,
          netPayableWithMaxRebate: `₹ ${Math.round(totalTax * 0.95).toLocaleString('en-IN')}`
        },
        paymentOptions: {
          onlinePayment: "Pay through website or mobile app",
          offlinePayment: "Pay at Property Tax Office or authorized collection centers",
          installmentOptions: "Half-yearly payments available with revised due dates"
        },
        dueDates: {
          firstHalf: "June 30, 2023",
          secondHalf: "December 31, 2023",
          fullPayment: "June 30, 2023"
        }
      }
    };
  } catch (error) {
    console.error('Error calculating Property Tax estimate:', error);
    throw error;
  }
};

/**
 * Search properties by address or owner name
 * @param {string} searchText - Address or owner name to search for
 * @param {string} searchType - Type of search ('address' or 'owner')
 * @returns {Promise} - API response with property search results
 */
export const searchProperties = async (searchText, searchType = 'address') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return {
      success: true,
      source: "Property Tax Department",
      searchCriteria: {
        searchText,
        searchType
      },
      totalResults: searchType === 'owner' ? 3 : 2,
      properties: searchType === 'owner' ? [
        {
          propertyId: "PTX-12345678",
          assessmentNumber: "PT-ASM-2010-45678",
          propertyAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          ownerName: "Ramesh Sharma",
          propertyType: "Residential",
          zoneName: "Zone C",
          annualRateableValue: "₹ 90,000",
          currentTaxAmount: "₹ 9,720",
          paymentStatus: "Pending",
          lastUpdated: "April 10, 2023"
        },
        {
          propertyId: "PTX-23456789",
          assessmentNumber: "PT-ASM-2015-56789",
          propertyAddress: "Shop No. 12, Sunrise Commercial Complex, S.V. Road, Goregaon West, Mumbai - 400062",
          ownerName: "Ramesh Sharma",
          propertyType: "Commercial",
          zoneName: "Zone B",
          annualRateableValue: "₹ 150,000",
          currentTaxAmount: "₹ 21,600",
          paymentStatus: "Paid",
          lastUpdated: "April 15, 2023"
        },
        {
          propertyId: "PTX-34567890",
          assessmentNumber: "PT-ASM-2018-67890",
          propertyAddress: "Farm House 7, Green Acres, Manori Village, Borivali West, Mumbai - 400092",
          ownerName: "Ramesh Sharma",
          propertyType: "Residential",
          zoneName: "Zone D",
          annualRateableValue: "₹ 120,000",
          currentTaxAmount: "₹ 10,800",
          paymentStatus: "Overdue",
          lastUpdated: "April 10, 2023"
        }
      ] : [
        {
          propertyId: "PTX-12345678",
          assessmentNumber: "PT-ASM-2010-45678",
          propertyAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          ownerName: "Ramesh Sharma",
          propertyType: "Residential",
          zoneName: "Zone C",
          annualRateableValue: "₹ 90,000",
          currentTaxAmount: "₹ 9,720",
          paymentStatus: "Pending",
          lastUpdated: "April 10, 2023"
        },
        {
          propertyId: "PTX-45678901",
          assessmentNumber: "PT-ASM-2012-78901",
          propertyAddress: "16/B, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          ownerName: "Patel Housing Society",
          propertyType: "Residential",
          zoneName: "Zone C",
          annualRateableValue: "₹ 3,50,000",
          currentTaxAmount: "₹ 37,800",
          paymentStatus: "Paid",
          lastUpdated: "April 20, 2023"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
};

/**
 * Generate property tax receipt
 * @param {string} propertyId - Property tax unique ID
 * @param {string} assessmentYear - Assessment year for receipt
 * @returns {Promise} - API response with receipt details
 */
export const generatePropertyTaxReceipt = async (propertyId, assessmentYear) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Return mock data
    return {
      success: true,
      source: "Property Tax Department",
      receiptDetails: {
        receiptNumber: `PTXR-${assessmentYear.split('-')[0]}-${Math.floor(10000 + Math.random() * 90000)}`,
        receiptDate: `May 15, ${assessmentYear.split('-')[0]}`,
        propertyDetails: {
          propertyId: propertyId || "PTX-12345678",
          assessmentNumber: "PT-ASM-2010-45678",
          propertyAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          ownerName: "Ramesh Sharma",
          zoneName: "Zone C",
          propertyType: "Residential"
        },
        taxDetails: {
          assessmentYear: assessmentYear || "2022-2023",
          annualRateableValue: "₹ 85,000",
          taxComponents: {
            generalTax: "₹ 7,650",
            waterTax: "₹ 850",
            sewerageTax: "₹ 425",
            educationCess: "₹ 255"
          },
          totalTaxAmount: "₹ 9,180",
          rebatesApplied: {
            earlyPaymentRebate: "₹ 367.20",
            onlinePaymentRebate: "₹ 91.80"
          },
          netAmountPaid: "₹ 8,721"
        },
        paymentDetails: {
          transactionId: `PTX-TRN-${assessmentYear.split('-')[0]}-${Math.floor(10000 + Math.random() * 90000)}`,
          paymentDate: `May 15, ${assessmentYear.split('-')[0]}`,
          paymentMode: "Online Banking",
          payingBank: "HDFC Bank",
          processingFees: "₹ 0.00"
        },
        authorityDetails: {
          issuingAuthority: "Mumbai Municipal Corporation - Property Tax Department",
          issuerDesignation: "Assistant Commissioner of Taxes",
          digitalSignature: "Digitally Signed",
          receiptGenerationTime: `May 15, ${assessmentYear.split('-')[0]} 10:35:22 AM`
        },
        additionalInformation: {
          helplineNumber: "1800-267-8765",
          emailAddress: "propertytax-support@mumbai.gov.in",
          website: "https://propertytax.gov.in",
          disclaimer: "This is a computer-generated receipt and does not require physical signature. The receipt is valid subject to realization of payment."
        },
        verificationDetails: {
          qrCodeData: `PTX-VERIFY-${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
          verificationURL: "https://propertytax.gov.in/verify-receipt",
          verificationCode: `${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        },
        receiptURL: `https://propertytax.gov.in/receipts/${assessmentYear.split('-')[0]}-${Math.floor(10000 + Math.random() * 90000)}`
      }
    };
  } catch (error) {
    console.error('Error generating Property Tax receipt:', error);
    throw error;
  }
}; 