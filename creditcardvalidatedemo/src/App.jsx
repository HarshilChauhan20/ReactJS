import React, { useState } from "react";
import validator from 'validator';
import './App.css'; // Import the CSS file

const App = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [messageClassName, setMessageClassName] = useState('error-message');

  const validateCreditCard = (value) => {
    if (validator.isCreditCard(value)) {
      setErrorMessage('Valid Credit Card Number');
      setMessageClassName('success-message'); // Set class for success
    } else if (value === '') {
      setErrorMessage(''); // Clear message if input is empty
    } else {
      setErrorMessage('Enter a valid Credit Card Number!');
      setMessageClassName('error-message'); // Set class for error
    }
  }

  return (
    <div className="card-validator-container">
      <pre className="form-wrapper">
        <h2 className="title">Validating Credit Card in ReactJS</h2>
        <span>Enter Credit Card: </span>
        <input 
          type="text"
          className="card-input"
          onChange={(e) => validateCreditCard(e.target.value)}
        />
        <br />
        <span className={messageClassName}>
          {errorMessage}
        </span>
      </pre>
    </div>
  );
}

export default App;