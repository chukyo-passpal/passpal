import { CUService } from "@/src/domain/constants/chukyo-univ";
import { NotSetError } from "@/src/domain/errors/serviceError";
import { CookieCredentials } from "@/src/domain/models/auth";
import { UserData } from "@/src/domain/models/user";
import { authState } from "@/src/presentation/hooks/useAuth";
import { cookiesToString } from "@/src/utils/cookie";
import { Cookies } from "@react-native-cookies/cookies";

export abstract class abstractChukyoProvider {
    protected abstract baseUrl: string;
    protected abstract authEnterPath: string;
    protected abstract authGoalPath: string;
    protected abstract serviceName: CUService;
    protected credentialsRottenTime: number = 25 * 60 * 1000; // 25分

    private _auth: authState | undefined;
    /**
     * プロバイダーが利用する認証ストアへのget
     * @throws NotSetError 認証ストアが設定されていない場合
     */
    protected get auth() {
        if (!this._auth) {
            throw new NotSetError({ cause: new Error("ChukyoProviderにauthStateが設定されていません") });
        }
        return this._auth;
    }
    /**
     * 認証関連の状態ストアをセットします。
     * @param auth 認証状態を管理するストア
     */
    public setAuthStore(auth: authState) {
        this._auth = auth;
    }

    /**
     * サービスごとのクッキー保存メソッドを呼び出します。
     * @param cookies 保存するクッキー
     * @param service クッキーを紐づけるサービス種別
     */
    private async setCredentialCookies(cookies: Cookies, service: CUService) {
        switch (service) {
            case "manabo":
                this.auth.setManaboCookie(cookies);
                break;
            case "albo":
                this.auth.setAlboCookie(cookies);
                break;
            case "cubics":
                this.auth.setCubicsCookie(cookies);
                break;
            default:
                throw new Error("Unknown service");
        }
    }

    /**
     * サービスに対応する最新のクッキー資格情報を取得します。
     * @param service 参照したいサービス種別
     * @returns クッキー資格情報または未設定の場合はundefined
     */
    private async getCredentialCookies(service: CUService): Promise<CookieCredentials | undefined> {
        switch (service) {
            case "manabo":
                return this.auth.manaboCredentials;
            case "albo":
                return this.auth.alboCredentials;
            case "cubics":
                return this.auth.cubicsCredentials;
            default:
                throw new Error("Unknown service");
        }
    }

    /**
     * クッキーのキーに基づき保存対象かどうかを判定します。
     * @param key 判定対象のクッキーキー
     * @returns 保存すべき場合はtrue、除外すべき場合はfalse
     */
    private shouldSaveCookie(key: string): boolean {
        if (key.startsWith("AWSALB")) return false;
        if (key.startsWith("_opensaml_req_ss")) return false;
        return true;
    }

    /**
     * ユーザー情報をもとにShibboleth認証を行い、利用可能なクッキーを返します。
     * @param user 認証に利用するユーザー情報
     * @returns 認証後に利用可能なクッキー集合
     */
    protected async authentication(user: UserData): Promise<Cookies> {
        const { studentId, cuIdPass } = user;

        // SSOログイン
        const authFunc = this.auth.authService.shibAuth;
        const cookies = await authFunc({
            enterUrl: `${this.baseUrl}${this.authEnterPath}`,
            goalUrl: `${this.baseUrl}${this.authGoalPath}`,
            username: studentId,
            password: cuIdPass,
        });

        // AWSALB クッキーを除去
        const cleanedCookies: Cookies = {};
        for (const [key, value] of Object.entries(cookies)) {
            if (this.shouldSaveCookie(key)) {
                cleanedCookies[key] = value;
            }
        }

        if (Object.keys(cleanedCookies).length === 0) {
            throw new Error("No valid cookies found after authentication.");
        }

        await this.setCredentialCookies(cleanedCookies, this.serviceName);

        return cleanedCookies;
    }

    /**
     * 有効期限内のクッキーを取得し、必要に応じて再認証を実行します。
     * @returns HTTPヘッダー用に整形されたクッキー文字列
     * @throws NotSetError ユーザー情報が未設定の場合
     */
    protected async getAuthedCookie() {
        if (!this.auth.user) {
            throw new NotSetError({ cause: new Error("ユーザー情報が設定されていません") });
        }

        const credentials = await this.getCredentialCookies(this.serviceName);

        let cookies: Cookies;
        if (!credentials || credentials.lastRefreshedAt.getTime() + this.credentialsRottenTime < Date.now()) {
            cookies = await this.authentication(this.auth.user);
        } else {
            cookies = credentials.cookies;
        }

        return `; ${cookiesToString(cookies)}`;
    }
}
