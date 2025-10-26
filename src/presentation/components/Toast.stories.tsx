import type { Meta, StoryObj } from "@storybook/react";
import { Button, YStack } from "tamagui";
import { useToast } from "../hooks/useToast";
import { Toast } from "./Toast";

const meta = {
    title: "Components/Toast",
    component: Toast,
    parameters: {
        notes: "Toast notification system for showing success, error, warning, and info messages",
    },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

function ToastDemo() {
    const toast = useToast();

    return (
        <YStack gap="$4" p="$4">
            <Button onPress={() => toast.success("操作が成功しました")}>Success Toast</Button>
            <Button onPress={() => toast.error("エラーが発生しました")}>Error Toast</Button>
            <Button onPress={() => toast.warning("警告メッセージです")}>Warning Toast</Button>
            <Button onPress={() => toast.info("情報を表示します")}>Info Toast</Button>
            <Button
                onPress={() =>
                    toast.success("長いメッセージのテストです。これは長いメッセージが表示された時にどのように見えるかを確認するためのテストです。", 5000)
                }
            >
                Long Message (5s)
            </Button>
            <Toast />
        </YStack>
    );
}

export const Default: Story = {
    render: () => <ToastDemo />,
};

export const Success: Story = {
    render: () => {
        function SuccessDemo() {
            const toast = useToast();
            return (
                <YStack gap="$4" p="$4">
                    <Button onPress={() => toast.success("保存しました")}>Show Success</Button>
                    <Toast />
                </YStack>
            );
        }
        return <SuccessDemo />;
    },
};

export const Error: Story = {
    render: () => {
        function ErrorDemo() {
            const toast = useToast();
            return (
                <YStack gap="$4" p="$4">
                    <Button onPress={() => toast.error("削除に失敗しました")}>Show Error</Button>
                    <Toast />
                </YStack>
            );
        }
        return <ErrorDemo />;
    },
};

export const Warning: Story = {
    render: () => {
        function WarningDemo() {
            const toast = useToast();
            return (
                <YStack gap="$4" p="$4">
                    <Button onPress={() => toast.warning("ネットワーク接続が不安定です")}>Show Warning</Button>
                    <Toast />
                </YStack>
            );
        }
        return <WarningDemo />;
    },
};

export const Info: Story = {
    render: () => {
        function InfoDemo() {
            const toast = useToast();
            return (
                <YStack gap="$4" p="$4">
                    <Button onPress={() => toast.info("新しい通知があります")}>Show Info</Button>
                    <Toast />
                </YStack>
            );
        }
        return <InfoDemo />;
    },
};
