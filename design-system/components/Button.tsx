/**
 * Button Component
 * Primary, secondary, and text button variants with different sizes
 */

import React from "react";
import { TouchableOpacity, TouchableOpacityProps, ViewStyle, ActivityIndicator } from "react-native";
import { useTheme } from "../tokens/ThemeProvider";
import { Typography } from "./Typography";

type ButtonVariant = "primary" | "secondary" | "text";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "medium",
    fullWidth = false,
    loading = false,
    children,
    style,
    disabled,
    ...props
}) => {
    const { theme } = useTheme();

    // Get size configuration
    const sizeConfig = theme.components.button.sizes[size];

    // Get button styles based on variant
    const getButtonStyles = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            ...sizeConfig,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
        };

        if (fullWidth) {
            baseStyle.width = "100%";
        }

        switch (variant) {
            case "primary":
                return {
                    ...baseStyle,
                    backgroundColor: disabled ? theme.colors.background.disabled : theme.colors.primary.main,
                };
            case "secondary":
                return {
                    ...baseStyle,
                    backgroundColor: disabled ? theme.colors.background.disabled : theme.colors.background.surface,
                    borderWidth: 1,
                    borderColor: disabled ? theme.colors.border.disabled : theme.colors.border.default,
                };
            case "text":
                return {
                    ...baseStyle,
                    backgroundColor: "transparent",
                    paddingHorizontal: theme.spacing.sm,
                };
            default:
                return baseStyle;
        }
    };

    // Get text color based on variant and state
    const getTextColor = (): string => {
        if (disabled) {
            return theme.colors.text.disabled;
        }

        switch (variant) {
            case "primary":
                return theme.colors.text.inverse;
            case "secondary":
                return theme.colors.text.secondary;
            case "text":
                return theme.colors.primary.main;
            default:
                return theme.colors.text.primary;
        }
    };

    // Get typography variant based on size
    const getTypographyVariant = () => {
        return size === "small" ? "buttonSmall" : "button";
    };

    return (
        <TouchableOpacity style={[getButtonStyles(), style]} disabled={disabled || loading} activeOpacity={0.7} {...props}>
            {loading ? <ActivityIndicator size="small" color={getTextColor()} style={{ marginRight: 8 }} /> : null}
            <Typography variant={getTypographyVariant()} color={getTextColor()}>
                {children}
            </Typography>
        </TouchableOpacity>
    );
};

// Convenience components for specific variants
export const PrimaryButton: React.FC<Omit<ButtonProps, "variant">> = (props) => <Button variant="primary" {...props} />;

export const SecondaryButton: React.FC<Omit<ButtonProps, "variant">> = (props) => <Button variant="secondary" {...props} />;

export const TextButton: React.FC<Omit<ButtonProps, "variant">> = (props) => <Button variant="text" {...props} />;
