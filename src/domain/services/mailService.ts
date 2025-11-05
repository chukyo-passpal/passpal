import { diContainer } from "@/src/di/container";
import { DI_TOKENS } from "@/src/di/tokens";
import "@/src/data/repositories/mailRepository";
import type { MailRepository } from "@/src/data/repositories/mailRepository";
import { MailData } from "../models/mail";

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

    /**
     * メールサービスを初期化します。
     * @param mailRepository メール取得に利用するリポジトリ
     */
    constructor(mailRepository: MailRepository) {
        this.mailRepository = mailRepository;
    }

    public async getMails(page: number = 1): Promise<MailData> {
        return { manaboMails: await this.mailRepository.getReceivedMailList(page) };
    }
}

diContainer.registerSingleton(DI_TOKENS.mailService, (container) =>
    new IntegratedMailService(container.resolve<MailRepository>(DI_TOKENS.mailRepository))
);

const mailServiceInstance = diContainer.resolve<MailService>(DI_TOKENS.mailService);
export default mailServiceInstance;
