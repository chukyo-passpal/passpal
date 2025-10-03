/**
 * StatCard Component
 * A card component for displaying statistics and information with icon, title, and content
 * Used for dashboard-style cards like "Next Class" and "Assignment Count"
 */

import React from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../tokens/ThemeProvider";
import { Typography } from "./Typography";
import { Icon, IconName } from "./Icon";
import { Card, CardDivider } from "./Card";

interface StatCardProps {
    /** Icon name to display in the header */
    iconName: IconName;
    /** Title text for the card header */
    title: string;
    /** Main content - can be a string or React node */
    content: React.ReactNode;
    /** Optional subtitle text below the main content */
    subtitle?: string;
    /** Optional height for the card (default: 170) */
    height?: number;
    /** Optional style overrides */
    style?: ViewStyle;
    /** Whether to use large text style for content (default: false) */
    largeContent?: boolean;
    /** Content text alignment (default: 'center') */
    contentAlign?: "left" | "center" | "right";
}

export const StatCard: React.FC<StatCardProps> = ({
    iconName,
    title,
    content,
    subtitle,
    height = 170,
    style,
    largeContent = false,
    contentAlign = "center",
}) => {
    const { theme } = useTheme();

    const contentTextAlign: TextStyle["textAlign"] = contentAlign;

    const renderContent = () => {
        if (typeof content === "string" || typeof content === "number") {
            if (largeContent) {
                return (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h1" color={theme.colors.primary.main} style={{ fontSize: 48, lineHeight: 57.6 }}>
                            {content}
                        </Typography>
                    </View>
                );
            } else {
                return (
                    <Typography variant="h3" color={theme.colors.text.primary} style={{ textAlign: contentTextAlign, flex: 1 }}>
                        {content}
                    </Typography>
                );
            }
        }
        return content;
    };

    return (
        <Card
            variant="feature"
            style={{
                height,
                ...style,
            }}
        >
            {/* Header with Icon and Title */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <Icon name={iconName} size={20} color={theme.colors.text.primary} />
                <Typography variant="h3" color={theme.colors.text.primary}>
                    {title}
                </Typography>
            </View>

            <CardDivider color={theme.colors.primary.main} />

            {/* Content */}
            {renderContent()}

            {/* Optional Subtitle */}
            {subtitle && (
                <Typography variant="body" color={theme.colors.text.primary} style={{ textAlign: contentTextAlign, fontWeight: "500" }}>
                    {subtitle}
                </Typography>
            )}
        </Card>
    );
};
