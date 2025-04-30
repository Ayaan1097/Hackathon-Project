const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Determine if we're on Windows for different command syntax
const isWindows = os.platform() === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Define paths
const backendPath = path.join(__dirname, 'backend');
const frontendPath = path.join(__dirname, 'frontend', 'asset');

// Function to start a process
function startProcess(name, cwd, command, args) {
  console.log(`Starting ${name}...`);
  
  const process = spawn(command, args, { 
    cwd, 
    stdio: 'inherit',
    shell: true
  });
  
  process.on('error', (error) => {
    console.error(`Error starting ${name}:`, error);
  });
  
  return process;
}

// Start backend
const backend = startProcess('Backend', backendPath, npmCmd, ['run', 'dev']);

// Wait a bit before starting frontend to let backend initialize first
setTimeout(() => {
  // Start frontend
  const frontend = startProcess('Frontend', frontendPath, npmCmd, ['start']);
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('Shutting down...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });
}, 2000);

console.log('\n✅ Starting development environment...');
console.log('• Press Ctrl+C to stop both servers');
console.log('• Backend will be available at: http://localhost:5000');
console.log('• Frontend will be available at: http://localhost:3000\n'); 