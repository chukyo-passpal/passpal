import { CUService } from "@/constants/chukyo-univ";
import { UserData } from "@/types/user";
import { Result } from "@/types/utils";
import { abstractChukyoProvider } from "./abstractChukyoProvider";

export class ManaboProvider extends abstractChukyoProvider {
    protected baseUrl = "https://manabo.cnc.chukyo-u.ac.jp";
    protected authEnterPath = "/auth/shibboleth/";
    protected authGoalPath = "/auth/shibboleth/";
    // protected credentialsRottenTime: number = 1000; // キャッシュしない
    protected serviceName: CUService = "manabo";

    public async authTest(user: UserData): Promise<Result> {
        try {
            await this.authentication(user);
        } catch (e: unknown) {
            if (e instanceof Error) {
                return {
                    isSuccess: false,
                    err: e,
                };
            }
            if (typeof e === "string" && e === "LOGIN_FAILED") {
                return { isSuccess: false, err: new Error("学籍番号またはパスワードが間違っています") };
            }
            return { isSuccess: false, err: new Error(String(e)) };
        }
        return {
            isSuccess: true,
        };
    }

    public async getTimetableHtml(): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                action: "glexa_ajax_timetable_view",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // MaNaBoシステムお知らせ
    public async getNewsHtml(): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                action: "glexa_ajax_news_list",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // MaNaBo受信メール
    public async getReceivedMailHtml(page: number = 1): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                p: page.toString(),
                action: "glexa_ajax_mail_receive_list",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // MaNaBo送信メール
    public async getSentMailHtml(page: number = 2): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                p: page.toString(),
                action: "glexa_ajax_mail_send_list",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // MaNaBoメール内容表示
    public async getMailViewHtml(mailId: string): Promise<string> {
        const response = await this.client.get(`${this.baseUrl}/?mail_id=${mailId}&action=glexa_modal_mail_view&_=${Date.now()}`, {
            headers: {
                cookie: await this.getAuthedCookie(),
            },
        });

        return response.text();
    }

    // MaNaBoメール送信ウィンドウ
    public async getMailSendFormHtml(): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                action: "glexa_modal_mail_form",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // MaNaBoメール宛先検索
    public async getMailMemberSearchHtml(query: string): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                q: query,
                action: "glexa_modal_mail_ajax_member_list",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // 授業ディレクトリ
    public async getClassDirectoryHtml(classId: string, directoryId: string = "0"): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                class_id: classId,
                directory_id: directoryId,
                action: "glexa_ajax_class_directory_list",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // 授業のお知らせ
    public async getClassNewsHtml(classId: string, directoryId: string = "0"): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                class_id: classId,
                directory_id: directoryId,
                action: "glexa_ajax_class_news_list",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // 授業のシラバス
    public async getClassSyllabusHtml(classId: string): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                class_id: classId,
                action: "addon_syllabus_api_top",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // 授業のコンテンツ
    public async getClassContentHtml(classId: string, directoryId: string): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                class_id: classId,
                directory_id: directoryId,
                action: "glexa_ajax_class_content_list",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // 授業の出席表
    public async getClassEntryHtml(classId: string): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                class_id: classId,
                action: "glexa_modal_entry_view",
                _: Date.now().toString(),
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // 課題の結果
    public async getClassQuizResultHtml(
        pluginId: string,
        classId: string,
        id: string,
        directoryId: string,
        attendId: string,
        result: string = "0",
        page: number = 0
    ): Promise<string> {
        const response = await this.client.get(
            `${
                this.baseUrl
            }/?plugin_id=${pluginId}&classId=${classId}&id=${id}&directory_id=${directoryId}&attend_id=${attendId}&result=${result}&p=${page}&action=plugin_quiz_ajax_result_list&_=${Date.now()}`,
            {
                headers: {
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // 未受講のコンテンツ
    public async getClassNotAttendContentHtml(viewType: string, classId: string, directoryId: string): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                view_type: viewType,
                class_id: classId,
                directory_id: directoryId,
                action: "glexa_ajax_class_content_list",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // 出席あり通知 (JSON)
    public async getEntryExistJson(classId: string): Promise<string> {
        const response = await this.client.post(
            `${this.baseUrl}/`,
            new URLSearchParams({
                class_id: classId,
                is_ajax: "1",
                action: "glexa_modal_entry_form",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    credentials: "omit",
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }

    // MaNaBo出席ウィンドウ
    public async getEntryFormHtml(classId: string): Promise<string> {
        const response = await this.client.get(`${this.baseUrl}/?class_id=${classId}&action=glexa_modal_entry_form&_=${Date.now()}`, {
            headers: {
                cookie: await this.getAuthedCookie(),
            },
        });

        return response.text();
    }

    // MaNaBo出席登録
    public async submitEntry(classId: string, directoryId: string, entryId: string, uniqid: string): Promise<string> {
        const response = await this.client.get(
            `${
                this.baseUrl
            }/?action=glexa_modal_entry_form_accept&class_id=${classId}&directory_id=${directoryId}&entry_id=${entryId}&uniqid=${uniqid}&_=${Date.now()}`,
            {
                headers: {
                    cookie: await this.getAuthedCookie(),
                },
            }
        );

        return response.text();
    }
}

const manaboProviderInstance = new ManaboProvider();
export default manaboProviderInstance;
