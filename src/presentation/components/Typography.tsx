/**
 * Typography Component
 * Consistent text styling throughout the app
 */

import React from "react";
import { Text, TextProps } from "react-native";

import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import { TypographyVariant } from "@/src/presentation/tokens/typography";

interface TypographyProps extends Omit<TextProps, "style"> {
    variant?: TypographyVariant;
    color?: string;
    style?: TextProps["style"];
    children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({ variant = "body", color, style, children, ...props }) => {
    const { theme } = useTheme();
    const variantStyle = theme.typography.variants[variant];

    const textStyle = [
        variantStyle,
        {
            color: color || theme.colors.text.primary,
            fontFamily: theme.typography.fontFamily.primary,
        },
        style,
    ];

    return (
        <Text style={textStyle} {...props}>
            {children}
        </Text>
    );
};
