const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require("cookie-parser") // For User
app.use(cookieParser()); // For user
const { generateTokens, checkTokenValidity } = require("./Middleware/JWT")

 

app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend origin
    credentials: true // Allow credentials (cookies)
  }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();

});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Update with your frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true); // Allow credentials (cookies)
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
            const accessToken = generateTokens({ email:email }) // create the JWT token for the user
            res.cookie("access-token", accessToken, { maxAge: 60 * 30 * 1000 }) // this will create cookie in clients browswer(maxAge is expriation time for the cookie)
            res.send({ validation: true });
        } else {
            res.send({ validation: false });
        }
    });
});

app.get('/Hello', (req, res) => {
    res.send('Hello From Server');
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password], (err) => {
        if (err) {
            console.error('Error signing up:', err);
            res.status(500).send('Error signing up');
        } else {
            res.status(200).send('Signup successful');
        }
    });
});


app.listen(3000, () => console.log('Listening at port 3000'));
