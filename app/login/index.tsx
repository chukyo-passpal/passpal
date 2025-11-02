import { useEffect } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import appServiceInstance from "@/src/domain/services/appService";
import authServiceInstance from "@/src/domain/services/authService";
import googleAuthServiceInstance from "@/src/domain/services/googleAuthService";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";

export default function Login() {
    const { theme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        void authServiceInstance.resetGoogleSession();
    }, []);

    const handleNext = (studentId: string) => {
        router.push({
            pathname: "/login/step2",
            params: { studentId },
        });
    };

    const signIn = async () => {
        const result = await authServiceInstance.signInWithGoogle();
        switch (result.kind) {
            case "success": {
                handleNext(result.studentId);
                break;
            }
            case "invalid-domain": {
                alert("中京大学のアカウントでログインしてください");
                break;
            }
            case "cancelled": {
                alert("ログインがキャンセルされました");
                break;
            }
            case "error": {
                alert(googleAuthServiceInstance.toReadableError(result.error));
                break;
            }
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background.primary,
                padding: theme.spacing.lg,
            }}
        >
            <ScrollView
                contentContainerStyle={{ justifyContent: "center", flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {/* ウェルカムセクション */}
                <View style={{ marginBottom: theme.spacing.xl }}>
                    <Typography
                        variant="h1"
                        color={theme.colors.primary.main}
                        style={{
                            textAlign: "center",
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        ようこそ PassPalへ！
                    </Typography>
                    <Typography
                        variant="body"
                        color={theme.colors.text.secondary}
                        style={{
                            textAlign: "center",
                        }}
                    >
                        新しいキャンパスライフ・アシスタント
                    </Typography>
                </View>

                {/* フォームセクション */}
                <View style={{ marginBottom: theme.spacing.lg }}>
                    <View style={{ marginBottom: theme.spacing.lg }}>
                        {/* Text Section */}
                        <View
                            style={{
                                width: "100%",
                                alignItems: "center",
                                gap: 16,
                            }}
                        >
                            <Typography variant="h2">Googleログイン</Typography>

                            <Typography
                                variant="body"
                                color={theme.colors.text.secondary}
                                style={{
                                    fontSize: 16,
                                    textAlign: "center",
                                    lineHeight: 19.2,
                                }}
                            >
                                続行するには、大学アカウントでログインしてください
                            </Typography>
                        </View>
                    </View>

                    <TouchableOpacity style={{ alignItems: "center" }} activeOpacity={0.7} onPress={signIn}>
                        <Image
                            style={{ height: 50, objectFit: "contain" }}
                            source={require("@/assets/images/google-sign-in.png")}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* Footer */}
            <View style={{ alignItems: "center" }}></View>
            <Typography
                variant="caption"
                color={theme.colors.text.secondary}
                style={{
                    fontSize: 14,
                    textAlign: "left",
                }}
            >
                {appServiceInstance.versionInfo}
            </Typography>
        </View>
    );
}
