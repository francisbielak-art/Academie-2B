import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

export async function signup(email: string, password: string) {
  if (!auth) throw new Error('Firebase Auth not initialized');
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signin(email: string, password: string) {
  if (!auth) throw new Error('Firebase Auth not initialized');
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signout() {
  if (!auth) throw new Error('Firebase Auth not initialized');
  return signOut(auth);
}

export function onUserChanged(callback: (user: User | null) => void) {
  if (!auth) throw new Error('Firebase Auth not initialized');
  return onAuthStateChanged(auth, callback);
}
