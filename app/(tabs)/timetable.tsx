import Header from "@/components/Header";
import { Period } from "@/constants/period";
import { WEEKDAYS, Weekday } from "@/constants/week";
import { Icon } from "@/design-system/components/Icon";
import { Typography } from "@/design-system/components/Typography";
import { useTheme } from "@/design-system/tokens/ThemeProvider";
import useTimetable from "@/features/timetable/hooks/useTimetable";
import useSetting from "@/hooks/useSetting";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";

// 時間割の時限情報（表示用）
interface PeriodDisplayInfo {
    period: Period;
    startTime: string;
    endTime: string;
}

const DISPLAY_PERIODS_TOYOTA: PeriodDisplayInfo[] = [
    { period: "1", startTime: "09:30", endTime: "11:00" },
    { period: "2", startTime: "11:10", endTime: "12:40" },
    { period: "3", startTime: "13:30", endTime: "15:00" },
    { period: "4", startTime: "15:10", endTime: "16:40" },
    { period: "5", startTime: "16:50", endTime: "18:20" },
];

const DISPLAY_PERIODS_NAGOYA: PeriodDisplayInfo[] = [
    { period: "1", startTime: "09:00", endTime: "10:30" },
    { period: "2", startTime: "10:45", endTime: "12:15" },
    { period: "3", startTime: "13:10", endTime: "14:40" },
    { period: "4", startTime: "14:55", endTime: "16:25" },
    { period: "5", startTime: "16:40", endTime: "18:10" },

    { period: "A", startTime: "09:00", endTime: "10:00" },
    { period: "B", startTime: "10:10", endTime: "11:10" },
    { period: "C", startTime: "11:20", endTime: "12:20" },
];

export default function TimetableScreen() {
    const { theme } = useTheme();
    const { timetableViewMode, setTimetableViewMode, campus } = useSetting();
    const { timetable, loading } = useTimetable();

    const [selectedDay, setSelectedDay] = useState(0); // 月曜日 = 0

    let displayPeriods;
    switch (campus) {
        case "nagoya":
            displayPeriods = DISPLAY_PERIODS_NAGOYA;
            break;
        case "toyota":
            displayPeriods = DISPLAY_PERIODS_TOYOTA;
            break;
        default:
            displayPeriods = DISPLAY_PERIODS_NAGOYA;
    }

    // 土曜日の授業があるかチェック
    const hasSaturdayClasses = useMemo(() => {
        if (!timetable) return false;
        const saturdaySchedule = timetable.timetable["土"];
        if (!saturdaySchedule) return false;

        return displayPeriods.some((period) => {
            return saturdaySchedule[period.period] !== null;
        });
    }, [displayPeriods, timetable]);

    // 表示する曜日を決定（日曜日は除外）
    const displayWeekdays = useMemo(() => {
        const weekdaysWithoutSunday = WEEKDAYS.filter((day) => day !== "日");
        return hasSaturdayClasses ? weekdaysWithoutSunday : weekdaysWithoutSunday.filter((day) => day !== "土");
    }, [hasSaturdayClasses]);

    const handleChangeViewMode = () => {
        const newMode = timetableViewMode === "day" ? "week" : "day";
        setTimetableViewMode(newMode);
    };

    const handleTouchClass = (manaboCourseId: string) => {
        router.push(`/course/${manaboCourseId}`);
    };

    // ローディング中の表示
    if (loading && !timetable) {
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
    if (!timetable) {
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
        const daySchedule = timetable!.timetable[dayName];

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
                        const classInfo = daySchedule?.[period.period];

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
                        {displayPeriods.map((period, index) => (
                            <View
                                key={period.period}
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
                                {displayWeekdays.map((day, dayIndex) => {
                                    const daySchedule = timetable!.timetable[day as Weekday];
                                    const classInfo = daySchedule?.[period.period];

                                    return (
                                        <View
                                            key={`${day}-${period.period}`}
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
