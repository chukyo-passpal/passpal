import ShibbolethWebView, { shibbolethWebViewRef } from "@/src/data/clients/chukyoShibboleth";
import alboProviderInstance from "@/src/data/providers/chukyo-univ/alboProvider";
import cubicsProviderInstance from "@/src/data/providers/chukyo-univ/cubicsProvider";
import manaboProviderInstance from "@/src/data/providers/chukyo-univ/manaboProvider";
import { ThemeProvider, useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAuth from "@/src/presentation/hooks/useAuth";
import { tamaguiConfig } from "@/tamagui.config";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { TamaguiProvider } from "tamagui";

export default function RootLayout() {
    const { authService } = useAuth();
    alboProviderInstance.setAuthStore(useAuth());
    manaboProviderInstance.setAuthStore(useAuth());
    cubicsProviderInstance.setAuthStore(useAuth());

    const shibRef = useRef<shibbolethWebViewRef>(null);
    useEffect(() => {
        if (shibRef.current) authService.setChukyoShibbolethAuthFunction(shibRef.current.auth);
    }, [authService]);

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
        </TamaguiProvider>
    );
}

function RootLayoutNav() {
    const { user, isTermsAccepted } = useAuth();
    const { theme } = useTheme();

    const isAuthenticated = Boolean(user !== null);

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

            {/* Storybook画面（デバッグモード時のみ） */}
            <Stack.Protected guard={__DEV__}>
                <Stack.Screen name="storybook" />
            </Stack.Protected>
        </Stack>
    );
}
