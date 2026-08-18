import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Upload a local file (uri) to Firebase Storage at the provided path and return the download URL.
export async function uploadFile(uri: string, path: string) {
  if (!storage) throw new Error('Firebase Storage not initialized');
  // In Expo environment, fetch the file and convert to blob
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(storage, path);
  const result = await uploadBytes(storageRef, blob as any);
  const url = await getDownloadURL(result.ref);
  return url;
}
