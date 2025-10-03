export type TransportMode = "bus" | "train";
export type Direction = "to-campus" | "from-campus";
export type Campus = "nagoya" | "toyota" | "intercampus";

type TimetableVariantId =
    | "weekday"
    | "weekend"
    | "toyota-a"
    | "toyota-b"
    | "toyota-c"
    | "toyota-a-prime"
    | "toyota-special"
    | "toyota-off";

export interface TimetableEntry {
    departure: string;
    arrival?: string;
    via?: string;
}

export interface DirectionMetadata {
    origin: string;
    destination: string;
    departureLabel: string;
    arrivalLabel?: string;
}

export interface DirectionTimetable {
    defaultVariantId: TimetableVariantId;
    variants: Partial<Record<TimetableVariantId, TimetableEntry[]>>;
}

export interface TransportService {
    id: string;
    name: string;
    mode: TransportMode;
    campus: Campus;
    icon: "bus" | "train" | "map-pin";
    directions: Record<Direction, DirectionMetadata>;
    timetables: Record<Direction, DirectionTimetable>;
}

export type TransportServiceId = keyof typeof TRANSPORT_SERVICES;

export const TRANSPORT_SERVICES = {
    "toyota-schoolbus": {
        id: "toyota-schoolbus",
        name: "スクールバス(豊田キャンパス)",
        mode: "bus",
        campus: "toyota",
        icon: "map-pin",
        directions: {
            "to-campus": {
                origin: "浄水駅",
                destination: "豊田キャンパス",
                departureLabel: "浄水駅発",
                arrivalLabel: "大学着",
            },
            "from-campus": {
                origin: "豊田キャンパス",
                destination: "浄水駅",
                departureLabel: "大学発",
                arrivalLabel: "浄水駅着",
            },
        },
        timetables: {
            "to-campus": {
                defaultVariantId: "toyota-a",
                variants: {
                    "toyota-a": [
                        { departure: "12:15", arrival: "12:30", via: "貝津経由" },
                        { departure: "12:45", arrival: "13:00" },
                        { departure: "13:15", arrival: "13:30" },
                    ],
                    "toyota-b": [
                        { departure: "09:15", arrival: "09:35" },
                        { departure: "10:15", arrival: "10:35" },
                    ],
                    "toyota-c": [
                        { departure: "08:15", arrival: "08:40", via: "貝津経由" },
                        { departure: "09:45", arrival: "10:05" },
                    ],
                    "toyota-a-prime": [
                        { departure: "11:15", arrival: "11:35" },
                        { departure: "11:45", arrival: "12:05", via: "貝津経由" },
                    ],
                    "toyota-special": [
                        { departure: "14:15", arrival: "14:35" },
                    ],
                },
            },
            "from-campus": {
                defaultVariantId: "toyota-a",
                variants: {
                    "toyota-a": [
                        { departure: "12:00", arrival: "12:15", via: "貝津経由" },
                        { departure: "12:30", arrival: "12:45" },
                        { departure: "13:00", arrival: "13:15" },
                    ],
                    "toyota-b": [
                        { departure: "09:00", arrival: "09:20" },
                        { departure: "10:00", arrival: "10:20" },
                    ],
                    "toyota-c": [
                        { departure: "08:00", arrival: "08:25", via: "貝津経由" },
                        { departure: "09:30", arrival: "09:50" },
                    ],
                    "toyota-a-prime": [
                        { departure: "11:00", arrival: "11:20" },
                        { departure: "11:30", arrival: "11:50", via: "貝津経由" },
                    ],
                    "toyota-special": [
                        { departure: "14:00", arrival: "14:20" },
                    ],
                },
            },
        },
    },
    "meitetsu-toyotasen": {
        id: "meitetsu-toyotasen",
        name: "名鉄豊田線",
        mode: "train",
        campus: "toyota",
        icon: "train",
        directions: {
            "to-campus": {
                origin: "浄水駅",
                destination: "豊田市・赤池方面",
                departureLabel: "浄水駅発",
            },
            "from-campus": {
                origin: "浄水駅",
                destination: "赤池・名古屋方面",
                departureLabel: "浄水駅発",
            },
        },
        timetables: {
            "to-campus": {
                defaultVariantId: "weekday",
                variants: {
                    weekday: [
                        { departure: "12:15" },
                        { departure: "12:30" },
                        { departure: "12:45" },
                        { departure: "13:00" },
                    ],
                    weekend: [
                        { departure: "12:20" },
                        { departure: "12:40" },
                        { departure: "13:00" },
                    ],
                },
            },
            "from-campus": {
                defaultVariantId: "weekday",
                variants: {
                    weekday: [
                        { departure: "12:10" },
                        { departure: "12:25" },
                        { departure: "12:40" },
                    ],
                    weekend: [
                        { departure: "12:15" },
                        { departure: "12:35" },
                    ],
                },
            },
        },
    },
} satisfies Record<string, TransportService>;

export const DEFAULT_SERVICE_BY_MODE: Record<TransportMode, TransportServiceId> = {
    bus: "toyota-schoolbus",
    train: "meitetsu-toyotasen",
};
