// JWT.js
const { sign, verify } = require("jsonwebtoken");

const generateTokens = (user) => {
    const accessToken = sign(
        { email: user.email },
        "minadahatetomatoes",
    );

    return accessToken;
}

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