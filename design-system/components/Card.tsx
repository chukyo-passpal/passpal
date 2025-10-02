/**
 * Card Component
 * Flexible card container with different variants
 */

import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { useTheme } from "../tokens/ThemeProvider";
import { Typography } from "./Typography";

type CardVariant = "default" | "feature" | "info";

interface CardProps extends Omit<ViewProps, "style"> {
    variant?: CardVariant;
    children: React.ReactNode;
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ variant = "default", children, style, ...props }) => {
    const theme = useTheme();

    const getCardStyles = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            borderRadius: theme.components.card.borderRadius,
            padding: theme.components.card.padding,
            ...theme.components.shadows.small,
        };

        switch (variant) {
            case "default":
                return {
                    ...baseStyle,
                    backgroundColor: theme.colors.background.primary,
                    borderWidth: 1,
                    borderColor: theme.colors.border.default,
                };
            case "feature":
                return {
                    ...baseStyle,
                    backgroundColor: theme.colors.background.secondary,
                    borderWidth: 1,
                    borderColor: theme.colors.primary.main,
                };
            case "info":
                return {
                    ...baseStyle,
                    backgroundColor: theme.colors.background.primary,
                    borderWidth: 1,
                    borderColor: theme.colors.border.default,
                };
            default:
                return baseStyle;
        }
    };

    return (
        <View style={[getCardStyles(), style]} {...props}>
            {children}
        </View>
    );
};

// Card Header Component
interface CardHeaderProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, icon, children }) => {
    const theme = useTheme();

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            {icon && <View style={{ marginRight: theme.spacing.sm }}>{icon}</View>}
            <View style={{ flex: 1 }}>
                <Typography variant="h3" color={theme.colors.text.primary}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="bodySmall" color={theme.colors.text.secondary} style={{ marginTop: 4 }}>
                        {subtitle}
                    </Typography>
                )}
            </View>
            {children}
        </View>
    );
};

// Card Content Component
interface CardContentProps {
    children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
    const theme = useTheme();

    return <View style={{ marginTop: theme.spacing.sm }}>{children}</View>;
};

// Card Divider Component
export const CardDivider: React.FC<{ color?: string }> = ({ color }) => {
    const theme = useTheme();

    return (
        <View
            style={{
                height: 1,
                backgroundColor: color || theme.colors.border.default,
                marginVertical: theme.spacing.md,
            }}
        />
    );
};

// Feature Card Component (specific variant from design)
interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
    const theme = useTheme();

    return (
        <Card variant="feature">
            <Typography variant="h3" color={theme.colors.primary.main} style={{ marginBottom: theme.spacing.md }}>
                主な特徴
            </Typography>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: theme.spacing.md,
                }}
            >
                <View style={{ marginTop: 2 }}>{icon}</View>
                <View style={{ flex: 1 }}>
                    <Typography variant="button" color={theme.colors.primary.main} style={{ marginBottom: 4 }}>
                        {title}
                    </Typography>
                    <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                        {description}
                    </Typography>
                </View>
            </View>
        </Card>
    );
};

// Info Card Component (specific variant from design)
interface InfoCardProps {
    title: string;
    content: string;
    icon: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon }) => {
    const theme = useTheme();

    return (
        <Card variant="info">
            <CardHeader title={title} icon={icon} />
            <CardDivider />
            <CardContent>
                <Typography variant="body" color={theme.colors.text.primary} style={{ textAlign: "center" }}>
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
};
