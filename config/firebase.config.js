const firebase = require("firebase-admin");
const serviceAccount = require('../skydrive-9514c-firebase-adminsdk-pzz90-d4d2d67572.json');

// Initialize Firebase only if there isn't already an instance
if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        storageBucket: 'skydrive-9514c.appspot.com',
    });
}

module.exports = firebase;
