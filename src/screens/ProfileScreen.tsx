import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }: any) {
  // Placeholder profile screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={{ color: '#666', marginTop: 8 }}>Utilisateur : Invité</Text>
      <View style={{ marginTop: 16 }}>
        <Button title="Se connecter (exemple)" onPress={() => { /* open auth flow */ }} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Voir historique" onPress={() => navigation.navigate('History')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700' }
});
