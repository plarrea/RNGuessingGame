import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(minBoundary, maxBoundary, userNumber),
  );

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    // direction: 'lower' | 'greater'
    if (
      (direction === 'lower' && currentGuess <= userNumber) ||
      (direction === 'greater' && currentGuess >= userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction == 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1; // +1 because it is included
    }
    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newGuess);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            +
          </PrimaryButton>
        </View>
      </View>
      <View>
        <Text>Log Rounds</Text>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent500,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
  },
});
