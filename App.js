import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet } from 'react-native';
import backgroundImage from './assets/images/background.png';
import StartGameScreen from './src/screens/StartGameScreen';

export default function App() {
  return (
    <LinearGradient style={styles.rootScreen} colors={['#4e0329', '#ddb52f']}>
      <ImageBackground
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
        source={backgroundImage}
      >
        <StartGameScreen />
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
