/**
 * Typography Component
 * Consistent text styling throughout the app
 */

import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import { TypographyVariant } from "@/src/presentation/tokens/typography";
import React from "react";
import { Text, TextProps } from "react-native";

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

// Convenience components for common variants
export const Heading1: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="h1" {...props} />;

export const Heading2: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="h2" {...props} />;

export const Heading3: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="h3" {...props} />;

export const BodyText: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="body" {...props} />;

export const BodySmall: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="bodySmall" {...props} />;

export const Caption: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="caption" {...props} />;

export const Label: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="label" {...props} />;
