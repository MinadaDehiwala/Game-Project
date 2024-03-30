const db = require('../db'); // Assuming you have a separate module for database operations

const getLeaderboard = (req, res) => {
    db.all('SELECT name, score FROM users ORDER BY score DESC LIMIT 5', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error fetching leaderboard' });
        } else {
            res.json(rows);
        }
    });
};

module.exports = {
    getLeaderboard
};