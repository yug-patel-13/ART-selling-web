import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Paintings from './components/Paintings';
import Orders from './components/Orders';
import Cart from './components/Cart';
import Home from './components/Home';
import Sketch from './components/Sketch';
import Buy from './components/Buy';
import Next from './components/Next';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import More from './components/More';

const App = () => {
  const [namee, setNamee] = useState(''); // State for the signed-in user's name
  const [email, setemail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
const[signinbtn,setsignin]=useState("sign-in")

  return (
    <div>
      <Router>
        <Header setSearchTerm={setSearchTerm} namee={namee} email={email} signinbtn={signinbtn}/> {/* Pass namee to Header */}
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path="/sketches" element={<Sketch searchTerm={searchTerm}  setsignin={setsignin} signinbtn={signinbtn}/>} />
          <Route path='/paintings' element={<Paintings searchTerm={searchTerm} setsignin={setsignin} signinbtn={signinbtn}/>} />
          <Route path='/your-orders' element={<Orders />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/buy" element={<Buy/>}/>
          <Route path='/next' element={<Next/>}/>
          <Route path="/sign-in" element={<SignIn setname={setNamee} setemail={setemail} signinbtn={signinbtn} setsignin={setsignin}
         
           />} />  <Route path="/more" element={<More/>}/>
          <Route path='/sign-up' element={<SignUp setsignin={setsignin}/>} />
        </Routes>
      </Router>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>&copy; 2024 Yug Patel's Art Gallery. All rights reserved.</p>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com/about_art_13/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="logo192.png" className="social-icon" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="logo192.png" className="social-icon" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="logo192.png" className="social-icon" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
          <a href="http://www.youtube.com/@creationchannel9709" className="social-icon" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
