import { Campus } from "@/src/domain/constants/chukyo-univ";
import { ColorOption } from "@/src/domain/constants/color";
import { Period } from "@/src/domain/constants/period";
import { Weekday } from "@/src/domain/constants/week";

/* 各時限についての情報 */
export interface PeriodInfo {
    startTime: Date; //　授業の開始時間 例: 1970/1/1 09:30
    endTime: Date; // 授業の終了時間 例: 1920/1/1 11:00
}

export interface TimetableClassInfo {
    manaboClassId: string; // MaNaBo上の授業ID
    cubicsClassId: string; // CUBICS上の授業ID
    isCustomSchedule: boolean; // ユーザーがカスタムで追加した予定かどうか
    name: string; // 授業名
    room: string; // 教室
    teacher: string; // 教員名
    color: ColorOption; // 色
}

/* 時間割 */
export type TimetableData = {
    semester: string;
    timetable: Record<Weekday, Record<Period, TimetableClassInfo | null>>;
};

/* 時限情報 */
export type PeriodData = Record<Campus, Record<Period, PeriodInfo | null>>;
