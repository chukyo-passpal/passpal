import type { Toast } from "../hooks/useToast";

/**
 * エラーの深刻度レベル
 */
export type ErrorSeverity = "recoverable" | "critical";

/**
 * アプリケーションエラーのインターフェース
 */
export interface AppError extends Error {
    severity?: ErrorSeverity;
    userMessage?: string;
}

/**
 * 続行可能なエラー（Toastで表示）
 */
const RECOVERABLE_ERRORS = ["NetworkError", "TimeoutError", "MapError", "ParseError", "UnauthorizedError", "OverlapsError"] as const;

/**
 * 深刻なエラー（ErrorFallbackで表示）
 */
const CRITICAL_ERRORS = ["MaintenanceError", "ExpiredSessionError", "AuthError", "NotSetError", "DataBuildError"] as const;

/**
 * エラーの深刻度を判定
 */
export function getErrorSeverity(error: Error): ErrorSeverity {
    // AppErrorの場合は明示的に指定された深刻度を使用
    if ("severity" in error && error.severity) {
        return error.severity as ErrorSeverity;
    }

    // エラー名で判定
    if (CRITICAL_ERRORS.includes(error.name as any)) {
        return "critical";
    }

    if (RECOVERABLE_ERRORS.includes(error.name as any)) {
        return "recoverable";
    }

    // デフォルトは深刻なエラー扱い
    return "critical";
}

/**
 * ユーザー向けのエラーメッセージを取得
 */
export function getUserMessage(error: Error): string {
    // AppErrorの場合は明示的に指定されたメッセージを使用
    if ("userMessage" in error && error.userMessage) {
        return error.userMessage as string;
    }

    // ErrorFactoryで作成されたエラーの場合はmessageを使用
    if (error.message) {
        return error.message;
    }

    // デフォルトメッセージ
    return "予期しないエラーが発生しました";
}

/**
 * エラーのToastタイプを取得
 */
export function getToastType(error: Error): Toast["type"] {
    const errorName = error.name;

    // 認証系エラー
    if (errorName === "UnauthorizedError" || errorName === "AuthError" || errorName === "ExpiredSessionError") {
        return "warning";
    }

    // ネットワーク系エラー
    if (errorName === "NetworkError" || errorName === "TimeoutError" || errorName === "MaintenanceError") {
        return "error";
    }

    // その他
    return "error";
}
