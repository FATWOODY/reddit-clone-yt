import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize Firebase if we have valid configuration
let app;
let firestore;
let auth;
let storage;

if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your-api-key-here') {
  // Initialize Firebase for SSR
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  firestore = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  console.warn('Firebase configuration is missing or invalid. Please check your .env.local file.');
  // Create mock objects to prevent runtime errors
  app = null;
  firestore = null;
  auth = null;
  storage = null;
}

export { app, auth, firestore, storage };