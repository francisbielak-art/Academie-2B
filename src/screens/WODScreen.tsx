import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const wodSamples = [
  { id: 'wod1', title: 'Cardio explosif', exercises: ['Burpees 30s', 'Sprint 30s', 'Repos 30s'], rounds: 5 },
  { id: 'wod2', title: 'Renforcement coeur', exercises: ['Gainage 45s', 'Russian twists 30s', 'Repos 20s'], rounds: 4 }
];

export default function WODScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Condition physique (WOD)</Text>
      <FlatList
        data={wodSamples}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WODDetail', { wod: item })}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.rounds} rounds • {item.exercises.length} exercices</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
  cardTitle: { fontWeight: '600' },
  cardSubtitle: { color: '#666', marginTop: 4 }
});
