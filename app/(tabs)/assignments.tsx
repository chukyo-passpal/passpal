import { Card } from "@/src/presentation/components/Card";
import Header from "@/src/presentation/components/Header";
import { Icon } from "@/src/presentation/components/Icon";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import React from "react";
import { ActivityIndicator, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";

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
                        <Typography variant="h3">{assignment.title}</Typography>
                        <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                            {assignment.subtitle}
                        </Typography>
                    </View>
                    <View
                        style={{
                            backgroundColor: assignment.statusBgColor,
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 16,
                        }}
                    >
                        <Typography variant="caption" color={assignment.statusColor}>
                            {assignment.statusLabel}
                        </Typography>
                    </View>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: theme.colors.border.default }} />

                {/* Time Info */}
                <View style={{ flexDirection: "row", gap: 24 }}>
                    <View style={{ flex: 1, gap: 4 }}>
                        <Typography variant="caption" color={theme.colors.text.secondary}>
                            開始日時
                        </Typography>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Icon name="calendar" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="body" style={{ fontSize: 16 }}>
                                {assignment.startDate}
                            </Typography>
                        </View>
                    </View>
                    <View style={{ flex: 1, gap: 4 }}>
                        <Typography variant="caption" color={theme.colors.text.secondary}>
                            締切日時
                        </Typography>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="body" style={{ fontSize: 16 }}>
                                {assignment.dueDate}
                            </Typography>
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
                        <Typography variant="bodySmall" color={assignment.actionColor}>
                            {assignment.actionLabel}
                        </Typography>
                    </View>
                    <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                </View>
            </Card>
        </TouchableOpacity>
    );
}

export default function Assignments() {
    const { theme } = useTheme();

    const handleRefresh = () => {};

    const handleTouch = (assignmentId: string, manaboUrl?: string) => {};

    let error: any;
    let loading: any;
    let displayAssignments: any;
    let assignmentData: any;

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="課題一覧" subButtonIcon="refresh-cw" onPressSubButton={handleRefresh} />

            {/* エラー表示 */}
            {error && (
                <View style={{ padding: 20 }}>
                    <Card style={{ backgroundColor: theme.colors.status.error + "20", padding: 16 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <Icon name="alert-triangle" size={20} color={theme.colors.status.error} />
                            <View style={{ flex: 1 }}>
                                <Typography variant="bodySmall" color={theme.colors.status.error}>
                                    エラーが発生しました
                                </Typography>
                                <Typography variant="caption" color={theme.colors.text.secondary}>
                                    {error.message}
                                </Typography>
                            </View>
                        </View>
                    </Card>
                </View>
            )}

            {/* 読み込み中 */}
            {loading && displayAssignments.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={theme.colors.primary.main} />
                    <Typography variant="body" style={{ marginTop: 16 }} color={theme.colors.text.secondary}>
                        課題を読み込み中...
                    </Typography>
                </View>
            ) : displayAssignments.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Icon name="clipboard-list" size={48} color={theme.colors.text.secondary} />
                    <Typography variant="body" style={{ marginTop: 16 }} color={theme.colors.text.secondary}>
                        課題はありません
                    </Typography>
                </View>
            ) : (
                <ScrollView
                    style={{
                        flex: 1,
                        paddingHorizontal: 20,
                    }}
                    contentContainerStyle={{
                        gap: 16,
                        paddingBottom: 24,
                    }}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} colors={[theme.colors.primary.main]} />}
                >
                    {displayAssignments.map((assignment: any) => {
                        // 元の課題データを取得してmanaboUrlを渡す
                        const originalAssignment = assignmentData?.find((a: any) => a.id === assignment.id);
                        return (
                            <AssignmentCard
                                key={assignment.id}
                                assignment={assignment}
                                handleTouch={() => handleTouch(assignment.id, originalAssignment?.manaboUrl)}
                            />
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
}
