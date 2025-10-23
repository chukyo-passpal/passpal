import { httpClient } from "@/src/data/clients/httpClient";
import { CUService } from "@/src/domain/constants/chukyo-univ";
import { abstractChukyoProvider } from "./abstractChukyoProvider";

export interface ManaboProvider {
    /**
     * Manaboの指定パスにGETリクエストを送り、内容を取得します。
     * @param path 取得したいリソースのパス
     * @returns レスポンスボディの文字列
     */
    get(path: string): Promise<string>;

    /**
     * ManaboにPOSTリクエストを送り、応答本文を取得します。
     * @param path POST先のパス
     * @param contentType リクエストのContent-Typeヘッダー
     * @param body 送信するボディ
     * @returns レスポンスボディの文字列
     */
    post(path: string, contentType: string, body: BodyInit): Promise<string>;
    /**
     * 認証情報が有効かどうかをShibboleth認証で検証します。
     * @param studentId 学籍番号
     * @param cuIdPass CU-IDのパスワード
     * @returns 認証が成功した場合はtrue
     */
    authTest(studentId: string, cuIdPass: string): Promise<boolean>;
}

export class IntegratedManaboProvider extends abstractChukyoProvider implements ManaboProvider {
    protected baseUrl = "https://manabo.cnc.chukyo-u.ac.jp";
    protected authEnterPath = "/auth/shibboleth/";
    protected authGoalPath = "/auth/shibboleth/";
    protected serviceName: CUService = "manabo";

    public async get(path: string): Promise<string> {
        const response = await httpClient(`${this.baseUrl}${path}`, {
            clientMode: "portal",
            method: "GET",
            credentials: "omit",
            headers: {
                cookie: await this.getAuthedCookie(),
            },
        });
        return await response.text();
    }

    public async post(path: string, contentType: string, body: BodyInit): Promise<string> {
        const response = await httpClient(`${this.baseUrl}${path}`, {
            clientMode: "portal",
            method: "POST",
            credentials: "omit",
            body,
            headers: {
                cookie: await this.getAuthedCookie(),
                "Content-Type": contentType,
            },
        });
        return await response.text();
    }

    public async authTest(studentId: string, cuIdPass: string): Promise<boolean> {
        try {
            await this.authentication({
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
