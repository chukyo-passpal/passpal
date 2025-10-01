import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Heading2, Heading3, BodyText, BodySmall, Caption, Card, Icon } from "@/design-system";

export default function Assignments() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                paddingTop: 48,
            }}
        >
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingBottom: 16,
                }}
            >
                <Heading2 color="#B19CD9">課題一覧</Heading2>
                <Pressable
                    style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#F8F9FA",
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "#E8E8E8",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon name="refresh-cw" size={20} color="#8B8B8B" />
                </Pressable>
            </View>

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
                                <BodySmall color="#8B8B8B">B+木インデックスを実装しよう</BodySmall>
                            </View>
                            <View
                                style={{
                                    backgroundColor: "#F0EBFF",
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 16,
                                }}
                            >
                                <Caption color="#B19CD9">進行中</Caption>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={{ height: 1, backgroundColor: "#E8E8E8" }} />

                        {/* Time Info */}
                        <View style={{ flexDirection: "row", gap: 24 }}>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color="#8B8B8B">開始日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="calendar" size={16} color="#8B8B8B" />
                                    <BodyText style={{ fontSize: 16 }}>7月4日(金) 12:00</BodyText>
                                </View>
                            </View>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color="#8B8B8B">締切日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="clock" size={16} color="#8B8B8B" />
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
                                <Icon name="flag" size={16} color="#F5C842" />
                                <BodySmall color="#F5C842">高優先度</BodySmall>
                            </View>
                            <Icon name="chevron-right" size={20} color="#8B8B8B" />
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
                                <BodySmall color="#8B8B8B">正規化とER図の作成</BodySmall>
                            </View>
                            <View
                                style={{
                                    backgroundColor: "#F0F9F1",
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 16,
                                }}
                            >
                                <Caption color="#90C695">完了</Caption>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={{ height: 1, backgroundColor: "#E8E8E8" }} />

                        {/* Time Info */}
                        <View style={{ flexDirection: "row", gap: 24 }}>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color="#8B8B8B">開始日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="calendar" size={16} color="#8B8B8B" />
                                    <BodyText style={{ fontSize: 16 }}>6月15日(月) 09:00</BodyText>
                                </View>
                            </View>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color="#8B8B8B">締切日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="clock" size={16} color="#8B8B8B" />
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
                                <Icon name="check-circle" size={16} color="#90C695" />
                                <BodySmall color="#90C695">提出済み</BodySmall>
                            </View>
                            <Icon name="chevron-right" size={20} color="#8B8B8B" />
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
                                <BodySmall color="#8B8B8B">アジャイル開発手法のレポート</BodySmall>
                            </View>
                            <View
                                style={{
                                    backgroundColor: "#FFFBF0",
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 16,
                                }}
                            >
                                <Caption color="#F5C842">期限近</Caption>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={{ height: 1, backgroundColor: "#E8E8E8" }} />

                        {/* Time Info */}
                        <View style={{ flexDirection: "row", gap: 24 }}>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color="#8B8B8B">開始日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="calendar" size={16} color="#8B8B8B" />
                                    <BodyText style={{ fontSize: 16 }}>7月10日(水) 14:00</BodyText>
                                </View>
                            </View>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Caption color="#8B8B8B">締切日時</Caption>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Icon name="clock" size={16} color="#8B8B8B" />
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
                                <Icon name="alert-triangle" size={16} color="#F5C842" />
                                <BodySmall color="#F5C842">中優先度</BodySmall>
                            </View>
                            <Icon name="chevron-right" size={20} color="#8B8B8B" />
                        </View>
                    </Card>
                </Pressable>
            </ScrollView>
        </View>
    );
}
