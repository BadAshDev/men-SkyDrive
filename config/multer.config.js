const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage'); 
const firebase = require("firebase-admin");

const serviceAccount = require('../skydrive-9514c-firebase-adminsdk-pzz90-d4d2d67572.json');

// Initialize Firebase Admin with service account credentials
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: 'skydrive-9514c.appspot.com',  // Ensure this is correctly set
});

// Configure Firebase Storage with multer-firebase-storage
const storage = firebaseStorage({
    credentials: firebase.app().options.credential,
    bucketName: 'skydrive-9514c.appspot.com',
    unique: true,
});


// Create multer upload middleware
const upload = multer({
    storage: storage,
});

module.exports = upload;
