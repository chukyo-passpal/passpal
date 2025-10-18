import { httpClient } from "@/src/data/clients/httpClient";
import { CUService } from "@/src/domain/constants/chukyo-univ";
import { abstractChukyoProvider } from "./abstractChukyoProvider";

export class CubicsProvider extends abstractChukyoProvider {
    protected baseUrl = "https://cubics-as-out.mng.chukyo-u.ac.jp";
    protected authEnterPath = "/unias/UnSSOLoginControl2";
    protected authGoalPath = "/unias/UnSSOLoginControl2";
    protected serviceName: CUService = "cubics";

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

const cubicsProviderInstance = new CubicsProvider();
export default cubicsProviderInstance;
