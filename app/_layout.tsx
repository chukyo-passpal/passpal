import { Stack, useRouter, usePathname } from "expo-router";
import { useEffect } from "react";
import { SessionProvider, useAuth } from "@/context/authContext";

export default function RootLayout() {
    return (
        <SessionProvider>
            <RootLayoutNav />
        </SessionProvider>
    );
}

function RootLayoutNav() {
    const { isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        const isLoginRoute = pathname.startsWith("/login");
        const isSetupRoute = pathname.startsWith("/setup");

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
    }, [isLoading, isAuthenticated, pathname, router]);

    if (isLoading) {
        // ローディング画面を表示
        return (
            <Stack>
                <Stack.Screen name="loading" options={{ headerShown: false }} />
            </Stack>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* 認証が必要な画面 */}
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="course" />

            {/* セットアップ画面 */}
            <Stack.Screen name="setup" />

            {/* 認証画面 */}
            <Stack.Screen name="login" />
        </Stack>
    );
}
