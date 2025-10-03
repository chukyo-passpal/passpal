import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Heading3, BodyText, BodySmall, Caption, Card, Icon, useTheme } from "@/design-system";
import Header from "@/components/Header";

export default function Assignments() {
    const { theme } = useTheme();

    const handleRefresh = () => {
        // Refresh logic here
        console.log("Refresh pressed");
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="課題一覧" subButtonIcon="refresh-cw" onPressSubButton={handleRefresh} />

            {/* Content */}
            <ScrollView
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}
                contentContainerStyle={{
                    gap: 16,
                    paddingBottom: 24,
                }}
            >
                {/* Assignment Card 1 - 進行中 */}
                <Pressable>
                    <Card style={{ gap: 16, padding: 20 }}>
                        {/* Header Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ flex: 1, gap: 4 }}>
                                <Heading3>アルゴリズムとデータ構造</Heading3>
                                <BodySmall color={theme.colors.text.secondary}>B+木インデックスを実装しよう</BodySmall>
                            </View>
                            <View
                                style={{
                                    backgroundColor: theme.colors.primary.light,
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 16,
                                }}
                            >
                                <Caption color={theme.colors.primary.main}>進行中</Caption>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={{ height: 1, backgroundColor: theme.colors.border.default }} />

                        {/* Time Info */}
                        <View style={{ flexDirection: "row", gap: 24 }}>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color={theme.colors.text.secondary}>開始日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="calendar" size={16} color={theme.colors.text.secondary} />
                                    <BodyText style={{ fontSize: 16 }}>7月4日(金) 12:00</BodyText>
                                </View>
                            </View>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color={theme.colors.text.secondary}>締切日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                                    <BodyText style={{ fontSize: 16 }}>12月12日(金) 12:00</BodyText>
                                </View>
                            </View>
                        </View>

                        {/* Action Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <Icon name="flag" size={16} color={theme.colors.status.warning} />
                                <BodySmall color={theme.colors.status.warning}>高優先度</BodySmall>
                            </View>
                            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                        </View>
                    </Card>
                </Pressable>

                {/* Assignment Card 2 - 完了 */}
                <Pressable>
                    <Card style={{ gap: 16, padding: 20 }}>
                        {/* Header Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ flex: 1, gap: 4 }}>
                                <Heading3>データベース設計</Heading3>
                                <BodySmall color={theme.colors.text.secondary}>正規化とER図の作成</BodySmall>
                            </View>
                            <View
                                style={{
                                    backgroundColor: theme.colors.status.success + "20",
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 16,
                                }}
                            >
                                <Caption color={theme.colors.status.success}>完了</Caption>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={{ height: 1, backgroundColor: theme.colors.border.default }} />

                        {/* Time Info */}
                        <View style={{ flexDirection: "row", gap: 24 }}>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color={theme.colors.text.secondary}>開始日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="calendar" size={16} color={theme.colors.text.secondary} />
                                    <BodyText style={{ fontSize: 16 }}>6月15日(月) 09:00</BodyText>
                                </View>
                            </View>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color={theme.colors.text.secondary}>締切日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                                    <BodyText style={{ fontSize: 16 }}>7月1日(月) 23:59</BodyText>
                                </View>
                            </View>
                        </View>

                        {/* Action Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <Icon name="check-circle" size={16} color={theme.colors.status.success} />
                                <BodySmall color={theme.colors.status.success}>提出済み</BodySmall>
                            </View>
                            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                        </View>
                    </Card>
                </Pressable>

                {/* Assignment Card 3 - 期限近 */}
                <Pressable>
                    <Card style={{ gap: 16, padding: 20 }}>
                        {/* Header Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ flex: 1, gap: 4 }}>
                                <Heading3>ソフトウェア工学</Heading3>
                                <BodySmall color={theme.colors.text.secondary}>アジャイル開発手法のレポート</BodySmall>
                            </View>
                            <View
                                style={{
                                    backgroundColor: theme.colors.status.warning + "20",
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 16,
                                }}
                            >
                                <Caption color={theme.colors.status.warning}>期限近</Caption>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={{ height: 1, backgroundColor: theme.colors.border.default }} />

                        {/* Time Info */}
                        <View style={{ flexDirection: "row", gap: 24 }}>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color={theme.colors.text.secondary}>開始日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="calendar" size={16} color={theme.colors.text.secondary} />
                                    <BodyText style={{ fontSize: 16 }}>7月10日(水) 14:00</BodyText>
                                </View>
                            </View>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color={theme.colors.text.secondary}>締切日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                                    <BodyText style={{ fontSize: 16 }}>7月20日(土) 23:59</BodyText>
                                </View>
                            </View>
                        </View>

                        {/* Action Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <Icon name="alert-triangle" size={16} color={theme.colors.status.warning} />
                                <BodySmall color={theme.colors.status.warning}>中優先度</BodySmall>
                            </View>
                            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                        </View>
                    </Card>
                </Pressable>

                {/* Assignment Card 1 - 進行中 */}
                <Pressable>
                    <Card style={{ gap: 16, padding: 20 }}>
                        {/* Header Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ flex: 1, gap: 4 }}>
                                <Heading3>アルゴリズムとデータ構造</Heading3>
                                <BodySmall color={theme.colors.text.secondary}>B+木インデックスを実装しよう</BodySmall>
                            </View>
                            <View
                                style={{
                                    backgroundColor: theme.colors.primary.light,
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 16,
                                }}
                            >
                                <Caption color={theme.colors.primary.main}>進行中</Caption>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={{ height: 1, backgroundColor: theme.colors.border.default }} />

                        {/* Time Info */}
                        <View style={{ flexDirection: "row", gap: 24 }}>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color={theme.colors.text.secondary}>開始日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="calendar" size={16} color={theme.colors.text.secondary} />
                                    <BodyText style={{ fontSize: 16 }}>7月4日(金) 12:00</BodyText>
                                </View>
                            </View>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color={theme.colors.text.secondary}>締切日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                                    <BodyText style={{ fontSize: 16 }}>12月12日(金) 12:00</BodyText>
                                </View>
                            </View>
                        </View>

                        {/* Action Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <Icon name="flag" size={16} color={theme.colors.status.warning} />
                                <BodySmall color={theme.colors.status.warning}>高優先度</BodySmall>
                            </View>
                            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                        </View>
                    </Card>
                </Pressable>
            </ScrollView>
        </View>
    );
}
