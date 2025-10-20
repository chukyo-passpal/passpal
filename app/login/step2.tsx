import { Button } from "@/src/presentation/components/Button";
import { Icon } from "@/src/presentation/components/Icon";
import { Input } from "@/src/presentation/components/Input";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAuth from "@/src/presentation/hooks/useAuth";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
    const { signIn } = useAuth();
    const { theme } = useTheme();
    const { studentId } = useLocalSearchParams<{ studentId: string }>();
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isNextEnabled = password.length > 0;

    const handleLogin = async () => {
        if (!isNextEnabled) {
            return;
        }

        setIsLoading(true);
        // const authResult = await manaboProviderInstance.authTest({
        //     studentId,
        //     cuIdPass: password,
        // });
        const authResult = await Promise.resolve({ isSuccess: true } as const); // TODO: モック実装
        setIsLoading(false);

        if (!authResult.isSuccess) {
            alert("学籍番号またはパスワードが正しくありません");
            return;
        }
        // ログイン処理を実装
        signIn(studentId, password);
    };

    const handleBackToStudentId = () => {
        router.back();
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg }}>
            <ScrollView contentContainerStyle={{ justifyContent: "center", flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={{ alignItems: "center", marginBottom: 40 }}>
                    {/* Lock Icon Container */}
                    <View
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            backgroundColor: theme.colors.primary.main,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Icon name="lock" size={32} color={theme.colors.neutral.white} />
                    </View>

                    {/* Text Section */}
                    <View style={{ alignItems: "center", marginTop: 32 }}>
                        <Typography variant="h2" style={{ textAlign: "center", marginBottom: 16 }}>
                            パスワードを入力
                        </Typography>
                        <Typography variant="body" style={{ textAlign: "center", color: theme.colors.text.secondary }}>
                            CU_ID ({studentId}) のパスワードを入力してください。
                        </Typography>
                    </View>
                </View>

                {/* Form Section */}
                <View style={{ marginBottom: 24 }}>
                    <Input
                        placeholder="パスワード"
                        value={password}
                        onChangeText={setPassword}
                        isPassword={true}
                        leftIcon={<Icon name="lock" size={20} color={theme.colors.text.secondary} />}
                        containerStyle={{ marginBottom: 24 }}
                        onSubmit={handleLogin}
                        disabled={isLoading}
                    />

                    <Button variant="primary" fullWidth onPress={handleLogin} disabled={!isNextEnabled} loading={isLoading}>
                        ログインして続ける
                    </Button>
                    {__DEV__ && (
                        <Button variant="text" onPress={() => signIn(studentId, password)}>
                            skip authentication
                        </Button>
                    )}
                </View>

                {/* Back Button */}
                <Button variant="text" onPress={handleBackToStudentId}>
                    学籍番号入力に戻る
                </Button>
            </ScrollView>
        </View>
    );
}
