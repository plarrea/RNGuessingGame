import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useMemo, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import OpenSansBold from './assets/fonts/OpenSans-Bold.ttf';
import OpenSans from './assets/fonts/OpenSans-Regular.ttf';
import backgroundImage from './assets/images/background.png';
import Colors from './src/constants/colors';
import GameOverScreen from './src/screens/GameOverScreen';
import GameScreen from './src/screens/GameScreen';
import StartGameScreen from './src/screens/StartGameScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': OpenSans,
    'open-sans-bold': OpenSansBold,
  });
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const pickNumberHandler = useCallback((pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }, []);

  const gameOverHandler = useCallback((numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }, []);

  const startNewGameHandler = useCallback(() => {
    setUserNumber(null);
    setGuessRounds(0);
    setGameIsOver(false);
  }, []);

  const screen = useMemo(() => {
    if (gameIsOver && userNumber)
      return (
        <GameOverScreen
          userNumber={userNumber}
          roundsNumber={guessRounds}
          onStartNewGame={startNewGameHandler}
        />
      );

    return userNumber ? (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    ) : (
      <StartGameScreen onPickNumber={pickNumberHandler} />
    );
  }, [
    gameIsOver,
    userNumber,
    guessRounds,
    pickNumberHandler,
    gameOverHandler,
    startNewGameHandler,
  ]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <LinearGradient
        style={styles.rootScreen}
        colors={[Colors.primary700, Colors.accent500]}
      >
        <ImageBackground
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
          source={backgroundImage}
        >
          <SafeAreaView style={{ flex: 1 }}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
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
