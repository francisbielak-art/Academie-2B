import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

type Drill = {
  rounds: number;
  work: number; // seconds
  rest: number; // seconds
};

const defaultDrill: Drill = { rounds: 6, work: 45, rest: 30 };

export default function PaoTimerScreen() {
  const [drill] = useState<Drill>(defaultDrill);
  const [running, setRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [isWork, setIsWork] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(drill.work);
  const intervalRef = useRef<number | null>(null);

  // dynamic import of addSession to avoid errors when firebase not configured
  let addSession: ((payload: any) => Promise<any>) | null = null;
  try {
    // eslint-disable-next-line global-require
    const fb = require('../firebase/firestore');
    addSession = fb.addSession;
  } catch (e) {
    // firebase not configured
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000) as unknown as number;
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  useEffect(() => {
    if (secondsLeft <= 0 && running) {
      if (isWork) {
        setIsWork(false);
        setSecondsLeft(drill.rest);
      } else {
        // finished rest -> next round or stop
        if (currentRound >= drill.rounds) {
          setRunning(false);
          // save session
          (async () => {
            const session = {
              techniqueId: null,
              createdAt: new Date().toISOString(),
              rounds: drill.rounds,
              workSeconds: drill.work,
              restSeconds: drill.rest,
              durationSeconds: (drill.work + drill.rest) * drill.rounds,
            };
            try {
              if (addSession) {
                await addSession(session);
                Alert.alert('Session enregistrée', 'Votre session PAO a été enregistrée.');
              } else {
                console.log('addSession not available — firebase not configured');
              }
            } catch (err) {
              console.warn('Failed to save session', err);
            }
          })();
        } else {
          setCurrentRound(r => r + 1);
          setIsWork(true);
          setSecondsLeft(drill.work);
        }
      }
    }
  }, [secondsLeft, running, isWork, drill, currentRound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pao Drill</Text>
      <Text style={styles.subtitle}>Round {currentRound}/{drill.rounds} — {isWork ? 'Work' : 'Rest'}</Text>
      <Text style={styles.timer}>{Math.max(0, secondsLeft)}s</Text>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title={running ? 'Pause' : 'Start'} onPress={() => setRunning(r => !r)} />
        <Button title="Reset" onPress={() => { setRunning(false); setCurrentRound(1); setIsWork(true); setSecondsLeft(drill.work); }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#666', marginTop: 8 },
  timer: { fontSize: 48, marginVertical: 20 }
});
