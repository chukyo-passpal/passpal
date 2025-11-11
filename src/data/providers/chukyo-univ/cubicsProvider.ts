import { httpClient } from "@/src/data/clients/httpClient";
import { CUService } from "@/src/domain/constants/chukyo-univ";
import { CUBICS_URLS } from "@/src/utils/urls";
import { shibbolethWebViewAuthFunction } from "../../clients/chukyoShibboleth";
import { ExpiredSessionError } from "../../errors/AuthError";
import { AbstractChukyoProvider, IntegratedAbstractChukyoProvider } from "./abstractChukyoProvider";

export interface CubicsProvider extends AbstractChukyoProvider {
    /**
     * CubicsポータルにGETリクエストを送り、必要に応じて再認証を実行します。
     * @param authFunc shibboleth認証を行う関数
     * @param path リクエスト先のパス
     * @returns 応答本文のテキスト
     * @throws ExpiredSessionError セッション再取得に失敗した場合
     */
    get(authFunc: shibbolethWebViewAuthFunction, path: string): Promise<string>;
}

export class IntegratedCubicsProvider extends IntegratedAbstractChukyoProvider implements CubicsProvider {
    protected baseUrl = CUBICS_URLS.base;
    protected authEnterPath = "/unias/UnSSOLoginControl2";
    protected authGoalPath = "/unias/UnSSOLoginControl2";
    protected serviceName: CUService = "cubics";

    protected retryAuthCount = 3;
    protected retryAuthDelayMs = 200;
    protected retryAuthDelayRandomMs = 300;

    public async get(authFunc: shibbolethWebViewAuthFunction, path: string): Promise<string> {
        for (let attempt = 0; attempt <= this.retryAuthCount; attempt++) {
            const response = await httpClient(`${this.baseUrl}${path}`, {
                clientMode: "portal",
                method: "GET",
                credentials: "omit",
                headers: {
                    cookie: await this.getAuthedCookie(authFunc),
                    "Accept-Language": "ja",
                },
            });

            const responseText = await response.text();
            if (this.isSessionValid(response, responseText)) {
                return responseText;
            }

            // セッションが無効なら再認証を試みる
            console.warn(`Cubics session expired. Attempting re-fetch (${attempt + 1}/${this.retryAuthCount})`);
            await this.waitForRetryDelay();
        }
        throw new ExpiredSessionError();
    }

    /**
     * 再認証試行間にランダムな遅延を挿入します。
     * @returns 遅延完了時に解決するPromise
     */
    private async waitForRetryDelay(): Promise<void> {
        const baseDelay = this.retryAuthDelayMs;
        const randomDelay = Math.floor(Math.random() * this.retryAuthDelayRandomMs);
        const totalDelay = baseDelay + randomDelay;
        return new Promise((resolve) => setTimeout(resolve, totalDelay));
    }

    /**
     * レスポンスからセッションが有効かどうかを判定します。
     * @param res HTTPレスポンスオブジェクト
     * @param responseText 判定対象のHTML文字列
     * @returns セッションが有効ならtrue
     */
    private isSessionValid(res: Response, responseText: string): boolean {
        const invalidTitles = ["<title>Missing cookie</title>", "<title>クッキーが見つかりません</title>"];
        // リダイレクト先のURLがベースURLと異なる場合、セッションが無効と判断
        if (!res.url.startsWith(this.baseUrl)) {
            return false;
        }
        // セッションが無効な場合に返されるタイトルをチェック
        for (const title of invalidTitles) {
            if (responseText.includes(title)) {
                return false;
            }
        }
        return true;
    }
}

const cubicsProviderInstance = new IntegratedCubicsProvider();
export default cubicsProviderInstance;
