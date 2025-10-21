import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Button } from "./Button";

const meta = {
    title: "Components/Button",
    component: Button,
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "text"],
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
        fullWidth: {
            control: "boolean",
        },
        loading: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: "primary",
        size: "medium",
        children: "Primary Button",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        size: "medium",
        children: "Secondary Button",
    },
};

export const Text: Story = {
    args: {
        variant: "text",
        size: "medium",
        children: "Text Button",
    },
};

export const Small: Story = {
    args: {
        variant: "primary",
        size: "small",
        children: "Small Button",
    },
};

export const Medium: Story = {
    args: {
        variant: "primary",
        size: "medium",
        children: "Medium Button",
    },
};

export const Large: Story = {
    args: {
        variant: "primary",
        size: "large",
        children: "Large Button",
    },
};

export const FullWidth: Story = {
    args: {
        variant: "primary",
        size: "medium",
        fullWidth: true,
        children: "Full Width Button",
    },
};

export const Loading: Story = {
    args: {
        variant: "primary",
        size: "medium",
        loading: true,
        children: "Loading Button",
    },
};

export const Disabled: Story = {
    args: {
        variant: "primary",
        size: "medium",
        disabled: true,
        children: "Disabled Button",
    },
};

export const AllVariants: Story = {
    args: {
        children: "Button",
    },
    render: () => (
        <View style={{ gap: 16 }}>
            <Button variant="primary" size="large">
                Large Primary
            </Button>
            <Button variant="primary" size="medium">
                Medium Primary
            </Button>
            <Button variant="primary" size="small">
                Small Primary
            </Button>

            <Button variant="secondary" size="large">
                Large Secondary
            </Button>
            <Button variant="secondary" size="medium">
                Medium Secondary
            </Button>
            <Button variant="secondary" size="small">
                Small Secondary
            </Button>

            <Button variant="text" size="large">
                Large Text
            </Button>
            <Button variant="text" size="medium">
                Medium Text
            </Button>
            <Button variant="text" size="small">
                Small Text
            </Button>
        </View>
    ),
};
