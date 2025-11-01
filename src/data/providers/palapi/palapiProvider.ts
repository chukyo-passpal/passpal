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
     * @param contentType リクエストのContent-Typeヘッダー
     * @param body 送信するボディ
     * @returns レスポンスボディの文字列
     */
    post(path: string, contentType: string, body: BodyInit, bearer: string): Promise<string>;
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

    public async post(path: string, contentType: string, body: BodyInit, bearer: string): Promise<string> {
        const response = await httpClient(`${this.baseUrl}${path}`, {
            clientMode: "palapi",
            method: "POST",
            body,
            headers: {
                Authorization: `Bearer ${bearer}`,
                "Content-Type": contentType,
            },
        });
        return await response.text();
    }
}

const palAPIProviderInstance = new IntegratedPalAPIProvider();
export default palAPIProviderInstance;
