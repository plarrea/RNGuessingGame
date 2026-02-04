import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useMemo, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import backgroundImage from './assets/images/background.png';
import GameScreen from './src/screens/GameScreen';
import StartGameScreen from './src/screens/StartGameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState(null);

  const pickNumberHandler = useCallback((pickedNumber) => {
    setUserNumber(pickedNumber);
  }, []);

  const screen = useMemo(() => {
    return userNumber ? (
      <GameScreen />
    ) : (
      <StartGameScreen onPickNumber={pickNumberHandler} />
    );
  }, [userNumber, pickNumberHandler]);

  return (
    <LinearGradient style={styles.rootScreen} colors={['#4e0329', '#ddb52f']}>
      <ImageBackground
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
        source={backgroundImage}
      >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
