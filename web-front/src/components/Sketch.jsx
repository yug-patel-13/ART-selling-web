import React, { useState } from 'react';
import { sketch } from "./Apis";
import "./sketches.css";
import { Link } from 'react-router-dom';

const Sketch = ({ searchTerm, signinbtn }) => {
  const [priceFilter, setPriceFilter] = useState(""); // State to hold the selected price filter

  const filteredSketches = sketch.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle price filtering based on selected option
  const applyPriceFilter = () => {
    switch (priceFilter) {
      case "200-500":
        return filteredSketches.filter(item => item.price >= 200 && item.price <= 500);
      case "500-700":
        return filteredSketches.filter(item => item.price >= 500 && item.price <= 700);
      case "lowest to highest":
        return filteredSketches.slice().sort((a, b) => a.price - b.price);
      case "highest to lowest":
        return filteredSketches.slice().sort((a, b) => b.price - a.price);
      default:
        return filteredSketches;
    }
  };

  const handleBuyNow = (item) => {
    localStorage.setItem('selectedItem', JSON.stringify(item));
  };

  const handleAddToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some(cartItem => cartItem.name === item.name)) {
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Your item is added to cart');
    } else {
      alert(`${item.name} is already in the cart`);
    }
  };

  return (
    <div id='sketching'>
     <h3 style={{color:"white"}}>filter price:</h3> <select id="opt" onChange={(e) => setPriceFilter(e.target.value)}>
        <option value="">Select Price Range</option>
        <option value="200-500">200-500</option>
        <option value="500-700">500-700</option>
        <option value="lowest to highest">lowest to highest</option>
        <option value="highest to lowest">highest to lowest</option>
      </select>
      <div id='under'>
        {applyPriceFilter().map((item, index) => (
          <div key={index} id='frame'>
            <img src={item.image} alt={item.name} />
            <h1>{item.name}</h1>
            <h3>Only {item.price} rs</h3>
            <Link to={signinbtn === "sign-in" ? "#" : "/buy"}>
              <button
                id="b"
                onClick={() => signinbtn !== "sign-in" && handleBuyNow(item)}
                disabled={signinbtn === "sign-in"}
                style={{
                  cursor: signinbtn === "sign-in" ? "not-allowed" : "pointer",
                  backgroundColor: signinbtn === "sign-in" ? "#ccc" : "#blue",
                  color: signinbtn === "sign-in" ? "#666" : "white"
                }}
              >
                buy-now
              </button>
            </Link>
            <button id='a' onClick={() => handleAddToCart(item)}>add to cart</button>
          </div>
        ))}
      </div>
      <h1 style={{marginLeft:"15%"}} id='flip'> sign-in to buy something . without signin you cannot able to buy</h1>
    </div>
  );
};

export default Sketch;
