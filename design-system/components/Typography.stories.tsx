import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Typography, Heading1, Heading2, Heading3, BodyText, BodySmall, Caption, Label, ThemeProvider } from "../index";

const meta: Meta<typeof Typography> = {
    title: "Design System/Typography",
    component: Typography,
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
                component: "Typography component system with various text styles and hierarchy.",
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["h1", "h2", "h3", "body", "bodySmall", "caption", "label", "button", "buttonSmall"],
            description: "Typography variant",
        },
        color: {
            control: "text",
            description: "Text color (overrides theme default)",
        },
        children: {
            control: "text",
            description: "Text content",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Typography>;

// Basic Typography variants
export const Heading1Example: Story = {
    args: {
        variant: "h1",
        children: "Heading 1 - Main Page Title",
    },
};

export const Heading2Example: Story = {
    args: {
        variant: "h2",
        children: "Heading 2 - Section Title",
    },
};

export const Heading3Example: Story = {
    args: {
        variant: "h3",
        children: "Heading 3 - Subsection Title",
    },
};

export const BodyExample: Story = {
    args: {
        variant: "body",
        children: "Body text - This is the standard text for content and descriptions.",
    },
};

export const BodySmallExample: Story = {
    args: {
        variant: "bodySmall",
        children: "Small body text - Used for secondary information and details.",
    },
};

export const CaptionExample: Story = {
    args: {
        variant: "caption",
        children: "Caption text - Used for image captions and fine print.",
    },
};

export const LabelExample: Story = {
    args: {
        variant: "label",
        children: "Label text - Used for form labels and categories.",
    },
};

export const ButtonExample: Story = {
    args: {
        variant: "button",
        children: "Button text - Standard button text style.",
    },
};

export const ButtonSmallExample: Story = {
    args: {
        variant: "buttonSmall",
        children: "Small button text - Compact button text style.",
    },
};

// Preset typography components
export const HeadingComponents: Story = {
    render: () => (
        <View style={{ gap: 16 }}>
            <Heading1>Heading 1 Component</Heading1>
            <Heading2>Heading 2 Component</Heading2>
            <Heading3>Heading 3 Component</Heading3>
        </View>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pre-configured heading components.",
            },
        },
    },
};

export const BodyComponents: Story = {
    render: () => (
        <View style={{ gap: 12 }}>
            <BodyText>Body text component - Standard paragraph text.</BodyText>
            <BodySmall>Body small component - Secondary information text.</BodySmall>
            <Caption>Caption component - Fine print and image captions.</Caption>
            <Label>Label component - Form labels and categories.</Label>
        </View>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pre-configured body text components.",
            },
        },
    },
};

// Color variations
export const WithCustomColors: Story = {
    render: () => (
        <View style={{ gap: 12 }}>
            <Typography variant="body" color="#FF5722">
                Custom red color text
            </Typography>
            <Typography variant="body" color="#4CAF50">
                Custom green color text
            </Typography>
            <Typography variant="body" color="#2196F3">
                Custom blue color text
            </Typography>
        </View>
    ),
    parameters: {
        docs: {
            description: {
                story: "Typography with custom colors.",
            },
        },
    },
};

// Complete typography hierarchy
export const TypographyHierarchy: Story = {
    render: () => (
        <View style={{ gap: 16 }}>
            <Heading1>Heading 1 - 28px/34px Bold</Heading1>
            <Heading2>Heading 2 - 24px/30px Bold</Heading2>
            <Heading3>Heading 3 - 20px/26px Semibold</Heading3>
            <BodyText>Body Text - 16px/24px Regular</BodyText>
            <BodySmall>Body Small - 14px/20px Regular</BodySmall>
            <Label>Label - 14px/20px Medium</Label>
            <Caption>Caption - 12px/16px Regular</Caption>
        </View>
    ),
    parameters: {
        docs: {
            description: {
                story: "Complete typography hierarchy showing all text styles.",
            },
        },
    },
};
