import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Typography } from "./Typography";

const meta = {
    title: "Components/Typography",
    component: Typography,
    argTypes: {
        variant: {
            control: "select",
            options: ["h1", "h2", "h3", "body", "bodySmall", "button", "buttonSmall", "caption"],
        },
    },
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const H1: Story = {
    args: {
        variant: "h1",
        children: "Heading 1",
    },
};

export const H2: Story = {
    args: {
        variant: "h2",
        children: "Heading 2",
    },
};

export const H3: Story = {
    args: {
        variant: "h3",
        children: "Heading 3",
    },
};

export const Body: Story = {
    args: {
        variant: "body",
        children: "This is body text. これは本文のテキストです。",
    },
};

export const BodySmall: Story = {
    args: {
        variant: "bodySmall",
        children: "This is small body text. これは小さな本文のテキストです。",
    },
};

export const Button: Story = {
    args: {
        variant: "button",
        children: "Button Text",
    },
};

export const ButtonSmall: Story = {
    args: {
        variant: "buttonSmall",
        children: "Small Button Text",
    },
};

export const Caption: Story = {
    args: {
        variant: "caption",
        children: "Caption text - キャプションテキスト",
    },
};

export const CustomColor: Story = {
    args: {
        variant: "h2",
        color: "#B19CD9",
        children: "Custom Colored Text",
    },
};

export const LongText: Story = {
    args: {
        variant: "body",
        children:
            "これは長いテキストの例です。複数行にわたって表示されることを確認するために、十分な長さのテキストを用意しています。PassPalアプリケーションでは、様々な情報を表示するために、このようなテキストコンポーネントを使用します。",
    },
};

export const AllVariants: Story = {
    args: {
        children: "Text",
    },
    render: () => (
        <View style={{ gap: 16 }}>
            <Typography variant="h1">Heading 1 - 見出し1</Typography>
            <Typography variant="h2">Heading 2 - 見出し2</Typography>
            <Typography variant="h3">Heading 3 - 見出し3</Typography>
            <Typography variant="body">Body text - 本文テキスト</Typography>
            <Typography variant="bodySmall">Small body text - 小さな本文</Typography>
            <Typography variant="button">Button Text - ボタンテキスト</Typography>
            <Typography variant="buttonSmall">Small Button - 小ボタン</Typography>
            <Typography variant="caption">Caption - キャプション</Typography>
        </View>
    ),
};

export const ColorVariations: Story = {
    args: {
        children: "Text",
    },
    render: () => (
        <View style={{ gap: 16 }}>
            <Typography variant="h2" color="#000000">
                Black Text
            </Typography>
            <Typography variant="h2" color="#B19CD9">
                Primary Color
            </Typography>
            <Typography variant="h2" color="#666666">
                Gray Text
            </Typography>
            <Typography variant="h2" color="#999999">
                Light Gray
            </Typography>
            <Typography variant="h2" color="#FF0000">
                Red Text
            </Typography>
        </View>
    ),
};

export const TypographyShowcase: Story = {
    args: {
        children: "Text",
    },
    render: () => (
        <View style={{ gap: 24 }}>
            <View>
                <Typography variant="caption" color="#999">
                    H1 - 32px / 38.4px
                </Typography>
                <Typography variant="h1">PassPal アプリケーション</Typography>
            </View>

            <View>
                <Typography variant="caption" color="#999">
                    H2 - 24px / 28.8px
                </Typography>
                <Typography variant="h2">ホーム画面</Typography>
            </View>

            <View>
                <Typography variant="caption" color="#999">
                    H3 - 18px / 21.6px
                </Typography>
                <Typography variant="h3">課題一覧</Typography>
            </View>

            <View>
                <Typography variant="caption" color="#999">
                    Body - 16px / 24px
                </Typography>
                <Typography variant="body">これは本文テキストの例です。アプリケーション内で最も一般的に使用されるテキストスタイルです。</Typography>
            </View>

            <View>
                <Typography variant="caption" color="#999">
                    Body Small - 14px / 21px
                </Typography>
                <Typography variant="bodySmall">小さな本文テキスト。補足情報などに使用します。</Typography>
            </View>

            <View>
                <Typography variant="caption" color="#999">
                    Button - 16px / 24px (Bold)
                </Typography>
                <Typography variant="button">ボタンテキスト</Typography>
            </View>

            <View>
                <Typography variant="caption" color="#999">
                    Caption - 12px / 18px
                </Typography>
                <Typography variant="caption">キャプションテキスト・注釈</Typography>
            </View>
        </View>
    ),
};
