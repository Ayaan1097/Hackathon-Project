import axios from 'axios';

// Mock API URL (in a real app, this would be the actual API endpoint)
const LAND_RECORDS_API_BASE_URL = 'https://api.landrecords.gov.in/v1';

/**
 * Fetch land record details by survey number, plot number, or khata number
 * @param {string} recordId - Survey/plot/khata number to search for
 * @param {string} recordType - Type of record identifier ('survey', 'plot', 'khata')
 * @returns {Promise} - API response with land record details
 */
export const getLandRecordDetails = async (recordId, recordType = 'survey') => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await axios.get(`${LAND_RECORDS_API_BASE_URL}/landrecords/${recordType}/${recordId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Return mock data
    return {
      success: true,
      source: "Land Records Department",
      landRecord: {
        recordIdentifier: {
          type: recordType,
          value: recordId || "123/45-A"
        },
        landDetails: {
          surveyNumber: recordType === 'survey' ? recordId : "123/45-A",
          plotNumber: recordType === 'plot' ? recordId : "P-789",
          khataNumber: recordType === 'khata' ? recordId : "KH-456-78",
          landType: "Residential",
          area: {
            value: "4800",
            unit: "sq meters"
          },
          location: {
            village: "Manori",
            tehsil: "Borivali",
            district: "Mumbai Suburban",
            state: "Maharashtra"
          },
          boundaries: {
            east: "State Highway 42",
            west: "Municipal Road",
            north: "Survey No. 123/44-B",
            south: "Survey No. 123/46-A"
          }
        },
        ownershipDetails: {
          currentOwner: {
            name: "Sharma Family (Joint Ownership)",
            ownershipType: "Joint Family Property",
            ownershipPercentage: "100%",
            acquisitionMode: "Ancestral Property",
            ownershipDate: "1965-08-20"
          },
          coOwners: [
            {
              name: "Ramesh Sharma",
              relation: "Head of Family",
              sharePercentage: "50%"
            },
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
          ],
          possessionStatus: "Self Occupied and Part Under Development",
          encumbrances: "Part of land under development agreement",
          disputeStatus: "No active disputes"
        },
        mutationHistory: [
          {
            mutationNumber: "MUT-2010-45678",
            date: "2010-02-15",
            previousOwner: "Late Mohan Lal Sharma",
            newOwner: "Sharma Family (Joint Ownership)",
            reason: "Succession/Inheritance",
            remarks: "Transfer after death of previous owner"
          },
          {
            mutationNumber: "MUT-1985-23456",
            date: "1985-07-10",
            previousOwner: "Govind Sharma",
            newOwner: "Mohan Lal Sharma",
            reason: "Family Partition",
            remarks: "Partition of ancestral property"
          }
        ],
        landUse: {
          approvedUse: "Residential",
          currentUse: "Residential with partial construction",
          landUseRestrictions: "Coastal Regulation Zone II regulations apply",
          floorSpaceIndex: "1.5",
          maximumConstructionArea: "7200 sq meters"
        },
        taxDetails: {
          landRevenueStatus: "Paid up to date",
          lastPaymentDate: "2022-04-10",
          annualLandRevenue: "₹ 12,500",
          arrears: "Nil",
          nextDueDate: "2023-03-31"
        },
        developmentDetails: {
          developmentStatus: "Partial Development Agreement",
          developmentRights: "Partial transfer to Sunrise Developers Pvt Ltd",
          agreementReference: "DA-2010-7890",
          agreementDate: "2010-03-12",
          developmentType: "Residential Apartment Complex",
          approvalStatus: "Approved by Planning Authority"
        },
        attachedDocuments: [
          {
            documentType: "Original Land Title Deed",
            documentNumber: "TD-1965-12345",
            issuanceDate: "1965-08-20",
            issuingAuthority: "Land Revenue Department"
          },
          {
            documentType: "Development Agreement",
            documentNumber: "DA-2010-7890",
            issuanceDate: "2010-03-12",
            issuingAuthority: "Sub-Registrar Office Mumbai"
          },
          {
            documentType: "Succession Certificate",
            documentNumber: "SC-2010-3456",
            issuanceDate: "2010-01-05",
            issuingAuthority: "Civil Court Mumbai"
          }
        ],
        certificationDetails: {
          recordStatus: "Active and Valid",
          lastVerifiedDate: "2022-01-15",
          digitalSignature: {
            signedBy: "Deputy Tehsildar",
            signatureTimestamp: "2022-01-15T11:25:30+05:30",
            validationHash: "f58e512be97e8109a1d154ba54a67bdc9f97af79b4e432d5060b5489278f08aa"
          }
        },
        lastUpdated: "2022-01-15"
      }
    };
  } catch (error) {
    console.error('Error fetching Land Records Department record details:', error);
    throw error;
  }
};

/**
 * Search land records by owner name
 * @param {string} ownerName - Owner name to search for
 * @returns {Promise} - API response with land records search results
 */
export const searchLandRecordsByOwner = async (ownerName) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      success: true,
      source: "Land Records Department",
      searchCriteria: {
        ownerName
      },
      totalResults: 3,
      landRecords: [
        {
          recordIdentifier: {
            type: "survey",
            value: "123/45-A"
          },
          landType: "Residential",
          area: "4800 sq meters",
          location: "Manori, Borivali, Mumbai Suburban, Maharashtra",
          ownerName: "Sharma Family (Joint Ownership)",
          ownershipType: "Joint Family Property",
          ownershipPercentage: "100%",
          currentUse: "Residential with partial construction",
          mutationNumber: "MUT-2010-45678",
          lastUpdated: "2022-01-15"
        },
        {
          recordIdentifier: {
            type: "survey",
            value: "123/50-C"
          },
          landType: "Agricultural",
          area: "12000 sq meters",
          location: "Manori, Borivali, Mumbai Suburban, Maharashtra",
          ownerName: "Sharma Family (Joint Ownership)",
          ownershipType: "Joint Family Property",
          ownershipPercentage: "100%",
          currentUse: "Agricultural (Rice Cultivation)",
          mutationNumber: "MUT-2010-45679",
          lastUpdated: "2022-01-15"
        },
        {
          recordIdentifier: {
            type: "survey",
            value: "78/12-B"
          },
          landType: "Commercial",
          area: "1200 sq meters",
          location: "Goregaon, Mumbai Suburban, Maharashtra",
          ownerName: "Sharma Brothers Enterprise",
          ownershipType: "Partnership Firm",
          ownershipPercentage: "100%",
          currentUse: "Commercial Shop Complex",
          mutationNumber: "MUT-2015-56789",
          lastUpdated: "2021-06-10"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Land Records Department records by owner:', error);
    throw error;
  }
};

/**
 * Search land records by location (village/tehsil/district)
 * @param {string} locationSearchText - Location text to search for
 * @returns {Promise} - API response with land records search results
 */
export const searchLandRecordsByLocation = async (locationSearchText) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 950));
    
    // Return mock data
    return {
      success: true,
      source: "Land Records Department",
      searchCriteria: {
        locationSearchText
      },
      totalResults: 5,
      landRecords: [
        {
          recordIdentifier: {
            type: "survey",
            value: "123/45-A"
          },
          landType: "Residential",
          area: "4800 sq meters",
          location: "Manori, Borivali, Mumbai Suburban, Maharashtra",
          ownerName: "Sharma Family (Joint Ownership)",
          ownershipType: "Joint Family Property",
          currentUse: "Residential with partial construction",
          lastUpdated: "2022-01-15"
        },
        {
          recordIdentifier: {
            type: "survey",
            value: "123/46-A"
          },
          landType: "Residential",
          area: "5200 sq meters",
          location: "Manori, Borivali, Mumbai Suburban, Maharashtra",
          ownerName: "Patel Housing Society",
          ownershipType: "Society Ownership",
          currentUse: "Residential Society",
          lastUpdated: "2021-11-05"
        },
        {
          recordIdentifier: {
            type: "survey",
            value: "123/47-B"
          },
          landType: "Commercial",
          area: "3500 sq meters",
          location: "Manori, Borivali, Mumbai Suburban, Maharashtra",
          ownerName: "Coastal Developers Pvt Ltd",
          ownershipType: "Corporate Ownership",
          currentUse: "Commercial Complex",
          lastUpdated: "2022-02-20"
        },
        {
          recordIdentifier: {
            type: "survey",
            value: "123/50-C"
          },
          landType: "Agricultural",
          area: "12000 sq meters",
          location: "Manori, Borivali, Mumbai Suburban, Maharashtra",
          ownerName: "Sharma Family (Joint Ownership)",
          ownershipType: "Joint Family Property",
          currentUse: "Agricultural (Rice Cultivation)",
          lastUpdated: "2022-01-15"
        },
        {
          recordIdentifier: {
            type: "survey",
            value: "123/51-A"
          },
          landType: "Agricultural",
          area: "8500 sq meters",
          location: "Manori, Borivali, Mumbai Suburban, Maharashtra",
          ownerName: "Maharashtra State Agricultural Department",
          ownershipType: "Government",
          currentUse: "Agricultural Research Station",
          lastUpdated: "2021-08-30"
        }
      ]
    };
  } catch (error) {
    console.error('Error searching Land Records Department records by location:', error);
    throw error;
  }
};

/**
 * Get record of rights (RoR)/7/12 extract by survey number
 * @param {string} surveyNumber - Survey number to get RoR for
 * @returns {Promise} - API response with record of rights extract
 */
export const getRecordOfRights = async (surveyNumber) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Return mock data
    return {
      success: true,
      source: "Land Records Department",
      recordOfRights: {
        documentTitle: "Record of Rights (7/12 Extract)",
        documentId: "RoR-" + surveyNumber,
        surveyNumber: surveyNumber || "123/45-A",
        fiscalYear: "2022-2023",
        landIdentification: {
          village: "Manori",
          tehsil: "Borivali",
          district: "Mumbai Suburban",
          state: "Maharashtra",
          plotNumber: "P-789",
          khataNumber: "KH-456-78"
        },
        landDetails: {
          area: "4800 sq meters",
          landType: "Residential",
          landClassification: "Non-Agricultural (NA)",
          assessmentDetails: {
            assessmentValue: "₹ 2,40,00,000",
            assessmentDate: "2021-04-15",
            annualLandRevenue: "₹ 12,500"
          },
          irrigationSource: "None",
          cropsGrown: "None (Non-Agricultural Land)"
        },
        rightsHolders: [
          {
            name: "Ramesh Sharma",
            relation: "Head of Family",
            sharePercentage: "50%",
            rightsType: "Occupant Class I",
            possessionType: "Direct Possession",
            entryDate: "2010-02-15"
          },
          {
            name: "Sunil Sharma",
            relation: "Son",
            sharePercentage: "25%",
            rightsType: "Occupant Class I",
            possessionType: "Direct Possession",
            entryDate: "2010-02-15"
          },
          {
            name: "Anil Sharma",
            relation: "Son",
            sharePercentage: "25%",
            rightsType: "Occupant Class I",
            possessionType: "Direct Possession",
            entryDate: "2010-02-15"
          }
        ],
        encumbrances: [
          {
            type: "Development Agreement",
            with: "Sunrise Developers Pvt Ltd",
            documentNumber: "DA-2010-7890",
            documentDate: "2010-03-12",
            particulars: "Development agreement for residential project on portion of land",
            entryDate: "2010-04-02"
          }
        ],
        mutationEntries: [
          {
            mutationNumber: "MUT-2010-45678",
            date: "2010-02-15",
            previousOwner: "Late Mohan Lal Sharma",
            newOwner: "Sharma Family (Joint Ownership)",
            reason: "Succession/Inheritance",
            orderReference: "SDO-2010-345",
            orderDate: "2010-01-30"
          },
          {
            mutationNumber: "MUT-1985-23456",
            date: "1985-07-10",
            previousOwner: "Govind Sharma",
            newOwner: "Mohan Lal Sharma",
            reason: "Family Partition",
            orderReference: "SDO-1985-678",
            orderDate: "1985-06-25"
          }
        ],
        governmentOrders: [
          {
            orderType: "Land Use Conversion",
            orderNumber: "NA-2005-7890",
            orderDate: "2005-11-22",
            issuingAuthority: "District Collector",
            particulars: "Conversion from Agricultural to Non-Agricultural (Residential) use"
          }
        ],
        certification: {
          issuedOn: "2022-07-10",
          validUntil: "2022-10-10",
          issuedBy: "Talathi, Manori",
          digitallySigned: true,
          signatureDetails: {
            signedBy: "Rajendra Patil",
            designation: "Talathi",
            signatureTimestamp: "2022-07-10T13:45:22+05:30"
          },
          verificationURL: "https://landrecords.maharashtra.gov.in/verify?doc=RoR-123-45-A&hash=7d9bd65a0df...",
          qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
          documentHash: "7d9bd65a0dfc3c3f4d77e9605b3682ee0eb4c8429c07364530f584a988118d52"
        },
        remarks: "Land partially under development. Coastal Regulation Zone II regulations apply."
      }
    };
  } catch (error) {
    console.error('Error fetching Land Records Department record of rights:', error);
    throw error;
  }
};

/**
 * Get mutation details by mutation number
 * @param {string} mutationNumber - Mutation number to get details for
 * @returns {Promise} - API response with mutation details
 */
export const getMutationDetails = async (mutationNumber) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return {
      success: true,
      source: "Land Records Department",
      mutationDetails: {
        mutationNumber: mutationNumber || "MUT-2010-45678",
        mutationType: "Succession/Inheritance",
        applicationDetails: {
          applicationNumber: "MA-2009-34567",
          applicationDate: "2009-12-05",
          applicantName: "Ramesh Sharma",
          applicantRelation: "Son",
          applicationStatus: "Approved",
          applicationRemarks: "Application for succession after death of owner"
        },
        propertyDetails: {
          surveyNumber: "123/45-A",
          village: "Manori",
          tehsil: "Borivali",
          district: "Mumbai Suburban",
          state: "Maharashtra",
          area: "4800 sq meters",
          landType: "Residential"
        },
        ownershipTransfer: {
          previousOwner: {
            name: "Late Mohan Lal Sharma",
            ownershipType: "Sole Ownership",
            ownershipPeriod: "1985-07-10 to 2009-11-12",
            documentReference: "Transfer from Govind Sharma vide MUT-1985-23456"
          },
          newOwner: {
            name: "Sharma Family (Joint Ownership)",
            ownershipType: "Joint Family Property",
            effectiveFrom: "2010-02-15",
            documentReference: "Succession Certificate SC-2010-3456"
          },
          transferReason: "Death of previous owner (Succession/Inheritance)",
          transferMode: "Legal Inheritance as per Hindu Succession Act"
        },
        processingDetails: {
          submissionDate: "2009-12-05",
          fieldVerificationDate: "2010-01-10",
          fieldVerificationOfficer: "Revenue Inspector, Manori Circle",
          fieldVerificationRemarks: "Verified family members and property details",
          publicNoticeDate: "2010-01-15",
          objectionPeriodEnd: "2010-01-30",
          objectionsReceived: "None",
          hearingDate: "Not Applicable (No Objections)",
          orderDetails: {
            orderNumber: "SDO-2010-345",
            orderDate: "2010-01-30",
            issuingAuthority: "Sub-Divisional Officer, Borivali",
            orderSummary: "Mutation approved based on verified succession documents"
          }
        },
        supportingDocuments: [
          {
            documentType: "Death Certificate",
            documentNumber: "DC-2009-45678",
            issuingAuthority: "Municipal Corporation of Greater Mumbai",
            issueDate: "2009-11-20"
          },
          {
            documentType: "Succession Certificate",
            documentNumber: "SC-2010-3456",
            issuingAuthority: "Civil Court Mumbai",
            issueDate: "2010-01-05"
          },
          {
            documentType: "Legal Heir Certificate",
            documentNumber: "LH-2009-7890",
            issuingAuthority: "Tehsildar Office, Borivali",
            issueDate: "2009-12-15"
          },
          {
            documentType: "Notarized Affidavit",
            documentNumber: "NA-2009-34567",
            issuingAuthority: "Notary Public, Mumbai",
            issueDate: "2009-12-02"
          }
        ],
        mutationEntryDate: "2010-02-15",
        mutationApprovedBy: {
          name: "S.K. Jadhav",
          designation: "Sub-Divisional Officer",
          office: "Borivali Sub-Division",
          digitalSignature: {
            signedBy: "S.K. Jadhav",
            signatureTimestamp: "2010-02-15T11:30:45+05:30"
          }
        },
        mutationStatus: "Completed",
        remarks: "Mutation process completed without any objections. Updated in land records."
      }
    };
  } catch (error) {
    console.error('Error fetching Land Records Department mutation details:', error);
    throw error;
  }
};

/**
 * Get land map/cadastral map by survey number
 * @param {string} surveyNumber - Survey number to get map for
 * @returns {Promise} - API response with land map details
 */
export const getLandMap = async (surveyNumber) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Return mock data
    return {
      success: true,
      source: "Land Records Department",
      landMapDetails: {
        mapTitle: "Cadastral Map",
        surveyNumber: surveyNumber || "123/45-A",
        mapId: "MAP-" + (surveyNumber || "123/45-A"),
        mapScale: "1:1000",
        mapType: "Digital Cadastral Map",
        villageMapReference: "VM-MAN-2020",
        location: {
          village: "Manori",
          tehsil: "Borivali",
          district: "Mumbai Suburban",
          state: "Maharashtra"
        },
        georeference: {
          coordinates: {
            latitude: "19.2087 N",
            longitude: "72.7951 E"
          },
          projectionSystem: "WGS 84 / UTM zone 43N",
          boundingBox: {
            northEast: {
              latitude: "19.2092 N",
              longitude: "72.7960 E"
            },
            southWest: {
              latitude: "19.2079 N",
              longitude: "72.7941 E"
            }
          }
        },
        plotDetails: {
          area: "4800 sq meters",
          perimeter: "280 meters",
          shape: "Irregular Polygon",
          vertices: [
            { id: "V1", coordinates: "19.2087 N, 72.7951 E" },
            { id: "V2", coordinates: "19.2092 N, 72.7951 E" },
            { id: "V3", coordinates: "19.2092 N, 72.7960 E" },
            { id: "V4", coordinates: "19.2084 N, 72.7960 E" },
            { id: "V5", coordinates: "19.2079 N, 72.7956 E" },
            { id: "V6", coordinates: "19.2079 N, 72.7951 E" }
          ]
        },
        adjacentPlots: [
          {
            direction: "North",
            surveyNumber: "123/44-B",
            owner: "Meena Patel"
          },
          {
            direction: "East",
            surveyNumber: "123/45-B",
            owner: "State Highway Department"
          },
          {
            direction: "South",
            surveyNumber: "123/46-A",
            owner: "Patel Housing Society"
          },
          {
            direction: "West",
            surveyNumber: "123/44-C",
            owner: "Municipal Corporation"
          }
        ],
        mapFeatures: {
          naturalFeatures: [
            {
              featureType: "Water Body",
              featureName: "Small Pond",
              location: "Southeast corner",
              area: "200 sq meters"
            }
          ],
          manMadeFeatures: [
            {
              featureType: "Road",
              featureName: "Municipal Road",
              location: "Western boundary",
              width: "6 meters"
            },
            {
              featureType: "Building",
              featureName: "Residential Structure",
              location: "Central portion",
              area: "800 sq meters"
            }
          ],
          easements: [
            {
              easementType: "Right of Way",
              width: "3 meters",
              location: "Northern boundary",
              beneficiary: "Adjacent Plot 123/44-B"
            }
          ]
        },
        mapImageUrl: "https://landrecords.maharashtra.gov.in/maps/123-45-A.png",
        digitalMapUrl: "https://gis.landrecords.maharashtra.gov.in/view?id=123-45-A",
        mapHistory: [
          {
            revisionNumber: "3",
            revisionDate: "2020-06-15",
            revisionReason: "Digital conversion and georeference update",
            surveyMethod: "DGPS & Total Station Survey"
          },
          {
            revisionNumber: "2",
            revisionDate: "1995-09-20",
            revisionReason: "Land partition update",
            surveyMethod: "Conventional Survey"
          },
          {
            revisionNumber: "1",
            revisionDate: "1965-07-10",
            revisionReason: "Original settlement survey",
            surveyMethod: "Plane Table Survey"
          }
        ],
        certification: {
          surveyedBy: "Digital Cadastral Mapping Team",
          surveyDate: "2020-05-12",
          approvedBy: "District Survey Officer",
          approvalDate: "2020-06-15",
          certificateNumber: "DSO-MAP-2020-12345",
          mapAccuracy: "±0.5 meters",
          digitallySigned: true,
          signatureDetails: {
            signedBy: "V.R. Kumar",
            designation: "District Survey Officer",
            signatureTimestamp: "2020-06-15T16:30:25+05:30"
          }
        },
        mapMetadata: {
          lastUpdated: "2020-06-15",
          fileFormat: "GeoTIFF & ShapeFile",
          dataSize: "15.6 MB",
          layersAvailable: ["Base Map", "Ownership", "Land Use", "Contour", "Infrastructure"]
        },
        remarks: "Digital cadastral map updated as per latest DGPS survey. Map shows portion under development agreement with Sunrise Developers Pvt Ltd."
      }
    };
  } catch (error) {
    console.error('Error fetching Land Records Department land map:', error);
    throw error;
  }
}; 