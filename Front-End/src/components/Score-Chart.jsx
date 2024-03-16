// Score-Chart.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Table } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('http://localhost:3000/leaderboard');
      if (response.ok) {
        const data = await response.json();
        setLeaderboardData(data);
      } else {
        console.error('Failed to fetch leaderboard data');
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  return (
    <Container fluid className='d-flex align-items-start justify-content-center p-6' style={{ paddingTop: '3vh' }}>
      <Card className='m-5' style={{ width: '80%', maxWidth: '800px', borderRadius: '15px', padding: '20px' }}>
        <Card.Body className='px-5'>
          <h1 className="leaderboard-title text-center">Leaderboard</h1>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Player Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-center">
            <Link to="/menu" className="btn btn-primary mt-3">Back to Main Menu</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Leaderboard;