import { AttendanceStatus } from "@/src/domain/constants/course";
import { CourseDetailInfo, CourseNewsInfo, ManaboContentInfo, ManaboDirectoryInfo, PortalRecordedAttendance } from "@/src/domain/models/course";
import * as parser from "@chukyo-passpal/web_parser";

export function classDirectoryToDomain(data: parser.ManaboClassDirectoryDTO): ManaboDirectoryInfo {
    return data;
}

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

export function entryToDomain(data: parser.ManaboClassEntryDTO): PortalRecordedAttendance[] {
    return data.rows.map((row) => {
        return {
            regType: "portal",
            lecture: row.directory,
            status: translateAttendance(row.status),
        };
    });
}

export function classNewsToDomain(data: parser.ManaboClassNewsDTO): CourseNewsInfo[] {
    return data.items.map((row) => {
        return {
            title: row.title,
            body: row.bodyHtml,
        };
    });
}

export function courseSyllabusToDomain(data: parser.ManaboClassSyllabusDTO): CourseDetailInfo {
    return {
        evaluationCriteria: data.evaluation.map((item) => ({
            item: item.type,
            weight: item.weight,
        })),
    };
}

export function manaboContentToDomain(data: parser.ManaboClassContentDTO): ManaboContentInfo[] {
    return data.items.map((item) => ({
        contentId: item.contentId,
        type: item.pluginKey,
        title: item.title,
        body: item.descriptionHtml ?? "",
    }));
}
