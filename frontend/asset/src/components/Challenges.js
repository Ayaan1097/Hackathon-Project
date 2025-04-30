import React from 'react';

function Challenges() {
  return (
    <div className="challenges-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="text-primary text-uppercase fw-bold small">Why ASSET-GURU?</h6>
          <h2 className="display-5 fw-bold mb-3">Solving Key Property Search Challenges</h2>
          <p className="lead text-muted mx-auto" style={{maxWidth: "800px"}}>
            ASSET-GURU addresses the major pain points experienced by users of traditional property search portals.
          </p>
        </div>
        
        <div className="row g-4 justify-content-center">
          {/* Challenge 1 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm challenge-card">
              <div className="card-body p-4">
                <div className="challenge-icon mb-4">
                  <i className="bi bi-diagram-3"></i>
                </div>
                <h3 className="fs-4 mb-3">Scattered Information</h3>
                <p className="text-muted mb-3">Property information is fragmented across multiple portals, making it difficult to get a complete picture.</p>
                <div className="d-flex align-items-center mt-auto solution-box">
                  <div className="solution-icon">
                    <i className="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <h5 className="fs-6 mb-0">Our Solution</h5>
                    <p className="mb-0 small">ASSET-GURU consolidates information from DORIS, DLR, CERSAI, and MCA21 in one unified platform.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Challenge 2 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm challenge-card">
              <div className="card-body p-4">
                <div className="challenge-icon mb-4">
                  <i className="bi bi-shuffle"></i>
                </div>
                <h3 className="fs-4 mb-3">Complex Navigation</h3>
                <p className="text-muted mb-3">Different portals with different interfaces hamper the formation of a seamless search process.</p>
                <div className="d-flex align-items-center mt-auto solution-box">
                  <div className="solution-icon">
                    <i className="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <h5 className="fs-6 mb-0">Our Solution</h5>
                    <p className="mb-0 small">Our standardized interface provides a consistent experience across rural and urban property searches.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Challenge 3 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm challenge-card">
              <div className="card-body p-4">
                <div className="challenge-icon mb-4">
                  <i className="bi bi-file-earmark-diff"></i>
                </div>
                <h3 className="fs-4 mb-3">Inconsistent Formats</h3>
                <p className="text-muted mb-3">Output data is provided in different formats, making it difficult to compare properties or compile reports.</p>
                <div className="d-flex align-items-center mt-auto solution-box">
                  <div className="solution-icon">
                    <i className="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <h5 className="fs-6 mb-0">Our Solution</h5>
                    <p className="mb-0 small">All information is presented in a consistent, user-friendly format with complete property details including loans.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Challenge 4 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm challenge-card">
              <div className="card-body p-4">
                <div className="challenge-icon mb-4">
                  <i className="bi bi-building-x"></i>
                </div>
                <h3 className="fs-4 mb-3">Urban-Rural Disparity</h3>
                <p className="text-muted mb-3">Most portals don't address the fundamental differences between urban and rural property characteristics.</p>
                <div className="d-flex align-items-center mt-auto solution-box">
                  <div className="solution-icon">
                    <i className="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <h5 className="fs-6 mb-0">Our Solution</h5>
                    <p className="mb-0 small">ASSET-GURU offers dedicated search interfaces for both urban and rural properties with specialized fields.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Challenge 5 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm challenge-card">
              <div className="card-body p-4">
                <div className="challenge-icon mb-4">
                  <i className="bi bi-bank"></i>
                </div>
                <h3 className="fs-4 mb-3">Missing Financial Information</h3>
                <p className="text-muted mb-3">Critical financial information like loans and encumbrances is often missing from property searches.</p>
                <div className="d-flex align-items-center mt-auto solution-box">
                  <div className="solution-icon">
                    <i className="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <h5 className="fs-6 mb-0">Our Solution</h5>
                    <p className="mb-0 small">Comprehensive financial details for each property, including current loans, liens, and encumbrances.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Challenge 6 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm challenge-card">
              <div className="card-body p-4">
                <div className="challenge-icon mb-4">
                  <i className="bi bi-clock-history"></i>
                </div>
                <h3 className="fs-4 mb-3">Time-Consuming Process</h3>
                <p className="text-muted mb-3">Searching across multiple portals is time-consuming and requires separate logins and learning curves.</p>
                <div className="d-flex align-items-center mt-auto solution-box">
                  <div className="solution-icon">
                    <i className="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <h5 className="fs-6 mb-0">Our Solution</h5>
                    <p className="mb-0 small">One-stop solution for all property search needs, dramatically reducing search time and complexity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-5">
          <a href="#search" className="btn btn-primary btn-lg rounded-pill">
            <i className="bi bi-search me-2"></i>Try Our Unified Search
          </a>
        </div>
      </div>
    </div>
  );
}

export default Challenges; 