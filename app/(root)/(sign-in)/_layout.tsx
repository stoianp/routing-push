import { Stack } from "expo-router";

import { AuthProvider } from "@/providers/AuthProvider";

export default function SignInLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
