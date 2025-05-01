import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://asset-guru.onrender.com';
const WATER_SUPPLY_API_BASE_URL = `${API_BASE_URL}/api/v1/water`;

/**
 * Fetch water connection details by consumer number
 * @param {string} consumerNumber - Water connection consumer number
 * @returns {Promise} - API response with water connection details
 */
export const getWaterConnectionDetails = async (consumerNumber) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${WATER_SUPPLY_API_BASE_URL}/connections/${consumerNumber}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Return mock data
    return {
      success: true,
      source: "Water Supply Department",
      connectionDetails: {
        consumerNumber: consumerNumber || "WS-78901234",
        consumerName: "Ramesh Sharma",
        connectionAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
        connectionType: "Domestic",
        connectionCategory: "Individual Household",
        connectionStatus: "Active",
        connectionDetails: {
          applicationNumber: "WS-APP-2010-54321",
          connectionDate: "2010-07-10",
          pipeSize: "15mm (1/2 inch)",
          waterMeterDetails: {
            meterNumber: "WSM-87654",
            meterMake: "Kamstrup",
            meterType: "Multijet",
            meterInstallationDate: "2010-07-15",
            lastReading: "3456 kL",
            lastReadingDate: "2023-04-02",
            meterStatus: "Functional"
          },
          tariffCategory: "Domestic",
          applicableRates: {
            fixedCharges: "₹ 120 per month",
            variableCharges: [
              {
                slabRange: "0-10 kL",
                rate: "₹ 6.00 per kL"
              },
              {
                slabRange: "11-25 kL",
                rate: "₹ 8.00 per kL"
              },
              {
                slabRange: "26-50 kL",
                rate: "₹ 20.00 per kL"
              },
              {
                slabRange: "Above 50 kL",
                rate: "₹ 30.00 per kL"
              }
            ],
            waterCess: "5%",
            sewageCess: "10%"
          },
          securityDeposit: {
            initialDeposit: "₹ 3,000",
            depositDate: "2010-06-25",
            lastRevisedAmount: "₹ 5,000",
            lastRevisionDate: "2018-05-10"
          }
        },
        billingHistory: [
          {
            billNumber: "WS-2023-04-65432",
            billingPeriod: "Mar 01, 2023 to Mar 31, 2023",
            billDate: "Apr 05, 2023",
            billDueDate: "Apr 25, 2023",
            previousReading: "3440 kL",
            currentReading: "3456 kL",
            consumptionVolume: "16 kL",
            fixedCharges: "₹ 120.00",
            variableCharges: "₹ 118.00",
            waterCess: "₹ 11.90",
            sewageCess: "₹ 23.80",
            otherCharges: "₹ 10.00",
            billAmount: "₹ 283.70",
            paymentStatus: "Paid",
            paymentDate: "Apr 15, 2023",
            paymentMode: "Online Banking",
            receiptNumber: "WSREC-2023-76543"
          },
          {
            billNumber: "WS-2023-03-54321",
            billingPeriod: "Feb 01, 2023 to Feb 28, 2023",
            billDate: "Mar 05, 2023",
            billDueDate: "Mar 25, 2023",
            previousReading: "3425 kL",
            currentReading: "3440 kL",
            consumptionVolume: "15 kL",
            fixedCharges: "₹ 120.00",
            variableCharges: "₹ 110.00",
            waterCess: "₹ 11.50",
            sewageCess: "₹ 23.00",
            otherCharges: "₹ 0.00",
            billAmount: "₹ 264.50",
            paymentStatus: "Paid",
            paymentDate: "Mar 20, 2023",
            paymentMode: "Mobile App",
            receiptNumber: "WSREC-2023-65432"
          },
          {
            billNumber: "WS-2023-02-43210",
            billingPeriod: "Jan 01, 2023 to Jan 31, 2023",
            billDate: "Feb 05, 2023",
            billDueDate: "Feb 25, 2023",
            previousReading: "3408 kL",
            currentReading: "3425 kL",
            consumptionVolume: "17 kL",
            fixedCharges: "₹ 120.00",
            variableCharges: "₹ 126.00",
            waterCess: "₹ 12.30",
            sewageCess: "₹ 24.60",
            otherCharges: "₹ 15.00",
            billAmount: "₹ 297.90",
            paymentStatus: "Paid",
            paymentDate: "Feb 15, 2023",
            paymentMode: "Credit Card",
            receiptNumber: "WSREC-2023-54321"
          }
        ],
        supplySchedule: {
          supplyFrequency: "Daily",
          supplyTiming: "6:00 AM to 10:00 AM",
          supplyDays: "All days",
          pressureLevel: "Normal",
          alternateSchedule: {
            summer: "5:30 AM to 9:30 AM",
            winter: "6:30 AM to 10:30 AM"
          },
          scheduledMaintenance: [
            {
              date: "2023-05-15",
              startTime: "10:00 PM",
              endTime: "5:00 AM (Next day)",
              reason: "Pipeline maintenance",
              affectedAreas: "Borivali West"
            }
          ]
        },
        waterQuality: {
          lastTestDate: "2023-03-10",
          testResults: {
            pH: "7.2",
            turbidity: "0.8 NTU",
            tds: "220 mg/L",
            chlorine: "0.5 mg/L",
            hardness: "180 mg/L",
            coliformCount: "Nil",
            status: "Potable",
            laboratory: "Municipal Water Testing Lab, Borivali"
          },
          qualityRemarks: "Water meets all BIS 10500 standards for drinking water",
          nextScheduledTest: "2023-06-10"
        },
        serviceRequests: [
          {
            requestId: "WSR-2022-7890",
            requestType: "Leakage Complaint",
            requestDate: "2022-11-05",
            requestDetails: "Water leakage from connection pipe near meter",
            status: "Resolved",
            resolutionDate: "2022-11-08",
            remarks: "Pipeline joint replaced and sealed"
          },
          {
            requestId: "WSR-2020-6789",
            requestType: "Meter Replacement",
            requestDate: "2020-06-10",
            requestDetails: "Request for new water meter due to damaged display",
            status: "Completed",
            resolutionDate: "2020-06-25",
            remarks: "New meter installed successfully"
          }
        ],
        documents: [
          {
            documentType: "New Connection Approval",
            documentNumber: "WSCA-2010-54321",
            issueDate: "2010-06-30",
            issuingAuthority: "Mumbai Municipal Corporation - Water Supply Department"
          },
          {
            documentType: "NOC from Society",
            documentNumber: "SR-NOC-2010-123",
            issueDate: "2010-05-15",
            issuingAuthority: "Sharma Residency Co-operative Housing Society"
          },
          {
            documentType: "Plumbing Compliance Certificate",
            documentNumber: "PCC-2010-9876",
            issueDate: "2010-07-05",
            issuingAuthority: "Licensed Plumber - MMC Registered"
          }
        ],
        lastUpdated: "2023-04-15"
      }
    };
  } catch (error) {
    console.error('Error fetching Water Supply connection details:', error);
    throw error;
  }
};

/**
 * Fetch water bill details by bill number or consumer number
 * @param {string} billNumber - Water bill number
 * @param {string} consumerNumber - Consumer number (optional alternative to bill number)
 * @returns {Promise} - API response with water bill details
 */
export const getWaterBillDetails = async (billNumber, consumerNumber) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 750));
    
    // Return mock data
    return {
      success: true,
      source: "Water Supply Department",
      searchCriteria: billNumber ? { billNumber } : { consumerNumber },
      billDetails: {
        billNumber: billNumber || "WS-2023-04-65432",
        consumerNumber: consumerNumber || "WS-78901234",
        billStatus: "Paid",
        billDetails: {
          consumerName: "Ramesh Sharma",
          connectionAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Domestic",
          pipeSize: "15mm (1/2 inch)",
          tariffCategory: "Domestic",
          billingPeriod: "Mar 01, 2023 to Mar 31, 2023",
          billGenerationDate: "Apr 05, 2023",
          billDueDate: "Apr 25, 2023",
          meterReadingDetails: {
            previousReading: "3440 kL",
            previousReadingDate: "Mar 01, 2023",
            currentReading: "3456 kL",
            currentReadingDate: "Mar 31, 2023",
            consumptionVolume: "16 kL",
            readingType: "Actual"
          },
          billComponents: {
            fixedCharges: {
              description: "Fixed Charges (15mm connection)",
              amount: "₹ 120.00"
            },
            variableCharges: {
              slabs: [
                {
                  slabRange: "0-10 kL",
                  ratePerKL: "₹ 6.00",
                  volume: "10",
                  amount: "₹ 60.00"
                },
                {
                  slabRange: "11-25 kL",
                  ratePerKL: "₹ 8.00",
                  volume: "6",
                  amount: "₹ 48.00"
                }
              ],
              totalVariableCharges: "₹ 108.00"
            },
            governmentCess: {
              waterCess: {
                description: "Water Conservation Cess @ 5%",
                amount: "₹ 11.40"
              },
              sewageCess: {
                description: "Sewage Maintenance Cess @ 10%",
                amount: "₹ 22.80"
              }
            },
            otherCharges: {
              meterMaintenanceCharges: {
                description: "Meter Maintenance Charges",
                amount: "₹ 10.00"
              }
            },
            rebates: {
              earlyPaymentRebate: {
                description: "Early Payment Rebate @ 1%",
                amount: "₹ 2.72"
              }
            }
          },
          billSummary: {
            currentBillCharges: "₹ 269.48",
            arrears: "₹ 0.00",
            interestOnArrears: "₹ 0.00",
            adjustments: "₹ 0.00",
            netAmountPayable: "₹ 269.48",
            roundedAmount: "₹ 269.00"
          }
        },
        paymentDetails: {
          paymentStatus: "Paid",
          paymentDate: "Apr 15, 2023",
          paymentMode: "Online Banking",
          paymentReference: "WSPAY-2023-87654",
          receiptNumber: "WSREC-2023-76543",
          paymentAmount: "₹ 269.00",
          payingBank: "HDFC Bank",
          transactionId: "HDFC23456789",
          processingFee: "₹ 0.00"
        },
        consumptionHistory: [
          {
            month: "Mar 2023",
            consumption: "16 kL",
            billAmount: "₹ 269.00"
          },
          {
            month: "Feb 2023",
            consumption: "15 kL",
            billAmount: "₹ 256.00"
          },
          {
            month: "Jan 2023",
            consumption: "17 kL",
            billAmount: "₹ 295.00"
          },
          {
            month: "Dec 2022",
            consumption: "20 kL",
            billAmount: "₹ 340.00"
          },
          {
            month: "Nov 2022",
            consumption: "19 kL",
            billAmount: "₹ 320.00"
          },
          {
            month: "Oct 2022",
            consumption: "18 kL",
            billAmount: "₹ 305.00"
          }
        ],
        billAdditionalDetails: {
          meterReader: "Rajesh Patil",
          billGeneratedBy: "Automated Billing System",
          remarks: "Regular reading",
          nextBillDueDate: "May 25, 2023 (Tentative)",
          paymentLocations: [
            "Online at watersupply.gov.in",
            "Mobile App",
            "Water Supply Department Office, Borivali West"
          ],
          helplineNumber: "1800-234-5678",
          grievanceEmail: "consumer-support@watersupply.gov.in"
        },
        qrCodeDetails: {
          qrCodeType: "Bharat QR",
          qrCodeData: "upi://pay?pa=watersupply@centralbank&pn=MMC%20Water%20Bill%20Payment&tr=WS202365432&am=269.00&cu=INR&mc=8512",
          validUntil: "Apr 25, 2023"
        },
        lastUpdated: "Apr 15, 2023"
      }
    };
  } catch (error) {
    console.error('Error fetching Water Supply bill details:', error);
    throw error;
  }
};

/**
 * Search water connections by address or consumer name
 * @param {string} searchText - Address or consumer name to search for
 * @param {string} searchType - Type of search ('address' or 'name')
 * @returns {Promise} - API response with connection search results
 */
export const searchWaterConnections = async (searchText, searchType = 'address') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return {
      success: true,
      source: "Water Supply Department",
      searchCriteria: {
        searchText,
        searchType
      },
      totalResults: searchType === 'name' ? 3 : 2,
      connections: searchType === 'name' ? [
        {
          consumerNumber: "WS-78901234",
          consumerName: "Ramesh Sharma",
          connectionAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Domestic",
          connectionCategory: "Individual Household",
          connectionStatus: "Active",
          lastBillDate: "Apr 05, 2023",
          lastBillAmount: "₹ 269.00",
          paymentStatus: "Paid"
        },
        {
          consumerNumber: "WS-89012345",
          consumerName: "Sharma Enterprises",
          connectionAddress: "Shop No. 12, Sunrise Commercial Complex, S.V. Road, Goregaon West, Mumbai - 400062",
          connectionType: "Commercial",
          connectionCategory: "Shop/Office",
          connectionStatus: "Active",
          lastBillDate: "Apr 08, 2023",
          lastBillAmount: "₹ 1,250.00",
          paymentStatus: "Paid"
        },
        {
          consumerNumber: "WS-90123456",
          consumerName: "Ramesh Sharma",
          connectionAddress: "Farm House 7, Green Acres, Manori Village, Borivali West, Mumbai - 400092",
          connectionType: "Domestic",
          connectionCategory: "Farm House",
          connectionStatus: "Active",
          lastBillDate: "Apr 05, 2023",
          lastBillAmount: "₹ 850.00",
          paymentStatus: "Due"
        }
      ] : [
        {
          consumerNumber: "WS-78901234",
          consumerName: "Ramesh Sharma",
          connectionAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Domestic",
          connectionCategory: "Individual Household",
          connectionStatus: "Active",
          lastBillDate: "Apr 05, 2023",
          lastBillAmount: "₹ 269.00",
          paymentStatus: "Paid"
        },
        {
          consumerNumber: "WS-01234567",
          consumerName: "Patel Housing Society",
          connectionAddress: "16/B, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          connectionType: "Bulk Supply",
          connectionCategory: "Housing Society",
          connectionStatus: "Active",
          lastBillDate: "Apr 07, 2023",
          lastBillAmount: "₹ 4,520.00",
          paymentStatus: "Paid"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Water Supply connections:', error);
    throw error;
  }
};

/**
 * Report a water supply issue or register a complaint
 * @param {Object} complaintData - Complaint data including type, description, etc.
 * @returns {Promise} - API response with complaint registration details
 */
export const reportWaterIssue = async (complaintData) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Generate a complaint ID
    const complaintId = `WSCOMP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Return mock data
    return {
      success: true,
      source: "Water Supply Department",
      message: "Complaint registered successfully",
      complaintDetails: {
        complaintId,
        registrationDateTime: new Date().toISOString(),
        consumerNumber: complaintData.consumerNumber || "WS-78901234",
        consumerName: complaintData.consumerName || "Ramesh Sharma",
        contactNumber: complaintData.contactNumber || "+91-9876543210",
        alternateContactNumber: complaintData.alternateContactNumber || "+91-9876123450",
        emailId: complaintData.emailId || "ramesh.sharma@email.com",
        complaintType: complaintData.complaintType || "No Water Supply",
        complaintDescription: complaintData.description || "No water supply since morning despite scheduled timing",
        complaintAddress: complaintData.address || "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
        landmarkDetails: complaintData.landmark || "Near Manori Beach Junction",
        status: "Registered",
        priority: "High",
        assignedTo: "Borivali Zone Water Supply Team",
        expectedResolutionTime: "Within 8 hours",
        trackingUrl: `https://watersupply.gov.in/track-complaint?id=${complaintId}`,
        additionalInformation: "Your complaint has been registered and assigned to the zonal team. Our field technician will contact you shortly. You will receive SMS updates on the status of your complaint."
      }
    };
  } catch (error) {
    console.error('Error reporting Water Supply issue:', error);
    throw error;
  }
};

/**
 * Get water quality test reports for an area
 * @param {string} areaCode - Area code or pincode
 * @param {string} testPeriod - Test period (e.g., 'last-month', 'last-quarter', 'last-year')
 * @returns {Promise} - API response with water quality test reports
 */
export const getWaterQualityReports = async (areaCode, testPeriod = 'last-month') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Return mock data
    return {
      success: true,
      source: "Water Supply Department",
      searchCriteria: {
        areaCode: areaCode || "400092",
        testPeriod
      },
      areaDetails: {
        areaName: "Borivali West",
        pincode: "400092",
        zone: "North Mumbai",
        waterSource: "Tansa Lake & Vihar Lake",
        treatmentPlant: "Bhandup Water Treatment Complex",
        distributionReservoir: "Borivali Reservoir",
        supervisingAuthority: "Mumbai Municipal Corporation - Water Supply Department"
      },
      qualityReports: [
        {
          reportId: "WQR-2023-04-1234",
          testDate: "2023-04-10",
          sampleCollectionPoint: "Sharma Residency Community Tap, Manori Road",
          collectionOfficer: "Sunil Kadam",
          testingLaboratory: "Municipal Water Testing Laboratory, Borivali",
          testingDate: "2023-04-11",
          parameters: {
            physical: {
              appearance: "Clear",
              color: "Colourless",
              odor: "Odourless",
              turbidity: "0.8 NTU",
              pH: "7.2",
              temperature: "26°C",
              conductivity: "320 µS/cm",
              totalDissolvedSolids: "220 mg/L"
            },
            chemical: {
              totalHardness: "180 mg/L",
              calcium: "45 mg/L",
              magnesium: "15 mg/L",
              chloride: "28 mg/L",
              fluoride: "0.8 mg/L",
              nitrate: "4.5 mg/L",
              sulfate: "22 mg/L",
              alkalinity: "120 mg/L",
              iron: "0.15 mg/L",
              residualChlorine: "0.5 mg/L"
            },
            microbiological: {
              totalColiform: "Absent",
              fecalColiform: "Absent",
              eColi: "Absent",
              heterotrophicPlateCounts: "<10 CFU/mL"
            }
          },
          complianceStatus: "Compliant",
          standardsReference: "BIS 10500:2012 - Drinking Water Specifications",
          remarks: "All parameters within permissible limits. Water suitable for drinking purposes.",
          nextScheduledTest: "2023-05-10"
        },
        {
          reportId: "WQR-2023-03-2345",
          testDate: "2023-03-10",
          sampleCollectionPoint: "Sharma Residency Community Tap, Manori Road",
          collectionOfficer: "Sunil Kadam",
          testingLaboratory: "Municipal Water Testing Laboratory, Borivali",
          testingDate: "2023-03-11",
          parameters: {
            physical: {
              appearance: "Clear",
              color: "Colourless",
              odor: "Odourless",
              turbidity: "0.9 NTU",
              pH: "7.3",
              temperature: "25°C",
              conductivity: "325 µS/cm",
              totalDissolvedSolids: "225 mg/L"
            },
            chemical: {
              totalHardness: "175 mg/L",
              calcium: "42 mg/L",
              magnesium: "16 mg/L",
              chloride: "30 mg/L",
              fluoride: "0.7 mg/L",
              nitrate: "4.2 mg/L",
              sulfate: "24 mg/L",
              alkalinity: "125 mg/L",
              iron: "0.16 mg/L",
              residualChlorine: "0.6 mg/L"
            },
            microbiological: {
              totalColiform: "Absent",
              fecalColiform: "Absent",
              eColi: "Absent",
              heterotrophicPlateCounts: "<10 CFU/mL"
            }
          },
          complianceStatus: "Compliant",
          standardsReference: "BIS 10500:2012 - Drinking Water Specifications",
          remarks: "All parameters within permissible limits. Water suitable for drinking purposes.",
          nextScheduledTest: "2023-04-10"
        }
      ],
      waterQualityTrend: {
        period: testPeriod,
        overallStatus: "Consistently Good",
        keyParameters: {
          turbidity: {
            range: "0.7-1.0 NTU",
            trend: "Stable",
            standardLimit: "5 NTU (max)"
          },
          pH: {
            range: "7.0-7.5",
            trend: "Stable",
            standardLimit: "6.5-8.5"
          },
          residualChlorine: {
            range: "0.4-0.7 mg/L",
            trend: "Stable",
            standardLimit: "0.2-1.0 mg/L"
          },
          bacteriologicalCompliance: {
            value: "100%",
            trend: "Stable",
            standardLimit: "Absence of coliform organisms"
          }
        },
        improvementAreas: [],
        recommendations: "Continue with existing treatment protocols. Maintain chlorination levels."
      },
      lastUpdated: "2023-04-15"
    };
  } catch (error) {
    console.error('Error fetching Water Quality reports:', error);
    throw error;
  }
}; 