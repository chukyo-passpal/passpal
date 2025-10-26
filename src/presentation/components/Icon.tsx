/**
 * Icon Component System
 * Wrapper for Lucide icons with consistent sizing and theming
 */

import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import {
    AlertTriangle,
    ArrowLeftRight,
    Bell,
    Building,
    Bus,
    Calendar,
    CalendarCog,
    Check,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    Clock,
    CloudUpload,
    Construction,
    Eye,
    EyeOff,
    Flag,
    Footprints,
    Home,
    Info,
    Lock,
    LogOut,
    LucideProps,
    MapPin,
    MessageCircleQuestionMark,
    Palette,
    RefreshCw,
    Settings,
    Sticker,
    Train,
    Trash2,
    User,
} from "lucide-react-native";
import React from "react";
import { View, ViewStyle } from "react-native";

export type IconName =
    | "alert-triangle"
    | "arrow-left-right"
    | "bell"
    | "building"
    | "bus"
    | "calendar"
    | "calendar-cog"
    | "check"
    | "check-circle"
    | "chevron-left"
    | "chevron-right"
    | "clipboard-list"
    | "clock"
    | "cloud-upload"
    | "construction"
    | "eye"
    | "eye-off"
    | "flag"
    | "footprints"
    | "home"
    | "info"
    | "lock"
    | "log-out"
    | "map-pin"
    | "message-circle-question-mark"
    | "palette"
    | "refresh-cw"
    | "settings"
    | "sticker"
    | "train"
    | "trash-2"
    | "user";

interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
    containerStyle?: ViewStyle;
}

// Icon mapping
const iconMap: Record<IconName, React.ComponentType<LucideProps>> = {
    "alert-triangle": AlertTriangle,
    "arrow-left-right": ArrowLeftRight,
    bell: Bell,
    building: Building,
    bus: Bus,
    calendar: Calendar,
    "calendar-cog": CalendarCog,
    check: Check,
    "check-circle": CheckCircle,
    "chevron-left": ChevronLeft,
    "chevron-right": ChevronRight,
    "clipboard-list": ClipboardList,
    clock: Clock,
    "cloud-upload": CloudUpload,
    construction: Construction,
    eye: Eye,
    "eye-off": EyeOff,
    flag: Flag,
    footprints: Footprints,
    home: Home,
    info: Info,
    lock: Lock,
    "log-out": LogOut,
    "map-pin": MapPin,
    "message-circle-question-mark": MessageCircleQuestionMark,
    palette: Palette,
    "refresh-cw": RefreshCw,
    settings: Settings,
    sticker: Sticker,
    train: Train,
    "trash-2": Trash2,
    user: User,
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, containerStyle }) => {
    const { theme } = useTheme();
    const IconComponent = iconMap[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    const iconColor = color || theme.colors.text.secondary;

    return (
        <View style={[{ width: size, height: size }, containerStyle]}>
            <IconComponent size={size} color={iconColor} />
        </View>
    );
};

// Icon Container Component (with background like in Figma)
interface IconContainerProps extends IconProps {
    backgroundColor?: string;
    variant?: "default" | "primary";
}

export const IconContainer: React.FC<IconContainerProps> = ({ variant = "default", backgroundColor, size = 24, containerStyle, ...iconProps }) => {
    const { theme } = useTheme();

    const getBackgroundColor = () => {
        if (backgroundColor) return backgroundColor;
        return variant === "primary" ? theme.colors.background.secondary : theme.colors.background.surface;
    };

    const containerSize = size + 24; // Add padding around icon

    return (
        <View
            style={[
                {
                    width: containerSize,
                    height: containerSize,
                    borderRadius: theme.spacing.borderRadius.sm,
                    backgroundColor: getBackgroundColor(),
                    justifyContent: "center",
                    alignItems: "center",
                },
                containerStyle,
            ]}
        >
            <Icon size={size} color={theme.colors.primary.main} {...iconProps} />
        </View>
    );
};
