import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";

import Button from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";

export default function TabOneScreen() {
  const authCtx = useAuth();

  // async function handleNotificationClick(
  //   remoteMessage: FirebaseMessagingTypes.RemoteMessage
  // ) {
  //   console.log("app was in the background");
  //   router.navigate({
  //     pathname: "/(root)/(tabs)/message",
  //     params: {
  //       title: remoteMessage.notification?.title,
  //       body: remoteMessage.notification?.body,
  //       data: JSON.stringify(remoteMessage?.data?.payload),
  //     },
  //   });
  // }

  // useEffect(() => {
  //   console.log('useEffects')
  //   messaging().onNotificationOpenedApp(handleNotificationClick);

  //   (async () => {
  //     const remoteMessage = await messaging().getInitialNotification();
  //     if (remoteMessage) {
  //       console.log("app was closed");
  //       router.navigate({
  //         pathname: "/(root)/(tabs)/message",
  //         params: {
  //           title: remoteMessage.notification?.title,
  //           body: remoteMessage.notification?.body,
  //           data: JSON.stringify(remoteMessage?.data?.payload),
  //         },
  //       });
  //     }
  //   })();
  // }, []);

  function signOutHandler() {
    authCtx.signOut();
    router.replace("/(root)/(sign-in)");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
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
