import { Stack, usePathname } from "expo-router";
import { AuthProvider, useAuth } from "@/context/authContext";
import { ThemeProvider, useTheme } from "@/design-system";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <RootLayoutNav />
            </AuthProvider>
        </ThemeProvider>
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
                <Stack.Screen name="loading" options={{ headerShown: false }} />
            </Stack.Protected>

            {/* 認証画面 */}
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="login" />
            </Stack.Protected>

            {/* セットアップ画面 */}
            <Stack.Protected guard={isAuthenticated && !isTermsAccepted}>
                <Stack.Screen
                    name="setup"
                    options={{
                        headerShown: true,
                        title: "セットアップ",
                    }}
                />
            </Stack.Protected>

            {/* 認証が必要な画面 */}
            <Stack.Protected guard={isAuthenticated && isTermsAccepted}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                    name="settings"
                    options={{
                        headerShown: true,
                        title: "設定",
                        presentation: "modal",
                    }}
                />
                <Stack.Screen name="course" />
            </Stack.Protected>

            {/* Storybook画面（デバッグモード時のみ） */}
            <Stack.Protected guard={isDebugMode && isStorybookPath}>
                <Stack.Screen name="storybook" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    );
}
