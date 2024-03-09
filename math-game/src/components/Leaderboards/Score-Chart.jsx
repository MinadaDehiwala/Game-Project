// Leaderboard.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Score-Chart.css";

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <div className="leaderboard-chart">
        <div className="leaderboard-entry">
          <div className="column-title">Player Name</div>
          <div className="column-title">Score</div>
        </div>
        <div className="leaderboard-entry">
          <div className="player-name">Player 1</div>
          <div className="player-score">100</div>
        </div>
        <div className="leaderboard-entry">
          <div className="player-name">Player 2</div>
          <div className="player-score">95</div>
        </div>
        <div className="leaderboard-entry">
          <div className="player-name">Player 3</div>
          <div className="player-score">90</div>
        </div>
        <div className="leaderboard-entry">
          <div className="player-name">Player 4</div>
          <div className="player-score">85</div>
        </div>
        <div className="leaderboard-entry">
          <div className="player-name">Player 5</div>
          <div className="player-score">80</div>
        </div>
      </div>
      <Link to="/menu" className="main-menu-button">Back to Main Menu</Link>
    </div>
  );
};

export default Leaderboard;
