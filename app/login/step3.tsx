import { View } from "react-native";
import { useState } from "react";
import { ThemeProvider, Icon, Heading2, BodyText, Input, PrimaryButton, TextButton } from "../../design-system";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/authContext";

export default function Index() {
    const { signIn } = useAuth();
    const { studentId } = useLocalSearchParams<{ studentId: string }>();
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // ログイン処理を実装
        signIn();
    };

    const handleBackToStudentId = () => {
        router.back();
    };

    return (
        <ThemeProvider>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flex: 1, paddingHorizontal: 40, paddingVertical: 48, justifyContent: "center", alignSelf: "center" }}>
                    {/* Header Section */}
                    <View style={{ alignItems: "center", marginBottom: 40 }}>
                        {/* Lock Icon Container */}
                        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#B19CD9", justifyContent: "center", alignItems: "center" }}>
                            <Icon name="lock" size={32} color="white" />
                        </View>

                        {/* Text Section */}
                        <View style={{ alignItems: "center", marginTop: 32 }}>
                            <Heading2 style={{ textAlign: "center", marginBottom: 16 }}>パスワードを入力</Heading2>
                            <BodyText style={{ textAlign: "center", color: "#8B8B8B" }}>CU_ID ({studentId}) のパスワードを入力してください。</BodyText>
                        </View>
                    </View>

                    {/* Form Section */}
                    <View style={{ marginBottom: 24 }}>
                        <Input
                            placeholder="パスワード"
                            value={password}
                            onChangeText={setPassword}
                            isPassword={true}
                            leftIcon={<Icon name="lock" size={20} color="#8B8B8B" />}
                            containerStyle={{ marginBottom: 24 }}
                            onSubmit={handleLogin}
                        />

                        <PrimaryButton fullWidth onPress={handleLogin} style={{ backgroundColor: "#B19CD9", borderRadius: 28, height: 56 }}>
                            ログインして続ける
                        </PrimaryButton>
                    </View>

                    {/* Back Button */}
                    <TextButton onPress={handleBackToStudentId}>学籍番号入力に戻る</TextButton>
                </View>
            </View>
        </ThemeProvider>
    );
}
