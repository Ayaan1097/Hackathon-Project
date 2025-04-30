import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function BulkReportGenerator({ properties, onClose }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportFormat, setReportFormat] = useState('summarized');
  const [progress, setProgress] = useState(0);
  
  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format date values
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
      return new Date(dateString).toLocaleDateString('en-IN', options);
    } catch(e) {
      return 'N/A';
    }
  };
  
  // Generate a single property report section
  const generatePropertyReportSection = (doc, property, startY, isFirstPage) => {
    // Add property header
    if (!isFirstPage) {
      doc.addPage();
      startY = 15;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`${property.type || 'Property'}: ${property.address?.street || property.title || 'Property Report'}`, 14, startY);
    
    // Property details
    doc.setFontSize(14);
    doc.text('Property Details', 14, startY + 10);
    
    const propertyDetails = [
      ['Property ID', property.id || 'N/A'],
      ['Type', property.type || 'N/A'],
      ['Location', `${property.address?.city || ''}, ${property.address?.state || ''}`],
      ['Owner', property.owner || 'N/A'],
      ['Area', property.propertyDetails?.area || 'N/A'],
      ['Market Value', formatCurrency(property.marketValue || property.propertyDetails?.price || 0)]
    ];
    
    doc.autoTable({
      startY: startY + 15,
      head: [['Attribute', 'Value']],
      body: propertyDetails,
      theme: 'grid',
      headStyles: { fillColor: [0, 31, 65], textColor: [255, 255, 255] }
    });
    
    // Financial information
    doc.text('Financial Status', 14, doc.lastAutoTable.finalY + 15);
    
    const financialData = [
      ['Has Outstanding Loan', property.hasLoan ? 'Yes' : 'No']
    ];
    
    if (property.hasLoan) {
      financialData.push(
        ['Loan Amount', property.loanDetails?.originalAmount ? formatCurrency(property.loanDetails.originalAmount) : 'N/A'],
        ['Outstanding Amount', property.loanDetails?.outstandingAmount ? formatCurrency(property.loanDetails.outstandingAmount) : 'N/A'],
        ['Interest Rate', property.loanDetails?.interestRate ? `${property.loanDetails.interestRate}%` : 'N/A'],
        ['Lender', property.loanDetails?.lender || 'N/A'],
        ['Loan Start Date', formatDate(property.loanDetails?.startDate)],
        ['Loan End Date', formatDate(property.loanDetails?.endDate)]
      );
    }
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Financial Attribute', 'Value']],
      body: financialData,
      theme: 'grid',
      headStyles: { fillColor: [0, 31, 65], textColor: [255, 255, 255] }
    });
    
    // Verification information if detailed
    if (reportFormat === 'detailed' && property.verificationStatus) {
      doc.text('Verification Status', 14, doc.lastAutoTable.finalY + 15);
      
      const verificationData = [
        ['DORIS Verified', property.verificationStatus.doris ? 'Yes' : 'No'],
        ['DLR Verified', property.verificationStatus.dlr ? 'Yes' : 'No'],
        ['CERSAI Verified', property.verificationStatus.cersai ? 'Yes' : 'No'],
        ['Last Verification Date', formatDate(property.verificationStatus.verifiedOn)]
      ];
      
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Verification Source', 'Status']],
        body: verificationData,
        theme: 'grid',
        headStyles: { fillColor: [0, 31, 65], textColor: [255, 255, 255] }
      });
    }
    
    // Return the final Y position
    return doc.lastAutoTable.finalY;
  };
  
  // Generate a summary table of all properties
  const generateSummaryTable = (doc) => {
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Property Financial Summary', 14, 15);
    
    const tableData = properties.map(property => {
      const loanAmount = property.hasLoan ? property.loanDetails.outstandingAmount : 0;
      const propertyValue = property.propertyDetails.price;
      const equity = propertyValue - loanAmount;
      const ltvRatio = property.hasLoan ? (loanAmount / propertyValue * 100).toFixed(1) + '%' : '0%';
      
      return [
        property.title,
        property.type,
        formatCurrency(propertyValue),
        formatCurrency(loanAmount),
        formatCurrency(equity),
        ltvRatio
      ];
    });
    
    doc.autoTable({
      startY: 25,
      head: [['Property', 'Type', 'Value', 'Loan Amount', 'Equity', 'LTV Ratio']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [0, 31, 65], textColor: [255, 255, 255] },
      styles: { fontSize: 8 },
      columnStyles: { 
        0: { cellWidth: 50 }, 
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'right' }
      }
    });
    
    // Add portfolio summary
    const totalValue = properties.reduce((total, property) => total + property.propertyDetails.price, 0);
    const totalLoan = properties.reduce((total, property) => total + (property.hasLoan ? property.loanDetails.outstandingAmount : 0), 0);
    const totalEquity = totalValue - totalLoan;
    const portfolioLtv = totalValue > 0 ? (totalLoan / totalValue * 100).toFixed(1) + '%' : '0%';
    
    doc.setFontSize(14);
    doc.text('Portfolio Summary', 14, doc.lastAutoTable.finalY + 20);
    
    const summaryData = [
      ['Total Properties', properties.length.toString()],
      ['Total Portfolio Value', formatCurrency(totalValue)],
      ['Total Outstanding Loans', formatCurrency(totalLoan)],
      ['Total Portfolio Equity', formatCurrency(totalEquity)],
      ['Overall LTV Ratio', portfolioLtv]
    ];
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 25,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [0, 31, 65], textColor: [255, 255, 255] },
      columnStyles: { 
        1: { halign: 'right' }
      }
    });
  };
  
  // Generate bulk report PDF
  const handleGenerateBulkPDF = () => {
    if (properties.length === 0) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    setTimeout(() => {
      const doc = new jsPDF();
      
      // Add report header
      doc.setFontSize(20);
      doc.setTextColor(0, 31, 65);
      doc.text('ASSET-GURU Bulk Property Report', 105, 15, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 105, 23, { align: 'center' });
      doc.text(`Total Properties: ${properties.length}`, 105, 30, { align: 'center' });
      
      // Add summary table
      generateSummaryTable(doc);
      
      // Add individual property reports if detailed format selected
      if (reportFormat === 'detailed') {
        let currentY = doc.lastAutoTable.finalY + 30;
        doc.text('Individual Property Reports', 105, currentY, { align: 'center' });
        
        properties.forEach((property, index) => {
          setProgress(((index + 1) / properties.length) * 100);
          currentY = generatePropertyReportSection(doc, property, currentY + 10, index === 0);
        });
      }
      
      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('This report is generated by ASSET-GURU for informational purposes only.', 105, 280, { align: 'center' });
        doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
      }
      
      // Save PDF
      doc.save(`ASSET-GURU_Bulk_Property_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
      setIsGenerating(false);
      setProgress(100);
    }, 1000);
  };
  
  return (
    <div className="bulk-report-generator">
      <div className="report-controls mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-file-earmark-text me-2"></i>
            Bulk Property Report
          </h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div className="alert alert-info mt-3">
          <i className="bi bi-info-circle-fill me-2"></i>
          Generating a report for {properties.length} properties. This may take a moment.
        </div>
        
        <div className="report-options mt-3">
          <div className="row g-2 align-items-center">
            <div className="col-md-6">
              <label className="form-label">Report Format</label>
              <select 
                className="form-select"
                value={reportFormat}
                onChange={(e) => setReportFormat(e.target.value)}
              >
                <option value="summarized">Summarized (Portfolio Overview)</option>
                <option value="detailed">Detailed (Individual Properties)</option>
              </select>
              <small className="form-text text-muted">
                Detailed reports include individual sections for each property
              </small>
            </div>
            <div className="col-md-6">
              <label className="form-label">Export Options</label>
              <button 
                className="btn btn-primary w-100"
                onClick={handleGenerateBulkPDF}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <i className="bi bi-file-earmark-pdf me-2"></i>
                    Generate PDF Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {isGenerating && (
          <div className="mt-3">
            <div className="progress">
              <div 
                className="progress-bar progress-bar-striped progress-bar-animated" 
                role="progressbar" 
                style={{width: `${progress}%`}}
                aria-valuenow={progress} 
                aria-valuemin="0" 
                aria-valuemax="100"
              >
                {progress}%
              </div>
            </div>
            <p className="small text-muted text-center mt-2">
              Processing {properties.length} properties...
            </p>
          </div>
        )}
      </div>
      
      <div className="properties-list mt-4">
        <h6 className="mb-3">Properties Included in Report ({properties.length})</h6>
        <div className="list-group">
          {properties.map(property => (
            <div key={property.id} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1">{property.title}</h6>
                <small>{property.type}</small>
              </div>
              <p className="mb-1 small">{property.address.city}, {property.address.state}</p>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">ID: {property.id}</small>
                <small className="badge bg-primary">{formatCurrency(property.propertyDetails.price)}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BulkReportGenerator; 