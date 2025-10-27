import { ManaboMailInfo } from "@/src/domain/models/mail";
import * as parser from "@chukyo-passpal/web_parser";

/**
 * 日本語表記の日付文字列をDateオブジェクトへ変換します。
 *
 * 入力例: 2025年6月20日(金) 12:26
 * @param value 変換対象の日付文字列
 * @returns 解析されたDateオブジェクト
 */
function parseJapaneseReceivedAt(value: string): Date {
    const normalized = value
        .replace(/\s+/g, " ")
        .replace(/[\uFF08(][^\uFF09)]*[\uFF09)]/g, "")
        .replace(/\u5E74/g, "/")
        .replace(/\u6708/g, "/")
        .replace(/\u65E5/g, "")
        .replace(/\uFF1A/g, ":")
        .trim();

    const [datePart, timePart] = normalized.split(" ");
    if (!datePart) {
        return new Date(value);
    }

    const [year, month, day] = datePart.split("/").map(Number);
    const [hour = 0, minute = 0, second = 0] = (timePart ?? "").split(":").map(Number);

    if ([year, month, day, hour, minute, second].some((component) => Number.isNaN(component))) {
        return new Date(value);
    }

    if (!year || !month || !day) {
        return new Date(value);
    }

    return new Date(year, month - 1, day, hour, minute, second);
}

/**
 * Manabo受信メールDTOをドメインモデルへ変換します。
 * @param data 受信メールDTO
 * @returns ドメインモデルのメール配列
 */
export function receivedMailToDomain(data: parser.ManaboReceivedMailDTO): ManaboMailInfo[] {
    return data.mails.map((mail) => {
        const receivedAt = parseJapaneseReceivedAt(mail.receivedAt);
        return {
            manaboMailId: mail.id,
            title: mail.title,
            author: mail.senderName ?? "不明",
            receivedAt,
            isRead: true,
        };
    });
}
