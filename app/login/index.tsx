import authServiceInstance from "@/src/domain/services/authService";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAuth from "@/src/presentation/hooks/useAuth";
import { GoogleSignin, isErrorWithCode, isSuccessResponse } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

export default function Login() {
    const { theme } = useTheme();
    const router = useRouter();

    const { setFirebaseUser } = useAuth();

    const allowedDomain = authServiceInstance.allowedMailDomain;
    const webClientId = authServiceInstance.webClientId;

    GoogleSignin.configure({
        hostedDomain: allowedDomain,
        webClientId,
        offlineAccess: true,
    });

    const handleNext = (email: string) => {
        const studentId = email.split("@")[0];
        router.push({
            pathname: "/login/step2",
            params: { studentId },
        });
    };

    const signIn = async () => {
        try {
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
                if (!response.data.user.email.endsWith(allowedDomain)) {
                    alert("中京大学のアカウントでログインしてください");
                    return;
                }

                setFirebaseUser(response.data);

                const email = response.data.user.email;
                handleNext(email);
            } else {
                alert("ログインがキャンセルされました");
                return;
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                alert(`エラーが発生しました(${error.code}): ${error.message}`);
            } else {
                alert("エラーが発生しました: " + String(error));
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
            <ScrollView contentContainerStyle={{ justifyContent: "center", flex: 1 }} showsVerticalScrollIndicator={false}>
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

                    <TouchableOpacity activeOpacity={0.7} onPress={signIn}>
                        <Image style={{ height: 50, objectFit: "contain" }} source={require("@/assets/images/google-sign-in.png")} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
