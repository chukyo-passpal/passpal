import { httpClient } from "@/src/data/clients/httpClient";
import { CUService } from "@/src/domain/constants/chukyo-univ";
import { ExpiredSessionError } from "../../errors/AuthError";
import { abstractChukyoProvider } from "./abstractChukyoProvider";

export class AlboProvider extends abstractChukyoProvider {
    protected baseUrl = "https://cubics-pt-out.mng.chukyo-u.ac.jp";
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

    private async waitForRetryDelay(): Promise<void> {
        const baseDelay = this.retryAuthDelayMs;
        const randomDelay = Math.floor(Math.random() * this.retryAuthDelayRandomMs);
        const totalDelay = baseDelay + randomDelay;
        return new Promise((resolve) => setTimeout(resolve, totalDelay));
    }

    private isSessionValid(responseText: string): boolean {
        // セッションが無効な場合、Alboは特定のタイトルのページを返す
        return !responseText.includes("<title>Missing cookie</title>");
    }
}

const alboProviderInstance = new AlboProvider();
export default alboProviderInstance;
