import { Stack } from "expo-router";

export default function RootLayout() {
  const isLoggedIn = false; // TODO: 仮置きの変数

  return (
      <Stack>
          <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="setup" />
          </Stack.Protected>

          <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="login" />
          </Stack.Protected>
      </Stack>
  );
}
