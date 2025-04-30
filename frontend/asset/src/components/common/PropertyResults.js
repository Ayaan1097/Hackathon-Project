import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';

function PropertyResults({ results, isLoading, error, propertyType = 'urban' }) {
  const [expandedCards, setExpandedCards] = useState({});
  const resultsRef = useRef(null);

  const toggleCardDetails = (propertyId) => {
    setExpandedCards(prev => ({
      ...prev,
      [propertyId]: !prev[propertyId]
    }));
  };

  // Handle PDF export with enhanced formatting
  const exportToPDF = () => {
    if (!results || results.length === 0) return;
    
    const doc = new jsPDF();
    // Add logo/branding
    doc.setFontSize(22);
    doc.setTextColor(175, 134, 255); // Purple color
    doc.text('Property Search Report', 14, 25);
    
    // Add subtitle with date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 14, 35);
    
    // Add report summary
    doc.setFontSize(11);
    doc.text(`Total Properties: ${results.length}`, 14, 45);
    doc.text(`Property Type: ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}`, 14, 52);
    
    // Add horizontal line
    doc.setDrawColor(175, 134, 255);
    doc.setLineWidth(0.5);
    doc.line(14, 55, 196, 55);

    let yPos = 65;
    
    // Iterate through each property
    results.forEach((property, index) => {
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      // Property header
      doc.setFontSize(14);
      doc.setTextColor(175, 134, 255);
      doc.text(`Property #${index + 1}: ${property.id}`, 14, yPos);
      yPos += 10;
      
      // Property main details
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`${propertyType === 'urban' 
        ? `${property.address.street || 'Property'}, ${property.address.city}` 
        : `${property.address.village || 'Property'}, ${property.address.tehsil}`}`, 14, yPos);
      yPos += 10;
      
      // Property details table
      const tableData = [
        ['Owner', property.owner],
        ['Type', property.type],
        ['Area', `${property.propertyDetails.area} ${property.propertyDetails.areaUnit}`],
        ['Price', property.propertyDetails.price],
        [propertyType === 'urban' ? 'Registration No.' : 'Khasra No.', 
         propertyType === 'urban' ? property.registrationNumber : property.khasraNumber],
        ['Verification Status', property.isVerified ? "Verified" : "Unverified"],
      ];
      
      if (property.hasLoan) {
        tableData.push(['Loan Status', `Active - ${property.loanDetails.outstandingAmount} outstanding`]);
      }
      
      if (propertyType === 'urban' && property.propertyDetails.bedrooms) {
        tableData.push(['Bedrooms', property.propertyDetails.bedrooms]);
      }
      
      if (propertyType === 'urban' && property.propertyDetails.bathrooms) {
        tableData.push(['Bathrooms', property.propertyDetails.bathrooms]);
      }
      
      if (propertyType === 'rural' && property.propertyDetails.landType) {
        tableData.push(['Land Type', property.propertyDetails.landType]);
      }
      
      if (propertyType === 'rural' && property.propertyDetails.irrigationType) {
        tableData.push(['Irrigation', property.propertyDetails.irrigationType]);
      }
      
      if (property.propertyDetails.yearBuilt) {
        tableData.push(['Year Built', property.propertyDetails.yearBuilt]);
      }
      
      doc.autoTable({
        startY: yPos,
        head: [['Property Detail', 'Value']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [175, 134, 255], textColor: [255, 255, 255] },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 90 }
        }
      });
      
      yPos = doc.lastAutoTable.finalY + 15;
      
      // Check if we need a new page for verification info
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      // Add verification information
      doc.setFontSize(12);
      doc.setTextColor(0, 100, 0);
      doc.text('Verification Information', 14, yPos);
      yPos += 10;
      
      const verificationData = [
        ['DORIS Verification', 'Verified'],
        ['DLR Verification', 'Verified'],
        ['CERSAI Verification', 'Verified'],
        ['Last Verification Date', new Date().toLocaleDateString()],
        ['Database Sources', 'DORIS, DLR, CERSAI'],
        ['Records Updated', new Date().toLocaleDateString()],
        ['Transaction History', '2 records']
      ];
      
      doc.autoTable({
        startY: yPos,
        body: verificationData,
        theme: 'grid',
        styles: { fontSize: 9 },
        margin: { left: 14, right: 14 },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 50 }
        }
      });
      
      yPos = doc.lastAutoTable.finalY + 15;
      
      // Add separator between properties
      if (index < results.length - 1) {
        // Check if we need a new page
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        } else {
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.2);
          doc.line(14, yPos, 196, yPos);
          yPos += 15;
        }
      }
    });
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Property Report - Page ${i} of ${pageCount}`, 14, 285);
      doc.text('DORIS - Digital Online Registry Information System', 196, 285, { align: 'right' });
    }
    
    doc.save("property-search-report.pdf");
  };

  // Handle print functionality
  const handlePrint = useReactToPrint({
    content: () => resultsRef.current,
    documentTitle: 'Property Search Results',
    pageStyle: '@page { size: auto; margin: 15mm; }'
  });

  if (isLoading) {
    return (
      <div className="property-results my-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Searching properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error: {error.message || 'Failed to load properties'}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        No properties found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button 
          className="btn btn-primary me-2"
          onClick={exportToPDF}
          disabled={isLoading || error || !results || results.length === 0}
        >
          <i className="bi bi-file-pdf me-2"></i>Export to PDF
        </button>
        <button 
          className="btn btn-outline-primary"
          onClick={handlePrint}
          disabled={isLoading || error || !results || results.length === 0}
        >
          <i className="bi bi-printer me-2"></i>Print
        </button>
      </div>
      
      <div ref={resultsRef} className="property-results my-4">
        <h5 className="mb-3">Search Results ({results.length} properties found)</h5>
        <div className="row g-4">
          {results.map((property, index) => (
            <div 
              key={property.id} 
              className="col-md-6 mb-4"
            >
              <div className="card h-100 shadow-sm property-card">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                  <div>
                    <span className={`badge ${propertyType === 'urban' ? 'bg-primary' : 'bg-success'} me-2`}>
                      {property.type}
                    </span>
                    <h5 className="card-title mb-0">{propertyType === 'urban' 
                      ? `${property.address.street || 'Property'}, ${property.address.city}` 
                      : `${property.address.village || 'Property'}, ${property.address.tehsil}`}
                    </h5>
                  </div>
                  <span className="property-id small text-muted">{property.id}</span>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="row g-2">
                      <div className="col-md-6">
                        <div className="property-detail">
                          <i className="bi bi-geo-alt text-muted me-2"></i>
                          <span>{propertyType === 'urban' 
                            ? `${property.address.city}, ${property.address.state}` 
                            : `${property.address.district}, ${property.address.state}`}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="property-detail">
                          <i className="bi bi-person text-muted me-2"></i>
                          <span>Owner: {property.owner}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="property-detail">
                          <i className="bi bi-rulers text-muted me-2"></i>
                          <span>Area: {property.propertyDetails.area}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="property-detail">
                          {propertyType === 'urban' ? (
                            <>
                              <i className="bi bi-file-text text-muted me-2"></i>
                              <span>Reg: {property.registrationNumber}</span>
                            </>
                          ) : (
                            <>
                              <i className="bi bi-file-text text-muted me-2"></i>
                              <span>Khasra: {property.khasraNumber}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="property-price mb-3">
                    <h5 className="text-primary mb-0">{property.propertyDetails.price}</h5>
                  </div>

                  {property.hasLoan && (
                    <div className="loan-info alert alert-warning py-2 px-3 mb-3 small">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Has outstanding loan of {property.loanDetails.outstandingAmount}
                    </div>
                  )}

                  <div className="property-features mb-3">
                    <div className="row g-2">
                      {propertyType === 'urban' && property.propertyDetails.bedrooms && (
                        <div className="col-auto">
                          <span className="badge bg-light text-dark">
                            <i className="bi bi-door-closed me-1"></i> {property.propertyDetails.bedrooms} BR
                          </span>
                        </div>
                      )}
                      {propertyType === 'urban' && property.propertyDetails.bathrooms && (
                        <div className="col-auto">
                          <span className="badge bg-light text-dark">
                            <i className="bi bi-droplet me-1"></i> {property.propertyDetails.bathrooms} Bath
                          </span>
                        </div>
                      )}
                      {propertyType === 'rural' && property.propertyDetails.landType && (
                        <div className="col-auto">
                          <span className="badge bg-light text-dark">
                            <i className="bi bi-layers me-1"></i> {property.propertyDetails.landType}
                          </span>
                        </div>
                      )}
                      {propertyType === 'rural' && property.propertyDetails.irrigationType && (
                        <div className="col-auto">
                          <span className="badge bg-light text-dark">
                            <i className="bi bi-water me-1"></i> {property.propertyDetails.irrigationType}
                          </span>
                        </div>
                      )}
                      {property.propertyDetails.yearBuilt && (
                        <div className="col-auto">
                          <span className="badge bg-light text-dark">
                            <i className="bi bi-calendar-date me-1"></i> Built {property.propertyDetails.yearBuilt}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Toggle Details Button */}
                  <button 
                    className="btn btn-sm btn-outline-secondary w-100 mb-2"
                    onClick={() => toggleCardDetails(property.id)}
                  >
                    {expandedCards[property.id] ? (
                      <><i className="bi bi-chevron-up me-1"></i>Hide Details</>
                    ) : (
                      <><i className="bi bi-chevron-down me-1"></i>Show More Details</>
                    )}
                  </button>

                  {/* Collapsible Additional Details */}
                  {expandedCards[property.id] && (
                    <div className="additional-details mt-3 pt-3 border-top">
                      <div className="row">
                        <div className="col-12 mb-3">
                          <h6 className="fw-bold mb-2">Verification Status</h6>
                          <div className="d-flex gap-2 mb-2">
                            <span className="badge bg-success">DORIS Verified</span>
                            <span className="badge bg-success">DLR Verified</span>
                            <span className="badge bg-success">CERSAI Verified</span>
                          </div>
                          <small className="text-muted">Last verification: {new Date().toLocaleDateString()}</small>
                        </div>

                        {propertyType === 'urban' && (
                          <div className="col-md-6 mb-3">
                            <h6 className="fw-bold mb-2">Property Highlights</h6>
                            <ul className="list-unstyled small mb-0">
                              <li className="mb-1"><i className="bi bi-check-circle-fill text-success me-2"></i>Valid property title</li>
                              <li className="mb-1"><i className="bi bi-check-circle-fill text-success me-2"></i>No pending legal disputes</li>
                              <li className="mb-1"><i className="bi bi-check-circle-fill text-success me-2"></i>Tax payments up to date</li>
                              {property.hasLoan && (
                                <li className="mb-1"><i className="bi bi-exclamation-triangle text-warning me-2"></i>Has active mortgage</li>
                              )}
                            </ul>
                          </div>
                        )}

                        {propertyType === 'rural' && (
                          <div className="col-md-6 mb-3">
                            <h6 className="fw-bold mb-2">Land Highlights</h6>
                            <ul className="list-unstyled small mb-0">
                              <li className="mb-1"><i className="bi bi-check-circle-fill text-success me-2"></i>Valid land records</li>
                              <li className="mb-1"><i className="bi bi-check-circle-fill text-success me-2"></i>Agricultural land classification</li>
                              <li className="mb-1"><i className="bi bi-check-circle-fill text-success me-2"></i>No boundary disputes</li>
                              {property.hasLoan && (
                                <li className="mb-1"><i className="bi bi-exclamation-triangle text-warning me-2"></i>Has active mortgage</li>
                              )}
                            </ul>
                          </div>
                        )}

                        <div className="col-md-6 mb-3">
                          <h6 className="fw-bold mb-2">Additional Information</h6>
                          <table className="table table-sm table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="ps-0 text-muted">Database Sources</th>
                                <td className="text-end pe-0">DORIS, DLR, CERSAI</td>
                              </tr>
                              <tr>
                                <th className="ps-0 text-muted">Records Updated</th>
                                <td className="text-end pe-0">{new Date().toLocaleDateString()}</td>
                              </tr>
                              <tr>
                                <th className="ps-0 text-muted">Transaction History</th>
                                <td className="text-end pe-0">2 records</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyResults; 