
import * as admin from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';

let db: Firestore | null = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    db = admin.firestore();
  } else if (process.env.NODE_ENV === 'production' || process.env.FIREBASE_EMULATOR_HOST) {
    // Use application default credentials in production or with emulators
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
    db = admin.firestore();
  } else {
    console.warn('Firebase Admin SDK not initialized. Missing FIREBASE_SERVICE_ACCOUNT_KEY for local development or not in a production environment.');
  }
} catch (error) {
  console.error('Firebase admin initialization error:', error);
}

export { db };
