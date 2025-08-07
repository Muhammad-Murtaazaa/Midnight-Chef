import React from 'react';
import './ResetBtn.css'; 
const ResetButton = ({ onReset }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button onClick={onReset} className="reset-btn">
        Make Another Recipe
      </button>
    </div>
  );
};

export default ResetButton;
