import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import Header from "./Header";

const meta = {
    title: "Components/Header",
    component: Header,
    argTypes: {
        shownBackButton: {
            control: "boolean",
        },
    },
    decorators: [
        (Story) => (
            <View>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "ホーム",
    },
};

export const WithBackButton: Story = {
    args: {
        title: "設定",
        shownBackButton: true,
        onPressBackButton: () => console.log("Back button pressed"),
    },
};

export const WithSubButton: Story = {
    args: {
        title: "課題",
        subButtonIcon: "settings",
        onPressSubButton: () => console.log("Sub button pressed"),
    },
};

export const WithBothButtons: Story = {
    args: {
        title: "授業詳細",
        shownBackButton: true,
        subButtonIcon: "refresh-cw",
        onPressBackButton: () => console.log("Back button pressed"),
        onPressSubButton: () => console.log("Sub button pressed"),
    },
};

export const LongTitle: Story = {
    args: {
        title: "とても長いタイトルのページ",
        shownBackButton: true,
        subButtonIcon: "settings",
    },
};

export const AllVariants: Story = {
    args: {
        title: "Header",
    },
    render: () => (
        <View>
            <Header title="シンプルヘッダー" />
            <Header title="戻るボタン付き" shownBackButton />
            <Header title="サブボタン付き" subButtonIcon="settings" onPressSubButton={() => console.log("Settings")} />
            <Header title="両方のボタン付き" shownBackButton subButtonIcon="refresh-cw" onPressSubButton={() => console.log("Refresh")} />
        </View>
    ),
};
