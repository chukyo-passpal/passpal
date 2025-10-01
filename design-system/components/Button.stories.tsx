import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Button, PrimaryButton, SecondaryButton, TextButton, ThemeProvider } from "../index";

const meta: Meta<typeof Button> = {
    title: "Design System/Button",
    component: Button,
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
                component: "Versatile button component with multiple variants, sizes and states.",
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "text"],
            description: "Button variant",
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
            description: "Button size",
        },
        fullWidth: {
            control: "boolean",
            description: "Whether button takes full width",
        },
        loading: {
            control: "boolean",
            description: "Loading state",
        },
        disabled: {
            control: "boolean",
            description: "Disabled state",
        },
        children: {
            control: "text",
            description: "Button content",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Basic Button stories
export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Primary Button",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Secondary Button",
    },
};

export const Text: Story = {
    args: {
        variant: "text",
        children: "Text Button",
    },
};

// Size variations
export const SmallButton: Story = {
    args: {
        size: "small",
        children: "Small Button",
    },
};

export const MediumButton: Story = {
    args: {
        size: "medium",
        children: "Medium Button",
    },
};

export const LargeButton: Story = {
    args: {
        size: "large",
        children: "Large Button",
    },
};

// State variations
export const Loading: Story = {
    args: {
        loading: true,
        children: "Loading Button",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: "Disabled Button",
    },
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
        children: "Full Width Button",
    },
};

// Preset button components
export const PrimaryButtonExample: Story = {
    render: () => <PrimaryButton>Primary Button</PrimaryButton>,
    parameters: {
        docs: {
            description: {
                story: "Pre-configured primary button component.",
            },
        },
    },
};

export const SecondaryButtonExample: Story = {
    render: () => <SecondaryButton>Secondary Button</SecondaryButton>,
    parameters: {
        docs: {
            description: {
                story: "Pre-configured secondary button component.",
            },
        },
    },
};

export const TextButtonExample: Story = {
    render: () => <TextButton>Text Button</TextButton>,
    parameters: {
        docs: {
            description: {
                story: "Pre-configured text button component.",
            },
        },
    },
};

// Showcase of all variants
export const AllVariants: Story = {
    render: () => (
        <View style={{ gap: 16 }}>
            <PrimaryButton>Primary Button</PrimaryButton>
            <SecondaryButton>Secondary Button</SecondaryButton>
            <TextButton>Text Button</TextButton>
        </View>
    ),
    parameters: {
        docs: {
            description: {
                story: "Showcase of all button variants.",
            },
        },
    },
};
