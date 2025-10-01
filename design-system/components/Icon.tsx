/**
 * Icon Component System
 * Wrapper for Lucide icons with consistent sizing and theming
 */

import React from "react";
import { View, ViewStyle } from "react-native";
import {
    Home,
    Calendar,
    User,
    Settings,
    Bell,
    Bus,
    ClipboardList,
    Info,
    Palette,
    CloudUpload,
    LogOut,
    ChevronRight,
    Train,
    Footprints,
    MapPin,
    Lock,
    Eye,
    EyeOff,
    Clock,
    Check,
    RefreshCw,
    Flag,
    CheckCircle,
    AlertTriangle,
    LucideProps,
} from "lucide-react-native";
import { useTheme } from "../tokens/ThemeProvider";

export type IconSize = 12 | 16 | 20 | 24 | 32;
export type IconName =
    | "home"
    | "calendar"
    | "user"
    | "settings"
    | "bell"
    | "bus"
    | "clipboard-list"
    | "info"
    | "palette"
    | "cloud-upload"
    | "log-out"
    | "chevron-right"
    | "train"
    | "footprints"
    | "map-pin"
    | "lock"
    | "eye"
    | "eye-off"
    | "clock"
    | "check"
    | "refresh-cw"
    | "flag"
    | "check-circle"
    | "alert-triangle";

interface IconProps {
    name: IconName;
    size?: IconSize;
    color?: string;
    containerStyle?: ViewStyle;
}

// Icon mapping
const iconMap: Record<IconName, React.ComponentType<LucideProps>> = {
    home: Home,
    calendar: Calendar,
    user: User,
    settings: Settings,
    bell: Bell,
    bus: Bus,
    "clipboard-list": ClipboardList,
    info: Info,
    palette: Palette,
    "cloud-upload": CloudUpload,
    "log-out": LogOut,
    "chevron-right": ChevronRight,
    train: Train,
    footprints: Footprints,
    "map-pin": MapPin,
    lock: Lock,
    eye: Eye,
    "eye-off": EyeOff,
    clock: Clock,
    check: Check,
    "refresh-cw": RefreshCw,
    flag: Flag,
    "check-circle": CheckCircle,
    "alert-triangle": AlertTriangle,
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, containerStyle }) => {
    const theme = useTheme();
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
    const theme = useTheme();

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

// Specific icon components for common usage
export const HomeIcon: React.FC<Omit<IconProps, "name">> = (props) => <Icon name="home" {...props} />;

export const CalendarIcon: React.FC<Omit<IconProps, "name">> = (props) => <Icon name="calendar" {...props} />;

export const UserIcon: React.FC<Omit<IconProps, "name">> = (props) => <Icon name="user" {...props} />;

export const SettingsIcon: React.FC<Omit<IconProps, "name">> = (props) => <Icon name="settings" {...props} />;

export const BellIcon: React.FC<Omit<IconProps, "name">> = (props) => <Icon name="bell" {...props} />;

export const BusIcon: React.FC<Omit<IconProps, "name">> = (props) => <Icon name="bus" {...props} />;

export const ClipboardIcon: React.FC<Omit<IconProps, "name">> = (props) => <Icon name="clipboard-list" {...props} />;
export const ClockIcon: React.FC<Omit<IconProps, "name">> = (props) => <Icon name="clock" {...props} />;

export const CheckIcon: React.FC<Omit<IconProps, "name">> = (props) => <Icon name="check" {...props} />;
