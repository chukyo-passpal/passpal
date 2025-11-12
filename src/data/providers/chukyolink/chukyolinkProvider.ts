import { httpClient } from "@/src/data/clients/httpClient";
import { ChukyoLink_URLS } from "@/src/utils/urls";

export interface ChukyoLinkProvider {
    /**
     * ChukyoLinkの指定パスにGETリクエストを送り、内容を取得します。
     * @param path 取得したいリソースのパス
     * @returns レスポンスボディの文字列
     */
    get(path: string): Promise<string>;
}

export class IntegratedChukyoLinkProvider implements ChukyoLinkProvider {
    protected baseUrl = ChukyoLink_URLS.base;

    public async get(path: string): Promise<string> {
        const response = await httpClient(`${this.baseUrl}${path}`, {
            clientMode: "default",
            method: "GET",
        });
        return await response.text();
    }
}

const chukyoLinkProviderInstance = new IntegratedChukyoLinkProvider();
export default chukyoLinkProviderInstance;
