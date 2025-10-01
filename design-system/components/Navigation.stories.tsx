import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { View } from "react-native";
import { TabNavigation, BottomNavigation, NavigationHeader, ThemeProvider } from "../index";

const meta: Meta<typeof TabNavigation> = {
    title: "Design System/Navigation",
    component: TabNavigation,
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
                component: "Navigation components for different navigation patterns in the app.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof TabNavigation>;

// Tab Navigation examples
const TabNavigationComponent = () => {
    const [activeTab, setActiveTab] = useState("home");

    const tabs = [
        { id: "home", label: "Home", active: activeTab === "home" },
        { id: "assignments", label: "Assignments", active: activeTab === "assignments" },
        { id: "timetable", label: "Timetable", active: activeTab === "timetable" },
        { id: "transport", label: "Transport", active: activeTab === "transport" },
    ];

    return <TabNavigation tabs={tabs} onTabPress={(tabId) => setActiveTab(tabId)} />;
};

export const TabNavigationExample: Story = {
    render: () => <TabNavigationComponent />,
    parameters: {
        docs: {
            description: {
                story: "Interactive tab navigation component.",
            },
        },
    },
};

// Bottom Navigation examples
const BottomNavigationComponent = () => {
    const [activeTab, setActiveTab] = useState("home");

    const items = [
        {
            id: "home",
            label: "Home",
            icon: "home" as const,
            active: activeTab === "home",
        },
        {
            id: "assignments",
            label: "Tasks",
            icon: "clipboard-list" as const,
            active: activeTab === "assignments",
        },
        {
            id: "timetable",
            label: "Schedule",
            icon: "calendar" as const,
            active: activeTab === "timetable",
        },
        {
            id: "transport",
            label: "Transport",
            icon: "bus" as const,
            active: activeTab === "transport",
        },
        {
            id: "settings",
            label: "Settings",
            icon: "settings" as const,
            active: activeTab === "settings",
        },
    ];

    return <BottomNavigation items={items} onItemPress={(itemId: string) => setActiveTab(itemId)} />;
};

export const BottomNavigationExample: Story = {
    render: () => <BottomNavigationComponent />,
    parameters: {
        docs: {
            description: {
                story: "Interactive bottom navigation with icons.",
            },
        },
    },
};

// Navigation Header examples
export const NavigationHeaderDefault: Story = {
    render: () => <NavigationHeader title="Page Title" />,
    parameters: {
        docs: {
            description: {
                story: "Basic navigation header with title.",
            },
        },
    },
};

export const NavigationHeaderWithBack: Story = {
    render: () => <NavigationHeader title="Page Title" leftIcon="chevron-right" onLeftPress={() => console.log("Back pressed")} />,
    parameters: {
        docs: {
            description: {
                story: "Navigation header with back button.",
            },
        },
    },
};

export const NavigationHeaderWithActions: Story = {
    render: () => (
        <NavigationHeader
            title="Page Title"
            leftIcon="chevron-right"
            rightIcon="settings"
            onLeftPress={() => console.log("Back pressed")}
            onRightPress={() => console.log("Settings pressed")}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: "Navigation header with left and right actions.",
            },
        },
    },
};

// Simple tab navigation (static)
export const SimpleTabNavigation: Story = {
    args: {
        tabs: [
            { id: "home", label: "Home", active: true },
            { id: "assignments", label: "Assignments", active: false },
            { id: "timetable", label: "Timetable", active: false },
        ],
        onTabPress: (tabId: string) => console.log("Tab pressed:", tabId),
    },
};

// Navigation showcase
export const NavigationShowcase: Story = {
    render: () => (
        <View style={{ gap: 32 }}>
            <View>
                <NavigationHeader title="Navigation Examples" />
            </View>

            <View>
                <TabNavigationComponent />
            </View>

            <View style={{ marginTop: 20 }}>
                <BottomNavigationComponent />
            </View>
        </View>
    ),
    parameters: {
        docs: {
            description: {
                story: "Showcase of all navigation components.",
            },
        },
    },
};
