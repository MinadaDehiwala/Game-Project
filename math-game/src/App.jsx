import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './components/LoginSignup/Signup';
import Login from './components/LoginSignup/Login'; // Importing the Login function
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

