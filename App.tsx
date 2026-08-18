@@
 export default function App() {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Home">
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Library" component={LibraryScreen} />
         <Stack.Screen name="TechniqueDetail" component={TechniqueDetailScreen} options={{ title: 'Technique' }} />
-        <Stack.Screen name="PaoTimer" component={PaoTimerScreen} options={{ title: 'Pao / Drill' }} />
+        <Stack.Screen name="PaoTimer" component={PaoTimerScreen} options={{ title: 'Pao / Drill' }} />
         <Stack.Screen name="WOD" component={WODScreen} options={{ title: 'WOD' }} />
         <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
+        <Stack.Screen name="UploadMedia" component={require('./src/screens/UploadMediaScreen').default} options={{ title: 'Uploader média' }} />
       </Stack.Navigator>
     </NavigationContainer>
   );
 }
