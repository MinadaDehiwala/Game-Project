// Importing JWT for token creation
const { sign, verify } = require("jsonwebtoken");

// Function to generate tokens
const generateTokens = (user) => {
    const accessToken = sign(
        { email: user.email }, // Define token content
        "minadahatetomatoes",
    );

    return accessToken;
}

// Middleware to validate user's token
const checkTokenValidity = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.status(400).json({ error: "User authentication failed!" })
    }

    try {
        const decodedToken = verify(accessToken, "minadahatetomatoes")
        if (decodedToken) {
            req.email = decodedToken.email;
            req.authenticated = true; // Accessible flag for middleware usage
            return next() // Proceed to next middleware
        }
    } catch (e) {
        return res.status(400).json({ error: "Token validation error on server" })
    }
}

module.exports = { generateTokens, checkTokenValidity }
