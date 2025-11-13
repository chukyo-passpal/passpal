import { useEffect, useState } from "react";
import { Linking, ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TimetableBusDiagramType } from "@/src/data/types/busTimetable";
import busServiceInstance, { BusTimetable, BusTimetableCell } from "@/src/domain/services/busService";
import { Button } from "@/src/presentation/components/Button";
import { Card, CardDivider } from "@/src/presentation/components/Card";
import { Icon, IconName } from "@/src/presentation/components/Icon";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useSetting from "@/src/presentation/hooks/useSetting";
import { useToast } from "@/src/presentation/hooks/useToast";

export default function Bus() {
    const { theme } = useTheme();
    const { homeStation } = useSetting();
    const { error } = useToast();

    const [diagram, setDiagram] = useState<TimetableBusDiagramType | null>(null);
    const [timetable, setTimetable] = useState<BusTimetable | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isForward, setIsForward] = useState(true); // true: 大学→浄水駅, false: 浄水駅→大学

    const departure: string = isForward ? "浄水駅" : "大学";
    const arrival: string = isForward ? "大学" : "浄水駅";
    const departureIcon: IconName = isForward ? "train" : "school";
    const arrivalIcon: IconName = isForward ? "building" : "train";

    const insets = useSafeAreaInsets();

    useEffect(() => {
        busServiceInstance.getTodayDiagram().then((d) => {
            setDiagram(d);

            busServiceInstance.getTimetable(d).then((tt) => {
                setTimetable(tt);
                setLoading(false);
            });
        });
    }, []);

    // Update current time every second for countdown
    useEffect(() => {
        const timer = setInterval(() => {
            const current = new Date();
            current.setMinutes(current.getMinutes() + 0); // MEMO: デバッグ用
            setCurrentTime(current);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSwitchDirection = () => {
        setIsForward(!isForward);
    };

    const handleNextBusPress = (bus: BusTimetableCell) => {
        if (homeStation === "") {
            error("最寄駅が設定されていません。\n設定画面から最寄駅を設定してください。");
            return;
        }
        Linking.openURL(busServiceInstance.getTrainInfoUrl(bus.departureAt));
    };

    // Get next buses (showing current direction)
    const getNextBuses = () => {
        if (!timetable) return [];
        const now = currentTime;
        const maxTime = new Date(now.getTime() + 120 * 60 * 1000); // 120分後
        const buses = isForward ? timetable.forward : timetable.reverse;
        return buses
            .filter((cell) => cell.departureAt > now && cell.departureAt <= maxTime)
            .sort((a, b) => a.departureAt.getTime() - b.departureAt.getTime())
            .slice(0, 5);
    };

    // Get time until next bus
    const getTimeUntilNextBus = () => {
        const nextBuses = getNextBuses();
        if (nextBuses.length === 0 || !nextBuses[0]) return null;

        const diff = nextBuses[0].departureAt.getTime() - currentTime.getTime();
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        return { minutes, seconds };
    };

    const formatTime = (date: Date) => {
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    };

    const nextBuses = getNextBuses();
    const timeUntil = getTimeUntilNextBus();

    if (loading) {
        return <View style={{ flex: 1 }} />;
    }

    // Show "No Bus Available" screen when there are no more buses
    if (nextBuses.length === 0) {
        return <NoBusAvailable />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <View
                style={{
                    paddingTop: insets.top,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                }}
            />

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 64 }}>
                {/* Diagram Section */}
                <View style={{ marginBottom: 20 }}>
                    <Typography variant="bodySmall" color={theme.colors.text.secondary} style={{ marginBottom: 8 }}>
                        今日の運行ダイヤ
                    </Typography>
                    <Typography variant="h1" color={theme.colors.primary.main} style={{ fontSize: 48, lineHeight: 52 }}>
                        {diagram}ダイヤ
                    </Typography>
                </View>

                {/* Next Bus Card */}
                {nextBuses.length > 0 && timeUntil && (
                    <>
                        <CardDivider />
                        <View style={{ padding: 20 }}>
                            <View style={{ alignItems: "center", marginBottom: 24 }}>
                                <Typography
                                    variant="body"
                                    color={theme.colors.text.secondary}
                                    style={{ marginBottom: 8 }}
                                >
                                    出発まであと
                                </Typography>
                                <Typography variant="h1" style={{ fontSize: 64, fontWeight: "bold", lineHeight: 68 }}>
                                    {timeUntil.minutes.toString().padStart(2, "0")}:
                                    {timeUntil.seconds.toString().padStart(2, "0")}
                                </Typography>
                            </View>

                            {/* Journey Visualization */}
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Typography variant="h2" style={{ fontSize: 28, fontWeight: "bold" }}>
                                        {formatTime(nextBuses[0]!.departureAt)}
                                    </Typography>
                                    <Icon name={departureIcon} size={32} color={theme.colors.primary.main} />
                                    <Typography variant="body" color={theme.colors.text.secondary}>
                                        {departure}発
                                    </Typography>
                                </View>
                                <ProgressDots departureAt={nextBuses[0]!.departureAt} />
                                <View style={{ alignItems: "center" }}>
                                    <Typography variant="h2" style={{ fontSize: 28, fontWeight: "bold" }}>
                                        {formatTime(nextBuses[0]!.arrivalAt)}
                                    </Typography>
                                    <Icon name={arrivalIcon} size={32} color={theme.colors.primary.main} />
                                    <Typography variant="body" color={theme.colors.text.secondary}>
                                        {arrival}着
                                    </Typography>
                                </View>
                            </View>
                        </View>
                        <CardDivider />
                    </>
                )}

                {/* Next Buses List */}
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                        }}
                    >
                        <Typography variant="h3">次に来るバス一覧</Typography>
                        <Typography variant="bodySmall" color={theme.colors.primary.main}>
                            ※ 到着時刻は目安です
                        </Typography>
                    </View>

                    {nextBuses.map((bus, index) => (
                        <NextBusItem
                            key={index}
                            bus={bus}
                            index={index}
                            departure={departure}
                            arrival={arrival}
                            canPress={isForward === false}
                            handleNextBusPress={handleNextBusPress}
                            formatTime={formatTime}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <View
                style={{
                    position: "absolute",
                    bottom: theme.spacing.md,
                    right: theme.spacing.md,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                }}
            >
                <Button onPress={handleSwitchDirection}>{isForward ? "浄水駅発をみる" : "大学発をみる"}</Button>
            </View>
        </View>
    );
}

function ProgressDots({ departureAt }: { departureAt: Date }) {
    const { theme } = useTheme();

    const now = new Date();
    // 1ドット2分として、出発までのドット数を計算
    const totalDots = 5;
    const minutesUntilDeparture = Math.max(0, Math.ceil((departureAt.getTime() - now.getTime()) / 60000));
    const filledDots = Math.min(totalDots, Math.ceil(minutesUntilDeparture / 2) - 1);

    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 8 }}>
            {Array.from({ length: totalDots }).map((_, index) => (
                <View
                    key={index}
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor:
                            index >= totalDots - filledDots ? theme.colors.primary.main : theme.colors.text.secondary,
                    }}
                />
            ))}
        </View>
    );
}

function NoBusAvailable() {
    const { theme } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background.primary,
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
            }}
        >
            {/* Bus Icon with Sleep Symbol */}
            <Icon name="bus" size={64} color={theme.colors.text.secondary} />

            {/* Main Message */}
            <Typography
                variant="h2"
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 16,
                }}
            >
                本日の運行は終了しました
            </Typography>

            {/* Sub Message */}
            <Typography
                variant="body"
                color={theme.colors.text.secondary}
                style={{
                    textAlign: "center",
                    marginBottom: 40,
                }}
            >
                {/* 明日の運行カレンダーと時刻表は{"\n"}以下から確認できます */}
                また明日もよろしくお願いします！
            </Typography>
        </View>
    );
}

function NextBusItem({
    bus,
    index,
    departure,
    arrival,
    canPress,
    handleNextBusPress,
    formatTime,
}: {
    bus: { departureAt: Date; arrivalAt: Date };
    index: number;
    departure: string;
    arrival: string;
    canPress: boolean;
    handleNextBusPress: (bus: { departureAt: Date; arrivalAt: Date }) => void;
    formatTime: (date: Date) => string;
}) {
    const { theme } = useTheme();

    const BusCard = (
        <Card style={{ marginBottom: 12, paddingVertical: 16, paddingRight: 8 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: theme.colors.primary.main,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h3" color={theme.colors.neutral.white}>
                            {index + 1}
                        </Typography>
                    </View>
                    <View>
                        <Typography
                            variant="body"
                            color={theme.colors.text.secondary}
                            style={{ fontSize: 12, marginBottom: 4 }}
                        >
                            {departure}発
                        </Typography>
                        <Typography variant="h2" style={{ fontSize: 24, fontWeight: "bold" }}>
                            {formatTime(bus.departureAt)}
                        </Typography>
                    </View>
                </View>

                <Icon name="arrow-left-right" size={24} color={theme.colors.primary.main} />

                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <View>
                        <Typography
                            variant="body"
                            color={theme.colors.text.secondary}
                            style={{ fontSize: 12, marginBottom: 4 }}
                        >
                            {arrival}着
                        </Typography>
                        <Typography variant="h2" style={{ fontSize: 24, fontWeight: "bold" }}>
                            {formatTime(bus.arrivalAt)}
                        </Typography>
                    </View>
                    {canPress ? (
                        <Icon name="chevron-right" size={24} color={theme.colors.primary.main} />
                    ) : (
                        <View style={{ width: 24 }} />
                    )}
                </View>
            </View>
        </Card>
    );

    if (!canPress) {
        return BusCard;
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleNextBusPress(bus)}>
            {BusCard}
        </TouchableOpacity>
    );
}
