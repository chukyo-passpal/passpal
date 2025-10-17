import { CUService } from "@/constants/chukyo-univ";
import { abstractChukyoProvider } from "./abstractChukyoProvider";

export class AlboProvider extends abstractChukyoProvider {
    protected baseUrl = "https://cubics-pt-out.mng.chukyo-u.ac.jp";
    protected authEnterPath = "/uniprove_pt/UnLoginControl";
    protected authGoalPath = "/uniprove_pt/portal";
    protected serviceName: CUService = "albo";

    // ALBOお知らせ
    public async getNewsHtml(): Promise<string> {
        const response = await this.client.get(`${this.baseUrl}/uniprove_pt/portal/_ns:YXJldHJvLXN0dWRlbnQtMTAwMDN8ZDI_`, {
            headers: {
                cookie: await this.getAuthedCookie(),
            },
        });

        return response.text();
    }

    // ALBOお知らせ内容表示
    public async getNewsViewHtml(): Promise<string> {
        const response = await this.client.get(`${this.baseUrl}/uniprove_pt/PMA020PVI01Action.do`, {
            headers: {
                cookie: await this.getAuthedCookie(),
            },
        });

        return response.text();
    }
}

const alboProviderInstance = new AlboProvider();
export default alboProviderInstance;
