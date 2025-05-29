import React, { useEffect, useState } from 'react';
import './Cart.css'; // Ensure this CSS file is properly imported

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    updateTotalPrice(cartItems);
  }, []);

  const updateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  const remove = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  return (
    
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h1>{item.name}</h1>
                <h3>{item.price} rs</h3>
              </div>
              <button onClick={() => remove(index)} className="remove-button">Remove</button>
            </div>
          ))}
          <h2>Total Price: {totalPrice} rs</h2>
        </div>
      )}
      <h1>Tap on sketches to order your choices</h1>
    </div>
  );
};

export default Cart;
