import { CUService } from "@/constants/chukyo-univ";
import { abstractChukyoProvider } from "./abstractChukyoProvider";

export class CubicsProvider extends abstractChukyoProvider {
    protected baseUrl = "https://cubics-as-out.mng.chukyo-u.ac.jp";
    protected authEnterPath = "/unias/UnSSOLoginControl2";
    protected authGoalPath = "/unias/UnSSOLoginControl2";
    protected serviceName: CUService = "cubics";

    // 時間割(教室取得)
    public async getTimetableHtml(): Promise<string> {
        const response = await this.client.get(`${this.baseUrl}/unias/UnSSOLoginControl2?REQ_ACTION_DO=/ARF010.do&REQ_PRFR_MNU_ID=MNUIDSTD0103`, {
            headers: {
                cookie: await this.getAuthedCookie(),
            },
        });

        return response.text();
    }
}

const cubicsProviderInstance = new CubicsProvider();
export default cubicsProviderInstance;
