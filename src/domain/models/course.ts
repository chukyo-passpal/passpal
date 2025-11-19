import { ColorOption } from "@/src/domain/constants/color";
import { Period } from "@/src/domain/constants/period";
import { Weekday } from "@/src/domain/constants/week";
import { AttendanceInfo, ClassDetailInfo, ClassNewsInfo } from "./class";

export interface CourseSchedule {
    weekday: Weekday;
    period: Period;
}

/**
 * Represents a unique University Course.
 * This is the single source of truth for class details.
 */
export interface Course {
    // Identifiers
    id: string; // Primary Key (usually manaboClassId)
    manaboClassId: string;
    cubicsClassId: string;

    // Basic Metadata (Shared)
    name: string;
    room: string;
    teacher: string;

    // Schedule (Derived from timetable source, kept here for easy access in Class List)
    schedule: CourseSchedule[];

    // User Settings
    color: ColorOption;

    // Detailed Info (Fetched lazily/separately)
    attendanceLog?: AttendanceInfo[];
    news?: ClassNewsInfo[];
    detail?: ClassDetailInfo;
}
