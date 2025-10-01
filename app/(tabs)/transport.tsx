import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Typography } from "@/design-system/components/Typography";
import { Icon } from "@/design-system/components/Icon";
import { useTheme } from "@/design-system/tokens/ThemeProvider";

type TransportMode = "bus" | "train";
type Direction = "to-campus" | "from-campus";

interface RouteInfo {
    name: string;
    from: string;
    to: string;
    icon: "bus" | "train" | "map-pin";
}

interface Schedule {
    departure: string;
    arrival: string;
    via?: string;
}

export default function TransportScreen() {
    const theme = useTheme();
    const [mode, setMode] = useState<TransportMode>("bus");
    const [direction, setDirection] = useState<Direction>("from-campus");
    const [countdown] = useState("03:09");

    // Mock data - would come from API in production
    const busRoute: Record<Direction, RouteInfo> = {
        "to-campus": {
            name: "スクールバス(豊田キャンパス)",
            from: "浄水駅",
            to: "豊田キャンパス",
            icon: "map-pin",
        },
        "from-campus": {
            name: "スクールバス(豊田キャンパス)",
            from: "豊田キャンパス",
            to: "浄水駅",
            icon: "map-pin",
        },
    };

    const trainRoute: Record<Direction, RouteInfo> = {
        "to-campus": {
            name: "名鉄豊田線",
            from: "浄水駅",
            to: "知立方面",
            icon: "train",
        },
        "from-campus": {
            name: "名鉄豊田線",
            from: "浄水駅",
            to: "知立方面",
            icon: "train",
        },
    };

    const busSchedule: Schedule[] = [
        { departure: "12:15", arrival: "12:30", via: "貝津経由" },
        { departure: "12:45", arrival: "13:00" },
        { departure: "13:15", arrival: "13:30" },
        { departure: "13:15", arrival: "13:30" },
    ];

    const trainSchedule: Schedule[] = [
        { departure: "12:15", arrival: "知立" },
        { departure: "12:30", arrival: "知立" },
        { departure: "12:45", arrival: "知立" },
        { departure: "13:00", arrival: "知立" },
    ];

    const currentRoute = mode === "bus" ? busRoute[direction] : trainRoute[direction];
    const currentSchedule = mode === "bus" ? busSchedule : trainSchedule;

    const toggleDirection = () => {
        setDirection((prev) => (prev === "to-campus" ? "from-campus" : "to-campus"));
    };

    // Countdown timer simulation (would be calculated from real time in production)
    useEffect(() => {
        const interval = setInterval(() => {
            // Mock countdown update
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            {/* Header */}
            <View style={styles.header}>
                <Typography variant="h2" color={theme.colors.primary.main}>
                    バス・電車時刻表
                </Typography>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Transport Type Selector */}
                <TouchableOpacity
                    style={[styles.spotCard, { backgroundColor: theme.colors.primary.main }]}
                    onPress={() => setMode(mode === "bus" ? "train" : "bus")}
                >
                    <View style={styles.spotContent}>
                        <Typography variant="bodySmall" color={theme.colors.text.inverse}>
                            {currentRoute.name}
                        </Typography>
                        <View style={styles.routeInfo}>
                            <Icon name={currentRoute.icon} size={16} color={theme.colors.text.inverse} />
                            <Typography variant="h3" color={theme.colors.text.inverse}>
                                {currentRoute.from}
                            </Typography>
                            <Typography variant="h3" color={theme.colors.text.inverse}>
                                →
                            </Typography>
                            <Typography variant="h3" color={theme.colors.text.inverse}>
                                {currentRoute.to}
                            </Typography>
                        </View>
                    </View>
                    <View style={styles.chevronContainer}>
                        <Icon name="chevron-right" size={20} color={theme.colors.text.inverse} />
                    </View>
                </TouchableOpacity>

                {/* Next Departure Card */}
                <View style={[styles.nextCard, { backgroundColor: theme.colors.neutral.gray200 }]}>
                    {/* Via Badge */}
                    {mode === "bus" && currentSchedule[0].via && (
                        <View style={styles.badgeRow}>
                            <View style={[styles.viaBadge, { backgroundColor: theme.colors.primary.light, borderColor: theme.colors.primary.main }]}>
                                <Typography variant="caption" color={theme.colors.primary.main}>
                                    {currentSchedule[0].via}
                                </Typography>
                            </View>
                        </View>
                    )}

                    {/* Countdown */}
                    <View style={styles.countdown}>
                        <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                            出発まであと
                        </Typography>
                        <Typography variant="h1" style={[styles.countdownTime, { color: theme.colors.text.primary }]}>
                            {countdown}
                        </Typography>
                    </View>

                    {/* Time Info */}
                    <View style={styles.timeInfo}>
                        <View style={styles.timeBlock}>
                            <Typography variant="body" color={theme.colors.text.primary} style={styles.time}>
                                {currentSchedule[0].departure}
                            </Typography>
                            <Icon name={mode === "bus" ? "footprints" : "train"} size={20} color={theme.colors.text.secondary} />
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                {mode === "bus" ? "大学発" : "浄水駅発"}
                            </Typography>
                        </View>

                        <Icon name="chevron-right" size={24} color={theme.colors.text.secondary} />

                        <View style={styles.timeBlock}>
                            <Typography variant="body" color={theme.colors.text.primary} style={styles.time}>
                                {currentSchedule[0].arrival}
                            </Typography>
                            <Icon name="train" size={20} color={theme.colors.text.secondary} />
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                {mode === "bus" ? "浄水駅着" : currentSchedule[0].arrival}
                            </Typography>
                        </View>
                    </View>
                </View>

                {/* Schedule List */}
                <View style={styles.scheduleList}>
                    <Typography variant="h3" color={theme.colors.text.primary}>
                        直近の便
                    </Typography>

                    <View style={styles.scheduleItems}>
                        {currentSchedule.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.scheduleItem,
                                    {
                                        backgroundColor: theme.colors.background.primary,
                                        borderColor: theme.colors.border.default,
                                    },
                                ]}
                            >
                                {/* Number Badge */}
                                <View style={[styles.numberBadge, { backgroundColor: theme.colors.primary.main }]}>
                                    <Typography variant="body" color={theme.colors.text.inverse}>
                                        {index + 1}
                                    </Typography>
                                </View>

                                {/* Times */}
                                <View style={styles.scheduleTimes}>
                                    <View style={styles.scheduleTimeBlock}>
                                        <Typography variant="caption" color={theme.colors.text.secondary}>
                                            {mode === "bus" ? "大学発" : "浄水駅発"}
                                        </Typography>
                                        <Typography variant="h3" color={theme.colors.text.primary}>
                                            {item.departure}
                                        </Typography>
                                    </View>

                                    <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />

                                    <View style={styles.scheduleTimeBlock}>
                                        <Typography variant="caption" color={theme.colors.text.secondary}>
                                            {mode === "bus" ? "浄水駅着" : item.arrival}
                                        </Typography>
                                        {mode === "bus" && (
                                            <Typography variant="h3" color={theme.colors.text.primary}>
                                                {item.arrival}
                                            </Typography>
                                        )}
                                    </View>
                                </View>

                                {/* Via Badge */}
                                <View style={styles.scheduleItemBadge}>
                                    {item.via && (
                                        <View
                                            style={[
                                                styles.smallViaBadge,
                                                {
                                                    backgroundColor: theme.colors.primary.light,
                                                    borderColor: theme.colors.primary.main,
                                                },
                                            ]}
                                        >
                                            <Typography variant="caption" color={theme.colors.primary.main} style={{ fontSize: 8 }}>
                                                {item.via}
                                            </Typography>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{ height: 80 }} />
            </ScrollView>

            {/* Direction Toggle Button */}
            <TouchableOpacity style={[styles.directionButton, { backgroundColor: theme.colors.primary.main }]} onPress={toggleDirection}>
                <Icon name="clock" size={20} color={theme.colors.text.inverse} />
                <Typography variant="body" color={theme.colors.text.inverse}>
                    逆方面にする
                </Typography>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 48,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    spotCard: {
        borderRadius: 8,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 24,
    },
    spotContent: {
        flex: 1,
        gap: 4,
    },
    routeInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    chevronContainer: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    nextCard: {
        padding: 20,
        gap: 16,
        marginBottom: 24,
    },
    badgeRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    viaBadge: {
        height: 24,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    countdown: {
        gap: 8,
        alignItems: "center",
    },
    countdownTime: {
        fontSize: 40,
        fontWeight: "800",
    },
    timeInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    timeBlock: {
        gap: 8,
        alignItems: "center",
    },
    time: {
        fontWeight: "600",
        fontSize: 16,
    },
    scheduleList: {
        gap: 16,
    },
    scheduleItems: {
        gap: 12,
    },
    scheduleItem: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    numberBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    scheduleTimes: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    scheduleTimeBlock: {
        gap: 4,
        alignItems: "center",
    },
    scheduleItemBadge: {
        width: 80,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    smallViaBadge: {
        height: 20,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    directionButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        height: 56,
        borderRadius: 28,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        paddingHorizontal: 16,
    },
});
