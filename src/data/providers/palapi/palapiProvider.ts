import { diContainer } from "@/src/di/container";
import { DI_TOKENS } from "@/src/di/tokens";
import { httpClient } from "@/src/data/clients/httpClient";
import { PALAPI_URLS } from "@/src/utils/urls";

export interface PalAPIProvider {
    /**
     * PalAPIの指定パスにGETリクエストを送り、内容を取得します。
     * @param path 取得したいリソースのパス
     * @returns レスポンスボディの文字列
     */
    get(path: string): Promise<string>;

    /**
     * PalAPIにPOSTリクエストを送り、応答本文を取得します。
     * @param path POST先のパス
     * @param options.body 送信するボディ
     * @param options.contentType リクエストのContent-Typeヘッダー
     * @param options.bearer リクエストの認証情報
     * @returns レスポンスボディの文字列
     */
    post(
        path: string,
        options?: {
            body?: BodyInit;
            contentType?: string;
            bearer?: string;
        }
    ): Promise<string>;
}

export class IntegratedPalAPIProvider implements PalAPIProvider {
    protected baseUrl = PALAPI_URLS.base;

    public async get(path: string): Promise<string> {
        const response = await httpClient(`${this.baseUrl}${path}`, {
            clientMode: "palapi",
            method: "GET",
        });
        return await response.text();
    }

    public async post(
        path: string,
        options?: {
            body?: BodyInit;
            contentType?: string;
            bearer?: string;
        }
    ): Promise<string> {
        const { body, contentType, bearer } = options || {};

        let headers: HeadersInit = {};

        if (bearer) headers["Authorization"] = `Bearer ${bearer}`;
        if (contentType) headers["Content-Type"] = contentType;

        const response = await httpClient(`${this.baseUrl}${path}`, {
            clientMode: "palapi",
            method: "POST",
            body,
            headers,
        });
        return await response.text();
    }
}

diContainer.registerSingleton(DI_TOKENS.palAPIProvider, () => new IntegratedPalAPIProvider());

const palAPIProviderInstance = diContainer.resolve<PalAPIProvider>(DI_TOKENS.palAPIProvider);
export default palAPIProviderInstance;
