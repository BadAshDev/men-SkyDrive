const mongoose = require('mongoose');

// Function to connect to the MongoDB database
function connectToDB() {
    // Attempt to connect to the database using the URI from environment variables
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((error) => {
            // Log any connection errors to the console
            console.error('Error connecting to the database:', error.message);
        });
}

// Export the connectToDB function for use in other parts of the application
module.exports = connectToDB;
