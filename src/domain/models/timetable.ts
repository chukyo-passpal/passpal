import { Campus } from "@/src/domain/constants/chukyo-univ";
import { ColorOption } from "@/src/domain/constants/color";
import { Period } from "@/src/domain/constants/period";
import { Weekday } from "@/src/domain/constants/week";
import { Class } from "./class";

/* 各時限についての情報 */
export interface PeriodInfo {
    startTime: Date; // 授業の開始時間 例: 1970/1/1 09:30
    endTime: Date; // 授業の終了時間 例: 1920/1/1 11:00
}

/**
 * ユーザーが作成したカスタムイベント（アルバイトやサークル等）を表します。
 * これらは時間割にのみ存在し、`Class` 定義を持ちません。
 */
export interface CustomEvent {
    id: string; // UUID
    name: string;
    room?: string;
    memo?: string; // カスタムイベントでは 'teacher' の代わりに使用されます
    color: ColorOption;
}

/**
 * 時間割のスロットは、`Class` への参照か、直接の `CustomEvent` のいずれかになります。
 */
export type TimetableEntry =
    | { type: "class"; classId: string } // `state.classes[classId]` への参照
    | { type: "custom"; event: CustomEvent }; // インラインのイベント情報

/* 時間割 */
export type TimetableData = {
    semester: string;
    timetable: Record<Weekday, Record<Period, TimetableEntry | null>>;
};

export interface TimetableFetchResult {
    timetable: TimetableData;
    classes: Record<string, Class>;
}

/* 時限情報 */
export type PeriodData = Record<Campus, Record<Period, PeriodInfo | null>>;
