import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import StartGameScreen from './src/screens/StartGameScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({});
