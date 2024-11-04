const Firebase = require('firebase-admin');
const serviceAccount = require('../skydrive-9514c-firebase-adminsdk-pzz90-d4d2d67572.json');

// Initialize Firebase Admin SDK with service account credentials
const firebaseApp = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'skydrive-9514c.appspot.com',  // Corrected bucket URL format
});

// Export the initialized Firebase app for use in other parts of the application
module.exports = firebaseApp;
