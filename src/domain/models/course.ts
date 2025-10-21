import { AttendanceStatus } from "@/src/domain/constants/course";
import { Period } from "@/src/domain/constants/period";
import { Weekday } from "@/src/domain/constants/week";

/* 授業についての情報 */
export interface CourseBasicInfo {
    manaboCourseId: string; // MaNaBo上の授業ID
    cubicsCourseId: string; // CUBICS上の授業ID
    name: string;
    room: string;
    teacher: string;
    timetableDate: {
        // 時間割に登録されている曜日・時限
        weekday: Weekday;
        period: Period;
    }[];
}

export interface CourseCriteria {
    item: string; // 評価項目
    weight: string; // 配点
}

export interface CourseDetailInfo {
    evaluationCriteria: CourseCriteria[]; // 評価基準
}

export interface CourseNewsInfo {
    title: string;
    body: string;
}

export interface UserRegisteredAttendance {
    regType: "user";
    date: Date;
    status: AttendanceStatus;
}

export interface PortalRecordedAttendance {
    regType: "portal";
    lecture: string;
    status: AttendanceStatus;
}

export type AttendanceInfo = UserRegisteredAttendance | PortalRecordedAttendance;

export interface CourseInfo {
    info: CourseBasicInfo;
    attendanceLog: AttendanceInfo[];
    news: CourseNewsInfo[];
    detail?: CourseDetailInfo;
}

export type CourseData = {
    semester: string;
    courses: {
        [manaboCourseId: string]: CourseInfo;
    };
};

/* Manaboの授業ディレクトリ */
export interface ManaboDirectoryInfo {
    classId: string;
    className: string;
    directories: {
        directoryId: string;
        title: string;
    }[];
}

/* Manaboの授業コンテンツ */
export interface ManaboContentInfo {
    contentId: string;
    title: string;
    type: string;
    body: string;
}
