import { httpClient } from "@/src/data/clients/httpClient";
import { CUService } from "@/src/domain/constants/chukyo-univ";
import { abstractChukyoProvider } from "./abstractChukyoProvider";

export class ManaboProvider extends abstractChukyoProvider {
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
}

const manaboProviderInstance = new ManaboProvider();
export default manaboProviderInstance;
