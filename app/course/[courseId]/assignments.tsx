import { Card } from "@/src/presentation/components/Card";
import Header from "@/src/presentation/components/Header";
import { Icon } from "@/src/presentation/components/Icon";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useCourse from "@/src/presentation/hooks/useCourse";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, Linking, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";

export default function CourseAssignments() {
    const { theme } = useTheme();
    const { courseId } = useLocalSearchParams<{ courseId: string }>();
    const { courseData } = useCourse();
    const { loading, assignmentData, fetchClassAssignments } = useAssignment();

    // 授業情報を取得
    const courseInfo = courseData?.courses[courseId || ""];

    // この授業の課題のみを取得
    const classData = assignmentData?.classes[courseId || ""];

    // ディレクトリ内のコンテンツを配列に変換
    const assignments = useMemo(() => {
        if (!classData?.directories) return [];

        return Object.values(classData.directories).flatMap((directory) =>
            directory.contents.map((content) => ({
                ...content,
                directoryId: directory.directoryId,
                directoryName: directory.directoryName,
            }))
        );
    }, [classData]);

    // 初回読み込み
    useEffect(() => {
        if (courseId && courseInfo) {
            fetchClassAssignments(courseId);
        }
    }, [courseId, courseInfo, fetchClassAssignments]);

    // 課題を更新
    const handleRefresh = () => {
        if (courseId && courseInfo) {
            fetchClassAssignments(courseId);
        }
    };

    // MaNaBoで開く
    const handleOpenInManabo = (url?: string) => {
        if (url) {
            Linking.openURL(url);
        }
    };

    // コンテンツのタイトルを取得
    const getContentTitle = (content: (typeof assignments)[number]) => {
        if (content.type === "report") {
            return content.title;
        } else {
            return content.comment || "ファイル";
        }
    };

    // コンテンツのステータス色を取得
    const getStatusColor = (isDone: boolean) => {
        return isDone ? theme.colors.status.success : theme.colors.status.warning;
    };

    // コンテンツのステータスラベルを取得
    const getStatusLabel = (isDone: boolean) => {
        return isDone ? "完了" : "未完了";
    };

    // 課題の統計
    const stats = useMemo(() => {
        const total = assignments.length;
        const completed = assignments.filter((a) => a.isDone).length;
        const notCompleted = assignments.filter((a) => !a.isDone).length;
        const overdue = assignments.filter((a) => a.duration.deadline.end && a.duration.deadline.end < new Date() && !a.isDone).length;

        return { total, completed, notCompleted, overdue };
    }, [assignments]);

    // 授業が見つからない場合
    if (!courseInfo) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
                <Header title="課題一覧" shownBackButton />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Typography variant="body" color={theme.colors.text.secondary}>
                        授業データが見つかりません
                    </Typography>
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="課題一覧" shownBackButton />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 20, gap: 24 }}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} colors={[theme.colors.primary.main]} />}
            >
                {/* 授業情報ヘッダー */}
                <Card variant="feature" style={{ gap: 12 }}>
                    <Typography variant="h2" color={theme.colors.primary.main}>
                        {courseInfo.info.name}
                    </Typography>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                        <Icon name="user" size={16} color={theme.colors.text.secondary} />
                        <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                            {courseInfo.info.teacher}
                        </Typography>
                    </View>
                </Card>

                {/* 統計情報 */}
                <Card variant="default" style={{ gap: 16 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            課題の進捗状況
                        </Typography>
                        <Icon name="clipboard-list" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Typography variant="h2" color={theme.colors.text.primary}>
                                {stats.total}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                総数
                            </Typography>
                        </View>
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Typography variant="h2" color={theme.colors.status.success}>
                                {stats.completed}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                完了
                            </Typography>
                        </View>
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Typography variant="h2" color={theme.colors.status.warning}>
                                {stats.notCompleted}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                未完了
                            </Typography>
                        </View>
                    </View>

                    {stats.overdue > 0 && (
                        <View
                            style={{
                                padding: 12,
                                borderRadius: 8,
                                alignItems: "center",
                                backgroundColor: theme.colors.status.error + "20",
                            }}
                        >
                            <Typography variant="label" color={theme.colors.status.error}>
                                期限切れ: {stats.overdue}件
                            </Typography>
                        </View>
                    )}
                </Card>

                {/* 読み込み中 */}
                {loading && assignments?.length === 0 && (
                    <View style={{ paddingVertical: 40, alignItems: "center" }}>
                        <ActivityIndicator size="large" color={theme.colors.primary.main} />
                        <Typography variant="body" color={theme.colors.text.secondary} style={{ marginTop: 16 }}>
                            課題を読み込み中...
                        </Typography>
                    </View>
                )}

                {/* 課題一覧 */}
                {!loading && assignments?.length === 0 ? (
                    <Card variant="default">
                        <View style={{ padding: 16, alignItems: "center", gap: 12 }}>
                            <Icon name="clipboard-list" size={48} color={theme.colors.text.secondary} />
                            <Typography variant="body" color={theme.colors.text.secondary}>
                                課題はありません
                            </Typography>
                        </View>
                    </Card>
                ) : (
                    <View style={{ gap: 16 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="h3" color={theme.colors.text.primary}>
                                課題リスト
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                期限順
                            </Typography>
                        </View>

                        {assignments.map((assignment, index) => {
                            const dueDate = assignment.duration.deadline.end;
                            const isOverdue = dueDate && dueDate < new Date() && !assignment.isDone;
                            const contentTitle = getContentTitle(assignment);
                            const manaboUrl =
                                assignment.type === "report"
                                    ? assignment.actions.find((a) => a.href)?.href
                                    : assignment.type === "file"
                                    ? assignment.files[0]?.href
                                    : undefined;

                            return (
                                <Card
                                    key={`${assignment.directoryId}-${index}`}
                                    variant="default"
                                    style={{
                                        gap: 12,
                                        borderLeftWidth: 4,
                                        borderLeftColor: isOverdue ? theme.colors.status.error : theme.colors.primary.main,
                                    }}
                                >
                                    {/* タイトルとステータス */}
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Typography variant="label" color={theme.colors.text.primary}>
                                                {contentTitle}
                                            </Typography>
                                            <Typography variant="caption" color={theme.colors.text.secondary} style={{ marginTop: 4 }}>
                                                {assignment.directoryName}
                                            </Typography>
                                        </View>
                                        <View
                                            style={{
                                                paddingHorizontal: 8,
                                                paddingVertical: 4,
                                                borderRadius: 4,
                                                backgroundColor: getStatusColor(assignment.isDone) + "20",
                                            }}
                                        >
                                            <Typography variant="caption" color={getStatusColor(assignment.isDone)}>
                                                {getStatusLabel(assignment.isDone)}
                                            </Typography>
                                        </View>
                                    </View>

                                    {/* 期限 */}
                                    {dueDate && (
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                            <Icon name="calendar" size={16} color={isOverdue ? theme.colors.status.error : theme.colors.text.secondary} />
                                            <Typography variant="bodySmall" color={isOverdue ? theme.colors.status.error : theme.colors.text.secondary}>
                                                期限: {dueDate.toLocaleDateString("ja-JP")}{" "}
                                                {dueDate.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                                            </Typography>
                                            {isOverdue && (
                                                <View
                                                    style={{
                                                        paddingHorizontal: 6,
                                                        paddingVertical: 2,
                                                        borderRadius: 4,
                                                        backgroundColor: theme.colors.status.error + "20",
                                                    }}
                                                >
                                                    <Typography variant="caption" color={theme.colors.status.error}>
                                                        期限切れ
                                                    </Typography>
                                                </View>
                                            )}
                                        </View>
                                    )}

                                    {/* レポートの説明 */}
                                    {assignment.type === "report" && assignment.description && (
                                        <View style={{ gap: 4 }}>
                                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                                {assignment.description}
                                            </Typography>
                                        </View>
                                    )}

                                    {/* ファイル一覧 */}
                                    {assignment.type === "file" && assignment.files.length > 0 && (
                                        <View style={{ gap: 4 }}>
                                            {assignment.files.map((file, fileIndex) => (
                                                <View key={fileIndex} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                                    <Icon name="clipboard-list" size={14} color={theme.colors.text.secondary} />
                                                    <Typography variant="caption" color={theme.colors.text.secondary}>
                                                        {file.fileName}
                                                    </Typography>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                    {/* アクションボタン */}
                                    <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                                        {/* MaNaBoで開く */}
                                        {manaboUrl && (
                                            <TouchableOpacity
                                                onPress={() => handleOpenInManabo(manaboUrl)}
                                                style={{
                                                    flex: 1,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    paddingVertical: 8,
                                                    paddingHorizontal: 12,
                                                    borderRadius: 6,
                                                    backgroundColor: theme.colors.primary.main,
                                                    gap: 6,
                                                }}
                                            >
                                                <Icon name="arrow-left-right" size={16} color={theme.colors.background.primary} />
                                                <Typography variant="label" color={theme.colors.background.primary}>
                                                    MaNaBoで開く
                                                </Typography>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </Card>
                            );
                        })}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
