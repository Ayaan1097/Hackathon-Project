import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Testimonials() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  
  const handlePlayVideo = (videoRef, setIsPlaying) => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  
  // Add event listeners for video play/pause events
  useEffect(() => {
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;
    
    const handlePlay1 = () => setIsPlaying1(true);
    const handlePause1 = () => setIsPlaying1(false);
    const handlePlay2 = () => setIsPlaying2(true);
    const handlePause2 = () => setIsPlaying2(false);
    
    if (video1) {
      video1.addEventListener('play', handlePlay1);
      video1.addEventListener('pause', handlePause1);
    }
    
    if (video2) {
      video2.addEventListener('play', handlePlay2);
      video2.addEventListener('pause', handlePause2);
    }
    
    return () => {
      if (video1) {
        video1.removeEventListener('play', handlePlay1);
        video1.removeEventListener('pause', handlePause1);
      }
      
      if (video2) {
        video2.removeEventListener('play', handlePlay2);
        video2.removeEventListener('pause', handlePause2);
      }
    };
  }, []);

  return (
    <div className="testimonials-page">
      {/* Testimonials Header */}
      <header className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">Client Testimonials</h1>
          <p className="lead mb-0">Hear from our satisfied users across India</p>
        </div>
      </header>

      {/* Featured Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-primary text-uppercase fw-bold small">What Users Say</h6>
            <h2 className="display-5 fw-bold">Success Stories</h2>
            <p className="lead text-muted">Read how ASSET-GURU has transformed property searches for our clients</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"ASSET-GURU has revolutionized how we search for property information. The unified interface saves us countless hours across multiple databases. We've been able to increase our efficiency by 60% since implementing this platform."</p>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">AG</div>
                  <div className="testimonial-info">
                    <h5>Audrey Gurney</h5>
                    <p>Real Estate Agent, Mumbai</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"The platform provides strong ROI and helps us attract new clients. Their commitment to standardizing property search has been fantastic. We've reduced our property verification time from weeks to just days."</p>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">RO</div>
                  <div className="testimonial-info">
                    <h5>Rasheeda O.</h5>
                    <p>Property Developer, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Since using ASSET-GURU, our property verification process has become 120% faster. The search capabilities across rural and urban properties are unmatched, and we've seen significant improvements in accuracy."</p>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">GS</div>
                  <div className="testimonial-info">
                    <h5>Gregory S.</h5>
                    <p>Government Official, Delhi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Types */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Who Benefits From Our Platform</h2>
            <p className="lead text-muted">ASSET-GURU serves a wide range of professionals and organizations</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-primary text-white mb-4">
                    <i className="bi bi-buildings"></i>
                  </div>
                  <h4>Real Estate Agents</h4>
                  <p className="text-muted">"The platform has streamlined our property verification process, saving us 15-20 hours per week."</p>
                  <p className="text-muted fst-italic">- Vikram Mehta, Senior Agent</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-success text-white mb-4">
                    <i className="bi bi-bank"></i>
                  </div>
                  <h4>Banks & Financial Institutions</h4>
                  <p className="text-muted">"We've reduced loan processing time by 40% through faster property verification and valuation."</p>
                  <p className="text-muted fst-italic">- Anita Reddy, Loan Officer</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-warning text-white mb-4">
                    <i className="bi bi-building-gear"></i>
                  </div>
                  <h4>Property Developers</h4>
                  <p className="text-muted">"Due diligence that once took months now takes days, accelerating our project timelines significantly."</p>
                  <p className="text-muted fst-italic">- Sandeep Kumar, Project Director</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-danger text-white mb-4">
                    <i className="bi bi-building-check"></i>
                  </div>
                  <h4>Government Agencies</h4>
                  <p className="text-muted">"The platform has transformed how we validate property information across multiple databases."</p>
                  <p className="text-muted fst-italic">- Rajiv Sharma, Municipal Officer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Video Testimonials</h2>
            <p className="lead text-muted">Watch how our platform has helped these clients</p>
          </div>

          <div className="row g-4">
            {/* Video Testimonial 1 */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="ratio ratio-16x9 position-relative bg-dark">
                  <video
                    ref={videoRef1}
                    controls
                    preload="metadata"
                    className="w-100 h-100 object-fit-cover"
                    poster={process.env.PUBLIC_URL + "/property.jpg"}
                  >
                    <source src={process.env.PUBLIC_URL + "/videos/rachayita-testimonial.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Play button overlay - only show when not playing */}
                  {!isPlaying1 && (
                    <div className="position-absolute top-50 start-50 translate-middle play-button-overlay">
                      <button 
                        className="btn btn-light rounded-circle p-3" 
                        aria-label="Play video"
                        onClick={() => handlePlayVideo(videoRef1, setIsPlaying1)}
                      >
                        <i className="bi bi-play-fill fs-4 text-primary"></i>
                      </button>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h5>How ASSET-GURU Transformed Our Agency</h5>
                  <p className="text-muted">Premier Properties shares how they increased their efficiency by 70% using our platform.</p>
                </div>
              </div>
            </div>

            {/* Video Testimonial 2 */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="ratio ratio-16x9 position-relative bg-dark">
                  <video
                    ref={videoRef2}
                    controls
                    preload="metadata"
                    className="w-100 h-100 object-fit-cover"
                    poster={process.env.PUBLIC_URL + "/property.jpg"}
                  >
                    <source src={process.env.PUBLIC_URL + "/videos/hrishit-testimonial.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Play button overlay - only show when not playing */}
                  {!isPlaying2 && (
                    <div className="position-absolute top-50 start-50 translate-middle play-button-overlay">
                      <button 
                        className="btn btn-light rounded-circle p-3" 
                        aria-label="Play video"
                        onClick={() => handlePlayVideo(videoRef2, setIsPlaying2)}
                      >
                        <i className="bi bi-play-fill fs-4 text-primary"></i>
                      </button>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h5>Streamlining Rural Land Verification</h5>
                  <p className="text-muted">Agricultural Bank discusses how they improved loan approval rates with accurate property data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Stats */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">The Impact of ASSET-GURU</h2>
            <p className="lead">Our platform by the numbers</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="stat-item">
                <div className="display-3 fw-bold mb-2">94%</div>
                <p className="fs-5">Client Satisfaction Rate</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <div className="display-3 fw-bold mb-2">65%</div>
                <p className="fs-5">Average Time Saved</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <div className="display-3 fw-bold mb-2">500+</div>
                <p className="fs-5">Active Organizations</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <div className="display-3 fw-bold mb-2">24/7</div>
                <p className="fs-5">Platform Availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light" id="contact">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-start mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3">Ready to join our satisfied clients?</h2>
              <p className="lead text-muted">Experience the ASSET-GURU difference today.</p>
            </div>
            <div className="col-lg-5 text-center text-lg-end">
              <Link to="/urban-search" className="btn btn-primary btn-lg px-4 me-sm-3 rounded-pill">
                <i className="bi bi-building me-2"></i>Start Urban Search
              </Link>
              <Link to="/rural-search" className="btn btn-success btn-lg px-4 rounded-pill">
                <i className="bi bi-tree me-2"></i>Start Rural Search
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials; 