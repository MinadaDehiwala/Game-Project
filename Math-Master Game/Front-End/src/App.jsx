// Import necessary modules and components
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
import Game2 from './components/Games/game2';

// Main App component
function App() {
  // State to keep track of authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Protected route component to handle authentication
  const ProtectedRoute = ({ element, ...rest }) => {
    // If the user is not authenticated
    if (!isAuthenticated) {
      const currentPath = rest.location?.pathname;
      // If the current path is '/', render the Login component
      // If the current path is '/signup', render the Signup component
      // Otherwise, redirect to the '/' path
      return currentPath === '/' ? (
        <Login />
      ) : currentPath === '/signup' ? (
        <Signup />
      ) : (
        <Navigate to="/" replace />
      );
    }

    // If the user is authenticated and the current path is '/' or '/signup', redirect to '/menu'
    if (isAuthenticated && (rest.location?.pathname === '/' || rest.location?.pathname === '/signup')) {
      return <Navigate to="/menu" replace />;
    }

    // Otherwise, render the protected component
    return element;
  };

  return (
    <BrowserRouter>
      {/* Background image */}
      <div className="app-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Game title */}
        <Title />

        {/* Router configuration */}
        <Routes>
          {/* Login route */}
          <Route key="login" path="/" element={<ProtectedRoute element={<Login />} />} />
          {/* Signup route */}
          <Route key="signup" path="/signup" element={<ProtectedRoute element={<Signup />} />} />
          {/* Menu route */}
          <Route key="menu" path="/menu" element={<ProtectedRoute element={<Menu />} />} />
          {/* Game route */}
          <Route key="game" path="/game" element={<ProtectedRoute element={<Game />} />} />
          {/* Profile route */}
          <Route key="profile" path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          {/* Leaderboard route */}
          <Route key="leaderboard" path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
          {/* How to play route */}
          <Route key="howtoplay" path="/howtoplay" element={<ProtectedRoute element={<HowToPlay />} />} />
          {/* Game 2 route */}
          <Route key="game2" path="/game2" element={<ProtectedRoute element={<Game2 />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Export the App component
export default App;