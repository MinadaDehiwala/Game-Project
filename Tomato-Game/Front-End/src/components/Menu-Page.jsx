import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container, Button, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios'; // Import axios



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
  const classes = useStyles();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchUserName();

  }, []);

  const fetchUserName = async () => {
    try {
      const response = await fetch('http://localhost:3000/profile/name', {
        method: 'GET',
        credentials: 'include',
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
        <h1 className={classes.title}>Welcome, {userName}!</h1>
        <Link to="/profile">
          <Button className={classes.button} variant="contained" color="primary" fullWidth>
            My Profile
          </Button>
        </Link>
        <Link to="/game">
          <Button className={classes.button} variant="contained" color="primary" fullWidth>
            Play
          </Button>
        </Link>
        <Link to="/leaderboard">
          <Button className={classes.button} variant="contained" color="primary" fullWidth>
            Leaderboard
          </Button>
        </Link>
        <Link to="/howtoplay">
          <Button className={classes.button} variant="contained" color="primary" fullWidth>
            How to play
          </Button>
        </Link>
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
    
    </motion.div>
  );
}

export default Menu;