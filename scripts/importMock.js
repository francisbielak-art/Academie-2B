#!/usr/bin/env node
/**
 * scripts/importMock.js
 * Simple script to import src/data/sampleTechniques.json into Firestore using client SDK.
 * Requirements:
 * - Set FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID in env
 * - Run: node scripts/importMock.js
 * NOTE: This uses the client SDK and requires the project to be configured for access. For server-side import, prefer Firebase Admin SDK.
 */

const fs = require('fs');
const path = require('path');

async function main() {
  const { initializeApp } = require('firebase/app');
  const { getFirestore, collection, addDoc } = require('firebase/firestore');

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  if (!firebaseConfig.projectId) {
    console.error('Set FIREBASE_* env variables before running this script.');
    process.exit(1);
  }

  initializeApp(firebaseConfig);
  const db = getFirestore();
  const techniquesCol = collection(db, 'techniques');

  const dataPath = path.join(__dirname, '..', 'src', 'data', 'sampleTechniques.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const items = JSON.parse(raw);

  for (const it of items) {
    console.log('Adding', it.id);
    await addDoc(techniquesCol, it);
  }

  console.log('Import complete');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
