import notificationServiceInstance from "@/src/domain/services/notificationService";
import { Button } from "@/src/presentation/components/Button";
import { Card } from "@/src/presentation/components/Card";
import { Icon } from "@/src/presentation/components/Icon";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
    const { theme } = useTheme();

    const handleNext = async () => {
        // 次のステップへ進む処理を実装
        await notificationServiceInstance.ensurePermissions();
        router.push("/setup/step3");
    };

    const handleSkip = () => {
        // 後で設定する処理を実装
        router.push("/setup/step3");
    };

    useEffect(() => {
        void (async () => {
            const granted = await notificationServiceInstance.hasPermission();
            if (granted) {
                handleSkip();
            }
        })();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg }}>
            <ScrollView
                contentContainerStyle={{ justifyContent: "center", flex: 1, maxWidth: 400, alignSelf: "center", width: "100%" }}
                showsVerticalScrollIndicator={false}
            >
                {/* Main Content */}
                <View style={{ gap: 40 }}>
                    {/* Icon Section */}
                    <View style={{ alignItems: "center", gap: 32 }}>
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
                            <Icon name="bell" size={32} color={theme.colors.text.inverse} />
                        </View>

                        <View style={{ alignItems: "center", gap: 16, width: "100%" }}>
                            <Typography variant="h2">通知を有効にしますか？</Typography>
                            <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center" }}>
                                課題、授業スケジュール、重要なお知らせをすぐににお知らせします。
                            </Typography>
                        </View>
                    </View>

                    {/* Features Card */}
                    <Card variant="feature" style={{ gap: 16 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                            <Icon name="calendar" size={24} color={theme.colors.primary.main} />
                            <Typography variant="body" color={theme.colors.primary.main} style={{ fontWeight: "500" }}>
                                課題提出期限のお知らせ（未実装）
                            </Typography>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                            <Icon name="clock" size={24} color={theme.colors.primary.main} />
                            <Typography variant="body" color={theme.colors.primary.main} style={{ fontWeight: "500" }}>
                                授業開始時間のお知らせ（未実装）
                            </Typography>
                        </View>
                    </Card>

                    {/* Action Section */}
                    <View style={{ alignItems: "center", gap: 16 }}>
                        <Button variant="primary" fullWidth onPress={handleNext}>
                            通知を許可する
                        </Button>
                        <Button variant="text" onPress={handleSkip}>
                            また後で
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
