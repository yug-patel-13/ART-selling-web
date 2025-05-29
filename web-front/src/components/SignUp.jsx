import React, { useState } from 'react';
import axios from 'axios';
import "./Sign.css";
import { Link } from 'react-router-dom';

const SignUp = ({setsignin}) => {
  const [password, setPassword] = useState('');
  const [Localemail, setLocalEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/artdata2', { email: Localemail, password });
      if (response.data.success) {
        alert('You are now signed in');
        
        setsignin("sign-out");
        
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert('Error signing in');
    }
   
  };

  return (
    <div className="blur-background">
    <div className="container">
      <h2>verify</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>enter your Email:</label>
          <input type="email" value={Localemail} onChange={(e) => setLocalEmail(e.target.value)} required />
        </div>
        <div>
          <label>enter your Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign In</button>
        <Link to="/sketches"><button id="cl">close</button></Link>  
      </form>
    </div>
    </div>
  );
};

export default SignUp;
