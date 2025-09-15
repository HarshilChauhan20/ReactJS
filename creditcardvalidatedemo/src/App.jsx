import React, { useState } from "react";
import validator from 'validator';
import './App.css';

const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [messageClassName, setMessageClassName] = useState('');

  const validateCreditCard = (value) => {
    if (validator.isCreditCard(value)) {
      setErrorMessage('✅ Valid Credit Card Number');
      setMessageClassName('message success-message');
    } else if (value === '') {
      setErrorMessage('');
      setMessageClassName('');
    } else {
      setErrorMessage('❌ Enter a valid Credit Card Number!');
      setMessageClassName('message error-message');
    }
  };

  return (
    <div className="card-validator-container">
      <h2 className="title">Credit Card Validator</h2>
      
      <label htmlFor="creditCard">Enter Credit Card Number:</label>
      <input
        id="creditCard"
        type="text"
        className="card-input"
        onChange={(e) => validateCreditCard(e.target.value)}
        placeholder="1234 5678 9012 3456"
      />

      {errorMessage && (
        <div className={messageClassName}>{errorMessage}</div>
      )}
    </div>
  );
};

export default App;
