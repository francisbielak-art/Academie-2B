import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  addDoc,
  query,
  where,
  DocumentData,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

if (!db) {
  // eslint-disable-next-line no-console
  console.warn('Firestore not initialized — functions will throw if used.');
}

const techniquesCol = db ? collection(db, 'techniques') : null;
const sessionsCol = db ? collection(db, 'sessions') : null;

export async function getAllTechniquesOnce(): Promise<any[]> {
  if (!techniquesCol) throw new Error('Firestore not initialized');
  const snap = await getDocs(techniquesCol);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export function watchTechniques(onUpdate: (items: any[]) => void) {
  if (!techniquesCol) throw new Error('Firestore not initialized');
  return onSnapshot(techniquesCol, snapshot => {
    onUpdate(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export async function addTechnique(payload: DocumentData) {
  if (!techniquesCol) throw new Error('Firestore not initialized');
  return addDoc(techniquesCol, payload);
}

export async function getTechniqueById(id: string) {
  if (!db) throw new Error('Firestore not initialized');
  const d = await getDoc(doc(db, 'techniques', id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}

// Sessions
export async function addSession(payload: DocumentData) {
  if (!sessionsCol) throw new Error('Firestore not initialized');
  return addDoc(sessionsCol, payload);
}

export async function getSessionsForUser(userId: string) {
  if (!db) throw new Error('Firestore not initialized');
  const q = query(collection(db, 'sessions'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Attach media URL to technique document under media.images or media.videos
export async function attachMediaToTechnique(techniqueId: string, url: string, mediaType: 'image' | 'video') {
  if (!db) throw new Error('Firestore not initialized');
  const techniqueRef = doc(db, 'techniques', techniqueId);
  const field = mediaType === 'image' ? 'media.images' : 'media.videos';
  await updateDoc(techniqueRef, { [field]: arrayUnion(url) });
}
