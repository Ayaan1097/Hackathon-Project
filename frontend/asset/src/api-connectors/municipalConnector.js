import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const MUNICIPAL_API_BASE_URL = 'https://api.municipal.gov.in/v1';

/**
 * Fetch property details by municipal property ID
 * @param {string} propertyId - Municipal property ID
 * @returns {Promise} - API response with property details
 */
export const getPropertyDetails = async (propertyId) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${MUNICIPAL_API_BASE_URL}/properties/${propertyId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return {
      success: true,
      source: "Municipal Corporation",
      property: {
        propertyId: propertyId || "MCGM-PROP-123456",
        assessmentNumber: "PTA-MUM-2022-789012",
        propertyType: "Residential Building",
        buildingName: "Sunshine Apartments",
        address: {
          line1: "Plot No. 456/78, Sunshine Apartments",
          line2: "Main Street, Malad West",
          city: "Mumbai",
          district: "Mumbai Suburban",
          state: "Maharashtra",
          pincode: "400064"
        },
        ward: "P/North",
        zone: "Western Suburban",
        surveyNumber: "456/78",
        constructionDetails: {
          builtUpArea: "12000 sq ft",
          carpetArea: "10000 sq ft",
          constructionYear: "2012",
          floors: 8,
          units: 16,
          buildingType: "Multistorey Residential",
          constructionQuality: "RCC Framed Structure"
        },
        propertyOwner: {
          name: "Sunrise Developers Pvt Ltd",
          address: "101, Business Park, Andheri East, Mumbai - 400069",
          contactNumber: "+91-XXXXXXXXXX",
          email: "info@sunrisedevelopers.com"
        },
        occupancyStatus: "Fully Occupied",
        amenities: [
          "Parking",
          "Lift",
          "Garden",
          "Security",
          "Rainwater Harvesting"
        ],
        taxDetails: {
          currentAnnualValue: "₹ 15,00,000",
          propertyTaxRate: "5%",
          annualPropertyTax: "₹ 75,000",
          waterTax: "₹ 25,000",
          sewageTax: "₹ 15,000",
          totalTaxPayable: "₹ 1,15,000",
          taxPaidUpTo: "2023-03-31",
          arrears: "₹ 0"
        },
        approvals: {
          buildingPlanApproval: {
            approvalNumber: "BPA/MUM/2010/45678",
            approvalDate: "2010-05-20",
            approvedBy: "Deputy Chief Engineer (Building Proposals)",
            validityPeriod: "5 years"
          },
          completionCertificate: {
            certificateNumber: "CC/MUM/2012/87654",
            issueDate: "2012-08-15",
            issuedBy: "Assistant Engineer (Building Proposals)"
          },
          occupancyCertificate: {
            certificateNumber: "OC/MUM/2012/98765",
            issueDate: "2012-09-10",
            issuedBy: "Deputy Chief Engineer (Building Proposals)"
          }
        },
        compliances: {
          fireNOC: {
            nocNumber: "FIRE/MUM/2022/12345",
            issueDate: "2022-04-10",
            validUpto: "2023-04-09",
            status: "Active"
          },
          structuralAudit: {
            lastAuditDate: "2021-06-15",
            auditReport: "Building structurally safe",
            nextAuditDue: "2026-06-15"
          }
        },
        lastUpdated: "2022-10-05",
        status: "Active"
      }
    };
  } catch (error) {
    console.error('Error fetching Municipal Corporation property details:', error);
    throw error;
  }
};

/**
 * Fetch property tax details by property tax assessment number
 * @param {string} propertyTaxNumber - Property tax assessment number
 * @returns {Promise} - API response with property tax details
 */
export const getPropertyTaxDetails = async (propertyTaxNumber) => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${MUNICIPAL_API_BASE_URL}/property-tax/${propertyTaxNumber}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Return mock data
    return {
      success: true,
      source: "Municipal Corporation",
      propertyTaxDetails: {
        assessmentNumber: propertyTaxNumber || "PT-MUM-125789",
        propertyDetails: {
          municipalWardNumber: "W-25",
          zone: "North Zone",
          propertyAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          propertyType: "Residential",
          propertySubType: "Multi-story Building",
          constructionYear: "1998",
          builtUpArea: "3200 sq ft",
          carpetArea: "2560 sq ft",
          floorCount: 3,
          propertyUsage: "Self Occupied",
          plotArea: "4800 sq meters"
        },
        ownerDetails: {
          primaryOwner: {
            name: "Ramesh Sharma",
            contactNumber: "+91-9876543210",
            emailId: "ramesh.sharma@email.com",
            mailingAddress: "Same as Property Address"
          },
          additionalOwners: [
            {
              name: "Sunil Sharma",
              relation: "Son",
              sharePercentage: "25%"
            },
            {
              name: "Anil Sharma",
              relation: "Son",
              sharePercentage: "25%"
            }
          ]
        },
        assessmentDetails: {
          assessmentType: "Regular",
          annualRatableValue: "₹ 4,80,000",
          capitalValue: "₹ 2,40,00,000",
          applicableTaxRate: "12%",
          lastReassessmentDate: "2021-04-01",
          nextReassessmentDue: "2024-04-01",
          taxExemptions: "Senior Citizen Rebate - 5%",
          effectiveTaxRate: "11.4%"
        },
        taxHistory: [
          {
            financialYear: "2022-2023",
            assessedTax: "₹ 54,720",
            paymentStatus: "Paid",
            paymentDate: "2022-07-15",
            receiptNumber: "RC-2022-87654",
            paymentMode: "Online",
            earlyPaymentDiscount: "₹ 2,736",
            amountPaid: "₹ 51,984"
          },
          {
            financialYear: "2021-2022",
            assessedTax: "₹ 54,720",
            paymentStatus: "Paid",
            paymentDate: "2021-06-30",
            receiptNumber: "RC-2021-65432",
            paymentMode: "Online",
            earlyPaymentDiscount: "₹ 2,736",
            amountPaid: "₹ 51,984"
          },
          {
            financialYear: "2020-2021",
            assessedTax: "₹ 52,800",
            paymentStatus: "Paid",
            paymentDate: "2020-09-20",
            receiptNumber: "RC-2020-54321",
            paymentMode: "Cheque",
            earlyPaymentDiscount: "₹ 0",
            amountPaid: "₹ 52,800"
          }
        ],
        currentDueDetails: {
          financialYear: "2023-2024",
          assessedTax: "₹ 54,720",
          dueDate: "2023-12-31",
          earlyPaymentDiscountAvailable: "₹ 2,736 (if paid before 2023-09-30)",
          latePaymentPenalty: "2% per month after due date",
          paymentStatus: "Unpaid",
          billGenerationDate: "2023-04-15",
          billNumber: "BL-2023-98765"
        },
        propertyChangeHistory: [
          {
            changeType: "Reassessment",
            date: "2021-04-01",
            previousARV: "₹ 4,40,000",
            newARV: "₹ 4,80,000",
            changeReason: "General Revision",
            approvedBy: "Municipal Assessor"
          },
          {
            changeType: "Additional Construction",
            date: "2015-10-15",
            previousBuiltUpArea: "2400 sq ft",
            newBuiltUpArea: "3200 sq ft",
            changeReason: "Construction of additional floor",
            approvedBy: "Building Department"
          }
        ],
        utilityConnections: {
          waterConnection: {
            connectionNumber: "WC-45678",
            meterNumber: "WM-87654",
            connectionType: "Domestic",
            status: "Active"
          },
          sewerConnection: {
            connectionNumber: "SC-34567",
            connectionType: "Domestic",
            status: "Active"
          }
        },
        documents: [
          {
            documentType: "Property Tax Assessment Order",
            documentNumber: "PTA-2021-45678",
            issueDate: "2021-04-01",
            issuingAuthority: "Municipal Assessment Department"
          },
          {
            documentType: "Building Completion Certificate",
            documentNumber: "BCC-1998-12345",
            issueDate: "1998-06-15",
            issuingAuthority: "Municipal Building Department"
          },
          {
            documentType: "Property Registration Document",
            documentNumber: "REG-1998-34567",
            issueDate: "1998-05-20",
            issuingAuthority: "Sub-Registrar Office"
          }
        ],
        objectionHistory: [
          {
            objectionId: "OBJ-2021-1234",
            filingDate: "2021-05-10",
            applicantName: "Ramesh Sharma",
            objectionReason: "Incorrect calculation of built-up area",
            status: "Resolved",
            hearingDate: "2021-06-05",
            resolution: "Assessment revised",
            resolutionDate: "2021-06-20"
          }
        ],
        lastUpdated: "2023-04-15"
      }
    };
  } catch (error) {
    console.error('Error fetching Municipal Corporation property tax details:', error);
    throw error;
  }
};

/**
 * Fetch building plan approval details by property ID or approval number
 * @param {string} identifier - Property ID or approval number
 * @param {string} identifierType - Type of identifier ('propertyId' or 'approvalNumber')
 * @returns {Promise} - API response with building plan approval details
 */
export const getBuildingPlanApproval = async (identifier, identifierType = 'propertyId') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Return mock data
    return {
      success: true,
      source: "Municipal Corporation",
      buildingPlanApproval: {
        propertyId: identifierType === 'propertyId' ? identifier : "MCGM-PROP-123456",
        approvalNumber: identifierType === 'approvalNumber' ? identifier : "BPA/MUM/2010/45678",
        applicant: {
          name: "Sunrise Developers Pvt Ltd",
          address: "101, Business Park, Andheri East, Mumbai - 400069",
          contactNumber: "+91-XXXXXXXXXX",
          email: "info@sunrisedevelopers.com",
          licenseNumber: "DEV-MH-2005-12345"
        },
        propertyDetails: {
          plotAddress: "Plot No. 456/78, Main Street, Malad West, Mumbai - 400064",
          plotArea: "15000 sq ft",
          surveyNumber: "456/78",
          ward: "P/North",
          zone: "Residential"
        },
        proposedConstruction: {
          buildingType: "Multistorey Residential",
          builtUpArea: "12000 sq ft",
          carpetArea: "10000 sq ft",
          floorSpaceIndex: "1.8",
          floors: 8,
          units: 16,
          height: "28 meters",
          parking: {
            required: 16,
            provided: 20
          }
        },
        approvalStatus: "Approved",
        applicationDate: "2010-02-15",
        approvalDate: "2010-05-20",
        validityPeriod: "5 years",
        validUpto: "2015-05-19",
        approvedBy: "Deputy Chief Engineer (Building Proposals)",
        conditions: [
          "Construction to be completed within 5 years from approval date",
          "Provision for rainwater harvesting mandatory",
          "Solar water heaters to be installed",
          "Fire safety norms to be strictly followed",
          "No changes to approved plan without prior permission"
        ],
        fees: {
          scrutinyFee: "₹ 2,50,000",
          developmentCharges: "₹ 15,00,000",
          infrastructureFee: "₹ 7,50,000",
          premiumFSI: "₹ 25,00,000",
          laborCess: "₹ 5,00,000",
          totalPaid: "₹ 55,00,000",
          receiptNumber: "BPF/MUM/2010/12345",
          paymentDate: "2010-03-25"
        },
        revisions: [],
        documentReferences: [
          "Structural Plan",
          "Elevation Plan",
          "Section Plan",
          "Layout Plan",
          "Service Plan"
        ],
        remarks: "Approved as per DCR 2034",
        lastUpdated: "2010-05-20"
      }
    };
  } catch (error) {
    console.error('Error fetching Municipal Corporation building plan approval details:', error);
    throw error;
  }
};

/**
 * Search properties by address or owner name
 * @param {string} searchText - Address or owner name
 * @param {string} searchType - Type of search ('address' or 'owner')
 * @returns {Promise} - API response with search results
 */
export const searchProperties = async (searchText, searchType = 'address') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Return mock data
    return {
      success: true,
      source: "Municipal Corporation",
      searchCriteria: {
        searchText,
        searchType
      },
      totalResults: 3,
      properties: [
        {
          propertyId: "MCGM-PROP-123456",
          assessmentNumber: "PTA-MUM-2022-789012",
          propertyType: "Residential Building",
          buildingName: "Sunshine Apartments",
          address: "Plot No. 456/78, Main Street, Malad West, Mumbai - 400064",
          ward: "P/North",
          owner: "Sunrise Developers Pvt Ltd",
          builtUpArea: "12000 sq ft",
          yearOfConstruction: "2012",
          taxDetails: {
            annualValue: "₹ 15,00,000",
            annualTax: "₹ 92,160"
          }
        },
        {
          propertyId: "MCGM-PROP-234567",
          assessmentNumber: "PTA-MUM-2021-890123",
          propertyType: "Commercial Building",
          buildingName: "Sunrise Business Center",
          address: "Plot No. 123/45, Main Road, Goregaon East, Mumbai - 400063",
          ward: "P/South",
          owner: "Sunrise Developers Pvt Ltd",
          builtUpArea: "20000 sq ft",
          yearOfConstruction: "2018",
          taxDetails: {
            annualValue: "₹ 35,00,000",
            annualTax: "₹ 2,15,040"
          }
        },
        {
          propertyId: "MCGM-PROP-345678",
          assessmentNumber: "PTA-MUM-2020-901234",
          propertyType: "Residential Building",
          buildingName: "Sunrise Heights",
          address: "Plot No. 789/12, Cross Road, Kandivali West, Mumbai - 400067",
          ward: "R/South",
          owner: "Sunrise Developers Pvt Ltd",
          builtUpArea: "8000 sq ft",
          yearOfConstruction: "2015",
          taxDetails: {
            annualValue: "₹ 10,00,000",
            annualTax: "₹ 61,440"
          }
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Municipal Corporation properties:', error);
    throw error;
  }
};

/**
 * Fetch occupancy certificate details by property ID or certificate number
 * @param {string} identifier - Property ID or certificate number
 * @param {string} identifierType - Type of identifier ('propertyId' or 'certificateNumber')
 * @returns {Promise} - API response with occupancy certificate details
 */
export const getOccupancyCertificate = async (identifier, identifierType = 'propertyId') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Return mock data
    return {
      success: true,
      source: "Municipal Corporation",
      occupancyCertificate: {
        propertyId: identifierType === 'propertyId' ? identifier : "MCGM-PROP-123456",
        certificateNumber: identifierType === 'certificateNumber' ? identifier : "OC/MUM/2012/98765",
        buildingDetails: {
          buildingName: "Sunshine Apartments",
          address: "Plot No. 456/78, Main Street, Malad West, Mumbai - 400064",
          surveyNumber: "456/78",
          ward: "P/North",
          zone: "Residential"
        },
        developer: {
          name: "Sunrise Developers Pvt Ltd",
          address: "101, Business Park, Andheri East, Mumbai - 400069",
          licenseNumber: "DEV-MH-2005-12345"
        },
        buildingPlanDetails: {
          approvalNumber: "BPA/MUM/2010/45678",
          approvalDate: "2010-05-20"
        },
        completionCertificate: {
          certificateNumber: "CC/MUM/2012/87654",
          issueDate: "2012-08-15"
        },
        constructionDetails: {
          builtUpArea: "12000 sq ft",
          carpetArea: "10000 sq ft",
          floorSpaceIndex: "1.8",
          floors: 8,
          units: 16,
          height: "28 meters",
          startDate: "2010-07-10",
          completionDate: "2012-08-10"
        },
        certificateStatus: "Issued",
        issueDate: "2012-09-10",
        issuedBy: "Deputy Chief Engineer (Building Proposals)",
        inspectionDetails: {
          inspectionDate: "2012-08-25",
          inspectedBy: "Assistant Engineer (Building Proposals)",
          inspectionReport: "Construction completed as per approved plan"
        },
        compliances: {
          fireNOC: {
            status: "Complied",
            nocNumber: "FIRE/MUM/2012/23456",
            issueDate: "2012-08-05"
          },
          environmentalClearance: {
            status: "Complied",
            clearanceNumber: "EC/MH/2010/34567",
            issueDate: "2010-04-15"
          },
          liftCertificate: {
            status: "Complied",
            certificateNumber: "LIFT/MUM/2012/45678",
            issueDate: "2012-08-02"
          },
          rainwaterHarvesting: {
            status: "Complied",
            inspectionDate: "2012-08-25"
          }
        },
        remarks: "Building constructed as per approved plan and complies with all regulations",
        lastUpdated: "2012-09-10"
      }
    };
  } catch (error) {
    console.error('Error fetching Municipal Corporation occupancy certificate details:', error);
    throw error;
  }
};

/**
 * Fetch building permit details by permit number or property ID
 * @param {string} permitNumber - Building permit number
 * @param {string} propertyId - Property ID (optional alternative to permit number)
 * @returns {Promise} - API response with building permit details
 */
export const getBuildingPermitDetails = async (permitNumber, propertyId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 950));
    
    // Return mock data
    return {
      success: true,
      source: "Municipal Corporation",
      searchCriteria: permitNumber ? { permitNumber } : { propertyId },
      buildingPermitDetails: {
        permitNumber: permitNumber || "BP-2015-78901",
        applicationNumber: "BPA-2015-34567",
        propertyId: propertyId || "PT-MUM-125789",
        permitType: "Addition/Alteration",
        permitStatus: "Completed",
        projectDetails: {
          projectTitle: "Addition of Third Floor to Existing Structure",
          projectDescription: "Construction of additional residential floor (third floor) to existing two-storey structure",
          projectAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          zoneDetails: {
            zone: "Residential",
            floorSpaceIndex: "1.5",
            maximumHeight: "15 meters",
            setbackRequirements: {
              front: "3 meters",
              rear: "1.5 meters",
              side: "1.2 meters"
            }
          },
          projectArea: {
            plotArea: "4800 sq meters",
            existingBuiltUpArea: "2400 sq ft",
            proposedAdditionalArea: "800 sq ft",
            totalBuiltUpArea: "3200 sq ft"
          }
        },
        applicantDetails: {
          applicantName: "Ramesh Sharma",
          applicantType: "Property Owner",
          contactNumber: "+91-9876543210",
          emailId: "ramesh.sharma@email.com",
          correspondenceAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092"
        },
        professionalDetails: {
          architectName: "Prakash Architects",
          architectLicenseNumber: "ARCH-MH-5678",
          architectContactNumber: "+91-9876123450",
          structuralEngineerName: "Solid Structures Consultants",
          structuralEngineerLicenseNumber: "SE-MH-3456"
        },
        approvalTimeline: {
          applicationSubmissionDate: "2015-05-12",
          initialScrutinyDate: "2015-05-25",
          technicalScrutinyCompletionDate: "2015-06-15",
          publicNotificationDate: "2015-06-20",
          objectionPeriodEndDate: "2015-07-05",
          approvalCommitteeMeetingDate: "2015-07-20",
          permitIssuanceDate: "2015-07-25",
          permitValidityPeriod: "3 years",
          permitExpiryDate: "2018-07-24",
          constructionCompletionDate: "2016-04-18",
          occupancyCertificateIssuanceDate: "2016-05-10"
        },
        fees: {
          scrutinyFee: "₹ 25,000",
          developmentCharges: "₹ 80,000",
          infrastructureDevelopmentFee: "₹ 40,000",
          laborCess: "₹ 16,000",
          otherCharges: "₹ 12,000",
          totalFeesPaid: "₹ 1,73,000",
          paymentDetails: {
            receiptNumber: "FRC-2015-12345",
            paymentDate: "2015-06-05",
            paymentMode: "Demand Draft"
          }
        },
        approvals: [
          {
            approvalType: "Architectural Plan Approval",
            approvalAuthority: "Deputy Engineer (Building)",
            approvalDate: "2015-07-15",
            approvalReference: "APA-2015-3456"
          },
          {
            approvalType: "Structural Design Approval",
            approvalAuthority: "Executive Engineer (Building)",
            approvalDate: "2015-07-10",
            approvalReference: "SDA-2015-2345"
          },
          {
            approvalType: "Fire Safety NOC",
            approvalAuthority: "Chief Fire Officer",
            approvalDate: "2015-07-05",
            approvalReference: "FIRE-NOC-2015-1234"
          },
          {
            approvalType: "Environmental Clearance",
            approvalAuthority: "Not Applicable for this scale",
            approvalDate: "Not Applicable",
            approvalReference: "Not Applicable"
          }
        ],
        inspections: [
          {
            inspectionType: "Foundation",
            inspectionDate: "2015-09-10",
            inspectorName: "Nilesh Patil",
            inspectorDesignation: "Assistant Engineer",
            status: "Approved",
            remarks: "Foundation work as per approved plans"
          },
          {
            inspectionType: "Plinth",
            inspectionDate: "2015-10-15",
            inspectorName: "Nilesh Patil",
            inspectorDesignation: "Assistant Engineer",
            status: "Approved",
            remarks: "Plinth construction satisfactory"
          },
          {
            inspectionType: "Mid-construction",
            inspectionDate: "2016-01-20",
            inspectorName: "Suresh Jadhav",
            inspectorDesignation: "Assistant Engineer",
            status: "Approved with conditions",
            remarks: "Ensure proper curing of concrete. Rest satisfactory."
          },
          {
            inspectionType: "Final",
            inspectionDate: "2016-04-25",
            inspectorName: "Rajesh Sharma",
            inspectorDesignation: "Deputy Engineer",
            status: "Approved",
            remarks: "Construction completed as per approved plans"
          }
        ],
        deviations: [
          {
            deviationType: "Minor Interior Layout Change",
            deviationDescription: "Modification in bathroom layout",
            compoundingFee: "₹ 5,000",
            approvalStatus: "Approved after compounding",
            approvalDate: "2016-04-20"
          }
        ],
        occupancyCertificate: {
          certificateNumber: "OC-2016-4567",
          issueDate: "2016-05-10",
          issuingAuthority: "Executive Engineer (Building)",
          certificateType: "Partial Occupancy",
          remarks: "Occupancy granted for residential use of additional floor"
        },
        attachedDocuments: [
          {
            documentType: "Approved Building Plans",
            documentNumber: "BP-2015-78901-PLANS",
            uploadDate: "2015-07-26"
          },
          {
            documentType: "Structural Stability Certificate",
            documentNumber: "SSC-2015-3456",
            uploadDate: "2015-07-05"
          },
          {
            documentType: "Completion Certificate",
            documentNumber: "CC-2016-2345",
            uploadDate: "2016-04-20"
          }
        ],
        remarks: "Project completed within stipulated time. All inspections passed with minor deviations that were regularized."
      }
    };
  } catch (error) {
    console.error('Error fetching Municipal Corporation building permit details:', error);
    throw error;
  }
};

/**
 * Search properties by address or owner name in municipal records
 * @param {string} searchText - Address or owner name to search for
 * @param {string} searchType - Type of search ('address' or 'owner')
 * @returns {Promise} - API response with property search results
 */
export const searchMunicipalProperties = async (searchText, searchType = 'address') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      success: true,
      source: "Municipal Corporation",
      searchCriteria: {
        searchText,
        searchType
      },
      totalResults: searchType === 'owner' ? 3 : 2,
      properties: searchType === 'owner' ? [
        {
          propertyTaxNumber: "PT-MUM-125789",
          propertyAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          ownerName: "Ramesh Sharma",
          propertyType: "Residential",
          zone: "North Zone",
          wardNumber: "W-25",
          taxStatus: "Paid up to date",
          lastAssessmentYear: "2021-2022",
          lastPaymentDate: "2022-07-15"
        },
        {
          propertyTaxNumber: "PT-MUM-125790",
          propertyAddress: "Shop No. 12, Sunrise Commercial Complex, S.V. Road, Goregaon West, Mumbai - 400062",
          ownerName: "Sharma Brothers Enterprise",
          propertyType: "Commercial",
          zone: "West Zone",
          wardNumber: "W-19",
          taxStatus: "Paid up to date",
          lastAssessmentYear: "2021-2022",
          lastPaymentDate: "2022-06-28"
        },
        {
          propertyTaxNumber: "PT-MUM-136254",
          propertyAddress: "Farm House 7, Green Acres, Manori Village, Borivali West, Mumbai - 400092",
          ownerName: "Ramesh Sharma",
          propertyType: "Farm House",
          zone: "North Zone",
          wardNumber: "W-25",
          taxStatus: "Dues pending",
          lastAssessmentYear: "2021-2022",
          lastPaymentDate: "2021-08-10"
        }
      ] : [
        {
          propertyTaxNumber: "PT-MUM-125789",
          propertyAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          ownerName: "Ramesh Sharma",
          propertyType: "Residential",
          zone: "North Zone",
          wardNumber: "W-25",
          taxStatus: "Paid up to date",
          lastAssessmentYear: "2021-2022",
          lastPaymentDate: "2022-07-15"
        },
        {
          propertyTaxNumber: "PT-MUM-125791",
          propertyAddress: "16/B, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          ownerName: "Patel Housing Society",
          propertyType: "Residential",
          zone: "North Zone",
          wardNumber: "W-25",
          taxStatus: "Paid up to date",
          lastAssessmentYear: "2021-2022",
          lastPaymentDate: "2022-05-20"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Municipal Corporation properties:', error);
    throw error;
  }
};

/**
 * Get property zoning and land use details by property ID or address
 * @param {string} propertyId - Property ID
 * @param {string} address - Property address (optional alternative to property ID)
 * @returns {Promise} - API response with zoning and land use details
 */
export const getZoningDetails = async (propertyId, address) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 750));
    
    // Return mock data
    return {
      success: true,
      source: "Municipal Corporation",
      searchCriteria: propertyId ? { propertyId } : { address },
      zoningDetails: {
        propertyId: propertyId || "PT-MUM-125789",
        propertyAddress: address || "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
        developmentPlanDetails: {
          developmentPlanName: "Mumbai Development Plan 2034",
          planSanctionDate: "2018-05-08",
          lastRevisionDate: "2021-11-15",
          planReferenceNumber: "DP-MUM-2034-N25"
        },
        zoning: {
          zone: "Residential",
          subZone: "R2 - Medium Density Residential",
          specialControlZone: "Coastal Regulation Zone II",
          overlayZones: [
            "Heritage Precinct Buffer Zone (Grade III)"
          ],
          zoneDescription: "Medium density residential zone permitting residential buildings up to 24m height subject to FSI restrictions and other development control regulations"
        },
        permittedLandUse: {
          primaryUse: "Residential",
          conditionalUses: [
            "Professional Offices (up to 25% of built area)",
            "Neighborhood Retail (up to 20% of built area)",
            "Educational Institutions (with special permission)"
          ],
          prohibitedUses: [
            "Industrial",
            "Heavy Commercial",
            "Entertainment Venues",
            "Warehousing/Storage"
          ]
        },
        developmentRegulations: {
          floorSpaceIndex: {
            baseFSI: "1.0",
            premiumFSI: "0.5",
            tdrAllowance: "0.5",
            maximumPermissibleFSI: "2.0",
            consumedFSI: "1.5"
          },
          coverageAndHeight: {
            maximumGroundCoverage: "60%",
            actualGroundCoverage: "45%",
            maximumHeight: "24 meters",
            actualHeight: "15 meters",
            maximumFloors: "7",
            actualFloors: "3"
          },
          setbacks: {
            frontSetback: "4.5 meters",
            rearSetback: "3.0 meters",
            sideSetback1: "2.0 meters",
            sideSetback2: "2.0 meters"
          },
          parkingRequirements: {
            residentialParkingNorm: "1 space per dwelling unit",
            requiredParkingSpaces: "4",
            providedParkingSpaces: "4"
          }
        },
        specialProvisions: {
          coastalRegulationZone: {
            crzCategory: "CRZ II",
            restrictionsApplicable: "Construction permitted on landward side of existing road",
            clearanceStatus: "CRZ clearance obtained on 2015-04-10",
            clearanceReferenceNumber: "CRZ-MH-2015-456"
          },
          heritageProvisions: {
            heritagePrecinct: "Manori Village Heritage Precinct",
            heritagePrecintGrade: "Grade III (Buffer Zone)",
            restrictions: "Special architectural considerations for facade treatment",
            heritageCommitteeApproval: "Not Required (Buffer Zone only)"
          }
        },
        infrastructureAvailability: {
          waterSupply: "Municipal Water Supply Available",
          sewerage: "Connected to Municipal Sewerage System",
          drainage: "Connected to Municipal Storm Water Drainage",
          solidWasteManagement: "Door-to-door Collection by Municipal Corporation"
        },
        environmentalConsiderations: {
          environmentalClearance: {
            ecRequired: "No (Built-up area less than threshold)",
            ecStatus: "Not Applicable"
          },
          trees: {
            existingTreeCount: "8",
            protectedTrees: "2",
            treeRemovalPermission: "Not Applicable"
          }
        },
        additionalRemarks: "Property is in compliance with current zoning regulations. Any further vertical expansion would require additional permissions due to CRZ restrictions.",
        lastUpdated: "2022-03-15"
      }
    };
  } catch (error) {
    console.error('Error fetching Municipal Corporation zoning details:', error);
    throw error;
  }
};

/**
 * Get water and utility connection details by consumer number or property ID
 * @param {string} consumerNumber - Water/utility consumer number
 * @param {string} propertyId - Property ID (optional alternative to consumer number)
 * @returns {Promise} - API response with utility connection details
 */
export const getUtilityConnectionDetails = async (consumerNumber, propertyId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Return mock data
    return {
      success: true,
      source: "Municipal Corporation",
      searchCriteria: consumerNumber ? { consumerNumber } : { propertyId },
      utilityConnections: {
        propertyDetails: {
          propertyId: propertyId || "PT-MUM-125789",
          propertyAddress: "15/A, Sharma Residency, Manori Road, Borivali West, Mumbai - 400092",
          ownerName: "Ramesh Sharma",
          wardNumber: "W-25",
          zone: "North Zone"
        },
        waterConnection: {
          consumerNumber: consumerNumber || "WC-45678",
          connectionStatus: "Active",
          connectionType: "Domestic",
          meterDetails: {
            meterNumber: "WM-87654",
            meterType: "Digital",
            meterSize: "15mm",
            installationDate: "2010-08-15",
            lastMeterReading: "1567 units",
            lastMeterReadingDate: "2023-03-15",
            averageMonthlyConsumption: "32 units"
          },
          connectionDetails: {
            connectionDate: "1998-06-20",
            connectionCategory: "Residential",
            supplyPressureCategory: "Medium Pressure",
            supplyDuration: "4 hours (5 AM to 7 AM, 6 PM to 8 PM)",
            waterSource: "Tulsi Lake Water Treatment Plant",
            supplyZone: "Borivali Water Supply Zone"
          },
          billingDetails: {
            tariffCategory: "Residential",
            baseRate: "₹ 6 per 1000 liters",
            currentBillingCycle: "Apr 2023 - Jun 2023",
            averageQuarterlyBill: "₹ 2,300",
            lastBillAmount: "₹ 2,256",
            lastBillDate: "2023-01-15",
            lastPaymentAmount: "₹ 2,256",
            lastPaymentDate: "2023-02-10",
            paymentStatus: "Paid up to date"
          },
          maintenanceHistory: [
            {
              workType: "Meter Replacement",
              workOrderNumber: "WO-2020-3456",
              workDate: "2020-08-10",
              workDescription: "Replacement of analog meter with digital meter",
              executedBy: "Municipal Water Department"
            },
            {
              workType: "Connection Repair",
              workOrderNumber: "WO-2018-6789",
              workDate: "2018-05-12",
              workDescription: "Repair of leakage in connection pipe",
              executedBy: "Municipal Water Department"
            }
          ]
        },
        sewerConnection: {
          consumerNumber: "SC-34567",
          connectionStatus: "Active",
          connectionType: "Domestic",
          connectionDetails: {
            connectionDate: "1998-06-25",
            sewerLineSize: "150mm",
            connectionCategory: "Residential",
            sewerTreatmentPlant: "Malad Sewage Treatment Plant"
          },
          billingDetails: {
            tariffCategory: "Residential",
            billingMethod: "Percentage of Water Charges (60%)",
            currentBillingCycle: "Apr 2023 - Jun 2023",
            lastBillAmount: "₹ 1,354",
            lastBillDate: "2023-01-15",
            lastPaymentAmount: "₹ 1,354",
            lastPaymentDate: "2023-02-10",
            paymentStatus: "Paid up to date"
          },
          maintenanceHistory: [
            {
              workType: "Connection Cleaning",
              workOrderNumber: "WO-2021-7890",
              workDate: "2021-11-10",
              workDescription: "Cleaning of blocked connection pipe",
              executedBy: "Municipal Sewerage Department"
            }
          ]
        },
        solidWasteManagement: {
          registrationNumber: "SWM-78901",
          serviceType: "Door-to-door Collection",
          serviceProvider: "Municipal Corporation",
          collectionFrequency: "Daily",
          collectionSchedule: "Morning (7 AM to 8 AM)",
          wasteSegregationStatus: "Compliant",
          monthlyCharges: "₹ 150",
          paymentStatus: "Included in Property Tax"
        },
        stormWaterDrainage: {
          connectionStatus: "Connected",
          drainageBasin: "Borivali West Drainage Basin",
          nearestStormWaterDrain: "Manori Road Main Drain",
          floodRiskZone: "Low Risk"
        },
        documents: [
          {
            documentType: "Water Connection Application",
            documentNumber: "WCA-1998-2345",
            issueDate: "1998-05-15",
            status: "Approved"
          },
          {
            documentType: "Sewerage Connection Approval",
            documentNumber: "SCA-1998-3456",
            issueDate: "1998-06-05",
            status: "Approved"
          }
        ],
        inspectionHistory: [
          {
            inspectionType: "Water Quality Check",
            inspectionDate: "2022-10-15",
            inspectorName: "Sanjay Gupta",
            inspectionResult: "Compliant",
            remarks: "Water quality parameters within permissible limits"
          },
          {
            inspectionType: "Water Meter Accuracy Check",
            inspectionDate: "2021-06-20",
            inspectorName: "Priya Sharma",
            inspectionResult: "Compliant",
            remarks: "Meter functioning with acceptable accuracy"
          }
        ],
        lastUpdated: "2023-03-15"
      }
    };
  } catch (error) {
    console.error('Error fetching Municipal Corporation utility connection details:', error);
    throw error;
  }
}; 