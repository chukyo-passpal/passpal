import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastStore {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast: Toast = { id, ...toast };

        set((state) => ({
            toasts: [...state.toasts, newToast],
        }));

        // Auto remove toast after duration
        const duration = toast.duration ?? 3000;
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, duration);
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}));

/**
 * Hook to show toasts from anywhere in the app
 * @example
 * ```tsx
 * const toast = useToast();
 * toast.success("保存しました");
 * toast.error("エラーが発生しました");
 * ```
 */
export function useToast() {
    const addToast = useToastStore((state) => state.addToast);

    return {
        success: (message: string, duration?: number) => addToast({ message, type: "success", duration }),
        error: (message: string, duration?: number) => addToast({ message, type: "error", duration }),
        warning: (message: string, duration?: number) => addToast({ message, type: "warning", duration }),
        info: (message: string, duration?: number) => addToast({ message, type: "info", duration }),
    };
}
