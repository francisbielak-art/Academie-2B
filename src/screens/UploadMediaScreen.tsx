import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

let uploadFile: ((uri: string, path: string) => Promise<string>) | null = null;
let attachMediaToTechnique: ((techniqueId: string, url: string, mediaType: 'image' | 'video') => Promise<any>) | null = null;
try {
  // eslint-disable-next-line global-require
  const fb = require('../firebase/storage');
  // eslint-disable-next-line global-require
  const fbfs = require('../firebase/firestore');
  uploadFile = fb.uploadFile;
  attachMediaToTechnique = fbfs.attachMediaToTechnique;
} catch (e) {
  // firebase not configured
}

export default function UploadMediaScreen({ route, navigation }: any) {
  const technique = route.params?.technique;
  const [uploading, setUploading] = useState(false);

  async function pickAndUpload() {
    // ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Autorisez l\'accès aux médias pour uploader des photos/vidéos.');
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 0.8 });
    if (res.cancelled) return;
    const uri = res.uri;
    const isVideo = res.type === 'video' || (res.duration && res.duration > 0);

    if (!uploadFile || !attachMediaToTechnique) {
      Alert.alert('Firebase non configuré', 'Activez Firebase pour uploader et attacher les médias.');
      return;
    }

    setUploading(true);
    try {
      const filename = uri.split('/').pop() || `media_${Date.now()}`;
      const path = `techniques/${technique?.id || 'misc'}/${filename}`;
      const url = await uploadFile(uri, path);
      await attachMediaToTechnique(technique?.id || 'unknown', url, isVideo ? 'video' : 'image');
      Alert.alert('Upload réussi', 'Le média a été uploadé et attaché à la technique.');
      navigation.goBack();
    } catch (err) {
      console.warn(err);
      Alert.alert('Erreur', 'Échec de l\'upload.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploader un média</Text>
      <Text style={{ color: '#666', marginTop: 8 }}>{technique ? `Technique: ${technique.title}` : 'Sans technique'}</Text>
      <View style={{ marginTop: 16 }}>
        <Button title={uploading ? 'Upload en cours...' : 'Choisir une photo/vidéo'} onPress={pickAndUpload} disabled={uploading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700' }
});
