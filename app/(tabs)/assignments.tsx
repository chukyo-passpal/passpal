import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Heading3, BodyText, BodySmall, Caption, Card, Icon, useTheme } from "@/design-system";
import Header from "@/components/Header";

// 課題の型定義
type Assignment = {
    id: string;
    title: string;
    subtitle: string;
    status: "in-progress" | "completed" | "upcoming";
    startDate: string;
    dueDate: string;
    priority?: "high" | "medium" | "low";
    statusLabel: string;
    statusColor: string;
    statusBgColor: string;
    actionIcon: string;
    actionLabel: string;
    actionColor: string;
};

// 課題カードコンポーネント
function AssignmentCard({ assignment, handleTouch }: { assignment: Assignment; handleTouch: () => void }) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleTouch}>
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
                        <Heading3>{assignment.title}</Heading3>
                        <BodySmall color={theme.colors.text.secondary}>{assignment.subtitle}</BodySmall>
                    </View>
                    <View
                        style={{
                            backgroundColor: assignment.statusBgColor,
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 16,
                        }}
                    >
                        <Caption color={assignment.statusColor}>{assignment.statusLabel}</Caption>
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
                            <BodyText style={{ fontSize: 16 }}>{assignment.startDate}</BodyText>
                        </View>
                    </View>
                    <View style={{ flex: 1, gap: 4 }}>
                        <Caption color={theme.colors.text.secondary}>締切日時</Caption>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                            <BodyText style={{ fontSize: 16 }}>{assignment.dueDate}</BodyText>
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
                        <Icon name={assignment.actionIcon as any} size={16} color={assignment.actionColor} />
                        <BodySmall color={assignment.actionColor}>{assignment.actionLabel}</BodySmall>
                    </View>
                    <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                </View>
            </Card>
        </TouchableOpacity>
    );
}

export default function Assignments() {
    const { theme } = useTheme();

    // 課題データ
    const assignments: Assignment[] = [
        {
            id: "1",
            title: "アルゴリズムとデータ構造",
            subtitle: "B+木インデックスを実装しよう",
            status: "in-progress",
            startDate: "7月4日(金) 12:00",
            dueDate: "12月12日(金) 12:00",
            priority: "high",
            statusLabel: "進行中",
            statusColor: theme.colors.primary.main,
            statusBgColor: theme.colors.primary.light,
            actionIcon: "flag",
            actionLabel: "高優先度",
            actionColor: theme.colors.status.warning,
        },
        {
            id: "2",
            title: "データベース設計",
            subtitle: "正規化とER図の作成",
            status: "completed",
            startDate: "6月15日(月) 09:00",
            dueDate: "7月1日(月) 23:59",
            statusLabel: "完了",
            statusColor: theme.colors.status.success,
            statusBgColor: theme.colors.status.success + "20",
            actionIcon: "check-circle",
            actionLabel: "提出済み",
            actionColor: theme.colors.status.success,
        },
        {
            id: "3",
            title: "ソフトウェア工学",
            subtitle: "アジャイル開発手法のレポート",
            status: "upcoming",
            startDate: "7月10日(水) 14:00",
            dueDate: "7月20日(土) 23:59",
            statusLabel: "期限近",
            statusColor: theme.colors.status.warning,
            statusBgColor: theme.colors.status.warning + "20",
            actionIcon: "alert-triangle",
            actionLabel: "中優先度",
            actionColor: theme.colors.status.warning,
        },
        {
            id: "4",
            title: "アルゴリズムとデータ構造",
            subtitle: "B+木インデックスを実装しよう",
            status: "in-progress",
            startDate: "7月4日(金) 12:00",
            dueDate: "12月12日(金) 12:00",
            priority: "high",
            statusLabel: "進行中",
            statusColor: theme.colors.primary.main,
            statusBgColor: theme.colors.primary.light,
            actionIcon: "flag",
            actionLabel: "高優先度",
            actionColor: theme.colors.status.warning,
        },
    ];

    const handleRefresh = () => {
        // Refresh logic here
        console.log("Refresh pressed");
    };

    const handleTouch = (id: string) => {
        console.log(`Touched assignment ${id}`);
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
                {assignments.map((assignment) => (
                    <AssignmentCard key={assignment.id} assignment={assignment} handleTouch={() => handleTouch(assignment.id)} />
                ))}
            </ScrollView>
        </View>
    );
}
