// Import required modules
const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require("cookie-parser");

// Use cookie-parser middleware
app.use(cookieParser());

// Import JWT functions
const { generateTokens, checkTokenValidity } = require("./Middleware/JWT");

// Enable CORS for the specified origin
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Set Access-Control-Allow-Origin header
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

// Set additional CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Parse JSON request bodies with a limit of 10MB
app.use(express.json({ limit: '10mb' }));

// Connect to the SQLite database
let db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database successfully!!!');
    }
});

// Validate user password and generate access token
app.post('/validatePassword', (req, res) => {
    const { email, password } = req.body;

    // Query the database to check if the email and password match
    db.all(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            // If a matching user is found, generate an access token and set it as a cookie
            const accessToken = generateTokens({ email:email });
            res.cookie("access-token", accessToken, { maxAge: 60 * 30 * 1000 });
            res.send({ validation: true });
        } else {
            // If no matching user is found, send a validation failure response
            res.send({ validation: false });
        }
    });
});

// Get user profile data
app.get('/profile', checkTokenValidity, (req, res) => {
  const email = req.email;

  // Query the database to fetch the user's name, email, and score
  db.get(`SELECT name, email, score FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error fetching user profile' });
    } else if (!row) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(row);
    }
  });
});

// Update user score if the new score is higher
app.put('/profile/score', checkTokenValidity, (req, res) => {
  const { email, currentScore } = req.body;
  console.log(currentScore, email);

  // Query the database to fetch the user's existing score
  db.get('SELECT score FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Error fetching user score:', err);
      res.status(500).json({ error: 'Error fetching user score' });
    } else if (!row) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const existingScore = row.score;
      console.log(existingScore, currentScore);

      // If the new score is higher than the existing score, update the user's score
      if (currentScore > existingScore) {
        db.run('UPDATE users SET score = ? WHERE email = ?', [currentScore, email], (err) => {
          if (err) {
            console.error('Error updating score:', err);
            res.status(500).json({ error: 'Error updating score' });
          } else {
            res.json({ message: 'Score updated successfully' });
          }
        });
      } else {
        res.json({ message: 'Score not updated as it is lower than the existing score' });
      }
    }
  });
});

// Get user name
app.get('/profile/name', checkTokenValidity, (req, res) => {
    const email = req.email;

    // Query the database to fetch the user's name
    db.get('SELECT name FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error fetching user name' });
        } else if (!row) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(row);
        }
    });
});

// Get top 5 scores from the leaderboard
app.get('/leaderboard', (req, res) => {
    // Query the database to fetch the top 5 scores
    db.all('SELECT name, score FROM users ORDER BY score DESC LIMIT 5', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error fetching leaderboard' });
        } else {
            res.json(rows);
        }
    });
});

// Delete user profile and clear access token
app.delete('/profile', checkTokenValidity, (req, res) => {
    const email = req.email;

    // Delete the user from the database
    db.run('DELETE FROM users WHERE email = ?', [email], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error deleting user profile' });
        } else {
            // Clear the access token cookie
            res.clearCookie('access-token');
            res.json({ message: 'User profile deleted successfully' });
        }
    });
});

// Create a new user
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if the email already exists in the database
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error checking for existing user' });
      } else if (row) {
        // If the email already exists, return an error
        res.status(400).json({ error: 'Email already exists' });
      } else {
        // Insert the new user into the database
        db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err) => {
          if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error creating user' });
          } else {
            res.json({ message: 'User created successfully' });
          }
        });
      }
    });
  });

// Start the server and listen on port 3000
app.listen(3000, () => console.log('Listening at port 3000'));