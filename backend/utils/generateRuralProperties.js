const fs = require('fs');
const path = require('path');

// Function to generate random rural properties
function generateRuralProperties(count = 100) {
  const propertyTypes = ['Agricultural Land', 'Farmhouse', 'Orchard', 'Plantation', 'Dairy Farm', 'Poultry Farm', 'Fishery', 'Rice Field', 'Wheat Field', 'Village House'];
  const villages = ['Baner', 'Lonavala', 'Kamshet', 'Nashik', 'Karjat', 'Baramati', 'Kolhapur', 'Coorg', 'Ratnagiri', 'Sangli', 'Latur', 'Junnar', 'Panchgani', 'Dahanu', 'Alibaug', 'Mangaon', 'Panvel', 'Mahad', 'Satara', 'Mahabaleshwar'];
  const tehsils = ['Pune', 'Maval', 'Nashik', 'Karjat', 'Baramati', 'Karvir', 'Madikeri', 'Ratnagiri', 'Miraj', 'Latur', 'Junnar', 'Mahabaleshwar', 'Dahanu', 'Alibaug', 'Mangaon', 'Panvel', 'Mahad', 'Satara', 'Wai', 'Khed'];
  const districts = ['Pune', 'Nashik', 'Raigad', 'Kolhapur', 'Kodagu', 'Ratnagiri', 'Sangli', 'Latur', 'Thane', 'Palghar', 'Satara', 'Ahmednagar', 'Solapur', 'Aurangabad', 'Nagpur', 'Amravati', 'Wardha', 'Chandrapur', 'Yavatmal', 'Bhandara'];
  const states = ['Maharashtra', 'Karnataka', 'Gujarat', 'Madhya Pradesh', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Punjab', 'Haryana'];
  const landTypes = ['Agricultural', 'Mixed Use', 'Horticultural', 'Pastoral', 'Commercial Agriculture', 'Plantation', 'Aquaculture', 'Residential Farm', 'Grazing Land', 'Forest Land'];
  const irrigationTypes = ['Canal', 'Well', 'Drip', 'Rainwater Harvesting', 'Borewell', 'Sprinkler', 'Natural water body', 'River', 'Dam', 'Pond'];
  const soilTypes = ['Black soil', 'Red soil', 'Clay loam', 'Sandy loam', 'Alluvial soil', 'Coastal soil', 'Forest soil', 'Laterite soil', 'Saline soil', 'Loamy'];
  const banks = ['State Bank of India', 'Bank of Maharashtra', 'NABARD', 'Axis Bank', 'Karnataka Bank', 'HDFC Bank', 'Canara Bank', 'Punjab National Bank', 'Bank of Baroda', 'Union Bank of India'];
  const firstNames = ['Ganesh', 'Ramesh', 'Suresh', 'Mahesh', 'Kisan', 'Bharat', 'Maruti', 'Shivaji', 'Baburao', 'Vitthal', 'Tukaram', 'Dnyaneshwar', 'Eknath', 'Namdev', 'Sopan', 'Lakshman', 'Narayan', 'Dattatray', 'Vishnu', 'Krishna'];
  const lastNames = ['Patil', 'Deshmukh', 'Jadhav', 'Pawar', 'Thorat', 'Mane', 'Gaikwad', 'Shinde', 'Kale', 'Bhosale', 'Kamble', 'More', 'Nikam', 'Thakur', 'Kumbhar', 'Yadav', 'Ghule', 'Lokhande', 'Rane', 'Sawant'];
  const companyNames = ['Agricultural Co-op', 'Farmers Collective', 'Agro Industries', 'Rural Developments', 'Kisan Society', 'Farmers Union', 'Village Cooperative', 'Farm Fresh', 'Eco Farms', 'Organic Farms'];

  const properties = [];

  for (let i = 1; i <= count; i++) {
    const propertyId = `RUR${90000 + i}`;
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    
    // Generate address
    const village = villages[Math.floor(Math.random() * villages.length)];
    const tehsil = tehsils[Math.floor(Math.random() * tehsils.length)];
    const district = districts[Math.floor(Math.random() * districts.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const pincode = String(400000 + Math.floor(Math.random() * 100000)).padStart(6, '0');
    
    // Generate owner name (50% chance of being a company)
    let owner;
    if (Math.random() > 0.5) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      owner = `${firstName} ${lastName}`;
    } else {
      const companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      owner = `${lastName} ${companyName}`;
    }
    
    // Generate khasra & survey numbers
    const khasraNumber = `KN-${100 + Math.floor(Math.random() * 900)}/${100 + Math.floor(Math.random() * 900)}`;
    const surveyNumber = `SN-${10 + Math.floor(Math.random() * 90)}/${10 + Math.floor(Math.random() * 90)}`;
    
    // Generate property details
    const areaValue = 1 + Math.floor(Math.random() * 20);
    const area = `${areaValue} acres`;
    const landType = landTypes[Math.floor(Math.random() * landTypes.length)];
    const irrigationType = irrigationTypes[Math.floor(Math.random() * irrigationTypes.length)];
    const soilType = soilTypes[Math.floor(Math.random() * soilTypes.length)];
    const price = `₹ ${(30 + Math.floor(Math.random() * 970)) / 10},${Math.floor(Math.random() * 100)},000`;
    
    // Generate loan details
    const hasLoan = Math.random() > 0.5; // 50% chance of having a loan
    const loanDetails = hasLoan ? {
      lender: banks[Math.floor(Math.random() * banks.length)],
      amount: `₹ ${(20 + Math.floor(Math.random() * 480)) / 10},${Math.floor(Math.random() * 100)},000`,
      outstandingAmount: `₹ ${(15 + Math.floor(Math.random() * 385)) / 10},${Math.floor(Math.random() * 100)},000`
    } : undefined;
    
    // Create property object
    const property = {
      id: propertyId,
      type,
      address: {
        village,
        tehsil,
        district,
        state,
        pincode
      },
      owner,
      khasraNumber,
      surveyNumber,
      propertyDetails: {
        area,
        landType,
        irrigationType,
        soilType,
        price
      },
      hasLoan,
      ...(hasLoan && { loanDetails })
    };
    
    properties.push(property);
  }
  
  return properties;
}

// Generate rural properties
const ruralProperties = generateRuralProperties(100);

// Save to JSON file
const outputPath = path.join(__dirname, '..', 'data', 'ruralProperties.json');
fs.writeFileSync(outputPath, JSON.stringify(ruralProperties, null, 2), 'utf8');

console.log(`Generated ${ruralProperties.length} rural properties and saved to ${outputPath}`); 