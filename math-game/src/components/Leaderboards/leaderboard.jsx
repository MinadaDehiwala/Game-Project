import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Leaderboard() {
  // Dummy leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Player 1", score: 100 },
    { rank: 2, name: "Player 2", score: 90 },
    { rank: 3, name: "Player 3", score: 80 },
    // Add more leaderboard data as needed
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='leaderboard-container'
    >
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <Link to="/menu" className="btn btn-primary">Back to Menu</Link>
      </div>
      <div className="leaderboard-list">
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player, index) => (
              <tr key={index}>
                <td>{player.rank}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default Leaderboard;
