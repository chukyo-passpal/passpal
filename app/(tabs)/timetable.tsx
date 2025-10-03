import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Typography } from "@/design-system/components/Typography";
import { Icon } from "@/design-system/components/Icon";
import { useTheme } from "@/design-system/tokens/ThemeProvider";
import Header from "@/components/Header";
import useSetting from "@/hooks/useSetting";

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
    const { theme } = useTheme();
    const { timetableViewMode, setTimetableViewMode } = useSetting();

    const [selectedDay, setSelectedDay] = useState(0); // 月曜日 = 0

    const handleChangeViewMode = () => {
        const newMode = timetableViewMode === "day" ? "week" : "day";
        setTimetableViewMode(newMode);
    };

    const handleTouchClass = (classId: string) => {
        // ここに授業をタッチした時のロジックを実装
    };

    const renderDayView = () => {
        const dayName = WEEKDAYS[selectedDay];

        return (
            <View style={{ flex: 1, gap: 24, paddingHorizontal: 20 }}>
                {/* 曜日選択 */}
                <View style={{ flexDirection: "row", gap: 10 }}>
                    {WEEKDAYS.map((day, index) => (
                        <TouchableOpacity
                            key={day}
                            style={{
                                flex: 1,
                                height: 40,
                                borderRadius: 28,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: index === selectedDay ? theme.colors.primary.main : theme.colors.background.disabled,
                            }}
                            onPress={() => setSelectedDay(index)}
                        >
                            <Typography variant="h3" color={index === selectedDay ? theme.colors.text.inverse : theme.colors.text.secondary}>
                                {day}
                            </Typography>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 授業一覧 */}
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    {PERIODS.map((period) => {
                        const classKey = `${dayName}-${period.period}`;
                        const classInfo = SAMPLE_TIMETABLE[classKey];

                        return (
                            <View key={period.period} style={{ flexDirection: "row", gap: 16, alignItems: "center", marginBottom: 16 }}>
                                {/* 時間情報 */}
                                <View style={{ width: 80, alignItems: "center", gap: 4 }}>
                                    <Typography variant="h2" color={theme.colors.text.primary}>
                                        {period.period}限
                                    </Typography>
                                    <Typography variant="caption" color={theme.colors.text.secondary}>
                                        {period.startTime}~{period.endTime}
                                    </Typography>
                                </View>

                                {/* 授業カード */}
                                {classInfo ? (
                                    <TouchableOpacity
                                        onPress={() => handleTouchClass(classInfo.id)}
                                        activeOpacity={0.8}
                                        style={{
                                            flex: 1,
                                            height: 80,
                                            borderRadius: 12,
                                            paddingHorizontal: 16,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            backgroundColor: theme.colors.ui.classCard,
                                        }}
                                    >
                                        <View style={{ flex: 1, gap: 4 }}>
                                            <Typography variant="body" style={{ fontWeight: "600" }} color={theme.colors.text.inverse}>
                                                {classInfo.name}
                                            </Typography>
                                            <Typography variant="caption" color={theme.colors.text.inverse}>
                                                {classInfo.room} {classInfo.teacher}
                                            </Typography>
                                        </View>
                                        <Icon name="chevron-right" size={16} color={theme.colors.text.inverse} />
                                    </TouchableOpacity>
                                ) : (
                                    <View
                                        style={{
                                            flex: 1,
                                            height: 80,
                                            borderRadius: 12,
                                            paddingHorizontal: 16,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            backgroundColor: theme.colors.background.disabled,
                                        }}
                                    >
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
        // 土曜日の授業が全てnullかチェック
        const hasSaturdayClasses = PERIODS.some((period) => {
            const classKey = `土-${period.period}`;
            return SAMPLE_TIMETABLE[classKey] !== null;
        });

        // 表示する曜日を決定
        const displayWeekdays = hasSaturdayClasses ? WEEKDAYS : WEEKDAYS.filter((day) => day !== "土");

        return (
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: theme.colors.border.default,
                            borderRadius: 8,
                            width: "100%",
                            overflow: "hidden",
                        }}
                    >
                        {/* ヘッダー行 */}
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: theme.colors.background.disabled,
                                borderBottomWidth: 1,
                                borderBottomColor: theme.colors.border.default,
                                height: 35,
                            }}
                        >
                            <View style={{ flex: 1, minWidth: 25, maxWidth: 25, borderRightWidth: 1, borderRightColor: theme.colors.border.default }} />
                            {displayWeekdays.map((day, index) => (
                                <View
                                    key={day}
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRightWidth: displayWeekdays.length - 1 === index ? 0 : 1,
                                        borderRightColor: theme.colors.border.default,
                                    }}
                                >
                                    <Typography variant="body" color={theme.colors.text.primary}>
                                        {day}
                                    </Typography>
                                </View>
                            ))}
                        </View>

                        {/* 時間割グリッド */}

                        {PERIODS.map((period, index) => (
                            <View
                                key={period.period}
                                style={{
                                    flexDirection: "row",
                                    height: 105,
                                    borderBottomWidth: PERIODS.length - 1 === index ? 0 : 1,
                                    borderBottomColor: theme.colors.border.default,
                                }}
                            >
                                {/* 時間列 */}
                                <View
                                    style={{
                                        flex: 1,
                                        minWidth: 25,
                                        maxWidth: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRightWidth: 1,
                                        borderRightColor: theme.colors.border.default,
                                    }}
                                >
                                    <Typography variant="h3" color={theme.colors.text.primary}>
                                        {period.period}
                                    </Typography>
                                    <Typography variant="caption" color={theme.colors.text.secondary} style={{ fontSize: 8, lineHeight: 10 }}>
                                        {period.startTime}
                                    </Typography>
                                    <Typography variant="caption" color={theme.colors.text.secondary} style={{ fontSize: 8, lineHeight: 10 }}>
                                        ~
                                    </Typography>
                                    <Typography variant="caption" color={theme.colors.text.secondary} style={{ fontSize: 8, lineHeight: 10 }}>
                                        {period.endTime}
                                    </Typography>
                                </View>

                                {/* 各曜日のセル */}
                                {displayWeekdays.map((day, index) => {
                                    const classKey = `${day}-${period.period}`;
                                    const classInfo = SAMPLE_TIMETABLE[classKey];

                                    return (
                                        <View
                                            key={`${day}-${period.period}`}
                                            style={{
                                                flex: 1,
                                                padding: 3,
                                                borderRightWidth: displayWeekdays.length - 1 === index ? 0 : 1,
                                                borderRightColor: theme.colors.border.default,
                                            }}
                                        >
                                            {classInfo ? (
                                                <TouchableOpacity
                                                    style={{
                                                        flex: 1,
                                                        borderRadius: 6,
                                                        padding: 2,
                                                        gap: 4,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor: theme.colors.ui.classCard,
                                                    }}
                                                    activeOpacity={0.8}
                                                    onPress={() => handleTouchClass(classInfo.id)}
                                                >
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            width: "100%",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            color={theme.colors.text.inverse}
                                                            style={{ fontSize: 10, lineHeight: 12, textAlign: "center" }}
                                                        >
                                                            {classInfo.name}
                                                        </Typography>
                                                    </View>
                                                    <View
                                                        style={{
                                                            width: "100%",
                                                            backgroundColor: theme.colors.background.primary,
                                                            paddingVertical: 1,
                                                            borderRadius: 5,
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Typography variant="caption" color={theme.colors.text.primary}>
                                                            {classInfo.room}
                                                        </Typography>
                                                    </View>
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            {/* ヘッダー */}
            <Header title="時間割" subButtonIcon="arrow-left-right" onPressSubButton={handleChangeViewMode} />

            {/* コンテンツ */}
            <View style={{ flex: 1 }}>
                {/* ビューの表示 */}
                {timetableViewMode === "day" ? renderDayView() : renderWeekView()}
            </View>
        </View>
    );
}
