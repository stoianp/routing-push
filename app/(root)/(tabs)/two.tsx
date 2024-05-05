import { StyleSheet, View, Text } from "react-native";

import Button from "@/components/ui/Button";
import { router } from "expo-router";

export default function TabTwoScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator}></View>
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
