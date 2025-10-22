import { AttendanceStatus } from "@/src/domain/constants/course";
import { CourseDetailInfo, CourseNewsInfo, ManaboContentInfo, ManaboDirectoryInfo, PortalRecordedAttendance } from "@/src/domain/models/course";
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
export function classNewsToDomain(data: parser.ManaboClassNewsDTO): CourseNewsInfo[] {
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
export function courseSyllabusToDomain(data: parser.ManaboClassSyllabusDTO): CourseDetailInfo {
    return {
        evaluationCriteria: data.evaluation.map((item) => ({
            item: item.type,
            weight: item.weight,
        })),
    };
}

/**
 * ManaboコンテンツDTOをドメインモデルへ変換します。
 * @param data コンテンツDTO
 * @returns コンテンツ情報の配列
 */
export function manaboContentToDomain(data: parser.ManaboClassContentDTO): ManaboContentInfo[] {
    return data.items.map((item) => ({
        contentId: item.contentId,
        type: item.pluginKey,
        title: item.title,
        body: item.descriptionHtml ?? "",
    }));
}
