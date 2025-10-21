import { AssignmentInfo } from "@/src/domain/models/assignment";
import { Card } from "@/src/presentation/components/Card";
import Header from "@/src/presentation/components/Header";
import { Icon } from "@/src/presentation/components/Icon";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useTimetable from "@/src/presentation/hooks/useTimetable";
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
    actionLabel: string;
    actionColor: string;
};

export default function Assignments() {
    const { theme } = useTheme();
    const { timetableData } = useTimetable();
    const { assignmentData, loading, fetchAllClassAssignments } = useAssignment();

    const flattedAssignments: AssignmentInfo[] = assignmentData ? Object.values(assignmentData).flat() : [];

    const handleRefresh = () => {
        if (!timetableData) return;
        fetchAllClassAssignments(timetableData);
    };

    const handleTouch = (assignmentId: string, manaboUrl?: string) => {};

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="課題一覧" subButtonIcon="refresh-cw" onPressSubButton={handleRefresh} />

            {/* 読み込み中 */}
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={theme.colors.primary.main} />
                    <Typography variant="body" style={{ marginTop: 16 }} color={theme.colors.text.secondary}>
                        課題を読み込み中...
                    </Typography>
                </View>
            ) : flattedAssignments.length === 0 ? (
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
                    {flattedAssignments?.map((assignment: any) => {
                        // 元の課題データを取得してmanaboUrlを渡す
                        return (
                            <AssignmentCard key={assignment.id} assignment={assignment} handleTouch={() => handleTouch(assignment.id, assignment.manaboUrl)} />
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
}

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
                        <Icon name="calendar" size={16} color={assignment.actionColor} />
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
