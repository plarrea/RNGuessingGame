import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Breakpoints from '../../constants/breakpoints';
import Colors from '../../constants/colors';

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < Breakpoints.sm ? 12 : 24,
    margin: deviceWidth < Breakpoints.sm ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: deviceWidth < Breakpoints.sm ? 28 : 36,
    color: Colors.accent500,
  },
});
