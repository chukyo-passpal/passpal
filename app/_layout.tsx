import { Stack, usePathname } from "expo-router";
import { AuthProvider, useAuth } from "@/context/authContext";
import { ThemeProvider, useTheme } from "@/design-system";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "../tamagui.config";

export default function RootLayout() {
    return (
        <TamaguiProvider config={tamaguiConfig}>
            <ThemeProvider>
                <AuthProvider>
                    <RootLayoutNav />
                </AuthProvider>
            </ThemeProvider>
        </TamaguiProvider>
    );
}

function RootLayoutNav() {
    const { isLoading, isAuthenticated, isTermsAccepted } = useAuth();
    const pathname = usePathname();
    const theme = useTheme();

    const isDebugMode = __DEV__; // デバッグ時のみ有効化

    const isStorybookPath = pathname.startsWith("/storybook");

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: theme.colors.background.surface,
                },
                headerTintColor: theme.colors.text.primary,
                headerTitleStyle: {
                    fontFamily: "Inter",
                    fontWeight: "600",
                },
            }}
        >
            {/* ローディング画面 */}
            <Stack.Protected guard={isLoading}>
                <Stack.Screen name="loading" />
            </Stack.Protected>

            {/* 認証画面 */}
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="login" />
            </Stack.Protected>

            {/* セットアップ画面 */}
            <Stack.Protected guard={isAuthenticated && !isTermsAccepted}>
                <Stack.Screen name="setup" />
            </Stack.Protected>

            {/* 認証が必要な画面 */}
            <Stack.Protected guard={isAuthenticated && isTermsAccepted}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="settings" />
            </Stack.Protected>

            {/* Storybook画面（デバッグモード時のみ） */}
            <Stack.Protected guard={isDebugMode && isStorybookPath}>
                <Stack.Screen name="storybook" />
            </Stack.Protected>
        </Stack>
    );
}
