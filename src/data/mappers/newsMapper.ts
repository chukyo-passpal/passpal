import { AlboNewsInfo } from "@/src/domain/models/news";
import * as parser from "@chukyo-passpal/web_parser";

/**
 * AlboニュースDTOをドメインモデルへ変換します。
 * @param data AlboニュースDTO
 * @returns ドメインモデルのニュース配列
 */
export function alboNewsToDomain(data: parser.CubicsPtNewsDTO): AlboNewsInfo[] {
    return data.tabs.flatMap((tab) =>
        tab.entries.map((news) => {
            const isRead: boolean = news.status?.startsWith("既読") ?? false;
            const isImportant: boolean = news.title?.startsWith("【重要】") ?? false;

            return {
                isImportant,
                category: `${tab.title} ${news.category}`,
                isRead,
                title: news.title,
            };
        })
    );
}
