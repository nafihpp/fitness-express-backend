const admin = require('firebase-admin');
const serviceAccount = require('./path-to-serviceAccountKey.json');

/**
 * Initialize Firebase Admin SDK for authentication and token verification
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
