import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Typography } from "@/design-system/components/Typography";
import { Icon } from "@/design-system/components/Icon";
import { useTheme } from "@/design-system/tokens/ThemeProvider";
import Header from "@/components/Header";
import {
    DEFAULT_SERVICE_BY_MODE,
    Direction,
    TimetableEntry,
    TransportMode,
    TRANSPORT_SERVICES,
    TransportServiceId,
} from "./transport/data";

interface UpcomingTrip extends TimetableEntry {
    departureDate: Date;
}

const UPCOMING_LIMIT = 3;

const parseTimeToDate = (time: string, reference: Date) => {
    const [hours, minutes] = time.split(":").map(Number);
    const candidate = new Date(reference);
    candidate.setHours(hours, minutes, 0, 0);
    if (candidate.getTime() < reference.getTime()) {
        candidate.setDate(candidate.getDate() + 1);
    }
    return candidate;
};

const buildUpcomingTrips = (schedule: TimetableEntry[], now: Date): UpcomingTrip[] => {
    return schedule
        .map((entry) => ({
            ...entry,
            departureDate: parseTimeToDate(entry.departure, now),
        }))
        .sort((a, b) => a.departureDate.getTime() - b.departureDate.getTime())
        .slice(0, UPCOMING_LIMIT);
};

const formatCountdown = (departureDate: Date, now: Date) => {
    const diff = Math.max(0, departureDate.getTime() - now.getTime());
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const getCurrentSchedule = (serviceId: TransportServiceId, direction: Direction) => {
    const service = TRANSPORT_SERVICES[serviceId];
    const timetable = service.timetables[direction];
    const variantKey = timetable.defaultVariantId as keyof typeof timetable.variants;
    const rawVariant = timetable.variants[variantKey];
    const entries = Array.isArray(rawVariant) ? (rawVariant as TimetableEntry[]) : [];
    return {
        service,
        entries,
    };
};

export default function TransportScreen() {
    const { theme } = useTheme();
    const [mode, setMode] = useState<TransportMode>("bus");
    const [direction, setDirection] = useState<Direction>("from-campus");
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const activeServiceId = DEFAULT_SERVICE_BY_MODE[mode];
    const { service, entries } = useMemo(
        () => getCurrentSchedule(activeServiceId, direction),
        [activeServiceId, direction],
    );

    const upcomingTrips = useMemo(() => buildUpcomingTrips(entries, now), [entries, now]);
    const primaryTrip = upcomingTrips[0];
    const countdown = primaryTrip ? formatCountdown(primaryTrip.departureDate, now) : "--:--";
    const directionInfo = service.directions[direction];
    const oppositeDirection = direction === "to-campus" ? "from-campus" : "to-campus";
    const oppositeDirectionInfo = service.directions[oppositeDirection];
    const arrivalLabel = "arrivalLabel" in directionInfo ? directionInfo.arrivalLabel : undefined;
    const showsArrival = Boolean(arrivalLabel);

    const toggleDirection = () => {
        setDirection((prev) => (prev === "to-campus" ? "from-campus" : "to-campus"));
    };

    const switchMode = () => {
        setMode((prev) => (prev === "bus" ? "train" : "bus"));
    };

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
                    onPress={switchMode}
                >
                    <View style={{ flex: 1, gap: 4 }}>
                        <Typography variant="bodySmall" color={theme.colors.text.inverse}>
                            {service.name}
                        </Typography>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <Icon name={service.icon} size={16} color={theme.colors.text.inverse} />
                            <Typography variant="h3" color={theme.colors.text.inverse}>
                                {directionInfo.origin}
                            </Typography>
                            <Typography variant="h3" color={theme.colors.text.inverse}>
                                →
                            </Typography>
                            <Typography variant="h3" color={theme.colors.text.inverse}>
                                {directionInfo.destination}
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
                    {service.mode === "bus" && primaryTrip?.via && (
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
                                    {primaryTrip.via}
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
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: showsArrival ? "space-between" : "center",
                            alignItems: "center",
                            paddingHorizontal: 20,
                        }}
                    >
                        <View style={{ gap: 8, alignItems: "center" }}>
                            <Typography variant="body" color={theme.colors.text.primary} style={{ fontWeight: "600", fontSize: 16 }}>
                                {primaryTrip?.departure ?? "--:--"}
                            </Typography>
                            <Icon
                                name={service.mode === "bus" ? "footprints" : "train"}
                                size={20}
                                color={theme.colors.text.secondary}
                            />
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                {directionInfo.departureLabel}
                            </Typography>
                        </View>

                        {showsArrival && (
                            <>
                                <Icon name="chevron-right" size={24} color={theme.colors.text.secondary} />

                                <View style={{ gap: 8, alignItems: "center" }}>
                                    <Typography
                                        variant="body"
                                        color={theme.colors.text.primary}
                                        style={{ fontWeight: "600", fontSize: 16 }}
                                    >
                                        {primaryTrip?.arrival ?? "--:--"}
                                    </Typography>
                                    <Icon
                                        name={service.mode === "bus" ? "map-pin" : "train"}
                                        size={20}
                                        color={theme.colors.text.secondary}
                                    />
                                    <Typography variant="caption" color={theme.colors.text.secondary}>
                                        {arrivalLabel!}
                                    </Typography>
                                </View>
                            </>
                        )}
                    </View>
                </View>

                {/* Schedule List */}
                <View style={{ gap: 16 }}>
                    <Typography variant="h3" color={theme.colors.text.primary}>
                        直近の便
                    </Typography>

                    {upcomingTrips.length === 0 ? (
                        <View
                            style={{
                                backgroundColor: theme.colors.background.primary,
                                borderColor: theme.colors.border.default,
                                borderWidth: 1,
                                borderRadius: 8,
                                padding: 24,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="body" color={theme.colors.text.secondary}>
                                表示できる運行情報がありません
                            </Typography>
                        </View>
                    ) : (
                        <View style={{ gap: 12 }}>
                            {upcomingTrips.map((item, index) => (
                                <View
                                    key={`${item.departure}-${index}`}
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
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            justifyContent: showsArrival ? "space-between" : "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View style={{ gap: 4, alignItems: "center" }}>
                                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                                {directionInfo.departureLabel}
                                            </Typography>
                                            <Typography variant="h3" color={theme.colors.text.primary}>
                                                {item.departure}
                                            </Typography>
                                        </View>

                                        {showsArrival && (
                                            <>
                                                <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />

                                                <View style={{ gap: 4, alignItems: "center" }}>
                                                    <Typography variant="caption" color={theme.colors.text.secondary}>
                                                        {arrivalLabel!}
                                                    </Typography>
                                                    <Typography variant="h3" color={theme.colors.text.primary}>
                                                        {item.arrival ?? "--:--"}
                                                    </Typography>
                                                </View>
                                            </>
                                        )}
                                    </View>

                                    {/* Via Badge */}
                                    <View style={{ width: 80, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                        {service.mode === "bus" && item.via && (
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
                    )}
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
                    {`${oppositeDirectionInfo.origin} → ${oppositeDirectionInfo.destination} を表示`}
                </Typography>
            </TouchableOpacity>
        </View>
    );
}
