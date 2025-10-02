/**
 * IconButton Component
 * Circular button with icon only, following the PassPal design system
 */

import React from "react";
import { Pressable, PressableProps, ViewStyle } from "react-native";
import { useTheme } from "../tokens/ThemeProvider";
import { Icon, IconName } from "./Icon";

type IconButtonSize = "small" | "medium" | "large";
type IconButtonVariant = "default" | "primary" | "ghost";

interface IconButtonProps extends Omit<PressableProps, "style"> {
    icon: IconName;
    size?: IconButtonSize;
    variant?: IconButtonVariant;
    iconColor?: string;
    style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, size = "medium", variant = "default", iconColor, disabled, style, ...props }) => {
    const theme = useTheme();

    // Size configuration
    const sizeConfig = {
        small: {
            containerSize: 28,
            iconSize: 16,
        },
        medium: {
            containerSize: 34,
            iconSize: 20,
        },
        large: {
            containerSize: 44,
            iconSize: 24,
        },
    };

    const config = sizeConfig[size];

    // Get button styles based on variant
    const getButtonStyles = (pressed: boolean): ViewStyle => {
        const baseStyle: ViewStyle = {
            width: config.containerSize,
            height: config.containerSize,
            borderRadius: config.containerSize / 2,
            alignItems: "center",
            justifyContent: "center",
            opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        };

        switch (variant) {
            case "default":
                return {
                    ...baseStyle,
                    backgroundColor: "#F8F9FA",
                    borderWidth: 1,
                    borderColor: theme.colors.border.default,
                };
            case "primary":
                return {
                    ...baseStyle,
                    backgroundColor: theme.colors.primary.main,
                    borderWidth: 0,
                };
            case "ghost":
                return {
                    ...baseStyle,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                };
            default:
                return baseStyle;
        }
    };

    // Get icon color based on variant
    const getIconColor = (): string => {
        if (iconColor) return iconColor;

        switch (variant) {
            case "default":
                return "#6C757D";
            case "primary":
                return theme.colors.text.inverse;
            case "ghost":
                return theme.colors.text.secondary;
            default:
                return theme.colors.text.secondary;
        }
    };

    return (
        <Pressable style={({ pressed }) => [getButtonStyles(pressed), style]} disabled={disabled} {...props}>
            <Icon name={icon} size={config.iconSize} color={getIconColor()} />
        </Pressable>
    );
};

// Convenience components for specific variants
export const DefaultIconButton: React.FC<Omit<IconButtonProps, "variant">> = (props) => <IconButton variant="default" {...props} />;

export const PrimaryIconButton: React.FC<Omit<IconButtonProps, "variant">> = (props) => <IconButton variant="primary" {...props} />;

export const GhostIconButton: React.FC<Omit<IconButtonProps, "variant">> = (props) => <IconButton variant="ghost" {...props} />;
