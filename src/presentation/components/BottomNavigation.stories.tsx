import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { View } from "react-native";
import { BottomNavigation } from "./Navigation";

const meta = {
    title: "Components/Navigation/BottomNavigation",
    component: BottomNavigation,
    decorators: [
        (Story) => (
            <View style={{ flex: 1 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof BottomNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { id: "home", label: "ホーム", icon: "home", active: true },
            { id: "assignments", label: "課題", icon: "clipboard-list" },
            { id: "timetable", label: "時間割", icon: "calendar" },
            { id: "transport", label: "交通", icon: "train" },
        ],
        onItemPress: (id: string) => console.log("Item pressed:", id),
    },
};

export const WithBadge: Story = {
    args: {
        items: [
            { id: "home", label: "ホーム", icon: "home", active: true },
            { id: "assignments", label: "課題", icon: "clipboard-list", badge: 5 },
            { id: "timetable", label: "時間割", icon: "calendar" },
            { id: "notifications", label: "通知", icon: "bell", badge: 12 },
        ],
        onItemPress: (id: string) => console.log("Item pressed:", id),
    },
};

export const ManyBadges: Story = {
    args: {
        items: [
            { id: "home", label: "ホーム", icon: "home", badge: 3 },
            { id: "assignments", label: "課題", icon: "clipboard-list", badge: 99 },
            { id: "timetable", label: "時間割", icon: "calendar", badge: 150, active: true },
            { id: "notifications", label: "通知", icon: "bell", badge: 1 },
        ],
        onItemPress: (id: string) => console.log("Item pressed:", id),
    },
};

const InteractiveComponent = () => {
    const [activeItem, setActiveItem] = useState("home");
    const items = [
        { id: "home", label: "ホーム", icon: "home" as const, active: activeItem === "home" },
        { id: "assignments", label: "課題", icon: "clipboard-list" as const, active: activeItem === "assignments", badge: 3 },
        { id: "timetable", label: "時間割", icon: "calendar" as const, active: activeItem === "timetable" },
        { id: "transport", label: "交通", icon: "train" as const, active: activeItem === "transport" },
    ];

    return <BottomNavigation items={items} onItemPress={setActiveItem} />;
};

export const Interactive: Story = {
    args: {
        items: [],
        onItemPress: () => {},
    },
    render: () => <InteractiveComponent />,
};
