# Enhanced Financial Reports Feature

## Overview
The Enhanced Financial Reports feature allows users to generate, download, and print comprehensive financial reports for properties. This includes individual property reports as well as bulk reports for multiple properties, providing a complete financial overview of real estate assets.

## Key Features

### 1. Comprehensive Property Reports
- Detailed financial information for each property
- Loan and equity status visualization
- Verification status from multiple sources (DORIS, DLR, CERSAI)
- Transaction history and property details

### 2. Multiple Export Options
- Print reports directly from the browser
- Download as PDF with professional formatting
- Export data as CSV for spreadsheet analysis

### 3. Bulk Report Generation
- Select multiple properties for combined reports
- Portfolio summary with total value and loan statistics
- Loan-to-Value (LTV) analysis across property portfolio

### 4. Financial Dashboard
- Visual overview of portfolio performance
- Distribution of loans across properties
- Risk assessment based on LTV ratios
- Net equity calculation and visualization

## Technical Implementation

### Components Created
- `PropertyReport.js` - Component for individual property reports with print/download capabilities
- `BulkReportGenerator.js` - Utility for generating multi-property reports
- `FinancialStatus.js` - Main dashboard for financial overview and report generation

### Libraries Used
- `jsPDF` - For generating PDF reports
- `jspdf-autotable` - For creating tables in PDF reports
- `react-to-print` - For browser-based printing functionality

### Data Management
- Property financial data with loan information
- Verification status tracking
- Transaction history recording

## How to Use

### Single Property Reports
1. Navigate to the Financial Status page
2. Find the property you want to report on
3. Click the report icon next to the property
4. Choose your preferred report format (Detailed, Financial, or Verification)
5. Download as PDF, export as CSV, or print directly

### Bulk Property Reports
1. Select multiple properties using the checkboxes
2. Click "Generate Bulk Report" button
3. Choose between Summarized (Portfolio Overview) or Detailed (Individual Properties)
4. Click "Generate PDF Report"
5. Save the generated PDF to your computer

### Financial Dashboard
1. View the portfolio value, outstanding loans, and net equity
2. Analyze the Loan-to-Value distribution across properties
3. Identify high-risk properties (high LTV ratio)
4. Track verification status across different registry systems

## Installation

To add the report generation capabilities to your installation:

1. Run the installation script:
   ```
   ./install-report-dependencies.sh
   ```

2. Or manually install the required dependencies:
   ```
   npm install jspdf jspdf-autotable react-to-print --save
   ```

## Future Enhancements

1. **Interactive Reports**: Add interactive elements to web-based reports
2. **Scheduled Reports**: Set up automatic report generation on a schedule
3. **Chart Integration**: Include visual charts and graphs in property reports
4. **Historical Comparison**: Compare financial status over time
5. **Tax Reporting**: Generate reports specifically formatted for tax purposes 