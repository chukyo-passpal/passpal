import { View } from "react-native";
import { Button } from "../../design-system/components/Button";
import { UserIcon } from "../../design-system/components/Icon";
import { Typography } from "../../design-system/components/Typography";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/design-system";

export default function Index() {
    const { theme } = useTheme();
    const { studentId } = useLocalSearchParams<{ studentId: string }>();

    const handleNext = () => {
        router.replace({
            pathname: "/login/step3",
            params: { studentId: studentId },
        });
    };
    const handleBack = () => {
        router.back();
    };

    return (
        <View
            style={{
                flex: 1,

                backgroundColor: theme.colors.background.primary,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 48,
            }}
        >
            <View
                style={{
                    width: "100%",
                    maxWidth: 412,
                    paddingHorizontal: 40,
                    paddingVertical: 48,
                    alignItems: "center",
                    gap: 40,
                }}
            >
                {/* User Section */}
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                        gap: 32,
                    }}
                >
                    {/* User Icon Container */}
                    <View
                        style={{
                            width: 80,
                            height: 80,
                            backgroundColor: theme.colors.primary.main,
                            borderRadius: 40,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <UserIcon size={32} color={theme.colors.text.primary} />
                    </View>

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
                            続行するには、大学アカウントを使用してください
                        </Typography>

                        <Typography variant="body">{studentId}@m.chukyo-u.ac.jp</Typography>
                    </View>
                </View>

                {/* Action Section */}
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                        gap: 24,
                    }}
                >
                    {/* Sign In Button */}
                    <Button variant="primary" size="medium" fullWidth={true} onPress={handleNext}>
                        サインイン（学内Googleアカウント）
                    </Button>

                    {/* Back to Student ID Button */}
                    <Button variant="text" onPress={handleBack}>
                        学籍番号入力に戻る
                    </Button>
                </View>
            </View>
        </View>
    );
}
