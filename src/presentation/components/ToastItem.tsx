import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";
import { Text, XStack } from "tamagui";
import type { Toast } from "../hooks/useToast";
import { useToastStore } from "../hooks/useToast";
import { lightColors } from "../tokens/colors";

interface ToastItemProps {
    toast: Toast;
}

/**
 * Individual Toast Item Component
 */
export function ToastItem({ toast }: ToastItemProps) {
    const removeToast = useToastStore((state) => state.removeToast);
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        // Fade in animation
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacity, translateY]);

    const getToastColor = () => {
        switch (toast.type) {
            case "success":
                return lightColors.status.success;
            case "error":
                return lightColors.status.error;
            case "warning":
                return lightColors.status.warning;
            case "info":
                return lightColors.status.info;
        }
    };

    const getToastIcon = () => {
        const iconProps = { size: 20, color: "#FFFFFF" };
        switch (toast.type) {
            case "success":
                return <CheckCircle {...iconProps} />;
            case "error":
                return <XCircle {...iconProps} />;
            case "warning":
                return <AlertCircle {...iconProps} />;
            case "info":
                return <Info {...iconProps} />;
        }
    };

    const handleDismiss = () => {
        // Fade out animation
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -20,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            removeToast(toast.id);
        });
    };

    return (
        <Animated.View
            style={{
                opacity,
                transform: [{ translateY }],
                marginBottom: 8,
            }}
        >
            <Pressable onPress={handleDismiss}>
                <XStack
                    style={{
                        backgroundColor: getToastColor(),
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        alignItems: "center",
                        gap: 8,
                        minWidth: 300,
                        maxWidth: 400,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}
                >
                    {getToastIcon()}
                    <Text color="#FFFFFF" fontSize="$4" fontWeight="500" flex={1} flexWrap="wrap">
                        {toast.message}
                    </Text>
                </XStack>
            </Pressable>
        </Animated.View>
    );
}
