import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Signup from './components/LoginSignup/Signup';
import Login from './components/LoginSignup/Login'; // Importing the Login function
import 'bootstrap/dist/css/bootstrap.min.css';


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
             <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
