import * as parser from "@chukyo-passpal/web_parser";
import { ParseError } from "../errors/ParseError";
import manaboProviderInstance, { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";

export class MailRepository {
    private readonly manaboProvider: ManaboProvider;

    constructor({ manaboProvider = manaboProviderInstance }: { manaboProvider?: ManaboProvider } = {}) {
        this.manaboProvider = manaboProvider;
    }

    // 受信メール一覧取得
    public async getReceivedMailList(page: number = 1) {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                p: page.toString(),
                action: "glexa_ajax_mail_receive_list",
            })
        );
        const dto = parser.parseManaboReceivedMail(response);
        if (dto.success) {
            // TODO: domain形にmapする
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // 送信メール一覧取得
    public async getSentMailList(page: number = 1) {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                p: page.toString(),
                action: "glexa_ajax_mail_send_list",
            })
        );
        const dto = parser.parseManaboSentMail(response);
        if (dto.success) {
            // TODO: domain形にmapする
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // メール詳細取得
    public async getMailDetail(mailId: string) {
        const response = await this.manaboProvider.get(`/?mail_id=${mailId}&action=glexa_modal_mail_view&_=${Date.now()}`);
        const dto = parser.parseManaboMailView(response);
        if (dto.success) {
            // TODO: domain形にmapする
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // メール送信フォーム取得
    public async getMailSendForm() {
        const response = await this.manaboProvider.post(
            "",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                action: "glexa_modal_mail_form",
            })
        );
        const dto = parser.parseManaboMailSend(response);
        if (dto.success) {
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

    // メール宛先検索
    public async getMailMemberSearchHtml(query: string) {
        const response = await this.manaboProvider.post(
            "/",
            "application/x-www-form-urlencoded",
            new URLSearchParams({
                q: query,
                action: "glexa_modal_mail_ajax_member_list",
            })
        );
        const dto = parser.parseManaboMailMember(response);
        if (dto.success) {
            return dto.data;
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }
}

const mailRepositoryInstance = new MailRepository();
export default mailRepositoryInstance;
