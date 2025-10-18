import manaboProviderInstance from "@/data/providers/chukyo-univ/manaboProvider";
import useAuth from "@/hooks/useAuth";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { BodyText, Heading2, Icon, Input, PrimaryButton, TextButton, useTheme } from "../../design-system";

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
        const authResult = await manaboProviderInstance.authTest({
            studentId,
            cuIdPass: password,
        });
        setIsLoading(false);

        if (!authResult.isSuccess) {
            alert(authResult.err.message);
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
                        <Heading2 style={{ textAlign: "center", marginBottom: 16 }}>パスワードを入力</Heading2>
                        <BodyText style={{ textAlign: "center", color: theme.colors.text.secondary }}>
                            CU_ID ({studentId}) のパスワードを入力してください。
                        </BodyText>
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

                    <PrimaryButton fullWidth onPress={handleLogin} disabled={!isNextEnabled} loading={isLoading}>
                        ログインして続ける
                    </PrimaryButton>
                    {__DEV__ && <TextButton onPress={() => signIn(studentId, password)}>skip authentication</TextButton>}
                </View>

                {/* Back Button */}
                <TextButton onPress={handleBackToStudentId}>学籍番号入力に戻る</TextButton>
            </ScrollView>
        </View>
    );
}
