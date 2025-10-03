import { View } from "react-native";
import { Button, Card, Icon, Typography } from "../../design-system";
import { router } from "expo-router";

export default function Index() {
    const handleNext = () => {
        // 次のステップへ進む処理を実装
        router.push("/setup/step3");
    };

    const handleSkip = () => {
        // 後で設定する処理を実装
        router.push("/setup/step3");
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff", alignItems: "center" }}>
            {/* Main Content */}
            <View style={{ width: 412, paddingHorizontal: 40, paddingVertical: 48, paddingBottom: 40, gap: 40 }}>
                {/* Icon Section */}
                <View style={{ alignItems: "center", gap: 32 }}>
                    <View style={{ width: 80, height: 80, backgroundColor: "#b19cd9", borderRadius: 40, alignItems: "center", justifyContent: "center" }}>
                        <Icon name="bell" size={32} color="#ffffff" />
                    </View>

                    <View style={{ alignItems: "center", gap: 16, width: "100%" }}>
                        <Typography variant="h2" color="#2d2d30" style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", width: "100%" }}>
                            通知を有効にしますか？
                        </Typography>
                        <Typography variant="body" color="#8b8b8b" style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
                            課題、授業スケジュール、重要なお知らせをすぐににお知らせします。
                        </Typography>
                    </View>
                </View>

                {/* Features Card */}
                <Card variant="feature" style={{ gap: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Icon name="calendar" size={24} color="#b19cd9" />
                        <Typography variant="body" color="#b19cd9" style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>
                            課題提出期限のお知らせ
                        </Typography>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Icon name="clock" size={24} color="#b19cd9" />
                        <Typography variant="body" color="#b19cd9" style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>
                            授業開始時間のお知らせ（未実装）
                        </Typography>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Icon name="bus" size={24} color="#b19cd9" />
                        <Typography variant="body" color="#b19cd9" style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>
                            バスの出発時刻お知らせ（未実装）
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
        </View>
    );
}
