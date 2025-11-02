import { SignInSuccessResponse } from "@react-native-google-signin/google-signin";

import googleAuthServiceInstance, { GoogleSignInResult } from "@/src/domain/services/googleAuthService";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useAuth from "@/src/presentation/hooks/useAuth";
import useClass from "@/src/presentation/hooks/useClass";
import useMail from "@/src/presentation/hooks/useMail";
import useNews from "@/src/presentation/hooks/useNews";
import useSetting from "@/src/presentation/hooks/useSetting";
import useTimetable from "@/src/presentation/hooks/useTimetable";

export type GoogleSignInFlowResult =
    | { kind: "success"; studentId: string; firebaseUser: SignInSuccessResponse["data"] }
    | { kind: "cancelled" }
    | { kind: "invalid-domain"; email: string; allowedDomain: string }
    | { kind: "error"; error: unknown };

export interface AuthCoordinator {
    /**
     * Google認証のセッションを明示的に破棄します。
     */
    resetGoogleSession(): Promise<void>;

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
    public async resetGoogleSession(): Promise<void> {
        await googleAuthServiceInstance.signOut();
    }

    public async signInWithGoogle(): Promise<GoogleSignInFlowResult> {
        const result: GoogleSignInResult = await googleAuthServiceInstance.signIn();
        if (result.kind !== "success") {
            return result;
        }

        const firebaseUser = result.data;
        useAuth.getState().setFirebaseUser(firebaseUser);

        return {
            kind: "success",
            firebaseUser,
            studentId: this.extractStudentId(firebaseUser.user.email),
        };
    }

    public async signInWithCredentials(studentId: string, password: string): Promise<void> {
        const authStore = useAuth.getState();
        await authStore.authService.authTest(studentId, password);
        useAuth.getState().signIn(studentId, password);
    }

    public async signOut(): Promise<void> {
        this.clearContentStores();
        await googleAuthServiceInstance.signOut();
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
