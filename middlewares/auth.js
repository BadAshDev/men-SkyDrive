const jwt = require('jsonwebtoken');

// Middleware function to authenticate user using JWT
function auth(req, res, next) {
    // Retrieve token from cookies
    const token = req.cookies.token;

    // Check if token is not provided
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user information to the request object
        req.user = decoded;
        return next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // Handle invalid token or verification errors
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
}

// Export the authentication middleware for use in routes
module.exports = auth;
