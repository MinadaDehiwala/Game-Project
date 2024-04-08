// server.js (no changes required)
const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const { generateTokens, checkTokenValidity } = require("./Middleware/JWT");

// ... (rest of the code remains the same)

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json({ limit: '10mb' }));

let db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database successfully!!!');
    }
});

app.post('/validatePassword', (req, res) => {
    const { email, password } = req.body;

    db.all(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            const accessToken = generateTokens({ email:email });
            res.cookie("access-token", accessToken, { maxAge: 60 * 30 * 1000 });
            res.send({ validation: true });
        } else {
            res.send({ validation: false });
        }
    });
});

app.get('/profile', checkTokenValidity, (req, res) => {
  const email = req.email;

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

app.put('/profile/score', checkTokenValidity, (req, res) => {
  const { email, currentScore } = req.body;
  console.log(currentScore, email);

  db.get('SELECT score FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Error fetching user score:', err);
      res.status(500).json({ error: 'Error fetching user score' });
    } else if (!row) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const existingScore = row.score;
      console.log(existingScore, currentScore);

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

app.get('/profile/name', checkTokenValidity, (req, res) => {
    const email = req.email;

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

app.get('/leaderboard', (req, res) => {
    db.all('SELECT name, score FROM users ORDER BY score DESC LIMIT 5', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error fetching leaderboard' });
        } else {
            res.json(rows);
        }
    });
});

app.delete('/profile', checkTokenValidity, (req, res) => {
    const email = req.email;

    db.run('DELETE FROM users WHERE email = ?', [email], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error deleting user profile' });
        } else {
            res.clearCookie('access-token');
            res.json({ message: 'User profile deleted successfully' });
        }
    });
});

// server.js
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if the email already exists in the database
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error checking for existing user' });
      } else if (row) {
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

app.listen(3000, () => console.log('Listening at port 3000'));