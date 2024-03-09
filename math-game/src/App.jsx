import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import backgroundImage from './assets/Background.png'; // Import the background image
import './App.css';

import Title from './components/LoginSignup/GameTitle'; // Import the GameTitle component


function App() {
  return (
    <BrowserRouter>
      <div className="app-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Title />
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
