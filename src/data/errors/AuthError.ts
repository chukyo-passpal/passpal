import { ErrorFactory } from "@praha/error-factory";

export class UnauthorizedError extends ErrorFactory({
    name: "UnauthorizedError",
    message: "ログインに失敗しました。IDまたはパスワードが正しくありません。",
}) {}

export class ExpiredSessionError extends ErrorFactory({
    name: "ExpiredSessionError",
    message: "セッションの有効期限が切れました。キャッシュクリアして再度試してください。",
}) {}

export class OverlapsError extends ErrorFactory({
    name: "OverlapsError",
    message: "他の認証が行われています。"
}) { }
