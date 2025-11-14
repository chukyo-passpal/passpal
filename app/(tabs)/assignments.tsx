import React from "react";
import { Linking, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";

import assignmentServiceInstance, {
    AssignmentFilter,
    AssignmentOverviewItem,
} from "@/src/domain/services/assignmentService";
import { Button } from "@/src/presentation/components/Button";
import { Card } from "@/src/presentation/components/Card";
import Header from "@/src/presentation/components/Header";
import { Icon } from "@/src/presentation/components/Icon";
import { LoadingScreen } from "@/src/presentation/components/LoadingScreen";
import { Select } from "@/src/presentation/components/Select";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import { formatReadableDate } from "@/src/utils/date";
import { getManaboClassUrl } from "@/src/utils/urls";

export default function Assignments() {
    const { theme } = useTheme();
    const { timetableData } = useTimetable();
    const { assignmentData, loading, fetchAllClassAssignments } = useAssignment();
    const [filter, setFilter] = React.useState<AssignmentFilter>("not-started");

    const handleRefresh = () => {
        if (loading) return;
        if (!timetableData) return;
        fetchAllClassAssignments(timetableData);
    };

    const handleTouch = (classId: string, directoryId: string, contentId: string) => {
        const url = getManaboClassUrl(classId);
        Linking.openURL(url);
    };

    const flattenedAssignments = React.useMemo(
        () => assignmentServiceInstance.buildAssignmentOverview(assignmentData),
        [assignmentData]
    );
    const filteredAssignments = React.useMemo(
        () => assignmentServiceInstance.filterAssignmentOverview(flattenedAssignments, filter),
        [flattenedAssignments, filter]
    );

    const hasLoadedAssignments = flattenedAssignments.length > 0;

    if (loading && !hasLoadedAssignments) {
        return <LoadingScreen message="課題を読み込んでいます" helperText="最新の課題情報を取得しています" />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="課題一覧" subButtonIcon="refresh-cw" onPressSubButton={handleRefresh} />

            {filteredAssignments.length === 0 ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                    }}
                >
                    <Icon name="clipboard-list" size={48} color={theme.colors.text.secondary} />
                    <Typography variant="body" style={{ marginTop: 16 }} color={theme.colors.text.secondary}>
                        {filter === "all"
                            ? "課題はありません"
                            : `${assignmentServiceInstance.getAssignmentFilterLabel(filter)}の課題はありません`}
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
                            onValueChange={(value) => setFilter(value as AssignmentFilter)}
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
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={handleRefresh}
                                colors={[theme.colors.primary.main]}
                            />
                        }
                    >
                        {filteredAssignments?.map((a) => (
                            <AssignmentCard
                                key={`${a.classId},${a.directoryId}${a.title}`}
                                assignment={a}
                                handleTouch={() => handleTouch(a.classId, a.directoryId, a.contentId)}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

// 課題カードコンポーネント
function AssignmentCard({ assignment, handleTouch }: { assignment: AssignmentOverviewItem; handleTouch: () => void }) {
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
                            backgroundColor: assignmentServiceInstance.getStatusBGColor(assignment.status, theme),
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 16,
                        }}
                    >
                        <Typography
                            variant="caption"
                            color={assignmentServiceInstance.getStatusColor(assignment.status, theme)}
                        >
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
                                {formatReadableDate(assignment.publishDate)}
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
                                {formatReadableDate(assignment.dueDate)}
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
