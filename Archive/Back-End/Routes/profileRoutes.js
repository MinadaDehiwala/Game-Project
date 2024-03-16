const express = require('express');
const passport = require('../Config/passport');
const db = require('../db/database');
const router = express.Router();

// Profile endpoint (protected route)
router.get('/profile', (req, res) => {
  // If token is valid, req.user will contain the decoded user data
  const user = req.user;

  // Fetch profile data from the database using the user data
  db.get('SELECT * FROM users WHERE email = ?', [user.email], (err, row) => {
    if (err) {
      console.error('Error fetching profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (row) {
        // If user data is found, send it in the response
        res.status(200).json(row);
      } else {
        // If user data is not found, send a 404 Not Found response
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});

module.exports = router;
