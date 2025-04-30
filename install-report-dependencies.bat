@echo off
echo Installing report generation dependencies...
cd frontend\asset
call npm install jspdf jspdf-autotable react-to-print --save
echo Dependencies installed successfully!
pause 