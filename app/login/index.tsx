import { View, ScrollView } from "react-native";
import { Typography, Card, Button, Input, useTheme } from "@/design-system";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Login() {
    const theme = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // TODO: ログイン処理
        router.push("/login/step2");
    };

    const handleSignUp = () => {
        router.push("/setup");
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background.primary,
                justifyContent: "center",
                padding: theme.spacing.lg,
            }}
        >
            <ScrollView contentContainerStyle={{ justifyContent: "center", flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: theme.spacing.xl }}>
                    <Typography
                        variant="h1"
                        style={{
                            color: theme.colors.primary.main,
                            textAlign: "center",
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        PassPal
                    </Typography>
                    <Typography
                        variant="body"
                        style={{
                            color: theme.colors.text.secondary,
                            textAlign: "center",
                        }}
                    >
                        あなたの学習をサポートします
                    </Typography>
                </View>

                <Card style={{ marginBottom: theme.spacing.lg }}>
                    <Typography
                        variant="h3"
                        style={{
                            color: theme.colors.text.primary,
                            marginBottom: theme.spacing.lg,
                        }}
                    >
                        ログイン
                    </Typography>

                    <View style={{ marginBottom: theme.spacing.md }}>
                        <Typography
                            variant="label"
                            style={{
                                color: theme.colors.text.primary,
                                marginBottom: theme.spacing.sm,
                            }}
                        >
                            メールアドレス
                        </Typography>
                        <Input placeholder="メールアドレスを入力" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    </View>

                    <View style={{ marginBottom: theme.spacing.lg }}>
                        <Typography
                            variant="label"
                            style={{
                                color: theme.colors.text.primary,
                                marginBottom: theme.spacing.sm,
                            }}
                        >
                            パスワード
                        </Typography>
                        <Input placeholder="パスワードを入力" value={password} onChangeText={setPassword} secureTextEntry />
                    </View>

                    <Button variant="primary" onPress={handleLogin} style={{ marginBottom: theme.spacing.md }}>
                        ログイン
                    </Button>

                    <Typography
                        variant="bodySmall"
                        style={{
                            color: theme.colors.text.secondary,
                            textAlign: "center",
                        }}
                    >
                        パスワードを忘れた方は
                        <Typography variant="bodySmall" style={{ color: theme.colors.primary.main }}>
                            こちら
                        </Typography>
                    </Typography>
                </Card>

                <View style={{ alignItems: "center" }}>
                    <Typography
                        variant="body"
                        style={{
                            color: theme.colors.text.secondary,
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        アカウントをお持ちでない方
                    </Typography>
                    <Button variant="secondary" onPress={handleSignUp}>
                        新規登録
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
