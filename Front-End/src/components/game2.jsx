import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#ffc107',
    },
  },
});

const Game2 = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: {
          Accept: 'application/json',
        },
      });
      setJoke(response.data.joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            Random Joke Generator
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Click the button to get a new random joke!
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography variant="h5" component="div" style={{ minHeight: '100px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            {loading ? 'Loading...' : joke}
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={fetchJoke}>
          Get a New Joke
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default Game2;