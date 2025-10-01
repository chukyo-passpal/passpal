import { View } from "react-native";
import { Button } from "../../design-system/components/Button";
import { UserIcon } from "../../design-system/components/Icon";
import { Typography } from "../../design-system/components/Typography";
import { router, useLocalSearchParams } from "expo-router";

export default function Index() {
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
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 48,
            }}
        >
            <View
                style={{
                    backgroundColor: "#FFFFFF",
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
                            backgroundColor: "#B19CD9",
                            borderRadius: 40,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <UserIcon size={32} color="#FFFFFF" />
                    </View>

                    {/* Text Section */}
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <Typography
                            variant="h2"
                            style={{
                                fontSize: 24,
                                fontWeight: "bold",
                                color: "#2D2D30",
                                textAlign: "center",
                            }}
                        >
                            Googleログイン
                        </Typography>

                        <Typography
                            variant="body"
                            color="#8B8B8B"
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                lineHeight: 19.2,
                            }}
                        >
                            続行するには、大学アカウント{"\n"}を使用してください
                        </Typography>

                        <Typography
                            variant="body"
                            style={{
                                fontSize: 16,
                                fontWeight: "500",
                                color: "#2D2D30",
                                textAlign: "center",
                            }}
                        >
                            {studentId}@m.chukyo-u.ac.jp
                        </Typography>
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
                    <Button
                        variant="primary"
                        size="medium"
                        fullWidth={true}
                        style={{
                            height: 56,
                            borderRadius: 28,
                        }}
                        onPress={handleNext}
                    >
                        <Typography
                            variant="button"
                            color="#FFFFFF"
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                            }}
                        >
                            サインイン（学内Googleアカウント）
                        </Typography>
                    </Button>

                    {/* Back to Student ID Button */}
                    <Button variant="text" onPress={handleBack}>
                        <Typography
                            variant="button"
                            color="#B19CD9"
                            style={{
                                fontSize: 16,
                                fontWeight: "500",
                            }}
                        >
                            学籍番号入力に戻る
                        </Typography>
                    </Button>
                </View>
            </View>
        </View>
    );
}
