import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { View } from "react-native";
import { Icon } from "./Icon";
import { Input } from "./Input";

const meta = {
    title: "Components/Input",
    component: Input,
    argTypes: {
        isPassword: {
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
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "Enter text...",
    },
};

export const WithValue: Story = {
    args: {
        value: "Sample text",
        placeholder: "Enter text...",
    },
};

export const WithLabel: Story = {
    args: {
        label: "Username",
        placeholder: "Enter your username",
    },
};

export const WithError: Story = {
    args: {
        label: "Email",
        value: "invalid-email",
        error: "Please enter a valid email address",
        placeholder: "Enter your email",
    },
};

export const Password: Story = {
    args: {
        label: "Password",
        isPassword: true,
        placeholder: "Enter your password",
    },
};

export const WithLeftIcon: Story = {
    args: {
        placeholder: "Search...",
        leftIcon: <Icon name="user" size={20} />,
    },
};

export const WithRightIcon: Story = {
    args: {
        placeholder: "Enter location",
        rightIcon: <Icon name="map-pin" size={20} />,
    },
};

export const Disabled: Story = {
    args: {
        value: "Disabled input",
        disabled: true,
        placeholder: "This is disabled",
    },
};

export const MultilineExample: Story = {
    args: {
        placeholder: "Enter description...",
        multiline: true,
    },
};

const InteractiveComponent = () => {
    const [value, setValue] = useState("");
    return <Input value={value} onChangeText={setValue} placeholder="Type something..." label="Interactive Input" />;
};

export const Interactive: Story = {
    args: {
        placeholder: "Type something...",
    },
    render: () => <InteractiveComponent />,
};

const LoginFormComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={{ gap: 16 }}>
            <Input value={username} onChangeText={setUsername} placeholder="学籍番号" label="学籍番号" leftIcon={<Icon name="user" size={20} />} />
            <Input
                value={password}
                onChangeText={setPassword}
                placeholder="パスワード"
                label="パスワード"
                isPassword
                leftIcon={<Icon name="lock" size={20} />}
            />
        </View>
    );
};

export const LoginForm: Story = {
    args: {
        placeholder: "Username",
    },
    render: () => <LoginFormComponent />,
};

export const AllStates: Story = {
    args: {
        placeholder: "Input",
    },
    render: () => (
        <View style={{ gap: 16 }}>
            <Input placeholder="Default state" />
            <Input value="With value" placeholder="With value" />
            <Input placeholder="With left icon" leftIcon={<Icon name="user" size={20} />} />
            <Input placeholder="With right icon" rightIcon={<Icon name="calendar" size={20} />} />
            <Input placeholder="Password" isPassword />
            <Input value="invalid@" error="Invalid email address" placeholder="With error" />
            <Input value="Disabled" disabled placeholder="Disabled" />
        </View>
    ),
};
