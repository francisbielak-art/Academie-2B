import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  const exampleTechnique = {
    id: 'technique_0001',
    title: 'Défense saisie poignet - Krav Maga',
    level: 'Débutant'
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 8 }}>Académie 2B</Text>
      <Text style={{ color: '#666', marginBottom: 16 }}>Library de techniques & drills</Text>
      <Button title="Voir une technique" onPress={() => navigation.navigate('Technique', { techniqueId: exampleTechnique.id, technique: exampleTechnique })} />
    </View>
  );
}
