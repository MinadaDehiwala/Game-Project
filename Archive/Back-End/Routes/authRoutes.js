const express = require('express');
const passport = require('../Config/passport');
const router = express.Router();

// Login endpoint
router.post('/login', passport.authenticate('local', {
  successRedirect: '/menu',
  failureRedirect: '/login'
}));

module.exports = router;
