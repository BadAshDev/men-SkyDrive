const mongoose = require('mongoose');

// Define the schema for the file model
const fileSchema = new mongoose.Schema({
    // Path where the file is stored
    path: {
        type: String,
        required: [true, 'Path is required'], // Ensure path is provided
    },
    // Original name of the uploaded file
    originalName: {
        type: String,
        required: [true, 'Original name is required'], // Ensure original name is provided
    },
    // Reference to the user who uploaded the file
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the 'users' collection
        required: [true, 'User is required'], // Ensure user is provided
    },
});

// Create the file model based on the schema
const File = mongoose.model('File', fileSchema);

// Export the file model for use in other parts of the application
module.exports = File;
