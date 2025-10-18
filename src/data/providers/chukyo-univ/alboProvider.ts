import { httpClient } from "@/src/data/clients/httpClient";
import { CUService } from "@/src/domain/constants/chukyo-univ";
import { abstractChukyoProvider } from "./abstractChukyoProvider";

export class AlboProvider extends abstractChukyoProvider {
    protected baseUrl = "https://cubics-pt-out.mng.chukyo-u.ac.jp";
    protected authEnterPath = "/uniprove_pt/UnLoginControl";
    protected authGoalPath = "/uniprove_pt/portal";
    protected serviceName: CUService = "albo";

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
}

const alboProviderInstance = new AlboProvider();
export default alboProviderInstance;
