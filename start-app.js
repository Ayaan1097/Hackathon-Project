const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

console.log('=== Property Unification Platform ===');
console.log('Starting development environment...\n');

// Determine if we're on Windows for different command syntax
const isWindows = os.platform() === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const nodePath = isWindows ? process.execPath : 'node';

// Define paths
const backendPath = path.join(__dirname, 'backend');
const frontendPath = path.join(__dirname, 'frontend', 'asset');

// Frontend will run on port 3003 to avoid conflicts
const frontendPort = 3003;
const backendPort = 5000;

// Create temporary .env file for frontend to ensure correct port
const frontendEnvPath = path.join(frontendPath, '.env.local');
fs.writeFileSync(frontendEnvPath, `REACT_APP_API_URL=http://localhost:${backendPort}/api/v1\nPORT=${frontendPort}`);
console.log('Created temporary frontend environment file');

// Create temporary .env file for backend to ensure correct CORS
const backendEnvPath = path.join(backendPath, '.env');
fs.writeFileSync(backendEnvPath, `PORT=${backendPort}\nCORS_ORIGIN=http://localhost:${frontendPort}`);
console.log('Created temporary backend environment file');

// Function to start a process
function startProcess(name, cwd, command, args) {
  console.log(`Starting ${name}...`);
  
  const processEnv = Object.assign({}, process.env);
  processEnv.FORCE_COLOR = '1'; // Force colored output
  
  const childProcess = spawn(command, args, { 
    cwd, 
    stdio: 'inherit',
    shell: true,
    env: processEnv
  });
  
  childProcess.on('error', (error) => {
    console.error(`Error starting ${name}:`, error);
  });
  
  childProcess.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`${name} exited with code ${code}`);
    }
  });
  
  return childProcess;
}

// Set up cleanup function for graceful shutdown
function setupCleanup(processes) {
  const cleanup = () => {
    console.log('\nShutting down servers...');
    processes.forEach(p => {
      try {
        p.kill();
      } catch (e) {
        console.log(`Error killing process: ${e.message}`);
      }
    });
    
    // Clean up temporary files
    try {
      fs.unlinkSync(frontendEnvPath);
      fs.unlinkSync(backendEnvPath);
    } catch (e) {
      console.log(`Error removing temp files: ${e.message}`);
    }
    
    process.exit(0);
  };
  
  // Handle termination signals
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);
}

// First update the backend/index.js to include CORS for the correct port
let indexJsPath = path.join(backendPath, 'index.js');
try {
  let indexContent = fs.readFileSync(indexJsPath, 'utf8');
  
  // Update CORS configuration if it exists
  if (indexContent.includes('app.use(cors(')) {
    indexContent = indexContent.replace(
      /app\.use\(cors\((\{[^}]*\}|\([^)]*\)|[^;])*\)\);/s,
      `app.use(cors({
  origin: ['https://asset-guru.onrender.com', 'https://asset-guru.onrender.com', 'https://asset-guru.onrender.com', 'http://127.0.0.1:3003'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));`
    );
    
    fs.writeFileSync(indexJsPath, indexContent);
    console.log('Updated CORS configuration in backend/index.js');
  }
} catch (error) {
  console.error('Error updating backend CORS configuration:', error.message);
}

console.log('Starting backend server...');
// Start backend directly with node 
const backend = startProcess('Backend Server', backendPath, nodePath, ['index.js']);

// Wait for backend to start before launching frontend
setTimeout(() => {
  console.log('\nStarting frontend server...');
  const frontend = startProcess('Frontend Server', frontendPath, npmCmd, ['start']);
  
  // Setup cleanup to kill both processes on exit
  setupCleanup([backend, frontend]);
  
  console.log('\n✅ Services are starting:');
  console.log(`• Backend API is available at: http://localhost:${backendPort}`);
  console.log(`• Frontend is available at: http://localhost:${frontendPort}\n`);
  console.log('Press Ctrl+C to stop both servers\n');
}, 3000);

console.log('Waiting for backend to initialize...'); 