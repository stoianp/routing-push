import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

export default function LoadingOverlay(props: { message:string }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{props.message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  message: {
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
  },
});
