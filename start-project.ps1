# PowerShell script to start the Property Unification Platform
Write-Host "Starting Property Unification Platform..." -ForegroundColor Cyan

# Variables
$backendPath = Join-Path $PSScriptRoot "backend"
$frontendPath = Join-Path $PSScriptRoot "frontend\asset"
$backendPort = 5000
$frontendPort = 3005
$processIds = @()

# Function to check if a port is in use
function Test-PortInUse {
    param($Port)
    $connections = netstat -ano | findstr ":$Port "
    return $connections.Count -gt 0
}

# Function to kill processes using a specific port
function Stop-ProcessByPort {
    param($Port)
    $connections = netstat -ano | findstr ":$Port "
    if ($connections) {
        $connections | ForEach-Object {
            $parts = $_ -split '\s+', 5
            if ($parts.Count -gt 4) {
                $pid = $parts[4]
                if ($pid -ne "0") {
                    Write-Host "Stopping process with PID $pid using port $Port..." -ForegroundColor Yellow
                    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                }
            }
        }
    }
}

# Clear any processes using our ports
if (Test-PortInUse $backendPort) {
    Write-Host "Port $backendPort is already in use. Clearing..." -ForegroundColor Yellow
    Stop-ProcessByPort $backendPort
    Start-Sleep -Seconds 2
}

if (Test-PortInUse $frontendPort) {
    Write-Host "Port $frontendPort is already in use. Clearing..." -ForegroundColor Yellow
    Stop-ProcessByPort $frontendPort
    Start-Sleep -Seconds 2
}

# Start the backend
Write-Host "Starting backend server..." -ForegroundColor Green
if (Test-Path $backendPath) {
    $backendProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd $backendPath && node index.js" -PassThru -WindowStyle Normal
    if ($backendProcess) {
        $processIds += $backendProcess.Id
        Write-Host "Backend started with process ID: $($backendProcess.Id)" -ForegroundColor Green
    } else {
        Write-Host "Failed to start backend server" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Backend directory not found at $backendPath" -ForegroundColor Red
    exit 1
}

# Wait for backend to start
Write-Host "Waiting for backend to initialize..." -ForegroundColor Cyan
$retryCount = 0
$maxRetries = 10
$backendStarted = $false

while ($retryCount -lt $maxRetries -and -not $backendStarted) {
    Start-Sleep -Seconds 2
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$backendPort/test" -Method GET -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            $backendStarted = $true
            Write-Host "Backend server is now running at http://localhost:$backendPort" -ForegroundColor Green
        }
    } catch {
        $retryCount++
        Write-Host "Waiting for backend to start... ($retryCount/$maxRetries)" -ForegroundColor Yellow
    }
}

if (-not $backendStarted) {
    Write-Host "Backend server failed to start within the expected time." -ForegroundColor Red
    Write-Host "Continuing anyway, but the application might not work properly." -ForegroundColor Yellow
}

# Start the frontend
Write-Host "Starting frontend application..." -ForegroundColor Green
if (Test-Path $frontendPath) {
    $frontendProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd $frontendPath && npm start" -PassThru -WindowStyle Normal
    if ($frontendProcess) {
        $processIds += $frontendProcess.Id
        Write-Host "Frontend started with process ID: $($frontendProcess.Id)" -ForegroundColor Green
    } else {
        Write-Host "Failed to start frontend application" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Frontend directory not found at $frontendPath" -ForegroundColor Red
    exit 1
}

# Summary
Write-Host "`nProject started successfully!" -ForegroundColor Cyan
Write-Host "* Backend is running on: http://localhost:$backendPort" -ForegroundColor White
Write-Host "* Frontend is running on: http://localhost:$frontendPort" -ForegroundColor White
Write-Host "`nPress Ctrl+C to stop all servers...`n" -ForegroundColor Cyan

# Keep the script running until manually terminated
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    # Clean up when the script is terminated
    Write-Host "`nStopping all servers..." -ForegroundColor Yellow
    $processIds | ForEach-Object {
        Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
    }
    
    # Kill any remaining Node.js processes started by this script
    Write-Host "Stopping all Node.js processes..." -ForegroundColor Yellow
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    
    Write-Host "All servers stopped." -ForegroundColor Green
} 