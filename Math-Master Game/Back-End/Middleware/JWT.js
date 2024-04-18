// Purpose: Middleware for JWT token generation and validation.

// Importing necessary libraries and dependencies
const { sign, verify } = require("jsonwebtoken");

// Function to generate JWT tokens
const generateTokens = (user) => {
    const accessToken = sign(
        { email: user.email },
        "minadahatetomatoes",
    );

    return accessToken;
}

// Function to check the validity of the JWT token
const checkTokenValidity = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.status(400).json({ error: "User authentication failed!" })
    }

    try {
        const decodedToken = verify(accessToken, "minadahatetomatoes")
        if (decodedToken) {
            req.email = decodedToken.email;
            req.authenticated = true;
            return next()
        }
    } catch (e) {
        return res.status(400).json({ error: "Token validation error on server" })
    }
}

module.exports = { generateTokens, checkTokenValidity }