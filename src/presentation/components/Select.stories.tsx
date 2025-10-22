import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { View } from "react-native";
import { Select, SelectItem } from "./Select";

const meta = {
    title: "Components/Select",
    component: Select,
    argTypes: {
        native: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
    decorators: [
        (Story) => (
            <View style={{ padding: 16, minHeight: 300 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const basicItems: SelectItem[] = [
    { label: "オプション 1", value: "1" },
    { label: "オプション 2", value: "2" },
    { label: "オプション 3", value: "3" },
];

const courseItems: SelectItem[] = [
    { label: "情報システム概論 I", value: "course1" },
    { label: "プログラミング基礎", value: "course2" },
    { label: "データベース", value: "course3" },
    { label: "ネットワーク基礎", value: "course4" },
];

const periodItems: SelectItem[] = [
    { label: "1限 (9:00 - 10:30)", value: "period1" },
    { label: "2限 (10:40 - 12:10)", value: "period2" },
    { label: "3限 (13:00 - 14:30)", value: "period3" },
    { label: "4限 (14:40 - 16:10)", value: "period4" },
    { label: "5限 (16:20 - 17:50)", value: "period5" },
];

export const Default: Story = {
    args: {
        items: basicItems,
        placeholder: "オプションを選択",
    },
};

export const WithValue: Story = {
    args: {
        items: basicItems,
        value: "2",
        placeholder: "オプションを選択",
    },
};

export const WithGroupLabel: Story = {
    args: {
        items: courseItems,
        placeholder: "授業を選択",
        groupLabel: "履修授業",
    },
};

export const Disabled: Story = {
    args: {
        items: basicItems,
        value: "1",
        disabled: true,
        placeholder: "無効な選択",
    },
};

export const ManyItems: Story = {
    args: {
        items: periodItems,
        placeholder: "時限を選択",
    },
};

const InteractiveComponent = () => {
    const [value, setValue] = useState<string>("");

    return (
        <View style={{ gap: 16 }}>
            <Select items={courseItems} value={value} onValueChange={setValue} placeholder="授業を選択してください" groupLabel="履修授業" />
            {value && (
                <View style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 8 }}>
                    <View>選択された値: {value}</View>
                </View>
            )}
        </View>
    );
};

export const Interactive: Story = {
    args: {
        items: [],
        placeholder: "Select",
    },
    render: () => <InteractiveComponent />,
};

const MultipleSelectsComponent = () => {
    const [course, setCourse] = useState<string>("");
    const [period, setPeriod] = useState<string>("");

    return (
        <View style={{ gap: 16 }}>
            <Select items={courseItems} value={course} onValueChange={setCourse} placeholder="授業を選択" groupLabel="履修授業" />
            <Select items={periodItems} value={period} onValueChange={setPeriod} placeholder="時限を選択" groupLabel="時限" />
        </View>
    );
};

export const MultipleSelects: Story = {
    args: {
        items: [],
        placeholder: "Select",
    },
    render: () => <MultipleSelectsComponent />,
};
