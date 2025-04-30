@echo off
echo Starting Property Unification Platform...
echo.

REM Start the backend server
start cmd /k "cd backend && node index.js"

REM Wait for backend to initialize
echo Waiting for backend to start...
timeout /t 5 /nobreak

REM Start the frontend application
start cmd /k "cd frontend/asset && npm start"

echo.
echo Project started successfully!
echo.
echo * Backend is running on: http://localhost:5000
echo * Frontend is running on: http://localhost:3005
echo.
echo Press any key to stop all servers...
pause

REM Kill all Node.js processes when the user presses a key
taskkill /F /IM node.exe
echo All servers stopped. 