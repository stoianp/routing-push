import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";

import Button from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";

export default function TabOneScreen() {
  const authCtx = useAuth();

  function signOutHandler() {
    authCtx.signOut();
    router.replace("/(root)/(sign-in)");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator}></View>
      <Button onPress={signOutHandler} style={styles.authButton}>
        Sign out!
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
