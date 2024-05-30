import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import "@/translation/i18n";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { AuthProvider } from "@/providers/AuthProvider";
import PushNotificationsProvider from "@/providers/PushNotificationsProvider";
import { Alert } from "react-native";

export { ErrorBoundary } from "expo-router";
import notifee from '@notifee/react-native';
import { router } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(sign-in)",
};

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [loading, setLoading] = useState(true);

  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();
    //Alert.alert('initial', initialNotification?.notification.body)
    if (initialNotification) {
      console.log('Notification caused application to open', initialNotification.notification);
      console.log('Press action used to open the app', initialNotification.pressAction);
      router.navigate({
        pathname: "/(root)/(tabs)/message",
        params: {
          title: initialNotification.notification?.title,
          body: initialNotification.notification?.body,
          data: JSON.stringify(initialNotification.notification?.data),
        },
      });
    }
  }
  
  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, loading]);

  if (loading || !loaded) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <AuthProvider>
      <PushNotificationsProvider>
        <Stack initialRouteName="(sign-in)">
          <Stack.Screen name="(sign-in)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="nav" options={{ headerShown: false }} />
        </Stack>
      </PushNotificationsProvider>
    </AuthProvider>
  );
}
