import { StyleSheet, View, Text, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function TabTwoScreen() {
  const params = useLocalSearchParams();
  const { title, body, data } = params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Message:</Text>
      <View style={styles.separator}></View>
      <Text>Title: </Text>
      <Text>{title}</Text>
      <Text>Body: </Text>
      <Text>{body}</Text>
      <Text>Payload: </Text>
      <Text>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  authButton: {
    width: "80%",
  },
});
