import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Card, CardContent, CardDivider, CardHeader, FeatureCard, InfoCard } from "./Card";
import { Icon } from "./Icon";
import { Typography } from "./Typography";

const meta = {
    title: "Components/Card",
    component: Card,
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "feature", "info"],
        },
    },
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: "default",
        children: <Typography variant="body">This is a default card</Typography>,
    },
};

export const Feature: Story = {
    args: {
        variant: "feature",
        children: <Typography variant="body">This is a feature card</Typography>,
    },
};

export const Info: Story = {
    args: {
        variant: "info",
        children: <Typography variant="body">This is an info card</Typography>,
    },
};

export const WithHeader: Story = {
    args: {
        variant: "default",
        children: (
            <>
                <CardHeader title="Card Title" subtitle="Card Subtitle" icon={<Icon name="info" size={20} />} />
                <CardContent>
                    <Typography variant="body">Card content goes here</Typography>
                </CardContent>
            </>
        ),
    },
};

export const WithDivider: Story = {
    args: {
        variant: "default",
        children: (
            <>
                <CardHeader title="Section 1" />
                <CardDivider />
                <CardContent>
                    <Typography variant="body">First section content</Typography>
                </CardContent>
                <CardDivider />
                <CardHeader title="Section 2" />
                <CardContent>
                    <Typography variant="body">Second section content</Typography>
                </CardContent>
            </>
        ),
    },
};

export const FeatureCardExample: Story = {
    args: {
        children: null,
    },
    render: () => (
        <FeatureCard
            title="リアルタイム同期"
            description="授業情報や課題を自動で取得し、最新の情報を常に表示します。"
            icon={<Icon name="refresh-cw" size={24} />}
        />
    ),
};

export const InfoCardExample: Story = {
    args: {
        children: null,
    },
    render: () => <InfoCard title="次の授業" content="情報システム概論 I\n10:40 - 12:10" icon={<Icon name="calendar" size={20} />} />,
};

export const AllVariants: Story = {
    args: {
        children: null,
    },
    render: () => (
        <View style={{ gap: 16 }}>
            <Card variant="default">
                <Typography variant="body">Default Card</Typography>
            </Card>

            <Card variant="feature">
                <Typography variant="body">Feature Card</Typography>
            </Card>

            <Card variant="info">
                <Typography variant="body">Info Card</Typography>
            </Card>

            <Card variant="default">
                <CardHeader title="Card with Header" subtitle="And subtitle" icon={<Icon name="check-circle" size={20} />} />
                <CardContent>
                    <Typography variant="body">Content goes here</Typography>
                </CardContent>
            </Card>
        </View>
    ),
};
