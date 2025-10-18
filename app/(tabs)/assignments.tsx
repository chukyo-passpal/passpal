import Header from "@/components/Header";
import { BodySmall, BodyText, Caption, Card, Heading3, Icon, useTheme } from "@/design-system";
import useAssignment from "@/features/assignment/hooks/useAssignment";
import { sortAssignmentsByDueDate } from "@/features/assignment/mappers/assignmentMapper";
import useCourse from "@/features/course/hooks/useCourse";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, Linking, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";

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
    const { courseData } = useCourse();
    const { assignmentData, loading, error, fetchMultipleClassAssignments, clearError } = useAssignment();

    // 全授業の課題を取得
    useEffect(() => {
        if (courseData && courseData.courses) {
            const courses = Object.entries(courseData.courses).map(([classId, courseInfo]) => ({
                classId,
                courseName: courseInfo.info.name,
            }));

            if (courses.length > 0) {
                fetchMultipleClassAssignments(courses, courseData.semester);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseData]);

    // 課題をソートして表示用に変換
    const displayAssignments: Assignment[] = useMemo(() => {
        if (!assignmentData) return [];

        const sorted = sortAssignmentsByDueDate(assignmentData);

        return sorted.map((assignment) => {
            const isOverdue = assignment.dueDate && assignment.dueDate < new Date() && assignment.status !== "completed";

            // ステータスの色とラベル
            let statusLabel = "未開始";
            let statusColor = theme.colors.text.secondary;
            let statusBgColor = theme.colors.text.secondary + "20";

            if (assignment.status === "completed") {
                statusLabel = "完了";
                statusColor = theme.colors.status.success;
                statusBgColor = theme.colors.status.success + "20";
            } else if (assignment.status === "in-progress") {
                statusLabel = "進行中";
                statusColor = theme.colors.primary.main;
                statusBgColor = theme.colors.primary.light;
            } else if (isOverdue) {
                statusLabel = "期限切れ";
                statusColor = theme.colors.status.error;
                statusBgColor = theme.colors.status.error + "20";
            } else if (assignment.status === "not-started") {
                statusLabel = "未開始";
                statusColor = theme.colors.text.secondary;
                statusBgColor = theme.colors.text.secondary + "20";
            }

            // アクションアイコンとラベル
            let actionIcon = "flag";
            let actionLabel = "優先度なし";
            let actionColor = theme.colors.text.secondary;

            if (isOverdue && assignment.status !== "completed") {
                actionIcon = "alert-triangle";
                actionLabel = "期限切れ";
                actionColor = theme.colors.status.error;
            } else if (assignment.priority === "high") {
                actionIcon = "flag";
                actionLabel = "高優先度";
                actionColor = theme.colors.status.error;
            } else if (assignment.priority === "medium") {
                actionIcon = "flag";
                actionLabel = "中優先度";
                actionColor = theme.colors.status.warning;
            } else if (assignment.priority === "low") {
                actionIcon = "flag";
                actionLabel = "低優先度";
                actionColor = theme.colors.status.info;
            } else if (assignment.status === "completed") {
                actionIcon = "check-circle";
                actionLabel = "提出済み";
                actionColor = theme.colors.status.success;
            }

            return {
                id: assignment.id,
                title: assignment.courseName,
                subtitle: assignment.title,
                status: assignment.status as "in-progress" | "completed" | "upcoming",
                startDate: assignment.startDate.toLocaleDateString("ja-JP", {
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                dueDate: assignment.dueDate
                    ? assignment.dueDate.toLocaleDateString("ja-JP", {
                          month: "long",
                          day: "numeric",
                          weekday: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                    : "期限なし",
                priority: assignment.priority,
                statusLabel,
                statusColor,
                statusBgColor,
                actionIcon,
                actionLabel,
                actionColor,
            };
        });
    }, [assignmentData, theme]);

    const handleRefresh = () => {
        if (courseData && courseData.courses) {
            clearError();
            const courses = Object.entries(courseData.courses).map(([classId, courseInfo]) => ({
                classId,
                courseName: courseInfo.info.name,
            }));

            if (courses.length > 0) {
                fetchMultipleClassAssignments(courses, courseData.semester);
            }
        }
    };

    const handleTouch = (assignmentId: string, manaboUrl?: string) => {
        if (manaboUrl) {
            Linking.openURL(manaboUrl);
        }
    };

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
                                <BodySmall color={theme.colors.status.error}>エラーが発生しました</BodySmall>
                                <Caption color={theme.colors.text.secondary}>{error.message}</Caption>
                            </View>
                        </View>
                    </Card>
                </View>
            )}

            {/* 読み込み中 */}
            {loading && displayAssignments.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={theme.colors.primary.main} />
                    <BodyText style={{ marginTop: 16 }} color={theme.colors.text.secondary}>
                        課題を読み込み中...
                    </BodyText>
                </View>
            ) : displayAssignments.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Icon name="clipboard-list" size={48} color={theme.colors.text.secondary} />
                    <BodyText style={{ marginTop: 16 }} color={theme.colors.text.secondary}>
                        課題はありません
                    </BodyText>
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
                    {displayAssignments.map((assignment) => {
                        // 元の課題データを取得してmanaboUrlを渡す
                        const originalAssignment = assignmentData?.find((a) => a.id === assignment.id);
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
