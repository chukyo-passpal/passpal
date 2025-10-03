import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { ThemeProvider, useTheme, Typography } from "../index";

const ColorSwatchComponent = () => {
    const { theme } = useTheme();

    const ColorSwatch = ({ title, colors }: { title: string; colors: Record<string, string> }) => (
        <View style={{ marginBottom: 24 }}>
            <Typography variant="h3" style={{ marginBottom: 12 }}>
                {title}
            </Typography>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {Object.entries(colors).map(([name, color]) => (
                    <View key={name} style={{ alignItems: "center", marginBottom: 12, minWidth: 80 }}>
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                backgroundColor: color,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: theme.colors.border.default,
                                marginBottom: 6,
                            }}
                        />
                        <Typography variant="caption" style={{ textAlign: "center" }}>
                            {name}
                        </Typography>
                        <Typography variant="caption" style={{ textAlign: "center", color: theme.colors.text.secondary }}>
                            {color}
                        </Typography>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <View style={{ padding: 16 }}>
            <ColorSwatch title="Primary Colors" colors={theme.colors.primary} />
            <ColorSwatch title="Background Colors" colors={theme.colors.background} />
            <ColorSwatch title="Text Colors" colors={theme.colors.text} />
            <ColorSwatch title="Border Colors" colors={theme.colors.border} />
            <ColorSwatch title="Neutral Colors" colors={theme.colors.neutral} />
        </View>
    );
};

const meta: Meta = {
    title: "Design System/Design Tokens/Colors",
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component: "Color palette and design tokens used throughout the design system.",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

export const ColorPalette: Story = {
    render: () => <ColorSwatchComponent />,
    parameters: {
        docs: {
            description: {
                story: "Complete color palette with all available colors.",
            },
        },
    },
};
