// Success.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <button
        onClick={() => navigate('/')}
        style={{
          background: '#1a237e',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Success;
