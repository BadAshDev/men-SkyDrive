const express = require('express');
const { body, validationResult } = require('express-validator'); // For validation
const router = express.Router();
const userModel = require('../models/user.model'); // User model for database interactions
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation

// GET route for the registration page
router.get('/register', (req, res) => {
    res.render('register'); // Render the registration view
});

// POST route for user registration
router.post('/register',
    // Validation rules for input fields
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req); // Validate request data
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(), // Return validation errors
                message: 'Invalid data'
            });
        }

        const { email, username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10); // Hash the password

        // Create a new user in the database
        const newUser = await userModel.create({
            email,
            username,
            password: hashPassword // Store the hashed password
        });

        res.json(newUser); // Respond with the newly created user data
    }
);

// GET route for the login page
router.get('/login', (req, res) => {
    res.render('login'); // Render the login view
});

// POST route for user login
router.post('/login',
    // Validation rules for login input fields
    [
        body('username').trim().isLength({ min: 3 }),
        body('password').trim().isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req); // Validate request data

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(), // Return validation errors
                message: 'Invalid data'
            });
        }

        const { username, password } = req.body;

        // Find the user by username
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: 'Username or password is incorrect'
            });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Username or password is incorrect'
            });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            {
                userId: user._id, // Include user ID in the token
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET // Secret key for signing the token
        );

        res.cookie('token', token); // Set the token as a cookie
        res.send('Logged in'); // Respond with a success message
    }
);

// Export the router for use in the main application
module.exports = router;
