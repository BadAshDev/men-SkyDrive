const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config'); // Middleware for file uploads
const fileModel = require('../models/files.models'); // File model for database interactions
const authMiddleware = require('../middlewares/auth'); // Middleware for authentication
const firebase = require('../config/firebase.config'); // Firebase configuration

// GET route for home page
router.get('/home', authMiddleware, async (req, res) => {
    try {
        // Fetch files uploaded by the authenticated user
        const userFiles = await fileModel.find({ user: req.user.userId });
        console.log(userFiles);

        // Render the 'home.ejs' file and pass the user files to it
        res.render('home', { files: userFiles });
    } catch (error) {
        console.error("Error fetching user files:", error);
        res.status(500).send("Internal Server Error");
    }
});

// POST route for file upload
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        // Create a new file record in the database
        const newFile = await fileModel.create({
            path: req.file.path, // Path to the uploaded file
            originalName: req.file.originalname, // Original file name
            user: req.user.userId // ID of the user who uploaded the file
        });
        res.json(newFile); // Respond with the newly created file data
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET route for file download
router.get('/download/:path', authMiddleware, async (req, res) => {
    try {
        const loggedInUserId = req.user.userId; // User ID from the authenticated request
        const path = req.params.path; // Get the file path from the request parameters

        // Find the file in the database associated with the user
        const file = await fileModel.findOne({
            user: loggedInUserId,
            path: path
        });

        // If the file is not found, respond with unauthorized status
        if (!file) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Generate a signed URL for the file from Firebase Storage
        const [signedUrl] = await firebase.storage().bucket().file(path).getSignedUrl({
            action: 'read', // Action for the signed URL
            expires: Date.now() + 60 * 1000 // URL valid for 1 minute
        });

        res.redirect(signedUrl); // Redirect to the signed URL for file download
    } catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Export the router for use in the main application
module.exports = router;
