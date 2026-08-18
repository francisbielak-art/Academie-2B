import { initializeApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Placeholders: replace by .env or CI secrets. Do NOT commit real keys.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || '__FIREBASE_API_KEY__',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || '__FIREBASE_AUTH_DOMAIN__',
  projectId: process.env.FIREBASE_PROJECT_ID || '__FIREBASE_PROJECT_ID__',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '__FIREBASE_STORAGE_BUCKET__',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '__FIREBASE_MESSAGING_SENDER_ID__',
  appId: process.env.FIREBASE_APP_ID || '__FIREBASE_APP_ID__',
};

let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

try {
  const shouldInit = firebaseConfig.projectId && !firebaseConfig.projectId.startsWith('__');
  if (!getApps().length && shouldInit) {
    initializeApp(firebaseConfig);
    auth = getAuth();
    db = getFirestore();
    storage = getStorage();
    // eslint-disable-next-line no-console
    console.log('Firebase initialized');
  } else if (getApps().length) {
    auth = getAuth();
    db = getFirestore();
    storage = getStorage();
  } else {
    // eslint-disable-next-line no-console
    console.warn('Firebase config not provided — using local mocks. Add FIREBASE_* env variables to enable Firebase.');
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn('Firebase initialization error', e);
}

export { auth, db, storage };
