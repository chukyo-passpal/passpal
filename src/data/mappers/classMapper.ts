import { AttendanceStatus } from "@/src/domain/constants/class";
import { ClassDetailInfo, ClassNewsInfo, ManaboContentData, ManaboDirectoryInfo, PortalRecordedAttendance } from "@/src/domain/models/class";
import * as parser from "@chukyo-passpal/web_parser";

/**
 * Manaboの授業ディレクトリDTOをドメインモデルへ変換します。
 * @param data 授業ディレクトリDTO
 * @returns ドメインモデルのディレクトリ情報
 */
export function classDirectoryToDomain(data: parser.ManaboClassDirectoryDTO): ManaboDirectoryInfo {
    return data;
}

/**
 * Manaboの出席文字列をドメインの出席ステータスに変換します。
 * @param attendance 出席状況の日本語表示
 * @returns ドメインの出席ステータス
 */
function translateAttendance(attendance: string): AttendanceStatus {
    switch (attendance) {
        case "出席":
            return "present";
        case "欠席":
            return "absent";
        default:
            return "late/early";
    }
}

/**
 * 出席DTOをドメインの出席履歴へ変換します。
 * @param data 授業出席DTO
 * @returns 出席履歴の配列
 */
export function entryToDomain(data: parser.ManaboClassEntryDTO): PortalRecordedAttendance[] {
    return data.rows.map((row) => {
        return {
            regType: "portal",
            lecture: row.directory,
            status: translateAttendance(row.status),
        };
    });
}

/**
 * 授業のお知らせDTOをドメインモデルへ変換します。
 * @param data 授業お知らせDTO
 * @returns 授業ニュースの配列
 */
export function classNewsToDomain(data: parser.ManaboClassNewsDTO): ClassNewsInfo[] {
    return data.items.map((row) => {
        return {
            title: row.title,
            body: row.bodyHtml,
        };
    });
}

/**
 * シラバスDTOを授業詳細のドメインモデルへ変換します。
 * @param data シラバスDTO
 * @returns 授業詳細情報
 */
export function classSyllabusToDomain(data: parser.ManaboClassSyllabusDTO): ClassDetailInfo {
    return {
        evaluationCriteria: data.evaluation.map((item) => ({
            item: item.type,
            weight: item.weight,
        })),
    };
}

/**
 * 課題の日付文字列をISO8601形式に変換する
 *
 * 例:
 *  - "9月22日(月) 10:00 ～ 9月22日(月) 23:59"
 *  - "〜 2026年1月31日(土) 00:00"
 *  - "9月22日(月) 10:00 ～"
 */
function parseJapaneseDatetimeRange(input: string): {
    start: Date | undefined;
    end: Date | undefined;
} {
    const currentYear = 2025;
    const tzOffset = "+09:00";

    // 日付 + 時刻パターン例: "2026年1月31日(土) 00:00" or "9月22日(月) 10:00"
    const dateTimeRegex = /(?:(\d{4})年)?\s*(\d{1,2})月(\d{1,2})日(?:\([^)]+\))?\s*(\d{1,2}):(\d{2})/;

    // 「～」または「〜」で区切る
    const [startPart, endPart] = input.split(/[～〜]/).map((s) => s.trim());

    const parsePart = (part: string | undefined): string | null => {
        if (!part) return null;
        const match = dateTimeRegex.exec(part);
        if (!match) return null;

        const [, yearStr, monthStr, dayStr, hourStr, minuteStr] = match;
        const year = yearStr ? parseInt(yearStr, 10) : currentYear;
        const month = monthStr ? parseInt(monthStr, 10) : 1;
        const day = dayStr ? parseInt(dayStr, 10) : 1;
        const hour = hourStr ? parseInt(hourStr, 10) : 0;
        const minute = minuteStr ? parseInt(minuteStr, 10) : 0;

        // ISO8601形式の文字列に変換
        const iso = new Date(year, month - 1, day, hour, minute).toISOString();
        // タイムゾーン補正を+09:00で上書き
        return iso.replace("Z", tzOffset);
    };

    const start = parsePart(startPart);
    const end = parsePart(endPart);

    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;

    return { start: startDate, end: endDate };
}

/**
 * ManaboコンテンツDTOをドメインモデルへ変換します。
 * @param data コンテンツDTO
 * @returns コンテンツ情報の配列
 */
export function manaboContentToDomain(data: parser.ManaboClassContentDTO): ManaboContentData[] {
    return data.contents.map((content) => {
        // 期限の計算
        let duration: {
            publish: {
                start?: Date;
                end?: Date;
            };
            deadline: {
                start?: Date;
                end?: Date;
            };
        } = {
            publish: {},
            deadline: {},
        };

        if (content.type === "file") {
            const publishDuration = content.attachedFile.duration.find((d) => d.label === "公開期間:");
            const deadlineDuration = content.attachedFile.duration.find((d) => d.label === "提出受付期間:");

            duration.publish = parseJapaneseDatetimeRange(publishDuration?.value || "");
            duration.deadline = parseJapaneseDatetimeRange(deadlineDuration?.value || "");
        } else if (content.type === "report") {
            const publishDuration = content.content.duration.find((d) => d.label === "受講期間:");
            const deadlineDuration = content.content.duration.find((d) => d.label === "提出受付期間:");

            duration.publish = parseJapaneseDatetimeRange(publishDuration?.value || "");
            duration.deadline = parseJapaneseDatetimeRange(deadlineDuration?.value || "");
        }

        switch (content.type) {
            case "file":
                return {
                    type: "file",
                    isDone: content.icon.isIconChecked,
                    duration: duration,

                    comment: content.attachedFile.comment,
                    files: content.attachedFile.files.map((file) => ({
                        fileName: file.fileName,
                        href: file.href,
                        icon: file.icon,
                    })),
                };
            case "report":
                return {
                    type: "report",
                    isDone: content.icon.isIconChecked,
                    duration: duration,

                    title: content.content.title,
                    description: content.toggleArea.description,
                    contentId: content.content.contentId,
                    reportType: content.content.pluginKey,
                    isExpired: content.toggleArea.isExpired,
                    actions: content.toggleArea.actions.map((action) => ({
                        title: action.title,
                        href: action.href,
                    })),
                };
        }
    });
}
