import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { NavigationHeader } from "./Navigation";

const meta = {
    title: "Components/Navigation/NavigationHeader",
    component: NavigationHeader,
    decorators: [
        (Story) => (
            <View>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof NavigationHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "ページタイトル",
    },
};

export const WithLeftIcon: Story = {
    args: {
        title: "設定",
        leftIcon: "chevron-left",
        onLeftPress: () => console.log("Back pressed"),
    },
};

export const WithRightIcon: Story = {
    args: {
        title: "課題一覧",
        rightIcon: "settings",
        onRightPress: () => console.log("Settings pressed"),
    },
};

export const WithBothIcons: Story = {
    args: {
        title: "コース詳細",
        leftIcon: "chevron-left",
        rightIcon: "refresh-cw",
        onLeftPress: () => console.log("Back pressed"),
        onRightPress: () => console.log("Refresh pressed"),
    },
};

export const LongTitle: Story = {
    args: {
        title: "とても長いページタイトルの例",
        leftIcon: "chevron-left",
        rightIcon: "settings",
    },
};
