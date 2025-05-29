import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ setSearchTerm, namee, email, signinbtn}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <>
      <div className='header'>
        <div id="logo">
          <img src="artlogo.jpg" alt="logo" id='photo' />
        </div>
        <div id="search">
          <input
            type="text"
            placeholder='search here'
            id="srch"
            onChange={handleSearch}
          />
        </div>
        <div id="link">
          <Link to="/" id='l2'><i className="fa-solid fa-house"></i></Link>
          <Link to="/sketches" id='l3'>Sketches</Link>
          <Link to="/paintings" id='l4'>Paintings</Link>
          <Link to="/your-orders" id='l5'>Your-orders</Link>
          <Link to="/cart" id='l6'><i className="fa-solid fa-cart-shopping"></i></Link>
          <button id='l7' onClick={toggleSidebar}><i className="fa-solid fa-circle-user"></i></button>
          <Link to="more" style={{color:"yellow"}} id='l8'><i class="fa-solid fa-bars"></i></Link>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} namee={namee} email={email} signinbtn={signinbtn}/> {/* Pass email to Sidebar */}
        </div>
      </div>
    </>
  );
};

const Sidebar = ({ isOpen, toggleSidebar,   signinbtn}) => {
  const change=()=>{
    const btn=document.getElementById("signin");

    if(btn.textContent==="sign-out")
    {
      btn.textContent="sign-in"
      alert("you are now sign-out ")
     
    }

  }
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}><i className="fa-solid fa-times"></i></button>
      <div className="user-info">
        <i className="fa-solid fa-circle-user user-icon" id='us'></i>
<h1>for buy something you must sign in first </h1>
      </div>
      <div>
        <Link to="/sign-in"><button id='signin' onClick={change}>{signinbtn}</button></Link>
      </div>
      <h2 style={{color:"yellow"}}>hey..do you want sketch ..click here</h2>
      <Link to="more" style={{color:"yellow"}} id='more'><button>order sketch</button></Link>
    </div>
  );
};

export default Header;
