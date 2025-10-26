import ShibbolethWebView, { shibbolethWebViewRef } from "@/src/data/clients/chukyoShibboleth";
import adminRepositoryInstance from "@/src/data/repositories/adminRepository";
import { Toast } from "@/src/presentation/components/Toast";
import { ThemeProvider, useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAppInit from "@/src/presentation/hooks/useAppInit";
import useAuth from "@/src/presentation/hooks/useAuth";
import { tamaguiConfig } from "@/tamagui.config";
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { TamaguiProvider } from "tamagui";

export default function RootLayout() {
    // App初期化処理
    const shibRef = useRef<shibbolethWebViewRef>(null);
    const isReady = useAppInit(shibRef);
    useEffect(() => {
        if (isReady) {
            SplashScreen.hide();
        }
    }, [isReady]);
    if (!isReady) {
        return null;
    }

    return (
        <ThemeProvider>
            <ShibbolethWebView ref={shibRef} />
            <TamaguiProviderWrapper>
                <RootLayoutNav />
            </TamaguiProviderWrapper>
        </ThemeProvider>
    );
}

function TamaguiProviderWrapper({ children }: { children?: React.ReactNode }) {
    const { isDark } = useTheme();

    return (
        <TamaguiProvider config={tamaguiConfig} defaultTheme={isDark ? "dark" : "light"}>
            {children}
            <Toast />
        </TamaguiProvider>
    );
}

function RootLayoutNav() {
    const { user, isTermsAccepted } = useAuth();
    const { theme } = useTheme();

    const isAuthenticated = Boolean(user !== null);

    if (adminRepositoryInstance.maintenanceMode) {
        router.replace("/maintenance");
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

            {/* ライセンス画面 */}
            <Stack.Screen name="license" />

            {/* Storybook画面（デバッグモード時のみ） */}
            <Stack.Protected guard={__DEV__}>
                <Stack.Screen name="storybook" />
            </Stack.Protected>

            {/* メンテナンス画面 */}
            <Stack.Screen name="maintenance" />
        </Stack>
    );
}
