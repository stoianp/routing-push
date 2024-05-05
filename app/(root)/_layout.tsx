import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import "@/translation/i18n";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { AuthProvider } from "@/providers/AuthProvider";
import PushNotificationsProvider from "@/providers/PushNotificationsProvider";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(sign-in)",
};

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
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
