import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Typography } from "@/design-system/components/Typography";
import { Icon } from "@/design-system/components/Icon";
import { useTheme } from "@/design-system/tokens/ThemeProvider";
import Header from "@/components/Header";

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
    const { theme } = useTheme();
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
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="バス・電車時刻表" />

            <ScrollView style={{ flex: 1, paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                {/* Transport Type Selector */}
                <TouchableOpacity
                    style={{
                        backgroundColor: theme.colors.primary.main,
                        borderRadius: 8,
                        padding: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        marginBottom: 24,
                    }}
                    onPress={() => setMode(mode === "bus" ? "train" : "bus")}
                >
                    <View style={{ flex: 1, gap: 4 }}>
                        <Typography variant="bodySmall" color={theme.colors.text.inverse}>
                            {currentRoute.name}
                        </Typography>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
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
                    <View style={{ padding: 5, justifyContent: "center", alignItems: "center" }}>
                        <Icon name="chevron-right" size={20} color={theme.colors.text.inverse} />
                    </View>
                </TouchableOpacity>

                {/* Next Departure Card */}
                <View style={{ backgroundColor: theme.colors.neutral.gray200, padding: 20, gap: 16, marginBottom: 24 }}>
                    {/* Via Badge */}
                    {mode === "bus" && currentSchedule[0].via && (
                        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                            <View
                                style={{
                                    backgroundColor: theme.colors.primary.light,
                                    borderColor: theme.colors.primary.main,
                                    height: 24,
                                    paddingHorizontal: 12,
                                    paddingVertical: 4,
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="caption" color={theme.colors.primary.main}>
                                    {currentSchedule[0].via}
                                </Typography>
                            </View>
                        </View>
                    )}

                    {/* Countdown */}
                    <View style={{ gap: 8, alignItems: "center" }}>
                        <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                            出発まであと
                        </Typography>
                        <Typography variant="h1" style={{ fontSize: 40, fontWeight: "800", color: theme.colors.text.primary }}>
                            {countdown}
                        </Typography>
                    </View>

                    {/* Time Info */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Typography variant="body" color={theme.colors.text.primary} style={{ fontWeight: "600", fontSize: 16 }}>
                                {currentSchedule[0].departure}
                            </Typography>
                            <Icon name={mode === "bus" ? "footprints" : "train"} size={20} color={theme.colors.text.secondary} />
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                {mode === "bus" ? "大学発" : "浄水駅発"}
                            </Typography>
                        </View>

                        <Icon name="chevron-right" size={24} color={theme.colors.text.secondary} />

                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Typography variant="body" color={theme.colors.text.primary} style={{ fontWeight: "600", fontSize: 16 }}>
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
                <View style={{ gap: 16 }}>
                    <Typography variant="h3" color={theme.colors.text.primary}>
                        直近の便
                    </Typography>

                    <View style={{ gap: 12 }}>
                        {currentSchedule.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    backgroundColor: theme.colors.background.primary,
                                    borderColor: theme.colors.border.default,
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    padding: 16,
                                    flexDirection: "row",
                                    gap: 16,
                                    alignItems: "center",
                                }}
                            >
                                {/* Number Badge */}
                                <View
                                    style={{
                                        backgroundColor: theme.colors.primary.main,
                                        width: 32,
                                        height: 32,
                                        borderRadius: 16,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="body" color={theme.colors.text.inverse}>
                                        {index + 1}
                                    </Typography>
                                </View>

                                {/* Times */}
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <View style={{ gap: 4, alignItems: "center" }}>
                                        <Typography variant="caption" color={theme.colors.text.secondary}>
                                            {mode === "bus" ? "大学発" : "浄水駅発"}
                                        </Typography>
                                        <Typography variant="h3" color={theme.colors.text.primary}>
                                            {item.departure}
                                        </Typography>
                                    </View>

                                    <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />

                                    <View style={{ gap: 4, alignItems: "center" }}>
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
                                <View style={{ width: 80, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                    {item.via && (
                                        <View
                                            style={{
                                                backgroundColor: theme.colors.primary.light,
                                                borderColor: theme.colors.primary.main,
                                                height: 20,
                                                paddingHorizontal: 8,
                                                paddingVertical: 3,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
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
            <TouchableOpacity
                style={{
                    backgroundColor: theme.colors.primary.main,
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
                }}
                onPress={toggleDirection}
            >
                <Icon name="clock" size={20} color={theme.colors.text.inverse} />
                <Typography variant="body" color={theme.colors.text.inverse}>
                    逆方面にする
                </Typography>
            </TouchableOpacity>
        </View>
    );
}
