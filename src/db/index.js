const admin = require("firebase-admin");

let serviceAccount;
// initialize firebase store
try {
  if (process.env.NODE_ENV === "development") {
    serviceAccount = require("../../firebase-credentials.json");
  } else {
    serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
    };
  }

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
