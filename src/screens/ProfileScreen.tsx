import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';

let signin: ((email: string, password: string) => Promise<any>) | null = null;
let signup: ((email: string, password: string) => Promise<any>) | null = null;
let signout: (() => Promise<any>) | null = null;
let onUserChanged: ((cb: (u: any) => void) => any) | null = null;

try {
  // eslint-disable-next-line global-require
  const fb = require('../firebase/auth');
  signin = fb.signin;
  signup = fb.signup;
  signout = fb.signout;
  onUserChanged = fb.onUserChanged;
} catch (e) {
  // firebase auth not available — UI will show placeholders
}

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (onUserChanged) {
      const unsub = onUserChanged((u: any) => setUser(u));
      return () => unsub && unsub();
    }
    return undefined;
  }, []);

  async function handleSignin() {
    if (!signin) return Alert.alert('Firebase non configuré', 'Activez Firebase pour utiliser l\'authentification');
    try {
      await signin(email, password);
      Alert.alert('Connecté');
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Erreur de connexion');
    }
  }

  async function handleSignup() {
    if (!signup) return Alert.alert('Firebase non configuré', 'Activez Firebase pour utiliser l\'authentification');
    try {
      await signup(email, password);
      Alert.alert('Compte créé');
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Erreur lors de la création');
    }
  }

  async function handleSignout() {
    if (!signout) return Alert.alert('Firebase non configuré');
    await signout();
    setUser(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      {user ? (
        <>
          <Text style={{ color: '#666', marginTop: 8 }}>Utilisateur : {user.email}</Text>
          <View style={{ marginTop: 16 }}>
            <Button title="Se déconnecter" onPress={handleSignout} />
          </View>
        </>
      ) : (
        <>
          <Text style={{ color: '#666', marginTop: 8 }}>Utilisateur : Invité</Text>
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
          <TextInput placeholder="Mot de passe" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
          <View style={{ marginTop: 12 }}>
            <Button title="Se connecter" onPress={handleSignin} />
          </View>
          <View style={{ marginTop: 8 }}>
            <Button title="Créer un compte" onPress={handleSignup} />
          </View>
        </>
      )}

      <View style={{ marginTop: 12 }}>
        <Button title="Voir historique" onPress={() => navigation.navigate('History')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, marginTop: 8, borderRadius: 6 }
});
