@@
-import React from 'react';
-import { NavigationContainer } from '@react-navigation/native';
-import { createNativeStackNavigator } from '@react-navigation/native-stack';
-import HomeScreen from './src/screens/HomeScreen';
-import TechniqueScreen from './src/screens/TechniqueScreen';
-
-export type RootStackParamList = {
-  Home: undefined;
-  Technique: { techniqueId?: string } | undefined;
-};
-
-const Stack = createNativeStackNavigator<RootStackParamList>();
-
-export default function App() {
-  return (
-    <NavigationContainer>
-      <Stack.Navigator>
-        <Stack.Screen name="Home" component={HomeScreen} />
-        <Stack.Screen name="Technique" component={TechniqueScreen} />
-      </Stack.Navigator>
-    </NavigationContainer>
-  );
-}
+import React from 'react';
+import { NavigationContainer } from '@react-navigation/native';
+import { createNativeStackNavigator } from '@react-navigation/native-stack';
+import HomeScreen from './src/screens/HomeScreen';
+import LibraryScreen from './src/screens/LibraryScreen';
+import TechniqueDetailScreen from './src/screens/TechniqueDetailScreen';
+import PaoTimerScreen from './src/screens/PaoTimerScreen';
+import WODScreen from './src/screens/WODScreen';
+import ProfileScreen from './src/screens/ProfileScreen';
+
+export type RootStackParamList = {
+  Home: undefined;
+  Library: undefined;
+  TechniqueDetail: { technique?: any } | undefined;
+  PaoTimer: undefined;
+  WOD: undefined;
+  Profile: undefined;
+};
+
+const Stack = createNativeStackNavigator<RootStackParamList>();
+
+export default function App() {
+  return (
+    <NavigationContainer>
+      <Stack.Navigator initialRouteName="Home">
+        <Stack.Screen name="Home" component={HomeScreen} />
+        <Stack.Screen name="Library" component={LibraryScreen} />
+        <Stack.Screen name="TechniqueDetail" component={TechniqueDetailScreen} options={{ title: 'Technique' }} />
+        <Stack.Screen name="PaoTimer" component={PaoTimerScreen} options={{ title: 'Pao / Drill' }} />
+        <Stack.Screen name="WOD" component={WODScreen} options={{ title: 'WOD' }} />
+        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
+      </Stack.Navigator>
+    </NavigationContainer>
+  );
+}
