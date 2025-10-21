import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Icon, IconContainer, IconName } from "./Icon";
import { Typography } from "./Typography";

const meta = {
    title: "Components/Icon",
    component: Icon,
    argTypes: {
        name: {
            control: "select",
            options: [
                "alert-triangle",
                "arrow-left-right",
                "bell",
                "building",
                "bus",
                "calendar",
                "calendar-cog",
                "check",
                "check-circle",
                "chevron-left",
                "chevron-right",
                "clipboard-list",
                "clock",
                "cloud-upload",
                "eye",
                "eye-off",
                "flag",
                "footprints",
                "home",
                "info",
                "lock",
                "log-out",
                "map-pin",
                "palette",
                "refresh-cw",
                "settings",
                "train",
                "trash-2",
                "user",
            ] as IconName[],
        },
        size: {
            control: "number",
        },
    },
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "home",
        size: 24,
    },
};

export const Small: Story = {
    args: {
        name: "settings",
        size: 16,
    },
};

export const Large: Story = {
    args: {
        name: "calendar",
        size: 48,
    },
};

export const CustomColor: Story = {
    args: {
        name: "bell",
        size: 24,
        color: "#B19CD9",
    },
};

export const WithContainer: Story = {
    args: {
        name: "home",
    },
    render: (args) => <IconContainer name={args.name} size={24} variant="primary" />,
};

export const ContainerVariants: Story = {
    args: {
        name: "home",
    },
    render: () => (
        <View style={{ flexDirection: "row", gap: 16 }}>
            <View>
                <IconContainer name="home" size={24} variant="default" />
                <Typography variant="caption" style={{ textAlign: "center", marginTop: 8 }}>
                    Default
                </Typography>
            </View>
            <View>
                <IconContainer name="settings" size={24} variant="primary" />
                <Typography variant="caption" style={{ textAlign: "center", marginTop: 8 }}>
                    Primary
                </Typography>
            </View>
        </View>
    ),
};

export const AllIcons: Story = {
    args: {
        name: "home",
    },
    render: () => {
        const icons: IconName[] = [
            "alert-triangle",
            "arrow-left-right",
            "bell",
            "building",
            "bus",
            "calendar",
            "calendar-cog",
            "check",
            "check-circle",
            "chevron-left",
            "chevron-right",
            "clipboard-list",
            "clock",
            "cloud-upload",
            "eye",
            "eye-off",
            "flag",
            "footprints",
            "home",
            "info",
            "lock",
            "log-out",
            "map-pin",
            "palette",
            "refresh-cw",
            "settings",
            "train",
            "trash-2",
            "user",
        ];

        return (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
                {icons.map((iconName) => (
                    <View key={iconName} style={{ alignItems: "center", width: 80 }}>
                        <Icon name={iconName} size={24} />
                        <Typography variant="caption" style={{ textAlign: "center", marginTop: 4, fontSize: 10 }}>
                            {iconName}
                        </Typography>
                    </View>
                ))}
            </View>
        );
    },
};
