import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { StatCard } from "./StatCard";

const meta = {
    title: "Components/StatCard",
    component: StatCard,
    argTypes: {
        height: {
            control: "number",
        },
        largeContent: {
            control: "boolean",
        },
        contentAlign: {
            control: "select",
            options: ["left", "center", "right"],
        },
    },
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof StatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        iconName: "calendar",
        title: "次の授業",
        content: "情報システム概論 I\n10:40 - 12:10",
    },
};

export const WithSubtitle: Story = {
    args: {
        iconName: "clock",
        title: "残り時間",
        content: "2時間30分",
        subtitle: "3限開始まで",
    },
};

export const LargeNumber: Story = {
    args: {
        iconName: "clipboard-list",
        title: "未提出課題",
        content: "5",
        largeContent: true,
    },
};

export const LargeNumberWithSubtitle: Story = {
    args: {
        iconName: "check-circle",
        title: "今週の提出数",
        content: "12",
        largeContent: true,
        subtitle: "全課題の80%",
    },
};

export const NextClass: Story = {
    args: {
        iconName: "calendar",
        title: "次の授業",
        content: "プログラミング基礎\n14:40 - 16:10\n8号館 303教室",
        height: 200,
    },
};

export const AssignmentCount: Story = {
    args: {
        iconName: "clipboard-list",
        title: "課題数",
        content: "3",
        subtitle: "未提出",
        largeContent: true,
    },
};

export const CustomHeight: Story = {
    args: {
        iconName: "building",
        title: "今日の授業",
        content: "午前: 2コマ\n午後: 1コマ",
        height: 220,
    },
};

export const LeftAlign: Story = {
    args: {
        iconName: "info",
        title: "お知らせ",
        content: "明日は休講です\n代替日は後日連絡します",
        contentAlign: "left",
    },
};

export const RightAlign: Story = {
    args: {
        iconName: "flag",
        title: "目標達成",
        content: "85%",
        contentAlign: "right",
        subtitle: "今学期の出席率",
    },
};

export const AllVariants: Story = {
    args: {
        iconName: "home",
        title: "Card",
        content: "Content",
    },
    render: () => (
        <View style={{ gap: 16 }}>
            <StatCard
                iconName="calendar"
                title="次の授業"
                content="情報システム概論 I&#10;10:40 - 12:10"
            />

            <StatCard iconName="clipboard-list" title="未提出課題" content="5" largeContent />

            <StatCard iconName="check-circle" title="今週の提出" content="8" subtitle="全課題の67%" largeContent />

            <StatCard iconName="clock" title="残り時間" content="1時間30分" subtitle="次の授業まで" height={200} />
        </View>
    ),
};

export const DashboardExample: Story = {
    args: {
        iconName: "home",
        title: "Dashboard",
        content: "Content",
    },
    render: () => (
        <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 16 }}>
                <View style={{ flex: 1 }}>
                    <StatCard iconName="clipboard-list" title="未提出" content="3" largeContent />
                </View>
                <View style={{ flex: 1 }}>
                    <StatCard iconName="check-circle" title="提出済み" content="12" largeContent />
                </View>
            </View>

            <StatCard
                iconName="calendar"
                title="次の授業"
                content="プログラミング基礎&#10;14:40 - 16:10&#10;8号館 303教室"
                height={200}
            />
        </View>
    ),
};
