const fs = require('fs');
const path = require('path');

// Function to generate random urban properties
function generateUrbanProperties(count = 100) {
  const propertyTypes = ['Apartment', 'Villa', 'Penthouse', 'Commercial Space', 'Office Space', 'Retail Shop', 'Studio Apartment', 'Duplex', 'Bungalow', 'Row House'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal'];
  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh'];
  const banks = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Bank of Baroda', 'Canara Bank', 'Punjab National Bank', 'Union Bank', 'Kotak Mahindra Bank', 'Yes Bank'];
  const firstNames = ['Rajesh', 'Suresh', 'Ramesh', 'Mahesh', 'Dinesh', 'Amit', 'Anil', 'Sunil', 'Sanjay', 'Vijay', 'Ajay', 'Anita', 'Sunita', 'Kavita', 'Savita', 'Deepa', 'Meera', 'Priya', 'Divya', 'Kavya'];
  const lastNames = ['Kumar', 'Singh', 'Sharma', 'Patel', 'Verma', 'Shah', 'Desai', 'Mehta', 'Joshi', 'Patil', 'Rao', 'Reddy', 'Nair', 'Das', 'Banerjee', 'Mukherjee', 'Chatterjee', 'Malhotra', 'Kapoor', 'Saxena'];
  const streetPrefixes = ['Main', 'Park', 'Lake', 'Hill', 'River', 'Valley', 'Green', 'Royal', 'Central', 'City', 'Market', 'Temple', 'Station', 'College', 'Garden', 'Hospital'];
  const streetSuffixes = ['Street', 'Road', 'Avenue', 'Boulevard', 'Lane', 'Drive', 'Place', 'Way', 'Circle', 'Court', 'Plaza', 'Square', 'Park', 'Terrace', 'Heights', 'View'];

  const properties = [];

  for (let i = 1; i <= count; i++) {
    const propertyId = `URB${10000 + i}`;
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    
    // Generate address
    const streetNumber = Math.floor(Math.random() * 1000) + 1;
    const streetPrefix = streetPrefixes[Math.floor(Math.random() * streetPrefixes.length)];
    const streetSuffix = streetSuffixes[Math.floor(Math.random() * streetSuffixes.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const pincode = String(400000 + Math.floor(Math.random() * 100000)).padStart(6, '0');
    
    // Generate owner name
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const owner = `${firstName} ${lastName}`;
    
    // Generate registration number
    const regYear = 2015 + Math.floor(Math.random() * 9);
    const regNumber = Math.floor(Math.random() * 100000);
    const registrationNumber = `REG-${state.substring(0, 2).toUpperCase()}-${regYear}-${regNumber}`;
    
    // Generate property details
    const area = `${800 + Math.floor(Math.random() * 4000)} sq. ft.`;
    const bedrooms = type === 'Apartment' || type === 'Villa' || type === 'Penthouse' || type === 'Duplex' || type === 'Bungalow' || type === 'Row House' ? 1 + Math.floor(Math.random() * 5) : undefined;
    const bathrooms = bedrooms ? Math.min(bedrooms, 1 + Math.floor(Math.random() * 4)) : undefined;
    const yearBuilt = 2000 + Math.floor(Math.random() * 23);
    const units = type === 'Commercial Space' || type === 'Office Space' || type === 'Retail Shop' ? 1 + Math.floor(Math.random() * 5) : undefined;
    const price = `₹ ${(50 + Math.floor(Math.random() * 450)) / 10},${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 100)},000`;
    
    // Generate loan details
    const hasLoan = Math.random() > 0.4; // 60% chance of having a loan
    const loanDetails = hasLoan ? {
      lender: banks[Math.floor(Math.random() * banks.length)],
      amount: `₹ ${(30 + Math.floor(Math.random() * 270)) / 10},${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 100)},000`,
      outstandingAmount: `₹ ${(20 + Math.floor(Math.random() * 200)) / 10},${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 100)},000`
    } : undefined;
    
    // Create property object
    const property = {
      id: propertyId,
      type,
      address: {
        street: `${streetNumber} ${streetPrefix} ${streetSuffix}`,
        city,
        district: city,
        state,
        pincode
      },
      owner,
      registrationNumber,
      propertyDetails: {
        area,
        ...(bedrooms && { bedrooms }),
        ...(bathrooms && { bathrooms }),
        ...(units && { units }),
        yearBuilt,
        price
      },
      hasLoan,
      ...(hasLoan && { loanDetails })
    };
    
    properties.push(property);
  }
  
  return properties;
}

// Generate urban properties
const urbanProperties = generateUrbanProperties(100);

// Save to JSON file
const outputPath = path.join(__dirname, '..', 'data', 'urbanProperties.json');
fs.writeFileSync(outputPath, JSON.stringify(urbanProperties, null, 2), 'utf8');

console.log(`Generated ${urbanProperties.length} urban properties and saved to ${outputPath}`); 