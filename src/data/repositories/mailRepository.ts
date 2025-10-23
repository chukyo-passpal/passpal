import { ManaboMailInfo } from "@/src/domain/models/mail";
import * as parser from "@chukyo-passpal/web_parser";
import { ParseError } from "../errors/ParseError";
import { receivedMailToDomain } from "../mappers/mailMapper";
import manaboProviderInstance, { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";

export interface MailRepository {
    /**
     * 受信メールの一覧を取得します。
     * @param page 取得するページ番号（初期値は1）
     * @returns ドメイン変換済みの受信メール一覧
     * @throws ParseError 解析に失敗した場合
     */
    getReceivedMailList(page?: number): Promise<ManaboMailInfo[]>;

    /**
     * 送信済みメールの一覧を取得します。
     * @param page 取得するページ番号（初期値は1）
     * @returns 送信メールの解析結果
     * @throws ParseError 解析に失敗した場合
     */
    getSentMailList(page?: number): Promise<parser.ManaboSentMailDTO>;

    /**
     * 指定したメールの詳細を取得します。
     * @param mailId メールID
     * @returns メール詳細の解析結果
     * @throws ParseError 解析に失敗した場合
     */
    getMailDetail(mailId: string): Promise<parser.ManaboMailViewDTO>;

    /**
     * メール作成フォームの情報を取得します。
     * @returns メール送信フォームの解析結果
     * @throws ParseError 解析に失敗した場合
     */
    getMailSendForm(): Promise<parser.ManaboMailSendDTO>;

    /**
     * メール宛先を検索します。
     * @param query 検索クエリ
     * @returns 検索結果の解析データ
     * @throws ParseError 解析に失敗した場合
     */
    getMailMember(query: string): Promise<parser.ManaboMailMemberDTO>;
}

export class IntegratedCourseRepositoryMailRepository implements MailRepository {
    private readonly manaboProvider: ManaboProvider;

    /**
     * リポジトリを初期化します。
     * @param manaboProvider Manaboプロバイダーの差し替え用インスタンス
     */
    constructor({ manaboProvider = manaboProviderInstance }: { manaboProvider?: ManaboProvider } = {}) {
        this.manaboProvider = manaboProvider;
    }

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
            return receivedMailToDomain(dto.data);
        } else {
            throw new ParseError({ cause: dto.error });
        }
    }

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

    public async getMailMember(query: string) {
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

const mailRepositoryInstance = new IntegratedCourseRepositoryMailRepository();
export default mailRepositoryInstance;
