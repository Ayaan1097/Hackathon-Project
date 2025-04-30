/**
 * Mock Data Generator
 * Generates sample property data for testing and development
 */

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Constants for data generation
const RURAL_PROPERTIES_COUNT = 100;
const URBAN_PROPERTIES_COUNT = 100;
const PROPERTY_TYPES = ['Residential', 'Commercial', 'Agricultural', 'Industrial'];
const OWNERSHIP_TYPES = ['Individual', 'Joint', 'Company', 'Trust', 'Government'];

/**
 * Generate mock rural property data
 */
function generateRuralProperties(count = RURAL_PROPERTIES_COUNT) {
  const ruralProperties = [];
  
  for (let i = 0; i < count; i++) {
    const property = {
      id: `RUR${faker.string.alphanumeric(8).toUpperCase()}`,
      khataNumber: faker.string.numeric(6),
      khasraNumber: faker.string.numeric(5),
      area: {
        value: faker.number.float({ min: 1, max: 100, precision: 0.01 }),
        unit: faker.helpers.arrayElement(['Acres', 'Hectares', 'Bigha'])
      },
      village: faker.location.street(),
      tehsil: faker.location.county(),
      district: faker.location.city(),
      state: faker.location.state(),
      ownerDetails: {
        name: faker.person.fullName(),
        fatherName: faker.person.fullName(),
        type: faker.helpers.arrayElement(OWNERSHIP_TYPES),
        contactInfo: {
          phoneNumber: faker.phone.number('+91##########'),
          email: faker.internet.email(),
          address: faker.location.streetAddress(true)
        }
      },
      landUse: faker.helpers.arrayElement(['Agricultural', 'Grazing', 'Residential', 'Barren']),
      irrigationSource: faker.helpers.arrayElement(['Canal', 'Tubewell', 'Rainfed', 'None']),
      registrationDetails: {
        date: faker.date.past({ years: 10 }).toISOString().split('T')[0],
        documentNumber: faker.string.alphanumeric(10).toUpperCase(),
        registrarOffice: `${faker.location.city()} Sub-Registrar Office`
      },
      encumbrances: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => ({
        type: faker.helpers.arrayElement(['Mortgage', 'Lien', 'Lease', 'None']),
        lenderName: faker.company.name(),
        amount: faker.number.int({ min: 100000, max: 10000000 }),
        date: faker.date.past({ years: 5 }).toISOString().split('T')[0]
      })),
      mutations: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
        mutationNumber: faker.string.numeric(6),
        date: faker.date.past({ years: 15 }).toISOString().split('T')[0],
        previousOwner: faker.person.fullName(),
        newOwner: faker.person.fullName()
      })),
      propertyTax: {
        assessmentYear: new Date().getFullYear() - faker.number.int({ min: 0, max: 3 }),
        amount: faker.number.int({ min: 1000, max: 50000 }),
        status: faker.helpers.arrayElement(['Paid', 'Pending', 'Partial', 'Exempt'])
      }
    };
    
    ruralProperties.push(property);
  }
  
  return ruralProperties;
}

/**
 * Generate mock urban property data
 */
function generateUrbanProperties(count = URBAN_PROPERTIES_COUNT) {
  const urbanProperties = [];
  
  for (let i = 0; i < count; i++) {
    const property = {
      id: `URB${faker.string.alphanumeric(8).toUpperCase()}`,
      propertyID: faker.string.numeric(8),
      municipalNumber: faker.string.alphanumeric(6).toUpperCase(),
      type: faker.helpers.arrayElement(PROPERTY_TYPES),
      area: {
        builtUp: faker.number.float({ min: 500, max: 10000, precision: 0.01 }),
        plotSize: faker.number.float({ min: 1000, max: 20000, precision: 0.01 }),
        unit: 'sq.ft'
      },
      address: {
        doorNumber: faker.location.buildingNumber(),
        street: faker.location.street(),
        locality: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state(),
        pincode: faker.location.zipCode('######')
      },
      ownerDetails: {
        name: faker.person.fullName(),
        type: faker.helpers.arrayElement(OWNERSHIP_TYPES),
        contactInfo: {
          phoneNumber: faker.phone.number('+91##########'),
          email: faker.internet.email(),
          address: faker.location.streetAddress(true)
        }
      },
      registrationDetails: {
        date: faker.date.past({ years: 10 }).toISOString().split('T')[0],
        documentNumber: faker.string.alphanumeric(10).toUpperCase(),
        subRegistrarOffice: `${faker.location.city()} Sub-Registrar Office`
      },
      constructionYear: new Date().getFullYear() - faker.number.int({ min: 1, max: 50 }),
      approvalDetails: {
        approvalNumber: faker.string.alphanumeric(8).toUpperCase(),
        approvalDate: faker.date.past({ years: 15 }).toISOString().split('T')[0],
        approvedBy: `${faker.location.city()} Municipal Corporation`
      },
      encumbrances: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
        type: faker.helpers.arrayElement(['Mortgage', 'Lien', 'Lease', 'None']),
        lenderName: faker.company.name(),
        amount: faker.number.int({ min: 500000, max: 50000000 }),
        date: faker.date.past({ years: 8 }).toISOString().split('T')[0]
      })),
      propertyTax: {
        assessmentYear: new Date().getFullYear() - faker.number.int({ min: 0, max: 3 }),
        amount: faker.number.int({ min: 5000, max: 100000 }),
        status: faker.helpers.arrayElement(['Paid', 'Pending', 'Partial'])
      },
      marketValue: faker.number.int({ min: 2000000, max: 100000000 })
    };
    
    urbanProperties.push(property);
  }
  
  return urbanProperties;
}

/**
 * Save generated data to JSON files
 */
function saveDataToFiles(ruralData, urbanData) {
  const dataDir = path.join(__dirname, '../data');
  
  // Create data directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(dataDir, 'ruralProperties.json'), 
    JSON.stringify(ruralData, null, 2)
  );
  
  fs.writeFileSync(
    path.join(dataDir, 'urbanProperties.json'), 
    JSON.stringify(urbanData, null, 2)
  );
  
  console.log(`Generated ${ruralData.length} rural properties and ${urbanData.length} urban properties`);
}

/**
 * Generate and save mock data
 */
function generateAllMockData() {
  const ruralProperties = generateRuralProperties();
  const urbanProperties = generateUrbanProperties();
  saveDataToFiles(ruralProperties, urbanProperties);
  return { ruralProperties, urbanProperties };
}

module.exports = {
  generateRuralProperties,
  generateUrbanProperties,
  generateAllMockData
}; 