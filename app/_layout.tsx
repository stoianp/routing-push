import { Slot, Stack } from 'expo-router';
import { AuthProvider } from '@/providers/AuthProvider';

function RootLayoutNav() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
