const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('Generating property data...');

try {
  // Run the urban properties generator
  console.log('Generating urban properties...');
  execSync('node utils/generateUrbanProperties.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  
  // Run the rural properties generator
  console.log('Generating rural properties...');
  execSync('node utils/generateRuralProperties.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  
  console.log('All property data generated successfully!');
} catch (error) {
  console.error('Error generating property data:', error);
} 