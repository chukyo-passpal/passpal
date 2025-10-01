import { Stack, useRouter, usePathname } from "expo-router";
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
    const { isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const theme = useTheme();

    if (isLoading) {
        // ローディング画面を表示
        return (
            <Stack>
                <Stack.Screen name="loading" options={{ headerShown: false }} />
            </Stack>
        );
    }

    const isLoginRoute = pathname.startsWith("/login");
    const isSetupRoute = pathname.startsWith("/setup");

    // TODO: デバッグ時にのみ有効化するようにする
    const isStoryBookRoute = pathname.startsWith("/storybook");
    if (isStoryBookRoute) {
        return (
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="storybook" />
            </Stack>
        );
    }

    // 未認証かつログイン・セットアップページでない場合はログインページへリダイレクト
    if (!isAuthenticated && !isLoginRoute && !isSetupRoute) {
        router.replace("/login");
        return;
    }

    // 認証済みかつログインページの場合はダッシュボードへリダイレクト
    if (isAuthenticated && isLoginRoute) {
        router.replace("/");
        return;
    }

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
            {/* 認証が必要な画面 */}
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

            {/* セットアップ画面 */}
            <Stack.Screen
                name="setup"
                options={{
                    headerShown: true,
                    title: "セットアップ",
                }}
            />

            {/* 認証画面 */}
            <Stack.Screen name="login" />
        </Stack>
    );
}
