import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { View } from "react-native";
import { TabNavigation } from "./Navigation";

const meta = {
    title: "Components/Navigation/TabNavigation",
    component: TabNavigation,
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof TabNavigation>;

export default meta;

type TabStory = StoryObj<typeof meta>;

export const TabDefault: TabStory = {
    args: {
        tabs: [
            { id: "1", label: "すべて", active: true },
            { id: "2", label: "未提出" },
            { id: "3", label: "提出済み" },
        ],
        onTabPress: (id: string) => console.log("Tab pressed:", id),
    },
};

const TabInteractiveComponent = () => {
    const [activeTab, setActiveTab] = useState("1");
    const tabs = [
        { id: "1", label: "すべて", active: activeTab === "1" },
        { id: "2", label: "未提出", active: activeTab === "2" },
        { id: "3", label: "提出済み", active: activeTab === "3" },
    ];

    return <TabNavigation tabs={tabs} onTabPress={setActiveTab} />;
};

export const TabInteractive: TabStory = {
    args: {
        tabs: [],
        onTabPress: () => {},
    },
    render: () => <TabInteractiveComponent />,
};

export const TabManyItems: TabStory = {
    args: {
        tabs: [
            { id: "1", label: "タブ1", active: true },
            { id: "2", label: "タブ2" },
            { id: "3", label: "タブ3" },
            { id: "4", label: "タブ4" },
            { id: "5", label: "タブ5" },
        ],
        onTabPress: (id: string) => console.log("Tab pressed:", id),
    },
};
