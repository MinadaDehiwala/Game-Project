const { generateTokens } = require('../Middleware/JWT');

const db = require('../db'); // Assuming you have a separate module for database operations

const validatePassword = (req, res) => {
    const { email, password } = req.body;

    db.all(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
            const accessToken = generateTokens({ email: email });
            res.cookie("access-token", accessToken, { maxAge: 60 * 30 * 1000 });
            res.send({ validation: true });
        } else {
            res.send({ validation: false });
        }
    });
};

const getProfile = (req, res) => {
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
};
const updateScore = (req, res) => {
    const email = req.query.email;
    const newScore = req.body.score;
    console.log('Request body:', req.body);

    db.get('SELECT score FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error fetching user score' });
      } else if (!row) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const existingScore = row.score;
  
        db.run('UPDATE users SET score = ? WHERE email = ?', [newScore, email], (err) => {
            if (err) {
              console.error(err.message);
              res.status(500).json({ error: 'Error updating score' });
            } else {
              res.json({ message: 'Score updated successfully' });
            }
          });
        
      }
    });
  };

const getName = (req, res) => {
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
};

const signup = (req, res) => {
    const { name, email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error checking for existing user' });
        } else if (row) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
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
};

const logout = (req, res) => {
    try {
        res.clearCookie('access-token', {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProfile = (req, res) => {
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
};

module.exports = {
    validatePassword,
    getProfile,
    updateScore,
    getName,
    signup,
    logout,
    deleteProfile
};