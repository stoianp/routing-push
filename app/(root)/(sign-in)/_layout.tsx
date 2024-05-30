import { Stack, router } from "expo-router";
import { useEffect } from "react";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";

export default function SignInLayout() {

  async function handleNotificationClick(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage
  ) {
    console.log("app was in the background");
    router.navigate({
      pathname: "/(root)/(tabs)/message",
      params: {
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: JSON.stringify(remoteMessage?.data?.payload),
      },
    });
  }

  useEffect(() => {
    console.log("useEffects");
    messaging().onNotificationOpenedApp(handleNotificationClick);

    (async () => {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        console.log("app was closed");
        router.navigate({
          pathname: "/(root)/(tabs)/message",
          params: {
            title: remoteMessage.notification?.title,
            body: remoteMessage.notification?.body,
            data: JSON.stringify(remoteMessage?.data?.payload),
          },
        });
      }
    })();
  }, []);

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
