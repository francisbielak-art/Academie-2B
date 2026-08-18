import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function TechniqueScreen({ route }: any) {
  const technique = route.params?.technique || { title: 'Technique inconnue', level: '—', steps: [] };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>{technique.title}</Text>
      <Text style={{ color: '#666', marginBottom: 12 }}>{technique.level}</Text>
      {(technique.steps || []).map((s: any, idx: number) => (
        <View key={idx} style={{ marginTop: 8 }}>
          <Text style={{ fontWeight: '600' }}>{s.order}. {s.title}</Text>
          <Text>{s.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
