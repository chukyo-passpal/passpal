import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    SignInSuccessResponse,
} from "@react-native-google-signin/google-signin";

import authServiceInstance from "@/src/domain/services/authService";

export type GoogleSignInResult =
    | { kind: "success"; data: SignInSuccessResponse["data"] }
    | { kind: "cancelled" }
    | { kind: "invalid-domain"; email: string; allowedDomain: string }
    | { kind: "error"; error: unknown };

export interface GoogleAuthService {
    /**
     * Google サインインの設定を行います。
     */
    configure(): void;

    /**
     * Google サインインのセッションを破棄します。
     */
    signOut(): Promise<void>;

    /**
     * サインインを実行し結果を返します。
     */
    signIn(): Promise<GoogleSignInResult>;
    
    /**
     * Google サインインエラーをユーザー表示用メッセージへ変換します。
     */
    toReadableError(error: unknown): string;
}

export class IntegratedGoogleAuthService implements GoogleAuthService {
    public configure(): void {
        GoogleSignin.configure({
            hostedDomain: authServiceInstance.allowedMailDomain,
            webClientId: authServiceInstance.webClientId,
            offlineAccess: true,
        });
    }

    public async signOut(): Promise<void> {
        await GoogleSignin.signOut();
    }

    public async signIn(): Promise<GoogleSignInResult> {
        try {
            await GoogleSignin.signOut();
            const response = await GoogleSignin.signIn();

            if (!isSuccessResponse(response)) {
                return { kind: "cancelled" };
            }

            const email = response.data.user.email;
            if (!email.endsWith(authServiceInstance.allowedMailDomain)) {
                return {
                    kind: "invalid-domain",
                    email,
                    allowedDomain: authServiceInstance.allowedMailDomain,
                };
            }

            return { kind: "success", data: response.data };
        } catch (error) {
            return { kind: "error", error };
        }
    }

    public toReadableError(error: unknown): string {
        if (isErrorWithCode(error)) {
            return `エラーが発生しました(${error.code}): ${error.message}`;
        }

        if (error instanceof Error) {
            return `エラーが発生しました: ${error.message}`;
        }

        return "エラーが発生しました。";
    }
}

const googleAuthServiceInstance = new IntegratedGoogleAuthService();
export default googleAuthServiceInstance;
