const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage'); 
const firebase = require('./firebase.config');
const serviceAccount = require('../skydrive-9514c-firebase-adminsdk-pzz90-d4d2d67572.json');

// Configure Firebase Storage with multer-firebase-storage
const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount), // Use service account credentials for authentication
    bucketName: 'skydrive-9514c.appspot.com',  // Corrected bucket URL format
    unique: true, // Ensure unique filenames to avoid overwriting
});

// Create multer upload middleware
const upload = multer({
    storage: storage, // Set the storage engine to use Firebase Storage
});

// Export the upload middleware for use in route handlers
module.exports = upload;
