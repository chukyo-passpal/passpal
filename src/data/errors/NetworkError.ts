import { ErrorFactory } from "@praha/error-factory";

export class MaintenanceError extends ErrorFactory({
    name: "MaintenanceError",
    message: "ポータルサイトがメンテナンス中です。",
}) { }

export class TimeoutError extends ErrorFactory({
    name: "TimeoutError",
    message: "リクエストがタイムアウトしました。",
}) { }

export class NetworkError extends ErrorFactory({
    name: "NetworkError",
    message: "ネットワークエラーが発生しました",
}) {}
