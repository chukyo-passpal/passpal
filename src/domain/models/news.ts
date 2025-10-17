export interface AlboNewsInfo {
    isImportant: boolean;
    category: string;
    isRead: boolean;
    title: string;
}

export interface ManaboNewsInfo {
    title: string;
    body: string;
}

export type NewsData = {
    alboNews: AlboNewsInfo[];
    manaboNews: ManaboNewsInfo[];
};
