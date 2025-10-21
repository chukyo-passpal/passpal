import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { IconButton } from "./IconButton";
import { Typography } from "./Typography";

const meta = {
    title: "Components/IconButton",
    component: IconButton,
    argTypes: {
        icon: {
            control: "select",
            options: ["home", "settings", "bell", "user", "calendar", "chevron-left", "chevron-right", "refresh-cw"],
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
        variant: {
            control: "select",
            options: ["default", "primary", "ghost"],
        },
        disabled: {
            control: "boolean",
        },
    },
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: "home",
        size: "medium",
        variant: "default",
    },
};

export const Primary: Story = {
    args: {
        icon: "settings",
        size: "medium",
        variant: "primary",
    },
};

export const Ghost: Story = {
    args: {
        icon: "bell",
        size: "medium",
        variant: "ghost",
    },
};

export const Small: Story = {
    args: {
        icon: "user",
        size: "small",
        variant: "default",
    },
};

export const Medium: Story = {
    args: {
        icon: "calendar",
        size: "medium",
        variant: "default",
    },
};

export const Large: Story = {
    args: {
        icon: "settings",
        size: "large",
        variant: "default",
    },
};

export const Disabled: Story = {
    args: {
        icon: "home",
        size: "medium",
        variant: "default",
        disabled: true,
    },
};

export const WithCustomColor: Story = {
    args: {
        icon: "bell",
        size: "medium",
        variant: "ghost",
        iconColor: "#B19CD9",
    },
};

export const AllSizes: Story = {
    args: {
        icon: "home",
    },
    render: () => (
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
                <IconButton icon="home" size="small" variant="default" />
                <Typography variant="caption" style={{ marginTop: 8 }}>
                    Small
                </Typography>
            </View>
            <View style={{ alignItems: "center" }}>
                <IconButton icon="home" size="medium" variant="default" />
                <Typography variant="caption" style={{ marginTop: 8 }}>
                    Medium
                </Typography>
            </View>
            <View style={{ alignItems: "center" }}>
                <IconButton icon="home" size="large" variant="default" />
                <Typography variant="caption" style={{ marginTop: 8 }}>
                    Large
                </Typography>
            </View>
        </View>
    ),
};

export const AllVariants: Story = {
    args: {
        icon: "home",
    },
    render: () => (
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
                <IconButton icon="settings" size="medium" variant="default" />
                <Typography variant="caption" style={{ marginTop: 8 }}>
                    Default
                </Typography>
            </View>
            <View style={{ alignItems: "center" }}>
                <IconButton icon="settings" size="medium" variant="primary" />
                <Typography variant="caption" style={{ marginTop: 8 }}>
                    Primary
                </Typography>
            </View>
            <View style={{ alignItems: "center" }}>
                <IconButton icon="settings" size="medium" variant="ghost" />
                <Typography variant="caption" style={{ marginTop: 8 }}>
                    Ghost
                </Typography>
            </View>
        </View>
    ),
};

export const IconShowcase: Story = {
    args: {
        icon: "home",
    },
    render: () => (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
            <IconButton icon="home" variant="primary" />
            <IconButton icon="settings" variant="primary" />
            <IconButton icon="bell" variant="primary" />
            <IconButton icon="user" variant="primary" />
            <IconButton icon="calendar" variant="primary" />
            <IconButton icon="chevron-left" variant="default" />
            <IconButton icon="chevron-right" variant="default" />
            <IconButton icon="refresh-cw" variant="ghost" />
        </View>
    ),
};
