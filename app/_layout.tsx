import { Slot, Stack } from "expo-router";
import { AuthProvider } from "@/providers/AuthProvider";

function RootLayoutNav() {
  return (
    <AuthProvider>
      <Stack initialRouteName="(sign-in)">
        <Stack.Screen
          name="(root)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
