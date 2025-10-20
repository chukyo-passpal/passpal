import { Button } from "@/src/presentation/components/Button";
import { Card } from "@/src/presentation/components/Card";
import { Icon } from "@/src/presentation/components/Icon";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAuth from "@/src/presentation/hooks/useAuth";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function Step3() {
    const { acceptTerms } = useAuth();
    const { theme } = useTheme();

    const [isAcceptedTerms, setIsAcceptedTerms] = useState(false);

    const handleNext = () => {
        // セットアップ完了後の処理を実装
        acceptTerms();
        router.push("/(tabs)");
    };

    const handleClickTerms = () => {
        // 利用規約のリンクを開く処理を実装
    };

    const handleClickPrivacy = () => {
        // プライバシーポリシーのリンクを開く処理を実装
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg }}>
            <ScrollView
                contentContainerStyle={{ justifyContent: "center", flex: 1, maxWidth: 400, alignSelf: "center", width: "100%" }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ gap: 40 }}>
                    {/* Success Icon */}
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
                            <Icon name="check" size={32} color={theme.colors.text.inverse} />
                        </View>

                        {/* Header Text */}
                        <View style={{ alignItems: "center", gap: 16 }}>
                            <Typography variant="h2" style={{ textAlign: "center" }}>
                                セットアップ完了！
                            </Typography>
                            <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center" }}>
                                PassPalと一緒に、シンプルなキャンパスライフを。
                            </Typography>
                        </View>

                        {/* Features Card */}
                        <Card variant="feature" style={{ width: "100%" }}>
                            <Typography variant="h3" color={theme.colors.primary.main} style={{ marginBottom: 20 }}>
                                主な特徴
                            </Typography>
                            <View style={{ gap: 16 }}>
                                {/* Timetable Feature */}
                                <View style={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}>
                                    <Icon name="calendar" size={24} color={theme.colors.primary.main} />
                                    <View style={{ flex: 1, gap: 4 }}>
                                        <Typography variant="label" color={theme.colors.primary.main}>
                                            時間割・出欠管理
                                        </Typography>
                                        <Typography variant="caption" color={theme.colors.text.secondary}>
                                            授業の時間割をひと目で確認。スムーズに一日をスタートできます。
                                        </Typography>
                                    </View>
                                </View>

                                {/* Assignment Feature */}
                                <View style={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}>
                                    <Icon name="clipboard-list" size={24} color={theme.colors.primary.main} />
                                    <View style={{ flex: 1, gap: 4 }}>
                                        <Typography variant="label" color={theme.colors.primary.main}>
                                            課題管理機能
                                        </Typography>
                                        <Typography variant="caption" color={theme.colors.text.secondary}>
                                            提出期限も忘れない。課題の管理がもっとラクに。
                                        </Typography>
                                    </View>
                                </View>

                                {/* Bus Feature */}
                                <View style={{ flexDirection: "row", gap: 16, alignItems: "flex-start" }}>
                                    <Icon name="bus" size={24} color={theme.colors.primary.main} />
                                    <View style={{ flex: 1, gap: 4 }}>
                                        <Typography variant="label" color={theme.colors.primary.main}>
                                            バス時刻表
                                        </Typography>
                                        <Typography variant="caption" color={theme.colors.text.secondary}>
                                            通学に便利なバスの発着時刻をいつでもチェック。
                                        </Typography>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </View>

                    {/* Terms Agreement */}
                    <View style={{ gap: 12, alignItems: "center" }}>
                        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                            {/* Checkbox */}
                            <View style={{ width: 20, height: 20, alignItems: "center", justifyContent: "center" }}>
                                <Checkbox value={isAcceptedTerms} onValueChange={setIsAcceptedTerms} />
                            </View>

                            {/* Terms Text */}
                            <View style={{ flex: 1, gap: 4 }}>
                                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
                                    <TouchableOpacity onPress={handleClickTerms}>
                                        <Typography variant="label" color={theme.colors.primary.main}>
                                            利用規約
                                        </Typography>
                                    </TouchableOpacity>
                                    <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                        および
                                    </Typography>
                                    <TouchableOpacity onPress={handleClickPrivacy}>
                                        <Typography variant="label" color={theme.colors.primary.main}>
                                            プライバシーポリシー
                                        </Typography>
                                    </TouchableOpacity>
                                    <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                        に同意します
                                    </Typography>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Next Button */}
                    <Button variant="primary" fullWidth size="large" style={{ marginBottom: 40 }} onPress={handleNext} disabled={!isAcceptedTerms}>
                        次へ
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
