import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Sign.css";

const SignIn = ({ setname, setemail, setsignin }) => {
  const [password, setPassword] = useState('');
  const [LocalName, setLocalName] = useState('');
  const [Localemail, setLocalEmail] = useState('');

  const handleInputChange = (e) => {
    setLocalName(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setLocalEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("pass");

    if (nameInput.value === "" || emailInput.value === "" || passwordInput.value === "") {
      alert("Required data missing... please fill it");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/artdata', { name: LocalName, email: Localemail, password });
      if (response.status === 200) {
        alert('Account created successfully!');
        setname(LocalName);
        setemail(Localemail);
        setsignin("sign-out");
      }
    } catch (error) {
      alert('Error creating account');
    }
  };

  return (
    <div className="blur-background">
      <div className="container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter Name:</label>
            <input type="text" value={LocalName} onChange={handleInputChange} id='name' required />
          </div>
          <div>
            <label>Enter Email:</label>
            <input type="email" value={Localemail} onChange={handleInputChange2} id='email' required />
          </div>
          <div>
            <label>Set Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id='pass' required />
          </div>
          <button type="submit">Create Account</button>
       <Link to="/sketches"><button id="cl">close</button></Link>  
        </form>
        <p>Already have an account? <Link to="/sign-up">verify</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
