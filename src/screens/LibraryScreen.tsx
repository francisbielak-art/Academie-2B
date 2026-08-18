import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import sample from '../data/sampleTechniques.json';

export default function LibraryScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bibliothèque de techniques</Text>
      <FlatList
        data={sample}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TechniqueDetail', { technique: item })}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.style} • {item.level}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { padding: 12, backgroundColor: '#fff', borderRadius: 8, elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardSubtitle: { color: '#666', marginTop: 4 }
});
