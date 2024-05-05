import { router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

import { useAuth } from "@/providers/AuthProvider";
import Button from "@/components/ui/Button";

export default function Navigator() {
  const { user, isLoading } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in screen!</Text>
      <View style={styles.separator}></View>
      <Button
        onPress={() => router.replace("/(root)/(sign-in)/login")}
        style={styles.authButton}
      >
        Log in!
      </Button>
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
