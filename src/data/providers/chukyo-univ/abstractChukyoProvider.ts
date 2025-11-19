import { Cookies } from "@react-native-cookies/cookies";

import { CUService } from "@/src/domain/constants/chukyo-univ";
import { NotSetError } from "@/src/domain/errors/serviceError";
import { ChukyoUserAuthData, CookieCredentials } from "@/src/domain/models/auth";
import { authState } from "@/src/presentation/hooks/useAuth";
import { cookiesToString } from "@/src/utils/cookie";
import { shibbolethWebViewAuthFunction } from "../../clients/chukyoShibboleth";

export interface AbstractChukyoProvider {
    /**
     * 認証に使用するクッキーをクリアします
     */
    clearAuthCookie(): void;

    /**
     * 認証関連の状態ストアをセットします。
     * @param auth 認証状態を管理するストア
     */
    setAuthStore(auth: authState): void;
}

export abstract class IntegratedAbstractChukyoProvider implements AbstractChukyoProvider {
    protected abstract baseUrl: string;
    protected abstract authEnterPath: string;
    protected abstract authGoalPath: string;
    protected abstract serviceName: CUService;
    protected credentialsRottenTime: number = 25 * 60 * 1000; // 25分

    protected authCookie: CookieCredentials = {
        cookies: {},
        lastRefreshedAt: new Date(0),
    };
    protected setAuthCookie(cookies: Cookies) {
        this.authCookie.cookies = cookies;
        this.authCookie.lastRefreshedAt = new Date();
    }
    public clearAuthCookie() {
        this.authCookie = {
            cookies: {},
            lastRefreshedAt: new Date(0),
        };
    }

    private _auth: authState | undefined;
    /**
     * プロバイダーが利用する認証ストアへのget
     * @throws NotSetError 認証ストアが設定されていない場合
     */
    protected get auth() {
        if (!this._auth) {
            throw new NotSetError({
                cause: new Error("ChukyoProviderにauthStateが設定されていません"),
            });
        }
        return this._auth;
    }
    public setAuthStore(auth: authState) {
        this._auth = auth;
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
     * @param authFunc shibboleth認証を行う関数
     * @param user 認証に利用するユーザー情報
     * @returns 認証後に利用可能なクッキー集合
     */
    protected async authentication(
        authFunc: shibbolethWebViewAuthFunction,
        user: ChukyoUserAuthData
    ): Promise<Cookies> {
        const { studentId, cuIdPass } = user;

        // SSOログイン
        // const authFunc = this.auth.authService.shibAuth;
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

        this.setAuthCookie(cleanedCookies);
        return cleanedCookies;
    }

    /**
     * 有効期限内のクッキーを取得し、必要に応じて再認証を実行します。
     * @param authFunc shibboleth認証を行う関数
     * @returns HTTPヘッダー用に整形されたクッキー文字列
     * @throws NotSetError ユーザー情報が未設定の場合
     */
    protected async getAuthedCookie(authFunc: shibbolethWebViewAuthFunction) {
        if (!this.auth.user) {
            throw new NotSetError({
                cause: new Error("ユーザー情報が設定されていません"),
            });
        }

        let cookies: Cookies;
        if (this.authCookie.lastRefreshedAt.getTime() + this.credentialsRottenTime < Date.now()) {
            cookies = await this.authentication(authFunc, this.auth.user);
        } else {
            cookies = this.authCookie.cookies;
        }

        return `; ${cookiesToString(cookies)}`;
    }
}
