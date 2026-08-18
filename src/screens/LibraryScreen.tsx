import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import sample from '../data/sampleTechniques.json';

let watchTechniques: ((onUpdate: (items: any[]) => void) => any) | null = null;
let getAllTechniquesOnce: (() => Promise<any[]>) | null = null;
try {
  // dynamic import to avoid errors when firebase is not configured
  // eslint-disable-next-line global-require
  const fb = require('../firebase/firestore');
  watchTechniques = fb.watchTechniques;
  getAllTechniquesOnce = fb.getAllTechniquesOnce;
} catch (e) {
  // firebase not available — will use sample data
}

export default function LibraryScreen({ navigation }: any) {
  const [data, setData] = useState<any[]>(sample);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unsub: any;
    async function load() {
      if (getAllTechniquesOnce) {
        setLoading(true);
        try {
          const items = await getAllTechniquesOnce();
          setData(items as any[]);
        } catch (err) {
          console.warn('Failed to load techniques from Firestore, falling back to sample', err);
          setData(sample);
        }
        setLoading(false);
      } else if (watchTechniques) {
        unsub = watchTechniques(setData);
      } else {
        setData(sample);
      }
    }
    load();
    return () => { if (unsub) unsub(); };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bibliothèque de techniques</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
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
      )}
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
