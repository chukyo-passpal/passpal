import { ErrorFactory } from "@praha/error-factory";

export class NotFoundError extends ErrorFactory({
    name: "NotFoundError",
    message: "指定されたリソースが見つかりません",
}) {}

export class ServiceTemporarilyUnavailableError extends ErrorFactory({
    name: "ServiceTemporarilyUnavailableError",
    message: "ポータルサイトがメンテナンス中です。",
}) { }

export class UnauthorizedError extends ErrorFactory({
    name: "UnauthorizedError",
    message: "認証に失敗しました。再度ログインしてください。",
}) { }

export class ForbiddenError extends ErrorFactory({
    name: "ForbiddenError",
    message: "この操作を実行する権限がありません。",
}) { }

export class BadRequestError extends ErrorFactory({
    name: "BadRequestError",
    message: "不正なリクエストが送信されました。",
}) { }

export class InternalServerError extends ErrorFactory({
    name: "InternalServerError",
    message: "サーバー内部でエラーが発生しました。",
}) { }

export class TimeoutError extends ErrorFactory({
    name: "TimeoutError",
    message: "リクエストがタイムアウトしました。",
}) { }

export class NetworkError extends ErrorFactory({
    name: "NetworkError",
    message: "ネットワークエラーが発生しました",
}) {}
