@@
-import React from 'react';
-import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
-
-export default function TechniqueDetailScreen({ route }: any) {
-  const technique = route.params?.technique ?? { title: 'Inconnu', level: '—', steps: [] };
-
-  return (
-    <ScrollView style={styles.container}>
-      <Text style={styles.title}>{technique.title}</Text>
-      <Text style={styles.subtitle}>{technique.style} • {technique.level}</Text>
-
-      {technique.media?.images?.[0] ? (
-        <Image source={{ uri: technique.media.images[0] }} style={styles.image} />
-      ) : (
-        <View style={styles.imagePlaceholder}><Text style={{ color: '#999' }}>Aucune image</Text></View>
-      )}
-
-      <View style={{ marginTop: 12 }}>
-        <Text style={styles.sectionTitle}>Description</Text>
-        <Text style={styles.paragraph}>{technique.description ?? 'Pas de description.'}</Text>
-      </View>
-
-      <View style={{ marginTop: 12 }}>
-        <Text style={styles.sectionTitle}>Étapes</Text>
-        {(technique.steps || []).map((s: any, i: number) => (
-          <View key={i} style={{ marginTop: 8 }}>
-            <Text style={{ fontWeight: '600' }}>{s.order}. {s.title}</Text>
-            <Text>{s.description}</Text>
-          </View>
-        ))}
-      </View>
-    </ScrollView>
-  );
-}
-
-const styles = StyleSheet.create({
-  container: { flex: 1, padding: 16 },
-  title: { fontSize: 22, fontWeight: '700' },
-  subtitle: { color: '#666', marginTop: 4 },
-  image: { height: 200, borderRadius: 8, marginTop: 12 },
-  imagePlaceholder: { height: 200, borderRadius: 8, marginTop: 12, backgroundColor: '#f3f3f3', alignItems: 'center', justifyContent: 'center' },
-  sectionTitle: { fontSize: 16, fontWeight: '700' },
-  paragraph: { marginTop: 6, color: '#333' }
-});
+import React from 'react';
+import { View, Text, ScrollView, Image, StyleSheet, Button } from 'react-native';
+
+export default function TechniqueDetailScreen({ route, navigation }: any) {
+  const technique = route.params?.technique ?? { title: 'Inconnu', level: '—', steps: [] };
+
+  return (
+    <ScrollView style={styles.container}>
+      <Text style={styles.title}>{technique.title}</Text>
+      <Text style={styles.subtitle}>{technique.style} • {technique.level}</Text>
+
+      {technique.media?.images?.[0] ? (
+        <Image source={{ uri: technique.media.images[0] }} style={styles.image} />
+      ) : (
+        <View style={styles.imagePlaceholder}><Text style={{ color: '#999' }}>Aucune image</Text></View>
+      )}
+
+      <View style={{ marginTop: 12 }}>
+        <Text style={styles.sectionTitle}>Description</Text>
+        <Text style={styles.paragraph}>{technique.description ?? 'Pas de description.'}</Text>
+      </View>
+
+      <View style={{ marginTop: 12 }}>
+        <Text style={styles.sectionTitle}>Étapes</Text>
+        {(technique.steps || []).map((s: any, i: number) => (
+          <View key={i} style={{ marginTop: 8 }}>
+            <Text style={{ fontWeight: '600' }}>{s.order}. {s.title}</Text>
+            <Text>{s.description}</Text>
+          </View>
+        ))}
+      </View>
+
+      <View style={{ marginTop: 16 }}>
+        <Button title="Uploader un média" onPress={() => navigation.navigate('UploadMedia', { technique })} />
+      </View>
+    </ScrollView>
+  );
+}
+
+const styles = StyleSheet.create({
+  container: { flex: 1, padding: 16 },
+  title: { fontSize: 22, fontWeight: '700' },
+  subtitle: { color: '#666', marginTop: 4 },
+  image: { height: 200, borderRadius: 8, marginTop: 12 },
+  imagePlaceholder: { height: 200, borderRadius: 8, marginTop: 12, backgroundColor: '#f3f3f3', alignItems: 'center', justifyContent: 'center' },
+  sectionTitle: { fontSize: 16, fontWeight: '700' },
+  paragraph: { marginTop: 6, color: '#333' }
+});
