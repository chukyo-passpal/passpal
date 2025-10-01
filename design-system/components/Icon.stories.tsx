import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Icon, IconContainer, HomeIcon, CalendarIcon, UserIcon, SettingsIcon, BellIcon, BusIcon, ClipboardIcon, ThemeProvider, Typography } from "../index";

const meta: Meta<typeof Icon> = {
    title: "Design System/Icon",
    component: Icon,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <View style={{ padding: 20 }}>
                    <Story />
                </View>
            </ThemeProvider>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component: "Icon component system with preset icons and customizable sizes.",
            },
        },
    },
    argTypes: {
        name: {
            control: "select",
            options: [
                "home",
                "calendar",
                "user",
                "settings",
                "bell",
                "bus",
                "clipboard-list",
                "info",
                "palette",
                "cloud-upload",
                "log-out",
                "chevron-right",
                "train",
                "footprints",
                "map-pin",
            ],
            description: "Icon name",
        },
        size: {
            control: "select",
            options: [16, 20, 24, 32],
            description: "Icon size in pixels",
        },
        color: {
            control: "text",
            description: "Icon color (overrides theme default)",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Basic Icon examples
export const DefaultIcon: Story = {
    args: {
        name: "home",
        size: 24,
    },
};

export const SmallIcon: Story = {
    args: {
        name: "calendar",
        size: 16,
    },
};

export const MediumIcon: Story = {
    args: {
        name: "user",
        size: 20,
    },
};

export const LargeIcon: Story = {
    args: {
        name: "settings",
        size: 24,
    },
};

export const ExtraLargeIcon: Story = {
    args: {
        name: "bell",
        size: 32,
    },
};

// Color variations
export const CustomColorIcon: Story = {
    args: {
        name: "bus",
        size: 24,
        color: "#FF5722",
    },
};

// Icon Container examples
export const IconWithContainer: Story = {
    render: () => <IconContainer name="home" size={24} />,
    parameters: {
        docs: {
            description: {
                story: "Icon with container wrapper for better touch targets.",
            },
        },
    },
};

// Preset icon components
export const PresetIcons: Story = {
    render: () => (
        <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
            <HomeIcon size={24} />
            <CalendarIcon size={24} />
            <UserIcon size={24} />
            <SettingsIcon size={24} />
            <BellIcon size={24} />
            <BusIcon size={24} />
            <ClipboardIcon size={24} />
        </View>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pre-configured icon components for common use cases.",
            },
        },
    },
};

// All available icons showcase
export const AllIcons: Story = {
    render: () => (
        <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="home" size={24} />
                <Typography variant="caption">home</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="calendar" size={24} />
                <Typography variant="caption">calendar</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="user" size={24} />
                <Typography variant="caption">user</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="settings" size={24} />
                <Typography variant="caption">settings</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="bell" size={24} />
                <Typography variant="caption">bell</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="bus" size={24} />
                <Typography variant="caption">bus</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="clipboard-list" size={24} />
                <Typography variant="caption">clipboard-list</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="info" size={24} />
                <Typography variant="caption">info</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="palette" size={24} />
                <Typography variant="caption">palette</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="cloud-upload" size={24} />
                <Typography variant="caption">cloud-upload</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="log-out" size={24} />
                <Typography variant="caption">log-out</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="chevron-right" size={24} />
                <Typography variant="caption">chevron-right</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="train" size={24} />
                <Typography variant="caption">train</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="footprints" size={24} />
                <Typography variant="caption">footprints</Typography>
            </View>
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <Icon name="map-pin" size={24} />
                <Typography variant="caption">map-pin</Typography>
            </View>
        </View>
    ),
    parameters: {
        docs: {
            description: {
                story: "Complete showcase of all available icons with their names.",
            },
        },
    },
};

// Size comparison
export const SizeComparison: Story = {
    render: () => (
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
            <View style={{ alignItems: "center", gap: 8 }}>
                <Icon name="home" size={16} />
                <Typography variant="caption">16px</Typography>
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
                <Icon name="home" size={20} />
                <Typography variant="caption">20px</Typography>
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
                <Icon name="home" size={24} />
                <Typography variant="caption">24px</Typography>
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
                <Icon name="home" size={32} />
                <Typography variant="caption">32px</Typography>
            </View>
        </View>
    ),
    parameters: {
        docs: {
            description: {
                story: "Icon size comparison showing all available sizes.",
            },
        },
    },
};
