const mongoose = require('mongoose');

// Define the schema for the user model
const userSchema = new mongoose.Schema({
    // Username of the user
    username: {
        type: String,
        required: true, // Username is required
        trim: true, // Remove whitespace from both ends
        lowercase: true, // Convert to lowercase
        unique: true, // Ensure username is unique
        minlength: [3, 'Username should be at least 3 characters long'], // Minimum length validation
    },
    // Email of the user
    email: {
        type: String,
        required: true, // Email is required
        trim: true, // Remove whitespace from both ends
        lowercase: true, // Convert to lowercase
        unique: true, // Ensure email is unique
        minlength: [13, 'Email should be at least 13 characters long'], // Minimum length validation
    },
    // Password of the user
    password: {
        type: String,
        required: true, // Password is required
        trim: true, // Remove whitespace from both ends
        minlength: [5, 'Password should be at least 5 characters long'], // Minimum length validation
    },
});

// Create the user model based on the schema
const User = mongoose.model('User', userSchema);

// Export the user model for use in other parts of the application
module.exports = User;
