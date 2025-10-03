import React from "react";
import { View, ScrollView } from "react-native";
import { router } from "expo-router";
import { Checkbox } from "expo-checkbox";
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
        <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            {/* Main Content */}
            <View style={{ paddingHorizontal: 40, paddingBottom: 40 }}>
                <View style={{ gap: 40 }}>
                    {/* Success Icon */}
                    <View style={{ alignItems: "center", gap: 32 }}>
                        <View style={{ width: 80, height: 80, backgroundColor: "#B19CD9", borderRadius: 40, alignItems: "center", justifyContent: "center" }}>
                            <Icon name="check" size={32} color="#FFFFFF" />
                        </View>

                        {/* Header Text */}
                        <View style={{ alignItems: "center", gap: 16 }}>
                            <Heading2 style={{ textAlign: "center" }}>セットアップ完了！</Heading2>
                            <BodyText color="#8B8B8B" style={{ textAlign: "center" }}>
                                PassPalと一緒に、シンプルなキャンパスライフを。
                            </BodyText>
                        </View>

                        {/* Features Card */}
                        <Card variant="feature" style={{ width: "100%" }}>
                            <Typography variant="h3" color="#B19CD9" style={{ marginBottom: 20 }}>
                                主な特徴
                            </Typography>
                            <View style={{ gap: 16 }}>
                                {/* Timetable Feature */}
                                <View style={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}>
                                    <Icon name="calendar" size={24} color="#B19CD9" />
                                    <View style={{ flex: 1, gap: 4 }}>
                                        <Typography variant="label" color="#B19CD9">
                                            時間割・出欠管理
                                        </Typography>
                                        <Caption color="#8B8B8B">授業の時間割をひと目で確認。スムーズに一日をスタートできます。</Caption>
                                    </View>
                                </View>

                                {/* Assignment Feature */}
                                <View style={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}>
                                    <Icon name="clipboard-list" size={24} color="#B19CD9" />
                                    <View style={{ flex: 1, gap: 4 }}>
                                        <Typography variant="label" color="#B19CD9">
                                            課題管理機能
                                        </Typography>
                                        <Caption color="#8B8B8B">提出期限も忘れない。課題の管理がもっとラクに。</Caption>
                                    </View>
                                </View>

                                {/* Bus Feature */}
                                <View style={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}>
                                    <Icon name="bus" size={24} color="#B19CD9" />
                                    <View style={{ flex: 1, gap: 4 }}>
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
                    <View style={{ gap: 12 }}>
                        <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                            {/* Checkbox */}
                            <View style={{ width: 20, height: 20, alignItems: "center", justifyContent: "center" }}>
                                <Checkbox />
                            </View>

                            {/* Terms Text */}
                            <View style={{ flex: 1, gap: 4 }}>
                                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
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
                    <PrimaryButton fullWidth size="large" style={{ marginBottom: 40 }} onPress={handleNext}>
                        次へ
                    </PrimaryButton>
                </View>
            </View>
        </ScrollView>
    );
}
