import { httpClient } from "@/src/data/clients/httpClient";
import { CUService } from "@/src/domain/constants/chukyo-univ";
import { MANABO_URLS } from "@/src/utils/urls";
import { shibbolethWebViewAuthFunction } from "../../clients/chukyoShibboleth";
import { AbstractChukyoProvider, IntegratedAbstractChukyoProvider } from "./abstractChukyoProvider";

export interface ManaboProvider extends AbstractChukyoProvider {
    /**
     * Manaboの指定パスにGETリクエストを送り、内容を取得します。
     * @param authFunc shibboleth認証を行う関数
     * @param path 取得したいリソースのパス
     * @returns レスポンスボディの文字列
     */
    get(authFunc: shibbolethWebViewAuthFunction, path: string): Promise<string>;

    /**
     * ManaboにPOSTリクエストを送り、応答本文を取得します。
     * @param authFunc shibboleth認証を行う関数
     * @param path POST先のパス
     * @param contentType リクエストのContent-Typeヘッダー
     * @param body 送信するボディ
     * @returns レスポンスボディの文字列
     */
    post(authFunc: shibbolethWebViewAuthFunction, path: string, contentType: string, body: BodyInit): Promise<string>;
    /**
     * 認証情報が有効かどうかをShibboleth認証で検証します。
     * @param authFunc shibboleth認証を行う関数
     * @param studentId 学籍番号
     * @param cuIdPass CU-IDのパスワード
     * @returns 認証が成功した場合はtrue
     */
    authTest(authFunc: shibbolethWebViewAuthFunction, studentId: string, cuIdPass: string): Promise<boolean>;
}

export class IntegratedManaboProvider extends IntegratedAbstractChukyoProvider implements ManaboProvider {
    protected baseUrl = MANABO_URLS.base;
    protected authEnterPath = "/auth/shibboleth/";
    protected authGoalPath = "/auth/shibboleth/";
    protected serviceName: CUService = "manabo";

    public async get(authFunc: shibbolethWebViewAuthFunction, path: string): Promise<string> {
        const response = await httpClient(`${this.baseUrl}${path}`, {
            clientMode: "portal",
            method: "GET",
            credentials: "omit",
            headers: {
                cookie: await this.getAuthedCookie(authFunc),
                "Accept-Language": "ja",
            },
        });
        return await response.text();
    }

    public async post(
        authFunc: shibbolethWebViewAuthFunction,
        path: string,
        contentType: string,
        body: BodyInit
    ): Promise<string> {
        const response = await httpClient(`${this.baseUrl}${path}`, {
            clientMode: "portal",
            method: "POST",
            credentials: "omit",
            body,
            headers: {
                cookie: await this.getAuthedCookie(authFunc),
                "Content-Type": contentType,
                "Accept-Language": "ja",
            },
        });
        return await response.text();
    }

    public async authTest(
        authFunc: shibbolethWebViewAuthFunction,
        studentId: string,
        cuIdPass: string
    ): Promise<boolean> {
        try {
            await this.authentication(authFunc, {
                studentId,
                cuIdPass,
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}

const manaboProviderInstance = new IntegratedManaboProvider();
export default manaboProviderInstance;
