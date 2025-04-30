#!/bin/bash

echo "Installing report generation dependencies..."
cd frontend/asset
npm install jspdf jspdf-autotable react-to-print --save
echo "Dependencies installed successfully!" 