const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
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
