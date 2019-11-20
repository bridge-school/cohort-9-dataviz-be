const admin = require("firebase-admin");

// initialize firebase store

try {
  const serviceAccount = require("../../firebase-credentials.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (e) {
  throw new Error(
    "Please add the firebase-credentials.json file to your root folder found in your project's Slack channel"
  );
}

const db = admin.firestore();

// import the db from any file to access firebase!
module.exports = db;
