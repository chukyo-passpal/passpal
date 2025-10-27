import { Period, PERIODS, PeriodSchema } from "@/src/domain/constants/period";
import { Weekday, WEEKDAYS, WeekdaySchema } from "@/src/domain/constants/week";
import { TimetableData } from "@/src/domain/models/timetable";
import * as parser from "@chukyo-passpal/web_parser";
import { MapError } from "../errors/MapError";

/**
 * URLパスからManaboの授業IDを抽出します。
 * @param path 解析対象のURLパス
 * @returns 抽出した授業ID。見つからない場合は空文字
 */
function extractClassId(path: string): string {
    const match = path.match(/\/class\/(\d+)\//);
    return match ? match[1] ?? "" : "";
}

/**
 * 表示ラベルから時限情報を抽出します。
 * @param label 解析対象のラベル文字列
 * @returns 抽出した時限。見つからない場合は空文字
 */
function extractPeriod(label: string): string {
    const match = label.match(/^\w+/);
    return match ? match[0] : "";
}

/**
 * ラベルから曜日文字列を抽出します。
 * @param label 解析対象のラベル文字列
 * @returns 曜日の文字列。見つからない場合は空文字
 */
function extractWeekday(label: string): string {
    const match = label.match(/^[^\d/]+/);
    return match ? match[0] : "";
}

/**
 * Manaboの時間割DTOをドメインモデルへ変換します。
 * @param data Manabo時間割DTO
 * @returns ドメインモデルの時間割データ
 * @throws MapError 変換に必要な情報が欠けている場合
 */
export function manaboTimetableToDomain(data: parser.ManaboTimetableDTO): TimetableData {
    let tbl: Pick<TimetableData, "timetable"> = {
        timetable: WEEKDAYS.reduce((acc, curr) => {
            acc[curr] = PERIODS.reduce((acc2, curr2) => {
                acc2[curr2] = null;
                return acc2;
            }, {} as Record<Period, null>);
            return acc;
        }, {} as Record<Weekday, Record<Period, null>>),
    };

    data.periods.forEach((p) => {
        p.slots.forEach((s) => {
            // 空の授業情報はスキップ
            if (!s.className && !s.teacher && !s.href) {
                return;
            }

            const period = PeriodSchema.safeParse(p.period);
            const weekday = WeekdaySchema.safeParse(s.day);
            const classId = extractClassId(s.href ?? "");

            // 変換に失敗した場合はエラーを投げる
            if (!period.success || !weekday.success) {
                throw new MapError();
            }

            tbl.timetable[weekday.data][period.data] = {
                manaboClassId: classId,
                cubicsClassId: "",
                isCustomSchedule: false,
                name: s.className ?? "",
                room: "",
                teacher: s.teacher ?? "",
                color: "blue",
            };
        });
    });

    return {
        semester: data.title,
        timetable: tbl.timetable,
    };
}

/**
 * Cubicsの時間割DTOをドメインモデルへ変換します。
 * @param data Cubics時間割DTO
 * @returns ドメインモデルの時間割データ
 * @throws MapError 変換に必要な情報が欠けている場合
 */
export function cubicsTimetableToDomain(data: parser.CubicsAsTimetableDTO): TimetableData {
    let tbl: Pick<TimetableData, "timetable"> = {
        timetable: WEEKDAYS.reduce((acc, curr) => {
            acc[curr] = PERIODS.reduce((acc2, curr2) => {
                acc2[curr2] = null;
                return acc2;
            }, {} as Record<Period, null>);
            return acc;
        }, {} as Record<Weekday, Record<Period, null>>),
    };

    let days: Weekday[] = data.days.map((d) => {
        const weekday = WeekdaySchema.safeParse(extractWeekday(d.label));
        if (!weekday.success) {
            throw new MapError();
        }
        return weekday.data;
    });

    data.periods.forEach((p) => {
        const period = PeriodSchema.safeParse(extractPeriod(p.periodLabel));
        if (!period.success) {
            throw new MapError();
        }
        p.slots.forEach((s, index) => {
            // 空の授業情報はスキップ
            if (Object.values(s).every((v) => v === null)) {
                return;
            }
            const weekday = days[index];
            if (!weekday) {
                throw new MapError();
            }

            tbl.timetable[weekday][period.data] = {
                manaboClassId: "",
                cubicsClassId: s.lessonCode ?? "",
                isCustomSchedule: false,
                name: s.subject ?? "",
                room: s.classroom ?? "",
                teacher: "",
                color: "blue",
            };
        });
    });

    return {
        semester: "",
        timetable: tbl.timetable,
    };
}
