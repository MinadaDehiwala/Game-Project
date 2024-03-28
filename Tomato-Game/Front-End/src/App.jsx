import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Authentication/Signup';
import backgroundImage from './assets/Background.png';
import './App.css';
import Title from './components/GameTitle';
import Login from './components/Authentication/Login';
import Menu from './components/Menu-Page';
import Game from './components/Games/Game';
import Profile from './components/profile';
import Leaderboard from './components/Score-Chart';
import HowToPlay from './components/HowToPlay';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking for a valid token in localStorage)
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  
    // Listen for changes in the local storage
    const handleStorageChange   = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
  
    // Add the event listener
    window.addEventListener('storage', handleStorageChange);
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Define a custom route component for protected routes
  const ProtectedRoute = ({ element, ...rest }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <div className="app-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Title />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menu" element={<ProtectedRoute element={<Menu />} />} />
          <Route path="/game" element={<ProtectedRoute element={<Game />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
          <Route path="/howtoplay" element={<ProtectedRoute element={<HowToPlay />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
