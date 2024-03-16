const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Import sqlite3 library
const router = express.Router();

// Create a new SQLite3 database connection
const db = new sqlite3.Database('./DB/database.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to the database successfully!');
  }
});

// Signup endpoint
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists in the database
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Error checking user existence:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (row) {
      // If the user already exists, return an error
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    // No password hashing, store the plain-text password in the database
    // (NOT RECOMMENDED FOR PRODUCTION USE)

    // If the user doesn't exist, insert the new user data into the database
    db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password],
      function (err) {
        if (err) {
          console.error('Error creating user:', err); // Log detailed error message
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'User created successfully' });
        }
      }
    );
  });
});

module.exports = router;
