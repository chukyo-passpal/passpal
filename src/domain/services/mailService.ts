import mailRepositoryInstance, { MailRepository } from "@/src/data/repositories/mailRepository";
import { MailData } from "../models/mail";
import authServiceInstance, { AuthService } from "./authService";

export interface MailService {
    /**
     * 指定ページのメール一覧を取得します。
     * @param page 取得したいページ番号（初期値は1）
     * @returns メールデータ
     */
    getMails(page?: number): Promise<MailData>;
}

export class IntegratedMailService implements MailService {
    protected readonly mailRepository: MailRepository;
    protected readonly authService: AuthService;

    /**
     * メールサービスを初期化します。
     * @param mailRepository メール取得に利用するリポジトリ
     * @param authService 認証を処理するサービス
     */
    constructor(mailRepository = mailRepositoryInstance, authService = authServiceInstance) {
        this.mailRepository = mailRepository;
        this.authService = authService;
    }

    public async getMails(page: number = 1): Promise<MailData> {
        return { manaboMails: await this.mailRepository.getReceivedMailList(this.authService.shibAuth, page) };
    }
}

const mailServiceInstance = new IntegratedMailService();
export default mailServiceInstance;
