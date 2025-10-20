import mailRepositoryInstance, { MailRepository } from "@/src/data/repositories/mailRepository";
import { MailData } from "../models/mail";

export interface MailService {
    getMails(page?: number): Promise<MailData>;
}

export class IntegratedMailService implements MailService {
    protected readonly mailRepository: MailRepository;

    constructor(mailRepository = mailRepositoryInstance) {
        this.mailRepository = mailRepository;
    }

    public async getMails(page: number = 1): Promise<MailData> {
        return { manaboMails: await this.mailRepository.getReceivedMailList(page) };
    }
}

const mailServiceInstance = new IntegratedMailService();
export default mailServiceInstance;
