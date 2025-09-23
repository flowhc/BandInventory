import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false  }} />
        <Stack.Screen name="payPalModal" options={{ presentation: 'modal', headerShown: false  }} />
        <Stack.Screen name="editModal" options={{ presentation: 'modal', headerShown: false  }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
