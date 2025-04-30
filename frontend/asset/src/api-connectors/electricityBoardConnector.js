import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const ELECTRICITY_API_BASE_URL = 'https://api.electricity-board.gov.in/v1';

/**
 * Fetch electricity connection details by consumer number
 * @param {string} consumerNumber - Electricity consumer number
 * @returns {Promise} - API response with electricity connection details
 */
export const getElectricityConnectionDetails = async (consumerNumber) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${ELECTRICITY_API_BASE_URL}/connections/${consumerNumber}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return {
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
          manufacturerName: "Secure Meters Ltd.",
          installationDate: "2020-05-15",
          lastReading: "13678 kWh",
          lastReadingDate: "2023-04-02",
          meterReaderName: "Automated Smart Reading",
          averageMonthlyConsumption: "210 kWh"
        },
        connectionDetails: {
          applicationNumber: "EA-2010-12345",
          connectionDate: "2010-07-10",
          tariffCategory: "Residential (LT-1)",
          supplyVoltage: "230V",
          applicableRates: {
            fixedCharges: "₹ 150 per month",
            energyCharges: [
              {
                slabRange: "0-100 units",
                rate: "₹ 4.50 per unit"
              },
              {
                slabRange: "101-300 units",
                rate: "₹ 6.50 per unit"
              },
              {
                slabRange: "301-500 units",
                rate: "₹ 8.50 per unit"
              },
              {
                slabRange: "Above 500 units",
                rate: "₹ 9.50 per unit"
              }
            ],
            fuelAdjustmentCharges: "₹ 0.25 per unit",
            electricityDuty: "16%",
            taxOnSale: "5%"
          },
          securityDeposit: {
            initialDeposit: "₹ 5,000",
            depositDate: "2010-06-25",
            lastRevisedAmount: "₹ 7,500",
            lastRevisionDate: "2018-05-10"
          }
        },
        billingHistory: [
          {
            billNumber: "EB-2023-04-56789",
            billingPeriod: "Mar 01, 2023 to Mar 31, 2023",
            billDate: "Apr 05, 2023",
            billDueDate: "Apr 25, 2023",
            previousReading: "13468 kWh",
            currentReading: "13678 kWh",
            unitsConsumed: "210 kWh",
            fixedCharges: "₹ 150",
            energyCharges: "₹ 1,215",
            fuelAdjustmentCharges: "₹ 52.50",
            electricityDuty: "₹ 194.40",
            taxOnSale: "₹ 60.75",
            otherCharges: "₹ 20",
            billAmount: "₹ 1,692.65",
            paymentStatus: "Paid",
            paymentDate: "Apr 15, 2023",
            paymentMode: "Online Banking",
            receiptNumber: "EBREC-2023-12345"
          },
          {
            billNumber: "EB-2023-03-45678",
            billingPeriod: "Feb 01, 2023 to Feb 28, 2023",
            billDate: "Mar 05, 2023",
            billDueDate: "Mar 25, 2023",
            previousReading: "13268 kWh",
            currentReading: "13468 kWh",
            unitsConsumed: "200 kWh",
            fixedCharges: "₹ 150",
            energyCharges: "₹ 1,150",
            fuelAdjustmentCharges: "₹ 50",
            electricityDuty: "₹ 184",
            taxOnSale: "₹ 57.50",
            otherCharges: "₹ 0",
            billAmount: "₹ 1,591.50",
            paymentStatus: "Paid",
            paymentDate: "Mar 20, 2023",
            paymentMode: "Mobile App",
            receiptNumber: "EBREC-2023-10987"
          },
          {
            billNumber: "EB-2023-02-34567",
            billingPeriod: "Jan 01, 2023 to Jan 31, 2023",
            billDate: "Feb 05, 2023",
            billDueDate: "Feb 25, 2023",
            previousReading: "13048 kWh",
            currentReading: "13268 kWh",
            unitsConsumed: "220 kWh",
            fixedCharges: "₹ 150",
            energyCharges: "₹ 1,280",
            fuelAdjustmentCharges: "₹ 55",
            electricityDuty: "₹ 204.80",
            taxOnSale: "₹ 64",
            otherCharges: "₹ 25",
            billAmount: "₹ 1,778.80",
            paymentStatus: "Paid",
            paymentDate: "Feb 15, 2023",
            paymentMode: "Credit Card",
            receiptNumber: "EBREC-2023-09876"
          }
        ],
        outages: [
          {
            outageId: "OUT-2023-1234",
            outageType: "Scheduled Maintenance",
            startDateTime: "2023-03-15T09:00:00",
            endDateTime: "2023-03-15T14:00:00",
            duration: "5 hours",
            affectedArea: "Borivali West, Mumbai",
            reason: "Annual maintenance of distribution transformer",
            resolutionStatus: "Completed",
            notificationMode: "SMS, Email, Mobile App"
          },
          {
            outageId: "OUT-2023-0987",
            outageType: "Unscheduled",
            startDateTime: "2023-02-10T18:30:00",
            endDateTime: "2023-02-10T21:45:00",
            duration: "3 hours 15 minutes",
            affectedArea: "Manori Road, Borivali West, Mumbai",
            reason: "Distribution line fault",
            resolutionStatus: "Resolved",
            notificationMode: "Mobile App, Website"
          }
        ],
        serviceRequests: [
          {
            requestId: "SR-2022-4567",
            requestType: "Load Enhancement",
            requestDate: "2022-09-10",
            requestDetails: "Application for increasing sanctioned load from 3 kW to 5 kW",
            status: "Completed",
            completionDate: "2022-10-15",
            remarks: "Load enhancement approved and implemented"
          },
          {
            requestId: "SR-2020-3456",
            requestType: "Meter Replacement",
            requestDate: "2020-04-05",
            requestDetails: "Request for smart meter installation",
            status: "Completed",
            completionDate: "2020-05-15",
            remarks: "Smart meter installed successfully"
          }
        ],
        documents: [
          {
            documentType: "New Connection Approval",
            documentNumber: "EBCA-2010-12345",
            issueDate: "2010-06-30",
            issuingAuthority: "Maharashtra State Electricity Distribution Co. Ltd."
          },
          {
            documentType: "Load Enhancement Approval",
            documentNumber: "EBLA-2022-4567",
            issueDate: "2022-10-05",
            issuingAuthority: "Maharashtra State Electricity Distribution Co. Ltd."
          },
          {
            documentType: "Test Report",
            documentNumber: "EBTR-2020-7890",
            issueDate: "2020-05-12",
            issuingAuthority: "Licensed Electrical Contractor"
          }
        ],
        lastUpdated: "2023-04-15"
      }
    };
  } catch (error) {
    console.error('Error fetching Electricity Board connection details:', error);
    throw error;
  }
};

/**
 * Fetch electricity bill details by bill number or consumer number
 * @param {string} billNumber - Electricity bill number
 * @param {string} consumerNumber - Consumer number (optional alternative to bill number)
 * @returns {Promise} - API response with electricity bill details
 */
export const getElectricityBillDetails = async (billNumber, consumerNumber) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Return mock data
    return {
      success: true,
      source: "Electricity Board",
      searchCriteria: billNumber ? { billNumber } : { consumerNumber },
      billDetails: {
        billNumber: billNumber || "EB-2023-04-56789",
        consumerNumber: consumerNumber || "EB-12345678",
        billStatus: "Paid",
        billDetails: {
          consumerName: "Ramesh Sharma",
          connectionAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Residential",
          sanctionedLoad: "5 kW",
          tariffCategory: "Residential (LT-1)",
          billingPeriod: "Mar 01, 2023 to Mar 31, 2023",
          billGenerationDate: "Apr 05, 2023",
          billDueDate: "Apr 25, 2023",
          readingDetails: {
            previousReading: "13468 kWh",
            previousReadingDate: "Mar 01, 2023",
            currentReading: "13678 kWh",
            currentReadingDate: "Mar 31, 2023",
            unitsConsumed: "210 kWh",
            readingType: "Actual"
          },
          billComponents: {
            fixedCharges: {
              description: "Fixed Charges (5 kW @ ₹30/kW)",
              amount: "₹ 150.00"
            },
            energyCharges: {
              slabs: [
                {
                  slabRange: "0-100 units",
                  ratePerUnit: "₹ 4.50",
                  units: "100",
                  amount: "₹ 450.00"
                },
                {
                  slabRange: "101-300 units",
                  ratePerUnit: "₹ 6.50",
                  units: "110",
                  amount: "₹ 715.00"
                }
              ],
              totalEnergyCharges: "₹ 1,165.00"
            },
            governmentDuties: {
              electricityDuty: {
                description: "Electricity Duty @ 16% on Energy Charges",
                amount: "₹ 186.40"
              },
              taxOnSale: {
                description: "Tax on Sale of Electricity @ 5%",
                amount: "₹ 58.25"
              }
            },
            otherCharges: {
              fuelAdjustmentCharges: {
                description: "Fuel Adjustment Charges @ ₹0.25/unit",
                amount: "₹ 52.50"
              },
              wheeling: {
                description: "Wheeling Charges",
                amount: "₹ 20.00"
              }
            },
            rebates: {
              earlyPaymentRebate: {
                description: "Early Payment Rebate @ 1%",
                amount: "₹ 14.82"
              },
              digitalPaymentRebate: {
                description: "Digital Payment Incentive",
                amount: "₹ 10.00"
              }
            }
          },
          billSummary: {
            currentBillCharges: "₹ 1,607.33",
            arrears: "₹ 0.00",
            interestOnArrears: "₹ 0.00",
            adjustments: "₹ 0.00",
            netAmountPayable: "₹ 1,607.33",
            roundedAmount: "₹ 1,607.00"
          }
        },
        paymentDetails: {
          paymentStatus: "Paid",
          paymentDate: "Apr 15, 2023",
          paymentMode: "Online Banking",
          paymentReference: "EBPAY-2023-78901",
          receiptNumber: "EBREC-2023-12345",
          paymentAmount: "₹ 1,607.00",
          payingBank: "HDFC Bank",
          transactionId: "HDFC12345678",
          processingFee: "₹ 0.00"
        },
        consumptionHistory: [
          {
            month: "Mar 2023",
            unitsConsumed: "210 kWh",
            billAmount: "₹ 1,607.00"
          },
          {
            month: "Feb 2023",
            unitsConsumed: "200 kWh",
            billAmount: "₹ 1,522.00"
          },
          {
            month: "Jan 2023",
            unitsConsumed: "220 kWh",
            billAmount: "₹ 1,685.00"
          },
          {
            month: "Dec 2022",
            unitsConsumed: "240 kWh",
            billAmount: "₹ 1,850.00"
          },
          {
            month: "Nov 2022",
            unitsConsumed: "195 kWh",
            billAmount: "₹ 1,490.00"
          },
          {
            month: "Oct 2022",
            unitsConsumed: "185 kWh",
            billAmount: "₹ 1,410.00"
          }
        ],
        billAdditionalDetails: {
          meterReader: "Automated Smart Reading",
          billCalculatedBy: "Automated Billing System",
          remarks: "Smart Meter Reading",
          nextBillDueDate: "May 25, 2023 (Tentative)",
          paymentLocations: [
            "Online at electricity-board.gov.in",
            "Mobile App",
            "Electricity Board Office, Borivali West"
          ],
          helplineNumber: "1800-123-4567",
          grievanceEmail: "consumer-care@electricity-board.gov.in"
        },
        qrCodeDetails: {
          qrCodeType: "Bharat QR",
          qrCodeData: "upi://pay?pa=electricityboard@centralbank&pn=MSEDCL%20Bill%20Payment&tr=EB2023456789&am=1607.00&cu=INR&mc=5732",
          validUntil: "Apr 25, 2023"
        },
        lastUpdated: "Apr 15, 2023"
      }
    };
  } catch (error) {
    console.error('Error fetching Electricity Board bill details:', error);
    throw error;
  }
};

/**
 * Search electricity connections by address or consumer name
 * @param {string} searchText - Address or consumer name to search for
 * @param {string} searchType - Type of search ('address' or 'name')
 * @returns {Promise} - API response with connection search results
 */
export const searchElectricityConnections = async (searchText, searchType = 'address') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Return mock data
    return {
      success: true,
      source: "Electricity Board",
      searchCriteria: {
        searchText,
        searchType
      },
      totalResults: searchType === 'name' ? 3 : 2,
      connections: searchType === 'name' ? [
        {
          consumerNumber: "EB-12345678",
          consumerName: "Ramesh Sharma",
          connectionAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Residential",
          sanctionedLoad: "5 kW",
          connectionStatus: "Active",
          lastBillDate: "Apr 05, 2023",
          lastBillAmount: "₹ 1,607.00",
          paymentStatus: "Paid"
        },
        {
          consumerNumber: "EB-23456789",
          consumerName: "Sharma Enterprises",
          connectionAddress: "Shop No. 12, Sunrise Commercial Complex, S.V. Road, Goregaon West, Mumbai - 400062",
          connectionType: "Commercial",
          sanctionedLoad: "8 kW",
          connectionStatus: "Active",
          lastBillDate: "Apr 08, 2023",
          lastBillAmount: "₹ 4,350.00",
          paymentStatus: "Paid"
        },
        {
          consumerNumber: "EB-34567890",
          consumerName: "Ramesh Sharma",
          connectionAddress: "Farm House 7, Green Acres, Manori Village, Borivali West, Mumbai - 400092",
          connectionType: "Residential",
          sanctionedLoad: "3 kW",
          connectionStatus: "Active",
          lastBillDate: "Apr 05, 2023",
          lastBillAmount: "₹ 950.00",
          paymentStatus: "Due"
        }
      ] : [
        {
          consumerNumber: "EB-12345678",
          consumerName: "Ramesh Sharma",
          connectionAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Residential",
          sanctionedLoad: "5 kW",
          connectionStatus: "Active",
          lastBillDate: "Apr 05, 2023",
          lastBillAmount: "₹ 1,607.00",
          paymentStatus: "Paid"
        },
        {
          consumerNumber: "EB-45678901",
          consumerName: "Patel Housing Society",
          connectionAddress: "16/B, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Residential",
          sanctionedLoad: "12 kW",
          connectionStatus: "Active",
          lastBillDate: "Apr 07, 2023",
          lastBillAmount: "₹ 5,420.00",
          paymentStatus: "Paid"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Electricity Board connections:', error);
    throw error;
  }
};

/**
 * Report an electricity issue or register a complaint
 * @param {Object} complaintData - Complaint data including type, description, etc.
 * @returns {Promise} - API response with complaint registration details
 */
export const reportElectricityIssue = async (complaintData) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 950));
    
    // Generate a complaint ID
    const complaintId = `EBCOMP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Return mock data
    return {
      success: true,
      source: "Electricity Board",
      message: "Complaint registered successfully",
      complaintDetails: {
        complaintId,
        registrationDateTime: new Date().toISOString(),
        consumerNumber: complaintData.consumerNumber || "EB-12345678",
        consumerName: complaintData.consumerName || "Ramesh Sharma",
        contactNumber: complaintData.contactNumber || "+91-9876543210",
        alternateContactNumber: complaintData.alternateContactNumber || "+91-9876123450",
        emailId: complaintData.emailId || "ramesh.sharma@email.com",
        complaintType: complaintData.complaintType || "Power Outage",
        complaintDescription: complaintData.description || "No electricity in the entire building since 3:00 PM",
        complaintAddress: complaintData.address || "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
        landmarkDetails: complaintData.landmark || "Near Manori Beach Junction",
        status: "Registered",
        priority: "High",
        assignedTo: "North Zone Maintenance Team",
        expectedResolutionTime: "Within 4 hours",
        trackingUrl: `https://electricity-board.gov.in/track-complaint?id=${complaintId}`,
        additionalInformation: "Your complaint has been registered as a high priority issue. Our maintenance team will contact you shortly. You will receive SMS updates on the status of your complaint."
      }
    };
  } catch (error) {
    console.error('Error reporting Electricity Board issue:', error);
    throw error;
  }
};

/**
 * Get net metering and solar connection details for a consumer
 * @param {string} consumerNumber - Electricity consumer number
 * @returns {Promise} - API response with net metering and solar connection details
 */
export const getSolarNetMeteringDetails = async (consumerNumber) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return {
      success: true,
      source: "Electricity Board",
      consumerNumber: consumerNumber || "EB-12345678",
      solarConnectionStatus: "Not Available",
      message: "No solar or net metering connection found for this consumer number."
    };
  } catch (error) {
    console.error('Error fetching Electricity Board solar net metering details:', error);
    throw error;
  }
}; 