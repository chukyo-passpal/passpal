import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { Typography, Heading2, BodyText, BodySmall, Caption, PrimaryButton, Icon, Card } from "../../design-system";
import { useAuth } from "@/context/authContext";

export default function Step3() {
    const { acceptTerms } = useAuth();

    const handleNext = () => {
        // セットアップ完了後の処理を実装
        acceptTerms();
        router.push("/(tabs)");
    };

    return (
        <ScrollView style={styles.container}>
            {/* Progress Section */}
            <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                    <View style={styles.progressFill} />
                </View>
                <Typography variant="h3" color="#B19CD9" style={styles.progressText}>
                    準備完了！3/3
                </Typography>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                <View style={styles.contentWrapper}>
                    {/* Success Icon */}
                    <View style={styles.iconSection}>
                        <View style={styles.successIcon}>
                            <Icon name="check" size={32} color="#FFFFFF" />
                        </View>

                        {/* Header Text */}
                        <View style={styles.headerTextSection}>
                            <Heading2 style={styles.title}>セットアップ完了！</Heading2>
                            <BodyText color="#8B8B8B" style={styles.subtitle}>
                                PassPalと一緒に、シンプルなキャンパスライフを。
                            </BodyText>
                        </View>

                        {/* Features Card */}
                        <Card variant="feature" style={styles.featuresCard}>
                            <Typography variant="h3" color="#B19CD9" style={styles.cardTitle}>
                                主な特徴
                            </Typography>
                            <View style={styles.featuresList}>
                                {/* Timetable Feature */}
                                <View style={styles.featureItem}>
                                    <Icon name="calendar" size={24} color="#B19CD9" />
                                    <View style={styles.featureText}>
                                        <Typography variant="label" color="#B19CD9">
                                            時間割・出欠管理
                                        </Typography>
                                        <Caption color="#8B8B8B">授業の時間割をひと目で確認。スムーズに一日をスタートできます。</Caption>
                                    </View>
                                </View>

                                {/* Assignment Feature */}
                                <View style={styles.featureItem}>
                                    <Icon name="clipboard-list" size={24} color="#B19CD9" />
                                    <View style={styles.featureText}>
                                        <Typography variant="label" color="#B19CD9">
                                            課題管理機能
                                        </Typography>
                                        <Caption color="#8B8B8B">提出期限も忘れない。課題の管理がもっとラクに。</Caption>
                                    </View>
                                </View>

                                {/* Bus Feature */}
                                <View style={styles.featureItem}>
                                    <Icon name="bus" size={24} color="#B19CD9" />
                                    <View style={styles.featureText}>
                                        <Typography variant="label" color="#B19CD9">
                                            バス時刻表
                                        </Typography>
                                        <Caption color="#8B8B8B">通学に便利なバスの発着時刻をいつでもチェック。</Caption>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </View>

                    {/* Terms Agreement */}
                    <View style={styles.termsSection}>
                        <View style={styles.checkboxRow}>
                            {/* Checkbox */}
                            <View style={styles.checkbox}>
                                <Icon name="check" size={12} color="#FFFFFF" />
                            </View>

                            {/* Terms Text */}
                            <View style={styles.termsText}>
                                <View style={styles.termsLine}>
                                    <Typography variant="label" color="#B19CD9">
                                        利用規約
                                    </Typography>
                                    <BodySmall color="#8B8B8B">および</BodySmall>
                                    <Typography variant="label" color="#B19CD9">
                                        プライバシーポリシー
                                    </Typography>
                                    <BodySmall color="#8B8B8B">に</BodySmall>
                                </View>
                                <BodySmall color="#8B8B8B">同意します</BodySmall>
                            </View>
                        </View>
                    </View>

                    {/* Next Button */}
                    <PrimaryButton fullWidth size="large" style={styles.nextButton} onPress={handleNext}>
                        次へ
                    </PrimaryButton>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    progressSection: {
        alignItems: "center",
        marginBottom: 40,
        gap: 16,
        paddingTop: 82,
        paddingHorizontal: 20,
    },
    progressBar: {
        width: 338,
        height: 12,
        backgroundColor: "#E8E8E8",
        borderRadius: 100,
        overflow: "hidden",
    },
    progressFill: {
        width: "100%",
        height: 12,
        backgroundColor: "#B19CD9",
        borderRadius: 100,
    },
    progressText: {
        textAlign: "center",
    },
    mainContent: {
        paddingHorizontal: 40,
        paddingBottom: 40,
    },
    contentWrapper: {
        gap: 40,
    },
    iconSection: {
        alignItems: "center",
        gap: 32,
    },
    successIcon: {
        width: 80,
        height: 80,
        backgroundColor: "#B19CD9",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTextSection: {
        alignItems: "center",
        gap: 16,
    },
    title: {
        textAlign: "center",
    },
    subtitle: {
        textAlign: "center",
    },
    featuresCard: {
        width: "100%",
    },
    cardTitle: {
        marginBottom: 20,
    },
    featuresList: {
        gap: 16,
    },
    featureItem: {
        flexDirection: "row",
        gap: 16,
        alignItems: "flex-start",
    },
    featureText: {
        flex: 1,
        gap: 4,
    },
    termsSection: {
        gap: 12,
    },
    checkboxRow: {
        flexDirection: "row",
        gap: 12,
        alignItems: "flex-start",
    },
    checkbox: {
        width: 20,
        height: 20,
        backgroundColor: "#B19CD9",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    termsText: {
        flex: 1,
        gap: 4,
    },
    termsLine: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
    },
    nextButton: {
        marginBottom: 40,
    },
});
