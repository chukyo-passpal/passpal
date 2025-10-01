import { View, StyleSheet } from "react-native";
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
        <View style={styles.container}>
            {/* Progress Section */}
            <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                    <View style={styles.progressFill} />
                </View>
                <Typography variant="label" color="#b19cd9" style={styles.progressText}>
                    通知 2/3
                </Typography>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                {/* Icon Section */}
                <View style={styles.iconSection}>
                    <View style={styles.iconContainer}>
                        <Icon name="bell" size={32} color="#ffffff" />
                    </View>

                    <View style={styles.textSection}>
                        <Typography variant="h2" color="#2d2d30" style={styles.title}>
                            通知を有効にしますか？
                        </Typography>
                        <Typography variant="body" color="#8b8b8b" style={styles.description}>
                            課題、授業スケジュール、重要なお知らせをすぐににお知らせします。
                        </Typography>
                    </View>
                </View>

                {/* Features Card */}
                <Card variant="feature" style={styles.featuresCard}>
                    <View style={styles.featureItem}>
                        <Icon name="calendar" size={24} color="#b19cd9" />
                        <Typography variant="body" color="#b19cd9" style={styles.featureText}>
                            課題提出期限のお知らせ
                        </Typography>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon name="clock" size={24} color="#b19cd9" />
                        <Typography variant="body" color="#b19cd9" style={styles.featureText}>
                            授業開始時間のお知らせ（未実装）
                        </Typography>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon name="bus" size={24} color="#b19cd9" />
                        <Typography variant="body" color="#b19cd9" style={styles.featureText}>
                            バスの出発時刻お知らせ（未実装）
                        </Typography>
                    </View>
                </Card>

                {/* Action Section */}
                <View style={styles.actionSection}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 150,
    },
    progressSection: {
        position: "absolute",
        top: 82,
        left: 3,
        width: 412,
        alignItems: "center",
        gap: 16,
    },
    progressBar: {
        width: 338,
        height: 12,
        backgroundColor: "#e8e8e8",
        borderRadius: 100,
        alignItems: "flex-start",
    },
    progressFill: {
        width: 224,
        height: 12,
        backgroundColor: "#b19cd9",
        borderRadius: 100,
    },
    progressText: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    mainContent: {
        width: 412,
        paddingHorizontal: 40,
        paddingVertical: 48,
        paddingBottom: 40,
        gap: 40,
    },
    iconSection: {
        alignItems: "center",
        gap: 32,
    },
    iconContainer: {
        width: 80,
        height: 80,
        backgroundColor: "#b19cd9",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    textSection: {
        alignItems: "center",
        gap: 16,
        width: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        width: "100%",
    },
    featuresCard: {
        gap: 16,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    featureText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
    },
    actionSection: {
        alignItems: "center",
        gap: 16,
    },
});
