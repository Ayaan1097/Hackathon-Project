// Electricity Board API Connector
// This file provides the mock API connector for the Electricity Board

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://asset-guru.onrender.com';
const ELECTRICITY_API_BASE_URL = `${API_BASE_URL}/api/v1/electricity`;

/**
 * Fetch electricity connection details by consumer number
 * @param {string} consumerNumber - Electricity consumer number
 * @returns {Promise} - API response with electricity connection details
 */
export const getElectricityConnectionDetails = async (consumerNumber) => {
  try {
    // Simulating API call to Electricity Board
    // const response = await axios.get(`${ELECTRICITY_API_BASE_URL}/connections/${consumerNumber}`);
    
    // Mock response data
    const mockResponse = {
      success: true,
      data: {
        connectionId: consumerNumber,
        source: "Electricity Board",
        consumerDetails: {
          consumerNumber: consumerNumber,
          consumerName: "Rajesh Sharma",
          connectionType: "Residential",
          sanctionedLoad: "5 kW",
          supplyVoltage: "230V",
          connectionDate: "2019-05-15",
          status: "Active",
          meterNumber: "EB9287341",
          address: {
            street: "B-5, Patel Nagar",
            area: "Borivali West",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400091"
          },
          contactDetails: {
            mobile: "+91 9876543210",
            email: "rajesh.sharma@example.com"
          }
        },
        meterDetails: {
          meterNumber: "EB9287341",
          meterType: "Smart Meter",
          installationDate: "2019-05-20",
          lastReadingDate: "2023-09-10",
          lastReadingValue: "8947.2 kWh",
          averageConsumption: {
            monthly: "152 kWh",
            quarterly: "456 kWh",
            yearly: "1824 kWh"
          },
          meterReaderDetails: {
            name: "Sunil Patil",
            employeeId: "MR-1234"
          }
        },
        billingHistory: [
          {
            billNumber: "EB-2023-09-4532",
            billDate: "2023-09-12",
            billingPeriod: "Aug 10, 2023 - Sep 10, 2023",
            billAmount: "₹ 1,216.00",
            unitsConsumed: "162 kWh",
            dueDate: "2023-09-26",
            paymentStatus: "Paid",
            paymentDate: "2023-09-20",
            paymentMethod: "UPI",
            transactionId: "UPI-EB-8732641"
          },
          {
            billNumber: "EB-2023-08-4311",
            billDate: "2023-08-12",
            billingPeriod: "Jul 10, 2023 - Aug 10, 2023",
            billAmount: "₹ 1,150.00",
            unitsConsumed: "153 kWh",
            dueDate: "2023-08-26",
            paymentStatus: "Paid",
            paymentDate: "2023-08-22",
            paymentMethod: "Credit Card",
            transactionId: "CC-EB-6527891"
          },
          {
            billNumber: "EB-2023-07-4102",
            billDate: "2023-07-12",
            billingPeriod: "Jun 10, 2023 - Jul 10, 2023",
            billAmount: "₹ 1,280.00",
            unitsConsumed: "172 kWh",
            dueDate: "2023-07-26",
            paymentStatus: "Paid",
            paymentDate: "2023-07-19",
            paymentMethod: "Net Banking",
            transactionId: "NB-EB-9823671"
          }
        ],
        outages: [
          {
            outageId: "OUT-2023-2341",
            type: "Scheduled Maintenance",
            startTime: "2023-09-05T10:00:00",
            endTime: "2023-09-05T14:00:00",
            duration: "4 hours",
            affectedAreas: ["Borivali West", "Kandivali West"],
            status: "Completed",
            reason: "Annual maintenance and transformer replacement"
          },
          {
            outageId: "OUT-2023-1987",
            type: "Unplanned Outage",
            startTime: "2023-08-12T18:30:00",
            endTime: "2023-08-12T21:15:00",
            duration: "2.75 hours",
            affectedAreas: ["Borivali West", "Gorai"],
            status: "Resolved",
            reason: "Substation equipment failure"
          }
        ],
        serviceRequests: [
          {
            requestId: "SR-2023-7843",
            requestType: "Load Increase",
            submissionDate: "2023-08-20",
            requestDetails: "Increase load from 5 kW to 7 kW",
            status: "Processing",
            estimatedCompletionDate: "2023-10-05",
            assignedTo: "Engineering Department",
            lastUpdated: "2023-09-03",
            updateDescription: "Site inspection complete, awaiting approval"
          },
          {
            requestId: "SR-2023-5321",
            requestType: "Name Change",
            submissionDate: "2023-06-10",
            requestDetails: "Change of name from Rajiv Sharma to Rajesh Sharma",
            status: "Completed",
            completionDate: "2023-07-05",
            processedBy: "Consumer Services Department",
            lastUpdated: "2023-07-05",
            updateDescription: "Name change processed and updated in records"
          }
        ],
        documents: [
          {
            documentId: "DOC-1234",
            documentType: "Connection Agreement",
            issueDate: "2019-05-15",
            validUntil: "No Expiry",
            downloadUrl: "https://electricity-board.gov.in/docs/connection/9876543",
            issuingAuthority: "Maharashtra State Electricity Distribution Co. Ltd."
          },
          {
            documentId: "DOC-5678",
            documentType: "Meter Testing Certificate",
            issueDate: "2022-06-20",
            validUntil: "2025-06-19",
            downloadUrl: "https://electricity-board.gov.in/docs/meter/8732541",
            issuingAuthority: "Maharashtra State Electricity Distribution Co. Ltd."
          }
        ]
      },
      timestamp: new Date().toISOString()
    };

    return mockResponse;
  } catch (error) {
    console.error('Error fetching Electricity Board connection details:', error);
    throw error;
  }
};

/**
 * Fetch electricity bill details by bill number or consumer number
 * @param {string} billNumber - Electricity bill number
 * @param {string} consumerNumber - Electricity consumer number
 * @returns {Promise} - API response with electricity bill details
 */
export const getElectricityBillDetails = async (billNumber, consumerNumber) => {
  try {
    // Simulating API call to Electricity Board
    // const response = await axios.get(`${ELECTRICITY_API_BASE_URL}/bills`, { params: { billNumber, consumerNumber } });
    
    // Mock response data
    const mockResponse = {
      success: true,
      data: {
        billDetails: {
          billNumber: billNumber || "EB-2023-09-4532",
          source: "Electricity Board",
          consumerNumber: consumerNumber || "EB98765432",
          consumerName: "Rajesh Sharma",
          billDate: "2023-09-12",
          billingPeriod: {
            from: "2023-08-10",
            to: "2023-09-10"
          },
          dueDate: "2023-09-26",
          billStatus: "Paid",
          billSummary: {
            previousReading: "8785.2 kWh",
            currentReading: "8947.2 kWh",
            unitsConsumed: "162 kWh",
            rate: {
              fixedCharge: "₹ 120.00",
              energyCharge: "₹ 8.50 per unit"
            },
            totalAmount: "₹ 1,216.00",
            adjustments: "₹ 0.00",
            netAmount: "₹ 1,216.00"
          },
          tariffDetails: {
            tariffCategory: "Residential",
            tariffCode: "LT-1",
            applicableTariff: [
              {
                slabRange: "0-100 units",
                rate: "₹ 6.50 per unit"
              },
              {
                slabRange: "101-300 units",
                rate: "₹ 8.50 per unit"
              },
              {
                slabRange: "301-500 units",
                rate: "₹ 10.00 per unit"
              },
              {
                slabRange: "Above 500 units",
                rate: "₹ 12.00 per unit"
              }
            ]
          },
          billBreakup: {
            fixedCharge: "₹ 120.00",
            energyCharge: {
              "0-100 units": {
                units: "100",
                rate: "₹ 6.50",
                amount: "₹ 650.00"
              },
              "101-162 units": {
                units: "62",
                rate: "₹ 8.50",
                amount: "₹ 527.00"
              }
            },
            electricityDuty: {
              description: "Electricity Duty @ 16% on Energy Charges",
              amount: "₹ 188.32"
            },
            taxOnSale: {
              description: "Tax on Sale of Electricity @ 5%",
              amount: "₹ 58.85"
            },
            fuelAdjustmentCharge: "₹ 80.00",
            otherCharges: "₹ -10.00",
            adjustments: "₹ 0.00",
            arrears: "₹ 0.00",
            interestOnArrears: "₹ 0.00",
            subsidies: "₹ -398.17"
          },
          paymentHistory: {
            lastPaymentAmount: "₹ 1,216.00",
            lastPaymentDate: "2023-09-20",
            paymentMethod: "UPI",
            transactionId: "UPI-EB-8732641",
            receiptNumber: "RCT-EB-4632451"
          }
        },
        consumptionHistory: [
          {
            period: "Sep 2023",
            unitsConsumed: "162 kWh",
            billAmount: "₹ 1,216.00"
          },
          {
            period: "Aug 2023",
            unitsConsumed: "153 kWh",
            billAmount: "₹ 1,150.00"
          },
          {
            period: "Jul 2023",
            unitsConsumed: "172 kWh",
            billAmount: "₹ 1,280.00"
          },
          {
            period: "Jun 2023",
            unitsConsumed: "145 kWh",
            billAmount: "₹ 1,105.00"
          },
          {
            period: "May 2023",
            unitsConsumed: "131 kWh",
            billAmount: "₹ 1,050.00"
          },
          {
            period: "Apr 2023",
            unitsConsumed: "118 kWh",
            billAmount: "₹ 980.00"
          }
        ],
        paymentOptions: [
          "Online at electricity-board.gov.in",
          "Mobile app payment",
          "Electricity Board Office, Borivali West"
        ],
        customerSupport: {
          helplineNumber: "1800-123-4567",
          grievanceEmail: "consumer-care@electricity-board.gov.in",
          nearestOffice: "Electricity Board Office, Borivali West, Mumbai - 400091"
        },
        qrCodeData: "upi://pay?pa=electricityboard@centralbank&pn=MSEDCL%20Bill%20Payment&tr=EB2023456789&am=1607.00&cu=INR&mc=5732",
        billUrl: "https://electricity-board.gov.in/view-bill/EB-2023-09-4532"
      },
      timestamp: new Date().toISOString()
    };

    return mockResponse;
  } catch (error) {
    console.error('Error fetching Electricity Board bill details:', error);
    throw error;
  }
};

/**
 * Search electricity connections by address or consumer name
 * @param {string} searchText - Text to search for
 * @param {string} searchType - Type of search (address or name)
 * @returns {Promise} - API response with search results
 */
export const searchElectricityConnections = async (searchText, searchType = 'address') => {
  try {
    // Simulating API call to Electricity Board
    // const response = await axios.get(`${ELECTRICITY_API_BASE_URL}/search`, { params: { searchText, searchType } });
    
    // Mock response data
    const mockResponse = {
      success: true,
      data: {
        searchCriteria: {
          searchText,
          searchType
        },
        source: "Electricity Board",
        results: [
          {
            connectionId: "EB98765432",
            consumerName: "Rajesh Sharma",
            meterNumber: "EB9287341",
            connectionType: "Residential",
            address: {
              street: "B-5, Patel Nagar",
              area: "Borivali West",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400091"
            },
            status: "Active",
            sanctionedLoad: "5 kW"
          },
          {
            connectionId: "EB98765433",
            consumerName: "Suresh Enterprises",
            meterNumber: "EB7349821",
            connectionType: "Commercial",
            address: {
              street: "Shop 3, Mira Road",
              area: "Borivali East",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400066"
            },
            status: "Active",
            sanctionedLoad: "12 kW"
          },
          {
            connectionId: "EB98765434",
            consumerName: "Meera Apartments",
            meterNumber: "EB5432189",
            connectionType: "Residential - Society Connection",
            address: {
              street: "A Wing, Meera Apartments",
              area: "Borivali West",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400092"
            },
            status: "Active",
            sanctionedLoad: "35 kW"
          }
        ],
        totalResults: 3,
        pageInfo: {
          currentPage: 1,
          totalPages: 1,
          resultsPerPage: 10
        }
      },
      timestamp: new Date().toISOString()
    };
    
    return mockResponse;
  } catch (error) {
    console.error('Error searching Electricity Board connections:', error);
    throw error;
  }
};

/**
 * Report an electricity issue or register a complaint
 * @param {Object} complaintData - Details of the complaint
 * @returns {Promise} - API response with complaint registration details
 */
export const reportElectricityIssue = async (complaintData) => {
  try {
    // Simulating API call to Electricity Board
    // const response = await axios.post(`${ELECTRICITY_API_BASE_URL}/complaints/register`, complaintData);
    
    // Generate a unique complaint ID
    const complaintId = `COMP-${Date.now().toString().slice(-6)}`;
    
    // Mock response data
    const mockResponse = {
      success: true,
      data: {
        source: "Electricity Board",
        complaintId,
        registrationTimestamp: new Date().toISOString(),
        consumerNumber: complaintData.consumerNumber || "EB98765432",
        consumerName: "Rajesh Sharma",
        complaintCategory: complaintData.category || "Power Outage",
        complaintSubCategory: complaintData.subCategory || "No power in entire premises",
        complaintDescription: complaintData.description || "No electricity in the entire building since 3:00 PM",
        affectedArea: {
          street: "B-5, Patel Nagar",
          area: "Borivali West",
          city: "Mumbai",
          pincode: "400091"
        },
        status: "Registered",
        expectedResolutionTime: "4 hours",
        trackingUrl: `https://electricity-board.gov.in/track-complaint?id=${complaintId}`,
        acknowledgementSent: true
      }
    };
    
    return mockResponse;
  } catch (error) {
    console.error('Error reporting Electricity Board issue:', error);
    throw error;
  }
};

/**
 * Get solar net metering details
 * @param {string} consumerNumber - Electricity consumer number
 * @returns {Promise} - API response with solar net metering details
 */
export const getSolarNetMeteringDetails = async (consumerNumber) => {
  try {
    // Simulating API call to Electricity Board
    // const response = await axios.get(`${ELECTRICITY_API_BASE_URL}/solar-net-metering/${consumerNumber}`);
    
    // Mock response data
    const mockResponse = {
      success: true,
      data: {
        source: "Electricity Board",
        solarConnectionDetails: {
          consumerNumber,
          solarConnectionStatus: "Active",
          approvalDate: "2022-03-15",
          inspectionDate: "2022-03-10",
          installedCapacity: "3 kW",
          installerDetails: {
            name: "SunSmart Solar Solutions",
            registrationNumber: "MNRE-IN-1234",
            contactNumber: "+91 9876543210"
          },
          systemSpecification: {
            panelMake: "SunTech Power",
            panelModel: "STP300S-20/Wfw",
            numberOfPanels: 10,
            inverterMake: "SolarEdge",
            inverterModel: "SE3000H",
            batteryStorage: "No"
          },
          netMeterDetails: {
            meterNumber: "NM8765432",
            installationDate: "2022-03-20",
            lastInspectionDate: "2023-08-15",
            nextInspectionDue: "2024-08-15"
          },
          generationData: {
            totalGeneration: "4,872 kWh",
            currentMonthGeneration: "220 kWh",
            averageMonthlyGeneration: "195 kWh",
            exportedToGrid: "2,520 kWh",
            selfConsumed: "2,352 kWh"
          },
          netMeteringAgreement: {
            agreementNumber: "NMA-2022-3456",
            startDate: "2022-03-20",
            endDate: "2032-03-19",
            tariffForExport: "₹ 3.50 per unit",
            billingCycle: "Monthly"
          },
          subsidyDetails: {
            subsidyAvailed: "Yes",
            subsidyAmount: "₹ 60,000",
            subsidyScheme: "PM-KUSUM",
            applicationNumber: "KUSUM-MH-34567",
            disbursementStatus: "Disbursed",
            disbursementDate: "2022-05-10"
          }
        },
        netMeteringBillingHistory: [
          {
            billingPeriod: "Aug 2023",
            unitsConsumed: "152 kWh",
            unitsExported: "220 kWh",
            netUnits: "-68 kWh",
            carryForwardUnits: "68 kWh",
            payableAmount: "₹ 0.00"
          },
          {
            billingPeriod: "Jul 2023",
            unitsConsumed: "162 kWh",
            unitsExported: "200 kWh",
            netUnits: "-38 kWh",
            carryForwardUnits: "38 kWh",
            payableAmount: "₹ 0.00"
          },
          {
            billingPeriod: "Jun 2023",
            unitsConsumed: "175 kWh",
            unitsExported: "210 kWh",
            netUnits: "-35 kWh",
            carryForwardUnits: "35 kWh",
            payableAmount: "₹ 0.00"
          },
          {
            billingPeriod: "May 2023",
            unitsConsumed: "185 kWh",
            unitsExported: "195 kWh",
            netUnits: "-10 kWh",
            carryForwardUnits: "10 kWh",
            payableAmount: "₹ 0.00"
          },
          {
            billingPeriod: "Apr 2023",
            unitsConsumed: "160 kWh",
            unitsExported: "180 kWh",
            netUnits: "-20 kWh",
            carryForwardUnits: "20 kWh",
            payableAmount: "₹ 0.00"
          }
        ]
      }
    };
    
    return mockResponse;
  } catch (error) {
    console.error('Error fetching Electricity Board solar net metering details:', error);
    throw error;
  }
}; 