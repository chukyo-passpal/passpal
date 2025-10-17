export interface ManaboMailInfo {
    manaboMailId: string;
    title: string;
    author: string;
    receivedAt: Date;
    isRead: boolean;
}

export type MailData = {
    manaboMails: ManaboMailInfo[];
};
