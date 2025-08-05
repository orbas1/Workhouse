const admin = require('firebase-admin');

let app;

/**
 * Initialize and return a singleton Firebase app instance.
 * Credentials are read from environment variables:
 *  - FIREBASE_PROJECT_ID
 *  - FIREBASE_CLIENT_EMAIL
 *  - FIREBASE_PRIVATE_KEY
 */
function initFirebase() {
  if (!app) {
    const credential = admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    });

    app = admin.initializeApp({ credential });
  }

  return app;
}

module.exports = {
  initFirebase,
  auth: () => initFirebase().auth(),
  firestore: () => initFirebase().firestore(),
};

