import { Campus } from "@/src/domain/constants/chukyo-univ";
import { ColorOption } from "@/src/domain/constants/color";
import { Period } from "@/src/domain/constants/period";
import { Weekday } from "@/src/domain/constants/week";
import { Course } from "./course";

/* 各時限についての情報 */
export interface PeriodInfo {
    startTime: Date; //　授業の開始時間 例: 1970/1/1 09:30
    endTime: Date; // 授業の終了時間 例: 1920/1/1 11:00
}

/**
 * Represents a user-created custom event (Job, Circle, etc.)
 * These exist only in the timetable and do not have a 'Course' definition.
 */
export interface CustomEvent {
    id: string; // UUID
    name: string;
    room?: string;
    memo?: string; // Replaces 'teacher' for custom events
    color: ColorOption;
}

/**
 * A slot in the timetable can either be a reference to a Course
 * or a direct Custom Event.
 */
export type TimetableEntry =
    | { type: "course"; courseId: string } // Reference to state.courses[courseId]
    | { type: "custom"; event: CustomEvent }; // Inline data

/* 時間割 */
export type TimetableData = {
    semester: string;
    timetable: Record<Weekday, Record<Period, TimetableEntry | null>>;
};

export interface TimetableFetchResult {
    timetable: TimetableData;
    courses: Record<string, Course>;
}

/* 時限情報 */
export type PeriodData = Record<Campus, Record<Period, PeriodInfo | null>>;
