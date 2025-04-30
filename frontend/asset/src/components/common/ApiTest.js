import React, { useState, useEffect } from 'react';
import { testApiConnection } from '../../services/apiService';

const ApiTest = () => {
  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await testApiConnection();
      setApiStatus(result);
    } catch (error) {
      console.error('API Test Error:', error);
      setError(error.message || 'Failed to connect to the API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Test connection when component mounts
    testConnection();
  }, []);

  return (
    <div className="api-test-container">
      <h2>API Connection Test</h2>
      
      {loading && <p>Testing API connection...</p>}
      
      {error && (
        <div className="error-message">
          <h3>Connection Error</h3>
          <p>{error}</p>
          <div className="troubleshooting">
            <h4>Troubleshooting Steps:</h4>
            <ol>
              <li>Make sure the backend server is running at http://localhost:5000</li>
              <li>Check if CORS is properly configured in the backend</li>
              <li>Verify that the API endpoints are properly defined</li>
              <li>Check browser console for additional error details</li>
            </ol>
          </div>
        </div>
      )}
      
      {apiStatus && !error && (
        <div className="success-message">
          <h3>API Connection Successful!</h3>
          <div className="api-response">
            <h4>Response:</h4>
            <pre>{JSON.stringify(apiStatus, null, 2)}</pre>
          </div>
        </div>
      )}
      
      <div className="actions">
        <button 
          onClick={testConnection} 
          disabled={loading}
          className="test-button"
        >
          {loading ? 'Testing...' : 'Test API Connection'}
        </button>
      </div>
      
      <style jsx>{`
        .api-test-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          background-color: white;
        }
        
        h2 {
          margin-top: 0;
          color: #333;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        
        .error-message {
          background-color: #ffebee;
          border-left: 4px solid #f44336;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        
        .success-message {
          background-color: #e8f5e9;
          border-left: 4px solid #4caf50;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        
        .troubleshooting {
          margin-top: 15px;
          font-size: 0.9em;
        }
        
        .actions {
          margin-top: 20px;
        }
        
        .test-button {
          background-color: #1976d2;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        
        .test-button:hover {
          background-color: #1565c0;
        }
        
        .test-button:disabled {
          background-color: #b0bec5;
          cursor: not-allowed;
        }
        
        pre {
          background-color: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 0.9em;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default ApiTest; 