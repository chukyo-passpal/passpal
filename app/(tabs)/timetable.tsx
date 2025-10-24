import { TimetableViewMode } from "@/src/domain/constants/timetable";
import { Weekday } from "@/src/domain/constants/week";
import timetableServiceInstance from "@/src/domain/services/timetableService";
import Header from "@/src/presentation/components/Header";
import { Icon } from "@/src/presentation/components/Icon";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useSetting from "@/src/presentation/hooks/useSetting";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";

// Date型の時間を文字列の時間に変換するヘルパー関数 Date to Timeの略。
function dt(date: Date): string {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

export default function TimetableScreen() {
    const { theme } = useTheme();

    const [selectedDay, setSelectedDay] = useState(0); // 月曜日 = 0
    const { campus, initTimetableViewMode } = useSetting();
    const [timetableViewMode, setTimetableViewMode] = useState<TimetableViewMode>(initTimetableViewMode);
    const { timetableData, loading, lastFetch, refetch } = useTimetable();

    const tService = timetableServiceInstance;
    const periodData = tService.periodData[campus];

    const displayWeekdays = useMemo(() => {
        if (!timetableData) return [];
        return tService.getShouldDisplayWeekdays(timetableData);
    }, [tService, timetableData]);

    const displayPeriods = useMemo(() => {
        if (!timetableData) return [];
        return tService.getShouldDisplayPeriods(timetableData, campus);
    }, [tService, timetableData, campus]);

    const handleChangeViewMode = () => {
        const newMode = timetableViewMode === "day" ? "week" : "day";
        setTimetableViewMode(newMode);
    };

    const handleTouchClass = (manaboCourseId: string) => {
        router.push(`/course/${manaboCourseId}`);
    };

    // 時間割の取得がされていない && 時間割が存在しない && ローディング中でない場合に取得
    React.useEffect(() => {
        if (!lastFetch && !timetableData && !loading) {
            refetch();
        }
    }, [lastFetch, timetableData, loading, refetch]);

    // ローディング中の表示
    if (loading && !timetableData) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
                <Header title="時間割" subButtonIcon="arrow-left-right" onPressSubButton={handleChangeViewMode} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={theme.colors.primary.main} />
                </View>
            </View>
        );
    }

    // データがない場合の表示
    if (!timetableData) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
                <Header title="時間割" subButtonIcon="arrow-left-right" onPressSubButton={handleChangeViewMode} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Typography variant="body" color={theme.colors.text.secondary}>
                        時間割データがありません
                    </Typography>
                </View>
            </View>
        );
    }

    const renderDayView = () => {
        const dayName = displayWeekdays[selectedDay] as Weekday;
        const daySchedule = timetableData!.timetable[dayName];

        return (
            <View style={{ flex: 1, gap: 24, paddingHorizontal: 20 }}>
                {/* 曜日選択 */}
                <View style={{ flexDirection: "row", gap: 10 }}>
                    {displayWeekdays.map((day, index) => (
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
                    {displayPeriods.map((period) => {
                        const classInfo = daySchedule?.[period];
                        const periodInfo = periodData[period];
                        const periodText = periodInfo ? `${dt(periodInfo.startTime)}~${dt(periodInfo.endTime)}` : "-";

                        return (
                            <View key={period} style={{ flexDirection: "row", gap: 16, alignItems: "center", marginBottom: 16 }}>
                                {/* 時間情報 */}
                                <View style={{ width: 80, alignItems: "center", gap: 4 }}>
                                    <Typography variant="h2" color={theme.colors.text.primary}>
                                        {period}限
                                    </Typography>
                                    <Typography variant="caption" color={theme.colors.text.secondary}>
                                        {periodText}
                                    </Typography>
                                </View>

                                {/* 授業カード */}
                                {classInfo ? (
                                    <TouchableOpacity
                                        onPress={() => handleTouchClass(classInfo.manaboCourseId)}
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
                        {displayPeriods.map((period, index) => {
                            const periodInfo = periodData[period];

                            return (
                                <View
                                    key={period}
                                    style={{
                                        flexDirection: "row",
                                        height: 105,
                                        borderBottomWidth: displayPeriods.length - 1 === index ? 0 : 1,
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
                                            {period}
                                        </Typography>
                                        {periodInfo && (
                                            <>
                                                <Typography variant="caption" color={theme.colors.text.secondary} style={{ fontSize: 8, lineHeight: 10 }}>
                                                    {dt(periodInfo.startTime)}
                                                </Typography>
                                                <Typography variant="caption" color={theme.colors.text.secondary} style={{ fontSize: 8, lineHeight: 10 }}>
                                                    ~
                                                </Typography>
                                                <Typography variant="caption" color={theme.colors.text.secondary} style={{ fontSize: 8, lineHeight: 10 }}>
                                                    {dt(periodInfo.endTime)}
                                                </Typography>
                                            </>
                                        )}
                                    </View>

                                    {/* 各曜日のセル */}
                                    {displayWeekdays.map((day, dayIndex) => {
                                        const daySchedule = timetableData!.timetable[day];
                                        const classInfo = daySchedule?.[period];

                                        return (
                                            <View
                                                key={`${day}-${period}`}
                                                style={{
                                                    flex: 1,
                                                    padding: 3,
                                                    borderRightWidth: displayWeekdays.length - 1 === dayIndex ? 0 : 1,
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
                                                        onPress={() => handleTouchClass(classInfo.manaboCourseId)}
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
                            );
                        })}
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
