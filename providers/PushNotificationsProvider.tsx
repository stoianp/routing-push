import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { router } from "expo-router";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

async function onBackgroundMessage(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) {
  console.log("Message handled in the background!");
  router.navigate({
    pathname: "/(root)/(tabs)/message",
    params: {
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      data: JSON.stringify(remoteMessage?.data?.payload)
    },
  });
}

export function setBackgroundMessageHandler() {
  messaging().setBackgroundMessageHandler(onBackgroundMessage);
}

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

async function onMessage(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  //console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
  router.navigate({
    pathname: "/(root)/(tabs)/message",
    params: {
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      data: JSON.stringify(remoteMessage?.data?.payload)
    },
  });
}

export default function PushNotificationsProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  useEffect(() => {
    if (Platform.OS === "ios") {
      requestUserPermission();
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }

    const unsubscribe = messaging().onMessage(onMessage);

    (async () => {
      const token = await messaging().getToken();
      //console.log("FCM token:", token);
    })();

    return unsubscribe;
  }, []);

  setBackgroundMessageHandler();

  return props.children;
}
