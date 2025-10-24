import { AssignmentStatus } from "@/src/domain/constants/assignment";
import assignmentServiceInstance from "@/src/domain/services/assignmentService";
import { Button } from "@/src/presentation/components/Button";
import { Card } from "@/src/presentation/components/Card";
import Header from "@/src/presentation/components/Header";
import { Icon } from "@/src/presentation/components/Icon";
import { Select } from "@/src/presentation/components/Select";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import React from "react";
import { ActivityIndicator, Linking, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";

// 課題の型定義
type Assignment = {
    classId: string;
    directoryId: string;
    contentId: string;

    title: string;
    subtitle: string;
    status: AssignmentStatus;
    publishDate?: Date;
    dueDate?: Date;
};

type FilterType = "all" | "not-started" | "completed" | "expired";

export default function Assignments() {
    const { theme } = useTheme();
    const { timetableData } = useTimetable();
    const { assignmentData, loading, fetchAllClassAssignments } = useAssignment();
    const [filter, setFilter] = React.useState<FilterType>("not-started");

    const handleRefresh = () => {
        if (loading) return;
        if (!timetableData) return;
        fetchAllClassAssignments(timetableData);
    };

    const handleTouch = (classId: string, directoryId: string, contentId: string) => {
        const url = `https://manabo.cnc.chukyo-u.ac.jp/class/${classId}/`;
        Linking.openURL(url);
    };

    let flattedAssignments: Assignment[] = [];
    for (const cls in assignmentData?.classes) {
        const clsData = assignmentData.classes[cls];
        for (const dir in clsData.directories) {
            const dirData = clsData.directories[dir];

            dirData.contents
                .filter((e) => e.type === "report")
                .forEach((cont) => {
                    flattedAssignments.push({
                        classId: clsData.classId,
                        directoryId: dirData.directoryId,
                        contentId: cont.contentId,

                        title: cont.title,
                        subtitle: `${clsData.className} - ${dirData.directoryName}`,
                        status: assignmentServiceInstance.getStatus(cont),
                        publishDate: cont.duration.publish.end,
                        dueDate: cont.duration.deadline.end,
                    });
                });
        }
    }

    // ソート処理（締切日時 ?? 公開日時で昇順）
    flattedAssignments.sort((a, b) => {
        const dateA = a.dueDate ?? a.publishDate;
        const dateB = b.dueDate ?? b.publishDate;

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateA.getTime() - dateB.getTime();
    });

    // フィルタリング処理
    const filteredAssignments = flattedAssignments.filter((assignment) => {
        if (filter === "all") return true;
        return assignment.status === filter;
    });

    const getFilterLabel = (filterType: FilterType): string => {
        switch (filterType) {
            case "all":
                return "すべて";
            case "not-started":
                return "未着手";
            case "completed":
                return "完了";
            case "expired":
                return "期限切れ";
        }
    };

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
            ) : filteredAssignments.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Icon name="clipboard-list" size={48} color={theme.colors.text.secondary} />
                    <Typography variant="body" style={{ marginTop: 16 }} color={theme.colors.text.secondary}>
                        {filter === "all" ? "課題はありません" : `${getFilterLabel(filter)}の課題はありません`}
                    </Typography>
                    <Button variant="text" style={{ marginTop: 16 }} onPress={handleRefresh}>
                        更新する
                    </Button>
                </View>
            ) : (
                <View style={{ flex: 1, gap: 16 }}>
                    {/* フィルターボタン */}
                    <View style={{ paddingHorizontal: 20, alignItems: "flex-end" }}>
                        <Select
                            value={filter}
                            onValueChange={(value) => setFilter(value as FilterType)}
                            items={[
                                { label: "未着手", value: "not-started" },
                                { label: "完了", value: "completed" },
                                { label: "期限切れ", value: "expired" },
                                { label: "すべて", value: "all" },
                            ]}
                        />
                    </View>

                    <ScrollView
                        style={{ paddingHorizontal: 20 }}
                        contentContainerStyle={{
                            gap: 16,
                            paddingBottom: 24,
                        }}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} colors={[theme.colors.primary.main]} />}
                    >
                        {filteredAssignments?.map((a) => {
                            // 元の課題データを取得してmanaboUrlを渡す
                            return (
                                <AssignmentCard
                                    key={`${a.classId},${a.directoryId}${a.title}`}
                                    assignment={a}
                                    handleTouch={() => handleTouch(a.classId, a.directoryId, a.contentId)}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

// 課題カードコンポーネント
function AssignmentCard({ assignment, handleTouch }: { assignment: Assignment; handleTouch: () => void }) {
    const { theme } = useTheme();

    const formatDate = (date?: Date): string => {
        if (!date) return "無し";
        const year = date.getFullYear();
        const nowYear = new Date().getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        if (year !== nowYear) {
            return `${year}年${month}月${day}日 ${hours}:${minutes}`;
        }
        return `${month}月${day}日 ${hours}:${minutes}`;
    };

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
                            backgroundColor: assignmentServiceInstance.getStatusBGColor(assignment.status, theme),
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 16,
                        }}
                    >
                        <Typography variant="caption" color={assignmentServiceInstance.getStatusColor(assignment.status, theme)}>
                            {assignmentServiceInstance.getStatusLabel(assignment.status)}
                        </Typography>
                    </View>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: theme.colors.border.default }} />

                {/* Time Info */}
                <View style={{ flexDirection: "row", gap: 24 }}>
                    <View style={{ flex: 1, gap: 4 }}>
                        <Typography variant="caption" color={theme.colors.text.secondary}>
                            公開期限
                        </Typography>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Icon name="calendar" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="body" style={{ fontSize: 16 }}>
                                {formatDate(assignment.publishDate)}
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
                                {formatDate(assignment.dueDate)}
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
                    <View>
                        <Typography variant="body" style={{ fontSize: 16 }}>
                            Manaboで開く
                        </Typography>
                    </View>
                    <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                </View>
            </Card>
        </TouchableOpacity>
    );
}
