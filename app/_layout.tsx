import { Slot, Stack } from "expo-router";

function RootLayoutNav() {
  return (
    <Stack initialRouteName="(sign-in)">
      <Stack.Screen
        name="(root)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
