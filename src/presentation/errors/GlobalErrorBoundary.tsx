import { useToast } from "@/src/presentation/hooks/useToast";
import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorFallback } from "./ErrorFallback";
import { getErrorSeverity, getToastType, getUserMessage } from "./errorHandler";

interface Props {
    children: ReactNode;
}

interface State {
    error: Error | null;
    hasError: boolean;
}

/**
 * グローバルエラーバウンダリー
 * - 続行可能なエラー: Toastで表示して継続
 * - 深刻なエラー: ErrorFallbackで表示
 */
export class GlobalErrorBoundary extends Component<Props, State> {
    // Toast表示用の関数を静的に保持（publicにして外部から設定可能に）
    public static toastHandler: ReturnType<typeof useToast> | null = null;

    constructor(props: Props) {
        super(props);
        this.state = { error: null, hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // エラーの深刻度を判定
        const severity = getErrorSeverity(error);

        if (severity === "recoverable") {
            // 続行可能なエラーの場合はToastを表示して状態を更新しない
            if (GlobalErrorBoundary.toastHandler) {
                const message = getUserMessage(error);
                const type = getToastType(error);

                if (type === "error") {
                    GlobalErrorBoundary.toastHandler.error(message);
                } else if (type === "warning") {
                    GlobalErrorBoundary.toastHandler.warning(message);
                } else {
                    GlobalErrorBoundary.toastHandler.info(message);
                }
            }

            // エラー状態を設定しないので、UIは継続表示
            return { error: null, hasError: false };
        }

        // 深刻なエラーの場合はErrorFallbackを表示
        return { error, hasError: true };
    }

    override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // エラーログを出力（開発環境のみ）
        if (__DEV__) {
            console.error("ErrorBoundary caught an error:", error, errorInfo);
        }

        // TODO: プロダクション環境ではエラートラッキングサービスに送信
        // Example: Sentry.captureException(error, { extra: errorInfo });
    }

    resetError = () => {
        this.setState({ error: null, hasError: false });
    };

    override render() {
        if (this.state.hasError && this.state.error) {
            return <ErrorFallback error={this.state.error} resetError={this.resetError} />;
        }

        return this.props.children;
    }
}

/**
 * Toast関数を設定するためのフックコンポーネント
 */
export function ErrorBoundaryToastConnector() {
    const toast = useToast();

    React.useEffect(() => {
        GlobalErrorBoundary.toastHandler = toast;

        return () => {
            GlobalErrorBoundary.toastHandler = null;
        };
    }, [toast]);

    return null;
}
