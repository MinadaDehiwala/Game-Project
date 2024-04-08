const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const { checkTokenValidity } = require("./Middleware/JWT");
const userRoutes = require('./Routes/userRoutes');
app.use('/api/users', userRoutes);
const leaderboardRoutes = require('./Routes/leaderboardRoutes');
app.use('/api/leaderboard', leaderboardRoutes);

// ... other code



app.use(cors({
    origin: 'http://localhost:5173', // Update this to the origin of your frontend
    credentials: true
}));


app.use(express.json({ limit: '10mb' }));

let db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database successfully!!!');
    }
});



app.use('/api/users', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});