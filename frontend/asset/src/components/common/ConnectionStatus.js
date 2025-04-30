import React, { useState, useEffect } from 'react';
import { isApiConnected, getActiveBaseUrl, testApiConnection } from '../../services/apiService';

// Simple component to display backend connection status
const ConnectionStatus = () => {
  const [connected, setConnected] = useState(isApiConnected());
  const [baseUrl, setBaseUrl] = useState(getActiveBaseUrl());
  const [showDetails, setShowDetails] = useState(false);
  const [checking, setChecking] = useState(false);

  // Check connection status periodically
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setChecking(true);
        await testApiConnection();
        setConnected(true);
        setBaseUrl(getActiveBaseUrl());
      } catch (error) {
        setConnected(false);
      } finally {
        setChecking(false);
      }
    };

    // Initial check
    checkConnection();

    // Set up interval to check the status every 10 seconds
    const interval = setInterval(checkConnection, 10000);

    // Clean up on unmount
    return () => clearInterval(interval);
  }, []);

  const statusStyle = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    backgroundColor: connected ? 'rgba(0, 128, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)',
    color: '#fff',
    padding: showDetails ? '10px 15px' : '5px 10px',
    borderRadius: '5px',
    fontSize: showDetails ? '14px' : '12px',
    fontFamily: 'monospace',
    zIndex: 9999,
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease'
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const retryConnection = async (e) => {
    e.stopPropagation();
    setChecking(true);
    try {
      await testApiConnection();
      setConnected(true);
      setBaseUrl(getActiveBaseUrl());
    } catch (error) {
      setConnected(false);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div style={statusStyle} onClick={toggleDetails}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>
          {connected ? '✓ Connected' : '✗ Offline'}
          {checking && ' (checking...)'}
        </span>
        {!connected && (
          <button 
            onClick={retryConnection}
            style={{
              marginLeft: '10px',
              background: 'white',
              color: 'red',
              border: 'none',
              borderRadius: '3px',
              padding: '2px 6px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        )}
      </div>
      {showDetails && (
        <div style={{ marginTop: '5px', fontSize: '11px' }}>
          <div>URL: {baseUrl}</div>
          <div>Mode: {connected ? 'Live API' : 'Mock Data'}</div>
          <div>Status: {connected ? 'Connected' : 'Using offline mode'}</div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus; 