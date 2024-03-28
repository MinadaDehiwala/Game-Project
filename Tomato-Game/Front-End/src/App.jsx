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
import Game2 from './components/Games/Game2';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const ProtectedRoute = ({ element, ...rest }) => {
    if (!isAuthenticated) {
      const currentPath = rest.location?.pathname;
      return currentPath === '/' || currentPath === '/signup' ? (
        element
      ) : (
        <Navigate to="/" replace />
      );
    }

    if (isAuthenticated && rest.location?.pathname === '/') {
      return <Navigate to="/menu" replace />;
    }

    return element;
  };

  return (
    <BrowserRouter>
      <div className="app-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Title />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Login />} />} />
          <Route path="/signup" element={<ProtectedRoute element={<Signup />} />} />
          <Route path="/menu" element={<ProtectedRoute element={<Menu />} />} />
          <Route path="/game" element={<ProtectedRoute element={<Game />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
          <Route path="/howtoplay" element={<ProtectedRoute element={<HowToPlay />} />} />
          <Route path="/game2" element={<ProtectedRoute element={<Game2 />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;