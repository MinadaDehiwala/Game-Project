import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container, Button, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

// Define custom styles using Material-UI's makeStyles hook
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '15px',
    padding: '20px',
    maxWidth: '500px',
    marginTop: '100px',
  },
  title: {
    fontSize: '2.875rem',
    marginBottom: '2.25rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginBottom: theme.spacing(2),
    fontSize: '1.2rem',
  },
}));

function Menu() {
  // Get the custom styles
  const classes = useStyles();
  // State to store the user's name
  const [userName, setUserName] = useState('');
  // Get the navigation function from React Router
  const navigate = useNavigate();

  // Fetch the user's name when the component mounts
  useEffect(() => {
    fetchUserName();
  }, []);

  // Function to fetch the user's name from the server
  const fetchUserName = async () => {
    const accessToken = localStorage.getItem('access-token');

    try {
      const response = await fetch('http://localhost:3000/profile/name', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
      } else {
        console.error('Failed to fetch user name');
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  // Function to handle navigating to the game2 page when the moon is clicked
  const handleMoonClick = () => {
    navigate('/game2');
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Logout successful, navigate to the login page
        window.location.href = '/';
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
      className={classes.root}
    >
      <Container className={classes.container}>
        {/* Display the user's name */}
        <h1 className={classes.title}>Welcome, {userName}!</h1>
        {/* Link to the user's profile */}
        <Link to="/profile">
          <Button className={classes.button} variant="contained" color="primary" fullWidth>
            My Profile
          </Button>
        </Link>
        {/* Link to the game page */}
        <Link to="/game">
          <Button className={classes.button} variant="contained" color="primary" fullWidth>
            Play
          </Button>
        </Link>
        {/* Link to the leaderboard page */}
        <Link to="/leaderboard">
          <Button className={classes.button} variant="contained" color="primary" fullWidth>
            Leaderboard
          </Button>
        </Link>
        {/* Link to the how to play page */}
        <Link to="/howtoplay">
          <Button className={classes.button} variant="contained" color="primary" fullWidth>
            How to play
          </Button>
        </Link>
        {/* Button to logout */}
        <Link to="/">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogout}
          >
            Exit/LogOut
          </Button>
        </Link>
      </Container>
      {/* Easter egg: Clicking on the moon navigates to the game2 page */}
      <div
        onClick={handleMoonClick}
        style={{
          position: 'absolute',
          bottom: '58px', // Adjust the position to match the Easter egg's location
          right: '44px',
          width: '35px', // Adjust the width and height to create a small area around the Easter egg
          height: '43px',
          cursor: 'pointer',
          borderRadius: '50%',
        }}
      />
    </motion.div>
  );
}

export default Menu;