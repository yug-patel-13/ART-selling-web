import React, { useState, useEffect } from "react";
import './Order.css'; // Ensure this CSS file is properly imported

const Orders = () => {
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('selectedItem')) || [];
    setSelectedItem(order);
  }, []);

  return (
    
    <div className="order-container">
      <h1>recent order</h1>
      <table className="order-table">
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{selectedItem.name}</td>
          </tr>
          <tr>
            <th>Price:</th>
            <td>{selectedItem.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
