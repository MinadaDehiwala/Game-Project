import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/LoginSignup/Signup';
import backgroundImage from './assets/Background.png'; // Import the background image
import './App.css';
import Title from './components/Title/GameTitle'; // Import the GameTitle component
import Login from './components/LoginSignup/Login';
import Menu from './components/Menus/Menu-Page';
import Game from './components/Game/Game';
import Profile from './components/Profiles/profile';
import Leaderboard from './components/Leaderboards/Score-Chart';







function App() {
  return (
    <BrowserRouter>
      <div className="app-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Title />
        <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />


          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
