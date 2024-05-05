import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";

async function onBackgroundMessage(remoteMessage: FirebaseMessagingTypes.RemoteMessage ) {
    console.log('Message handled in the background!', remoteMessage);
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

async function onMessage(remoteMessage: FirebaseMessagingTypes.RemoteMessage ) {
  Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
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

    console.log("FCM token:", messaging().getToken());

    return unsubscribe;
  }, []);

  return props.children;
}
