const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const signupRoutes = require('./Routes/signupRoutes');

app.use(cors)

// Create a new SQLite3 database connection
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to the database successfully!');
  }
});

// Configure Passport with a local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Assuming email as username
  (email, password, done) => {
    // Perform authentication logic here (e.g., verify user credentials)
    // For demonstration purposes, I'm assuming a simple check against the database
    // Replace this with your actual authentication logic, such as querying the database
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user || user.password !== password) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      return done(null, user);
    });
  }
));

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id); // Assuming user object has an id
});

passport.deserializeUser((id, done) => {
  // Retrieve user from the database based on user ID
  // Call done(null, user) with the user object
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
});

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the origin where your React app is running
  credentials: true, // Include credentials in CORS requests
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Set up session management
app.use(session({
  secret: 'your_secret_key', // Change this to a secure random string
  resave: false,
  saveUninitialized: false
}));

// Endpoint for user login and authentication
app.post('/login', passport.authenticate('local', {
  successRedirect: '/menu', // Redirect to menu page on successful login
  failureRedirect: '/login', // Redirect back to login page on failed login
}));

// Endpoint for fetching user profile data (Protected route)
app.get('/profile', (req, res) => {
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

app.use('/signup',signupRoutes)

// Endpoint for user signup

// app.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   // Check if the user already exists in the database
//   db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
//     if (err) {
//       console.error('Error checking user existence:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }

//     if (row) {
//       // If the user already exists, return an error
//       res.status(409).json({ error: 'User already exists' });
//       return;
//     }

//     // No password hashing, store the plain-text password in the database
//     // (NOT RECOMMENDED FOR PRODUCTION USE)

//     // If the user doesn't exist, insert the new user data into the database
//     db.run(
//       'INSERT INTO users (email, password) VALUES (?, ?)',
//       [email, password],
//       function (err) {
//         if (err) {
//           console.error('Error creating user:', err); // Log detailed error message
//           res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//           res.status(201).json({ message: 'User created successfully' });
//         }
//       }
//     );
//   });
// });

// Your existing routes can remain unchanged
app.post('/validatePassword', (req, res) => {
  // Existing logic for validating password
});

app.get('/Hello', (req, res) => {
  // Existing logic for Hello route
});

app.listen(3000, () => console.log('Listening at port 3000'));