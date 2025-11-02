import { SignInSuccessResponse } from "@react-native-google-signin/google-signin";

import { shibbolethWebViewAuthFunction } from "@/src/data/clients/chukyoShibboleth";
import authRepositoryInstance from "@/src/data/repositories/authRepository";
import googleAuthServiceInstance, {
    GoogleAuthService,
    GoogleSignInResult,
} from "@/src/domain/services/googleAuthService";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useAuth from "@/src/presentation/hooks/useAuth";
import useClass from "@/src/presentation/hooks/useClass";
import useMail from "@/src/presentation/hooks/useMail";
import useNews from "@/src/presentation/hooks/useNews";
import useSetting from "@/src/presentation/hooks/useSetting";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import { NotSetError } from "../errors/serviceError";

export type GoogleSignInFlowResult =
    | { kind: "success"; studentId: string; firebaseUser: SignInSuccessResponse["data"] }
    | { kind: "cancelled" }
    | { kind: "invalid-domain"; email: string; allowedDomain: string }
    | { kind: "error"; error: unknown };

export interface AuthService {
    /**
     * Googleサインインで許可するメールドメイン
     */
    readonly allowedMailDomain: string;

    /**
     * Googleサインイン時に使用するFirebase Admin SDKのWebクライアントID
     */
    readonly webClientId: string;

    /**
     * Shibboleth認証を実行し、Cookieを取得します。
     *
     * 認証処理はキューに追加され、同時に複数の認証処理が走らないようにします。
     * @param params 認証処理に渡すパラメーター
     * @returns 認証結果のPromise
     * @throws NotSetError 認証関数が設定されていない場合
     */
    shibAuth: (...params: Parameters<shibbolethWebViewAuthFunction>) => ReturnType<shibbolethWebViewAuthFunction>;

    /**
     * Shibboleth認証に利用するWebViewの実装を設定します。
     * @param func 認証処理を行う関数
     */
    setChukyoShibbolethAuthFunction: (func: shibbolethWebViewAuthFunction) => void;

    /**
     * 指定した資格情報で認証テストを実行します。
     * @param studentId 学籍番号
     * @param cuIdPass CU-IDのパスワード
     * @returns 認証成功可否のPromise
     */
    authTest: (studentId: string, cuIdPass: string) => Promise<boolean>;

    /**
     * Google認証のセッションを明示的に破棄します。
     */
    resetGoogleSession(): Promise<void>;

    /**
     * Google認証を実行し、成功時にはFirebaseユーザー情報を保持します。
     */
    signInWithGoogle(): Promise<GoogleSignInFlowResult>;

    /**
     * CU-IDの資格情報でShibboleth認証を行い、成功時にストアへ保存します。
     * 認証に失敗した場合は例外をそのまま呼び出し元へ伝播します。
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

export class IntegratedAuthService implements AuthService {
    protected chukyoShibbolethAuth?: shibbolethWebViewAuthFunction;
    protected shibAuthQueue: Promise<void> = Promise.resolve();
    protected authRepository = authRepositoryInstance;

    constructor(private readonly googleAuthService: GoogleAuthService = googleAuthServiceInstance) {}

    public get allowedMailDomain(): string {
        return this.authRepository.allowedMailDomain;
    }
    public get webClientId(): string {
        return this.authRepository.webClientId;
    }

    public setChukyoShibbolethAuthFunction = (func: shibbolethWebViewAuthFunction) => {
        this.chukyoShibbolethAuth = func;
    };

    public authTest(studentId: string, cuIdPass: string): Promise<boolean> {
        return this.authRepository.authTest(studentId, cuIdPass);
    }

    public shibAuth = (
        ...params: Parameters<shibbolethWebViewAuthFunction>
    ): ReturnType<shibbolethWebViewAuthFunction> => {
        if (this.chukyoShibbolethAuth === undefined) {
            throw new NotSetError({
                cause: new Error("AuthServiceにChukyoShibbolethAuthが設定されていません"),
            });
        }
        const authFn = this.chukyoShibbolethAuth;
        const task = () => authFn(...params);
        const queuedPromise = this.shibAuthQueue.then(task, task);
        this.shibAuthQueue = queuedPromise.then(
            () => undefined,
            () => undefined
        );
        return queuedPromise;
    };

    public async resetGoogleSession(): Promise<void> {
        await this.googleAuthService.signOut();
    }

    public async signInWithGoogle(): Promise<GoogleSignInFlowResult> {
        const result: GoogleSignInResult = await this.googleAuthService.signIn();
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
        await this.googleAuthService.signOut();
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

const authServiceInstance = new IntegratedAuthService();
export default authServiceInstance;
