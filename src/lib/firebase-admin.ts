
import * as admin from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';

let db: Firestore;

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
  db = admin.firestore();
} catch (error) {
  console.error('Firebase admin initialization error', error);
  // db will remain uninitialized
}

// Export a potentially uninitialized db object.
// The code using it should handle the case where it's not available.
export { db };
