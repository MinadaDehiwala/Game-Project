import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';

// Define custom styles using Material-UI's makeStyles hook
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    paddingTop: '3vh',
  },
  card: {
    width: '80%',
    maxWidth: '800px',
    borderRadius: '15px',
    padding: '20px',
    marginTop: theme.spacing(4),
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2.25rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginTop: theme.spacing(2),
    fontSize: '1.2rem',
  },
  tableHeaderRow: {
    backgroundColor: theme.palette.primary.main, // Change the background color to your desired color
    '& th': {
      color: theme.palette.common.white, // Change the text color for better contrast
      fontWeight: 'bold', // Make the text bold
      fontSize: '1.2rem', // Increase the font size
    },
  },
}));

const Leaderboard = () => {
  // Get the custom styles
  const classes = useStyles();
  // State to store the leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Fetch the leaderboard data when the component mounts
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  // Function to fetch the leaderboard data from the server
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
    <Container className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          {/* Title */}
          <h1 className={classes.title}>Player Leaderboard</h1>
          {/* Leaderboard table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHeaderRow}>
                  <TableCell>#</TableCell>
                  <TableCell>Player Name</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map over the leaderboardData array to render table rows */}
                {leaderboardData.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Back to Main Menu button */}
          <div className="text-center">
            <Link to="/menu">
              <Button variant="contained" color="primary" className={classes.button}>
                Back to Main Menu
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Leaderboard;