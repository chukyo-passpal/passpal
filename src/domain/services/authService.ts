import { shibbolethWebViewAuthFunction } from "@/src/data/clients/chukyoShibboleth";
import manaboProviderInstance from "@/src/data/providers/chukyo-univ/manaboProvider";
import { NotSetError } from "../errors/serviceError";

export interface AuthService {
    shibAuth: (...params: Parameters<shibbolethWebViewAuthFunction>) => ReturnType<shibbolethWebViewAuthFunction>;
    setChukyoShibbolethAuthFunction: (func: shibbolethWebViewAuthFunction) => void;
    authTest: (studentId: string, cuIdPass: string) => Promise<boolean>;
}

export class IntegratedAuthService implements AuthService {
    protected chukyoShibbolethAuth?: shibbolethWebViewAuthFunction;
    protected shibAuthQueue: Promise<void> = Promise.resolve();
    protected manaboProvider = manaboProviderInstance;

    /**
     * Shibboleth認証に利用するWebViewの実装を設定します。
     * @param func 認証処理を行う関数
     */
    public setChukyoShibbolethAuthFunction = (func: shibbolethWebViewAuthFunction) => {
        this.chukyoShibbolethAuth = func;
    };

    /**
     * 指定した資格情報でManaboの認証テストを実行します。
     * @param studentId 学籍番号
     * @param cuIdPass CU-IDのパスワード
     * @returns 認証成功可否のPromise
     */
    public authTest(studentId: string, cuIdPass: string): Promise<boolean> {
        return this.manaboProvider.authTest(studentId, cuIdPass);
    }

    /**
     * Shibboleth認証を実行し、Cookieを取得します。
     *
     * 認証処理はキューに追加され、同時に複数の認証処理が走らないようにします。
     * @param params 認証処理に渡すパラメーター
     * @returns 認証結果のPromise
     * @throws NotSetError 認証関数が設定されていない場合
     */
    public shibAuth = (...params: Parameters<shibbolethWebViewAuthFunction>): ReturnType<shibbolethWebViewAuthFunction> => {
        if (this.chukyoShibbolethAuth === undefined) {
            throw new NotSetError({ cause: new Error("AuthServiceにChukyoShibbolethAuthが設定されていません") });
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
}

const authServiceInstance = new IntegratedAuthService();
export default authServiceInstance;
