import { ErrorFactory } from "@praha/error-factory";

export class AuthError extends ErrorFactory({
    name: "AuthError",
    message: "認証に失敗しました",
}) {}
