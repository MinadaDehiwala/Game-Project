import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import backgroundImage from './assets/Background.png'; // Import the background image
import './App.css';
import Title from './components/GameTitle'; // Import the GameTitle component
import Login from './components/Login';
import Menu from './components/Menu-Page';
import Game from './components/Game';
import Profile from './components/profile';
import Leaderboard from './components/Score-Chart';
import HowToPlay from './components/HowToPlay';


function App() {
  return (
    <BrowserRouter>
      <div className="app-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Title />
        <Routes>
            
          <Route path="/menu" element={<Menu />} />
          <Route path="/game" element={<Game />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}



export default App;
