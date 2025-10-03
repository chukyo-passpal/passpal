import { View, ScrollView } from "react-native";
import { Typography, Button, Input, useTheme, UserIcon } from "@/design-system";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Login() {
    const { theme } = useTheme();
    const router = useRouter();
    const [studentId, setStudentId] = useState("");

    const handleNext = () => {
        // TODO: 学籍番号バリデーション
        router.push({
            pathname: "/login/step2",
            params: { studentId: studentId },
        });
    };

    const isNextEnabled = studentId.trim().length > 0;

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
                        <Typography
                            variant="h3"
                            style={{
                                textAlign: "center",
                                marginBottom: theme.spacing.md,
                            }}
                        >
                            学籍番号を入力して下さい
                        </Typography>
                        <Typography
                            variant="bodySmall"
                            color={theme.colors.text.secondary}
                            style={{
                                textAlign: "center",
                                marginBottom: theme.spacing.lg,
                            }}
                        >
                            例: t324076
                        </Typography>

                        <Input
                            placeholder="学生番号"
                            value={studentId}
                            onChangeText={setStudentId}
                            leftIcon={<UserIcon size={20} color={theme.colors.text.secondary} />}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmit={handleNext}
                        />
                    </View>

                    <Button variant={isNextEnabled ? "primary" : "secondary"} disabled={!isNextEnabled} onPress={handleNext} fullWidth>
                        次へ
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
