import React, { useState } from 'react';
import './More.css';
import axios from 'axios';

const More = () => {
  const [namey, setNamey] = useState('');
  const [number, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/; // Simple regex for 10 digit phone number
    if (phoneRegex.test(number)) {
      setMessage('We will contact you. Please confirm your phone number.');
      try {
        const response = await axios.post('http://localhost:5000/api/sketch', { name: namey, number: number });
        if (response.status === 200) {
          alert('Account created successfully!');
          // Reset form after successful submission
          setNamey('');
          setPhoneNumber('');
        }
      } catch (error) {
        alert('Error creating account');
      }
    } else {
      setMessage('Please enter a valid 10 digit phone number.');
    }
  };

  return (
    <>
      <div id='ordernow' className="more-container">
        <div id="number" className="more-number">
          <h1 style={{ color: "red" }}>Order Sketch Portrait</h1>
          <h1>Enter your phone number:</h1>
          <input
            type='text'
            id="name"
            className="more-input"
            placeholder="Your Name"
            value={namey}
            onChange={(e) => setNamey(e.target.value)}
          />
          <br />
          <input
            type="text"
            id='numberr'
            className="more-input"
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />
          <button onClick={handleSubmit} className="more-button">Submit</button>
          <h3 style={{ color: "red" }}>{message}</h3>
        </div>
      </div>
      <div id="line">
        <h1 style={{ marginLeft: "15%" }} id='flip'>
          If you want to see more of our artworks, visit our YouTube channel or Instagram page. Thank you!
        </h1>
      </div>
    </>
  );
};

export default More;
