import { View, StyleSheet, Text } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

export default function DefaultContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This device is OK!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
