import { Button } from "@/src/presentation/components/Button";
import { Card } from "@/src/presentation/components/Card";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";
import { getUserMessage } from "./errorHandler";

interface ErrorFallbackProps {
    error: Error;
    resetError: () => void;
}

/**
 * 深刻なエラーが発生した際のフォールバックUI
 */
export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
    const message = getUserMessage(error);

    const handleRetry = () => {
        resetError();
    };

    const handleGoHome = () => {
        router.replace("/(tabs)");
        resetError();
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <YStack gap="$4" p="$4">
                    <Card>
                        <YStack gap="$3" p="$4">
                            {/* エラーアイコン */}
                            <View style={styles.iconContainer}>
                                <Text style={styles.iconText}>⚠️</Text>
                            </View>

                            {/* エラータイトル */}
                            <Text style={styles.title}>エラーが発生しました</Text>

                            {/* エラーメッセージ */}
                            <Text style={styles.message}>{message}</Text>

                            {/* デバッグ情報（開発モードのみ） */}
                            {__DEV__ && (
                                <View style={styles.debugContainer}>
                                    <Text style={styles.debugTitle}>デバッグ情報:</Text>
                                    <Text style={styles.debugText}>{error.name}</Text>
                                    <Text style={styles.debugText}>{error.stack}</Text>
                                </View>
                            )}

                            {/* アクションボタン */}
                            <XStack gap="$2" mt="$2">
                                <View style={{ flex: 1 }}>
                                    <Button onPress={handleRetry} variant="secondary">
                                        再試行
                                    </Button>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button onPress={handleGoHome}>ホームへ</Button>
                                </View>
                            </XStack>
                        </YStack>
                    </Card>
                </YStack>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    contentContainer: {
        width: "100%",
        maxWidth: 400,
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 8,
    },
    iconText: {
        fontSize: 64,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    message: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        lineHeight: 24,
    },
    debugContainer: {
        backgroundColor: "#f0f0f0",
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    debugTitle: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#666",
    },
    debugText: {
        fontSize: 10,
        color: "#999",
        fontFamily: "monospace",
    },
});
