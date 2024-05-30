import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { router } from "expo-router";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import notifee, { EventType } from "@notifee/react-native";

async function onBackgroundMessage(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) {
  console.log("Message handled in the background!");
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });
  try {
    const result = await notifee.displayNotification({
      title: remoteMessage.notification?.title + " - notifee",
      body: remoteMessage.notification?.body,
      data: remoteMessage.data,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
    console.log("Notifee result: ", result);
  } catch (e) {
    console.log("error: ", e);
  }
}

export function setBackgroundMessageHandler() {
  console.log('setBackgroundMessageHandler')
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
  console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });
  try {
    const result = await notifee.displayNotification({
      title: remoteMessage.notification?.title + " - foreground",
      body: remoteMessage.notification?.body,
      data: remoteMessage.data,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
    console.log("Notifee result: ", result);
  } catch (e) {
    console.log("error: ", e);
  }
}

export default function PushNotificationsProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      console.log("notefee event type: ", type);
      switch (type) {
        case EventType.DISMISSED:
          console.log("Notification dismissed by user", detail.notification);
          break;
        case EventType.PRESS:
          console.log("Notification clicked by user", detail.notification);
          router.navigate({
            pathname: "/(root)/(tabs)/message",
            params: {
              title: detail.notification?.title,
              body: detail.notification?.body,
              data: JSON.stringify(detail.notification?.data),
            },
          });
          break;
      }
    });
  }, []);

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ type, detail }) => {
      console.log("Background event type: ", type);
      switch (type) {
        case EventType.DISMISSED:
          console.log("Background dismissed by user", detail.notification);
          break;
        case EventType.PRESS:
          console.log("Background clicked by user", detail.notification);
          router.navigate({
            pathname: "/(root)/(tabs)/message",
            params: {
              title: detail.notification?.title,
              body: detail.notification?.body,
              data: JSON.stringify(detail.notification?.data),
            },
          });
          break;
      }
    });
  }, []);

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
      console.log("FCM token:", token);
    })();

    return () => {
      unsubscribe();
    };
  }, []);

  return props.children;
}
