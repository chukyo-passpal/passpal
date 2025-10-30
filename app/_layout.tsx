import ShibbolethWebView, { shibbolethWebViewRef } from "@/src/data/clients/chukyoShibboleth";
import appServiceInstance from "@/src/domain/services/appService";
import eventServiceInstance from "@/src/domain/services/eventService";
import { Toast } from "@/src/presentation/components/Toast";
import { ThemeProvider, useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAppInit from "@/src/presentation/hooks/useAppInit";
import useAuth from "@/src/presentation/hooks/useAuth";
import { tamaguiConfig } from "@/tamagui.config";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { TamaguiProvider } from "tamagui";

eventServiceInstance.appInit();

export default function RootLayout() {
    // App初期化処理
    const shibRef = useRef<shibbolethWebViewRef>(null);
    useAppInit(shibRef);
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
    const router = useRouter();

    const isAuthenticated = Boolean(user !== null);

    // すぐにやるとios版でrouteが設定されておらずエラーを吐くことがあるため仕方なくsetTimeoutする
    setTimeout(() => {
        // 開発モード時はメンテナンス・強制アップデート画面にリダイレクトしない
        if (__DEV__) {
            return;
        }

        if (appServiceInstance.maintenanceMode) {
            if (router.canDismiss()) {
                router.dismissAll();
            }
            router.replace("/maintenance");
        }

        if (appServiceInstance.isNeededUpdate()) {
            if (router.canDismiss()) {
                router.dismissAll();
            }
            router.replace("/force-update");
        }
    }, 10);

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

            {/* デバッグ用画面 */}
            <Stack.Protected guard={__DEV__}>
                <Stack.Screen name="storybook" />
                <Stack.Screen name="debug" />
            </Stack.Protected>

            {/* メンテナンス画面 */}
            <Stack.Screen name="maintenance" />

            {/* 強制アップデート画面 */}
            <Stack.Screen name="force-update" />
        </Stack>
    );
}
