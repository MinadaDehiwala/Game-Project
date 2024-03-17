import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  return (
    <BrowserRouter>
      <div className="app-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Title />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/game" element={<Game />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
