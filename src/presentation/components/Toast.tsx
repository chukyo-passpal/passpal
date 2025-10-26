import { AnimatePresence, YStack } from "tamagui";
import { useToastStore } from "../hooks/useToast";
import { ToastItem } from "./ToastItem";

/**
 * Toast Container Component
 * Displays all active toasts in a stack
 */
export function Toast() {
    const toasts = useToastStore((state) => state.toasts);

    return (
        <YStack
            position="absolute"
            style={{
                top: 48,
                left: 0,
                right: 0,
                alignItems: "center",
                zIndex: 9999,
            }}
            pointerEvents="box-none"
        >
            <AnimatePresence>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} />
                ))}
            </AnimatePresence>
        </YStack>
    );
}
