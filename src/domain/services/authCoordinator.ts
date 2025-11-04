import {
    signInWithCredential as firebaseSignInInWithCredential,
    getAuth,
    getIdToken,
    GoogleAuthProvider,
} from "@react-native-firebase/auth";
import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    SignInSuccessResponse,
} from "@react-native-google-signin/google-signin";

import { AuthProcessError } from "@/src/data/errors/AuthError";
import authRepositoryInstance from "@/src/data/repositories/authRepository";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useAuth from "@/src/presentation/hooks/useAuth";
import useClass from "@/src/presentation/hooks/useClass";
import useMail from "@/src/presentation/hooks/useMail";
import useNews from "@/src/presentation/hooks/useNews";
import useSetting from "@/src/presentation/hooks/useSetting";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import authServiceInstance from "./authService";

export type GoogleSignInFlowResult =
    | { kind: "success"; studentId: string; firebaseUser: SignInSuccessResponse["data"] }
    | { kind: "cancelled" }
    | { kind: "invalid-domain"; email: string; allowedDomain: string }
    | { kind: "error"; error: unknown };

export interface AuthCoordinator {
    /**
     * サインインの初期設定を行います。
     */
    configure(): void;

    /**
     * Google サインインエラーをユーザー表示用メッセージへ変換します。
     */
    formatGoogleSignInErrorMessage(error: unknown): string;

    /**
     * Google認証を実行し、成功時にはFirebaseユーザー情報を保持します。
     * @returns 認証結果
     */
    signInWithGoogle(): Promise<GoogleSignInFlowResult>;

    /**
     * CU-IDの資格情報でShibboleth認証を行い、成功時にストアへ保存します。
     * 認証に失敗した場合は例外をそのまま呼び出し元へ伝播します。
     * @param studentId 学籍番号
     * @param password CU-IDパスワード
     * @throws 認証に失敗した場合の例外
     */
    signInWithCredentials(studentId: string, password: string): Promise<void>;

    /**
     * 各種キャッシュを消しつつサインアウト処理を行います。
     */
    signOut(): Promise<void>;

    /**
     * 認証関連のキャッシュと一部ストアの状態を破棄します。
     */
    purgeCaches(): void;
}

export class IntegratedAuthService implements AuthCoordinator {
    public configure(): void {
        GoogleSignin.configure({
            hostedDomain: authServiceInstance.allowedMailDomain,
            webClientId: authServiceInstance.webClientId,
            offlineAccess: true,
        });
    }

    public formatGoogleSignInErrorMessage(error: unknown): string {
        if (isErrorWithCode(error)) {
            return `エラーが発生しました(${error.code}): ${error.message}`;
        }

        if (error instanceof Error) {
            return `エラーが発生しました: ${error.message}`;
        }

        return "エラーが発生しました。";
    }

    public async signInWithGoogle(): Promise<GoogleSignInFlowResult> {
        try {
            await GoogleSignin.signOut();
            const response = await GoogleSignin.signIn();

            // ユーザーがキャンセルした場合
            if (!isSuccessResponse(response)) {
                return { kind: "cancelled" };
            }

            // メールドメインの検証
            const email = response.data.user.email;
            if (!email.endsWith(authServiceInstance.allowedMailDomain)) {
                return {
                    kind: "invalid-domain",
                    email,
                    allowedDomain: authServiceInstance.allowedMailDomain,
                };
            }

            // ユーザー情報を取得
            const firebaseIdToken = await this.getFirebaseIdToken();
            const firebaseUser = response.data;
            // PalAPIにログイン
            authRepositoryInstance.login(firebaseIdToken);
            // Firebaseユーザー情報をストアに保存
            useAuth.getState().setFirebaseUser(firebaseUser);

            return {
                kind: "success",
                firebaseUser,
                studentId: this.extractStudentId(firebaseUser.user.email),
            };
        } catch (error) {
            return { kind: "error", error };
        }
    }

    /**
     * FirebaseのIDトークンを取得します。
     *
     * ! RNGoogleSignInでsignInした後に呼び出す必要があります。
     *
     * @throw AuthProcessError 取得に失敗した場合
     * @returns FirebaseのIDトークン
     */
    private async getFirebaseIdToken(): Promise<string> {
        try {
            // 1. Google Sign-Inからトークンを取得
            const { idToken, accessToken } = await GoogleSignin.getTokens();
            // 2. IDトークンからFirebase認証用Credentialを作成
            const googleCredential = GoogleAuthProvider.credential(idToken, accessToken);
            // 3. Firebaseにサインイン
            const auth = getAuth();
            await firebaseSignInInWithCredential(auth, googleCredential);
            // 4. Firebase発行のIDトークンを取得
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("Firebaseの現在のユーザーが存在しません");
            const firebaseIdToken = await getIdToken(currentUser);
            if (!firebaseIdToken) throw new Error("FirebaseのIDトークンが取得できません");
            return firebaseIdToken;
        } catch (e) {
            throw new AuthProcessError({ cause: e });
        }
    }

    public async signInWithCredentials(studentId: string, password: string): Promise<void> {
        const authStore = useAuth.getState();
        await authStore.authService.authTest(studentId, password);
        useAuth.getState().signIn(studentId, password);
    }

    public async signOut(): Promise<void> {
        this.clearContentStores();
        await GoogleSignin.signOut();
        useAuth.getState().signOut();
    }

    public purgeCaches(): void {
        useAuth.getState().purgeCache();
        useMail.getState().clear();
        useNews.getState().clear();
        useClass.getState().clear();
        useAssignment.getState().clear();
    }

    private clearContentStores(): void {
        useTimetable.getState().clear();
        useMail.getState().clear();
        useNews.getState().clear();
        useClass.getState().clear();
        useAssignment.getState().clear();
        useSetting.getState().reset();
    }

    private extractStudentId(email: string): string {
        return email.split("@")[0] ?? email;
    }
}

const authCoordinatorInstance = new IntegratedAuthService();
export default authCoordinatorInstance;
