import { View, StyleSheet } from "react-native";
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
            <View style={styles.container}>
                <View style={styles.content}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        {/* Lock Icon Container */}
                        <View style={styles.iconContainer}>
                            <Icon name="lock" size={32} color="white" />
                        </View>

                        {/* Text Section */}
                        <View style={styles.textSection}>
                            <Heading2 style={styles.title}>パスワードを入力</Heading2>
                            <BodyText style={styles.description}>CU_ID ({studentId}) のパスワードを入力してください。</BodyText>
                        </View>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formSection}>
                        <Input
                            placeholder="パスワード"
                            value={password}
                            onChangeText={setPassword}
                            isPassword={true}
                            leftIcon={<Icon name="lock" size={20} color="#8B8B8B" />}
                            containerStyle={styles.passwordInput}
                        />

                        <PrimaryButton fullWidth onPress={handleLogin} style={styles.loginButton}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 48,
        justifyContent: "center",
        alignSelf: "center",
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#B19CD9",
        justifyContent: "center",
        alignItems: "center",
    },
    textSection: {
        alignItems: "center",
        marginTop: 32,
    },
    title: {
        textAlign: "center",
        marginBottom: 16,
    },
    description: {
        textAlign: "center",
        color: "#8B8B8B",
    },
    formSection: {
        marginBottom: 24,
    },
    passwordInput: {
        marginBottom: 24,
    },
    loginButton: {
        backgroundColor: "#B19CD9",
        borderRadius: 28,
        height: 56,
    },
});
