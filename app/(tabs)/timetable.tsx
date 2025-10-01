import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Typography } from "@/design-system/components/Typography";
import { Icon } from "@/design-system/components/Icon";
import { useTheme } from "@/design-system/tokens/ThemeProvider";

// 時間割データの型定義
interface ClassInfo {
    id: string;
    name: string;
    room: string;
    teacher: string;
    color: string;
}

interface Period {
    period: number;
    startTime: string;
    endTime: string;
}

// サンプルデータ
const PERIODS: Period[] = [
    { period: 1, startTime: "09:30", endTime: "11:00" },
    { period: 2, startTime: "11:10", endTime: "12:40" },
    { period: 3, startTime: "13:30", endTime: "15:00" },
    { period: 4, startTime: "15:10", endTime: "16:40" },
    { period: 5, startTime: "16:50", endTime: "18:20" },
];

const WEEKDAYS = ["月", "火", "水", "木", "金", "土"];

const SAMPLE_TIMETABLE: { [key: string]: ClassInfo | null } = {
    "月-1": { id: "1", name: "アルゴリズムとデータ構造", room: "1273", teacher: "山田 一成", color: "#A8D8EA" },
    "月-2": null,
    "月-3": null,
    "月-4": { id: "2", name: "解析学", room: "1273", teacher: "山田 一成", color: "#A8D8EA" },
    "月-5": { id: "3", name: "アルゴリズムとデータ構造", room: "1273", teacher: "山田 一成", color: "#A8D8EA" },
    "火-1": { id: "4", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "火-2": { id: "5", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "火-3": null,
    "火-4": { id: "6", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "火-5": null,
    "水-1": { id: "7", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "水-2": { id: "8", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "水-3": null,
    "水-4": null,
    "水-5": null,
    "木-1": null,
    "木-2": null,
    "木-3": { id: "9", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "木-4": null,
    "木-5": null,
    "金-1": null,
    "金-2": { id: "10", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "金-3": null,
    "金-4": null,
    "金-5": { id: "11", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "土-1": { id: "12", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "土-2": null,
    "土-3": null,
    "土-4": { id: "13", name: "コンピュータネットワーク", room: "1425", teacher: "佐藤 健", color: "#A8D8EA" },
    "土-5": null,
};

export default function TimetableScreen() {
    const theme = useTheme();
    const [viewMode, setViewMode] = useState<"day" | "week">("week");
    const [selectedDay, setSelectedDay] = useState(0); // 月曜日 = 0

    const handleRefresh = () => {
        // リフレッシュ機能の実装
        console.log("Refreshing timetable...");
    };

    const renderDayView = () => {
        const dayName = WEEKDAYS[selectedDay];

        return (
            <View style={styles.dayViewContainer}>
                {/* 曜日選択 */}
                <View style={styles.weekdaySelector}>
                    {WEEKDAYS.map((day, index) => (
                        <TouchableOpacity
                            key={day}
                            style={[
                                styles.weekdayButton,
                                {
                                    backgroundColor: index === selectedDay ? theme.colors.primary.main : theme.colors.neutral.gray200,
                                },
                            ]}
                            onPress={() => setSelectedDay(index)}
                        >
                            <Typography variant="h3" color={index === selectedDay ? theme.colors.text.inverse : theme.colors.text.secondary}>
                                {day}
                            </Typography>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 授業一覧 */}
                <ScrollView style={styles.scheduleList} showsVerticalScrollIndicator={false}>
                    {PERIODS.map((period) => {
                        const classKey = `${dayName}-${period.period}`;
                        const classInfo = SAMPLE_TIMETABLE[classKey];

                        return (
                            <View key={period.period} style={styles.periodRow}>
                                {/* 時間情報 */}
                                <View style={styles.timeInfo}>
                                    <Typography variant="h2" color={theme.colors.text.primary}>
                                        {period.period}限
                                    </Typography>
                                    <Typography variant="caption" color={theme.colors.text.secondary}>
                                        {period.startTime}~{period.endTime}
                                    </Typography>
                                </View>

                                {/* 授業カード */}
                                {classInfo ? (
                                    <Pressable style={[styles.classCard, { backgroundColor: classInfo.color }]}>
                                        <View style={styles.classInfo}>
                                            <Typography variant="body" style={styles.className} color={theme.colors.text.inverse}>
                                                {classInfo.name}
                                            </Typography>
                                            <Typography variant="caption" color={theme.colors.text.inverse}>
                                                {classInfo.room} {classInfo.teacher}
                                            </Typography>
                                        </View>
                                        <Icon name="chevron-right" size={16} color={theme.colors.text.inverse} />
                                    </Pressable>
                                ) : (
                                    <View style={[styles.classCard, styles.noClass]}>
                                        <Typography variant="body" color={theme.colors.text.placeholder}>
                                            授業がありません
                                        </Typography>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    };

    const renderWeekView = () => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekViewContainer}>
                <View style={styles.timetableGrid}>
                    {/* ヘッダー行 */}
                    <View style={styles.headerRow}>
                        <View style={styles.timeHeader} />
                        {WEEKDAYS.map((day) => (
                            <View key={day} style={styles.dayHeader}>
                                <Typography variant="body" color={theme.colors.text.primary}>
                                    {day}
                                </Typography>
                            </View>
                        ))}
                    </View>

                    {/* 時間割グリッド */}
                    {PERIODS.map((period) => (
                        <View key={period.period} style={styles.gridRow}>
                            {/* 時間列 */}
                            <View style={styles.timeCell}>
                                <Typography variant="h3" color={theme.colors.text.primary}>
                                    {period.period}
                                </Typography>
                                <Typography variant="caption" color={theme.colors.text.secondary} style={styles.timeCellText}>
                                    {period.startTime}
                                </Typography>
                                <Typography variant="caption" color={theme.colors.text.secondary} style={styles.timeCellText}>
                                    ~
                                </Typography>
                                <Typography variant="caption" color={theme.colors.text.secondary} style={styles.timeCellText}>
                                    {period.endTime}
                                </Typography>
                            </View>

                            {/* 各曜日のセル */}
                            {WEEKDAYS.map((day) => {
                                const classKey = `${day}-${period.period}`;
                                const classInfo = SAMPLE_TIMETABLE[classKey];

                                return (
                                    <View key={`${day}-${period.period}`} style={styles.gridCell}>
                                        {classInfo ? (
                                            <View style={[styles.miniClassCard, { backgroundColor: classInfo.color }]}>
                                                <View style={styles.miniClassName}>
                                                    <Typography variant="caption" color={theme.colors.text.inverse} style={styles.miniClassText}>
                                                        {classInfo.name}
                                                    </Typography>
                                                </View>
                                                <View style={styles.roomBadge}>
                                                    <Typography variant="caption" color={theme.colors.text.primary}>
                                                        {classInfo.room}
                                                    </Typography>
                                                </View>
                                            </View>
                                        ) : null}
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            {/* ヘッダー */}
            <View style={styles.header}>
                <Typography variant="h1" color={theme.colors.primary.main}>
                    時間割
                </Typography>
                <TouchableOpacity style={[styles.refreshButton, { borderColor: theme.colors.border.default }]} onPress={handleRefresh}>
                    <Icon name="clock" size={20} color={theme.colors.text.secondary} />
                </TouchableOpacity>
            </View>

            {/* コンテンツ */}
            <View style={styles.content}>
                {/* ビュー切り替えボタン */}
                <View style={styles.viewToggle}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            {
                                backgroundColor: viewMode === "day" ? theme.colors.primary.main : theme.colors.neutral.gray200,
                            },
                        ]}
                        onPress={() => setViewMode("day")}
                    >
                        <Typography variant="h3" color={viewMode === "day" ? theme.colors.text.inverse : theme.colors.text.secondary}>
                            1日
                        </Typography>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            {
                                backgroundColor: viewMode === "week" ? theme.colors.primary.main : theme.colors.neutral.gray200,
                            },
                        ]}
                        onPress={() => setViewMode("week")}
                    >
                        <Typography variant="h3" color={viewMode === "week" ? theme.colors.text.inverse : theme.colors.text.secondary}>
                            1週間
                        </Typography>
                    </TouchableOpacity>
                </View>

                {/* ビューの表示 */}
                {viewMode === "day" ? renderDayView() : renderWeekView()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 48,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    refreshButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F8F9FA",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        gap: 24,
        paddingHorizontal: 20,
    },
    viewToggle: {
        flexDirection: "row",
        gap: 10,
    },
    toggleButton: {
        flex: 1,
        height: 40,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    },
    // Day View Styles
    dayViewContainer: {
        flex: 1,
        gap: 24,
    },
    weekdaySelector: {
        flexDirection: "row",
        gap: 10,
    },
    weekdayButton: {
        flex: 1,
        height: 40,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    },
    scheduleList: {
        flex: 1,
    },
    periodRow: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        marginBottom: 16,
    },
    timeInfo: {
        width: 80,
        alignItems: "center",
        gap: 4,
    },
    classCard: {
        flex: 1,
        height: 80,
        borderRadius: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    classInfo: {
        flex: 1,
        gap: 4,
    },
    className: {
        fontWeight: "600",
    },
    noClass: {
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
    },
    // Week View Styles
    weekViewContainer: {
        flex: 1,
    },
    timetableGrid: {
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        minHeight: 450,
    },
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#F9FAFB",
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        height: 35,
    },
    timeHeader: {
        width: 24,
        borderRightWidth: 1,
        borderRightColor: "#E8E8E8",
    },
    dayHeader: {
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#E8E8E8",
    },
    gridRow: {
        flexDirection: "row",
        height: 105,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
    },
    timeCell: {
        width: 24,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: "#E8E8E8",
    },
    timeCellText: {
        fontSize: 8,
        lineHeight: 10,
    },
    gridCell: {
        width: 80,
        padding: 3,
        borderRightWidth: 1,
        borderRightColor: "#E8E8E8",
    },
    miniClassCard: {
        flex: 1,
        borderRadius: 6,
        padding: 2,
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    miniClassName: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
    miniClassText: {
        fontSize: 10,
        lineHeight: 12,
        textAlign: "center",
    },
    roomBadge: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        alignItems: "center",
    },
});
