import { ErrorFactory } from "@praha/error-factory";

export class UnauthorizedError extends ErrorFactory({
    name: "UnauthorizedError",
    message: "ログインに失敗しました。IDまたはパスワードが正しくありません。",
}) {}
