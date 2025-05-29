import React, { useState, useEffect } from 'react';
import './Buy.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Buy = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [payment, setPayment] = useState("cash");
  const [artwork, setArtwork] = useState("");

  useEffect(() => {
    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
    if (selectedItem) {
      setArtwork(selectedItem.name);
    }
  }, []);

  const handleCheck = () => {
    const addressElement = document.getElementById("add");
    const nameElement = document.getElementById("name");
    const numberElement = document.getElementById("num");
    const nextElement = document.getElementById("next");
    const checkElement = document.getElementById("check");

    if (addressElement.value !== "" && nameElement.value !== "" && numberElement.value.length === 10) {
      nextElement.style.display = "flex";
      checkElement.style.display = "none";
    } else {
      alert("Some information is missing");
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('http://localhost:4000/api/buying', {
        address,
        name,
        number,
        paymentmethod: payment,
        artwork
      });

      if (response.status === 200) {
        alert("Order completed...");
      }
    } catch (error) {
      alert('Error storing data');
    }
  };

  return (
    <>
      <div id='info'>
        <Link to="/sketches" id='back'>
          <button id='backbtn'>
            <i className="fa-solid fa-backward"></i>
          </button>
        </Link>
        <h1>Fill the information</h1>
        <div id="address">
          <table>
            <tbody>
              <tr>
                <td><h3>Address:</h3></td>
                <td>
                  <textarea name="address" id="add" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
                </td>
              </tr>
              <tr>
                <td><h3>Name:</h3></td>
                <td>
                  <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} required />
                </td>
              </tr>
              <tr>
                <td><h3>Number:</h3></td>
                <td>
                  <input type="number" name="" id="num" value={number} onChange={(e) => setNumber(e.target.value)} required />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="payment">
          <h1>Payment method</h1>
          <div>
            <label htmlFor="cash">
              <input type="radio" id="cash" name="payment" value="cash" checked={payment === 'cash'} onChange={(e) => setPayment(e.target.value)} />
              Cash on Delivery
            </label>
          </div>
          <div>
            <label htmlFor="googlepay">
              <input type="radio" id="googlepay" name="payment" value="googlepay" checked={payment === 'googlepay'} onChange={(e) => setPayment(e.target.value)} />
              Google Pay
            </label>
          </div>
          <div>
            <label htmlFor="phonepay">
              <input type="radio" id="phonepay" name="payment" value="phonepay" checked={payment === 'phonepay'} onChange={(e) => setPayment(e.target.value)} />
              Phone Pay
            </label>
          </div>
          <div>
            <label htmlFor="netbanking">
              <input type="radio" id="netbanking" name="payment" value="netbanking" checked={payment === 'netbanking'} onChange={(e) => setPayment(e.target.value)} />
              Net Banking
            </label>
          </div>
          <div>
            <label htmlFor="cardpayment">
              <input type="radio" id="cardpayment" name="payment" value="cardpayment" checked={payment === 'cardpayment'} onChange={(e) => setPayment(e.target.value)} />
              Card Payment
            </label>
          </div>
        </div>
        <button onClick={handleCheck} id='check'>Check</button>
        <Link to="/next" id='next'>
          <button id='nextbtn' onClick={handleSubmit}>
            <i className="fa-solid fa-forward"></i>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Buy;
