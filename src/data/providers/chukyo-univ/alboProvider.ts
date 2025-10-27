import { httpClient } from "@/src/data/clients/httpClient";
import { CUService } from "@/src/domain/constants/chukyo-univ";
import { ALBO_URLS } from "@/src/utils/urls";
import { ExpiredSessionError } from "../../errors/AuthError";
import { abstractChukyoProvider } from "./abstractChukyoProvider";

export interface AlboProvider {
    /**
     * AlboポータルにGETリクエストを送り、必要に応じて再認証を行います。
     * @param path リクエスト先のパス
     * @returns 応答ボディのテキスト
     * @throws ExpiredSessionError 再試行してもセッションが復旧しない場合
     */
    get(path: string): Promise<string>;
}

export class IntegratedAlboProvider extends abstractChukyoProvider implements AlboProvider {
    protected baseUrl = ALBO_URLS.base;
    protected authEnterPath = "/uniprove_pt/UnLoginControl";
    protected authGoalPath = "/uniprove_pt/portal";
    protected serviceName: CUService = "albo";

    protected retryAuthCount = 3;
    protected retryAuthDelayMs = 200;
    protected retryAuthDelayRandomMs = 300;

    public async get(path: string): Promise<string> {
        for (let attempt = 0; attempt <= this.retryAuthCount; attempt++) {
            const response = await httpClient(`${this.baseUrl}${path}`, {
                clientMode: "portal",
                method: "GET",
                credentials: "omit",
                headers: {
                    cookie: await this.getAuthedCookie(),
                },
            });
            const responseText = await response.text();
            if (this.isSessionValid(responseText)) {
                return responseText;
            }
            // セッションが無効なら再認証を試みる
            console.warn(`Albo session expired. Attempting re-authentication (${attempt + 1}/${this.retryAuthCount})`);
            await this.waitForRetryDelay();
        }
        throw new ExpiredSessionError();
    }

    /**
     * 再認証前にランダムな遅延を挟み、連続リクエストを緩和します。
     * @returns 遅延完了後に解決するPromise
     */
    private async waitForRetryDelay(): Promise<void> {
        const baseDelay = this.retryAuthDelayMs;
        const randomDelay = Math.floor(Math.random() * this.retryAuthDelayRandomMs);
        const totalDelay = baseDelay + randomDelay;
        return new Promise((resolve) => setTimeout(resolve, totalDelay));
    }

    /**
     * レスポンスの内容からセッションが有効かどうかを判定します。
     * @param responseText 判定対象のHTML文字列
     * @returns 有効ならtrue、無効ならfalse
     */
    private isSessionValid(responseText: string): boolean {
        // セッションが無効な場合、Alboは特定のタイトルのページを返す
        return !responseText.includes("<title>Missing cookie</title>");
    }
}

const alboProviderInstance = new IntegratedAlboProvider();
export default alboProviderInstance;
