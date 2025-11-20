import { AttendanceStatus } from "@/src/domain/constants/class";
import { ColorOption } from "../constants/color";
import { Period } from "../constants/period";
import { Weekday } from "../constants/week";

export interface ClassCriteria {
    item: string; // 評価項目
    weight: string; // 配点
}

export interface ClassDetailInfo {
    evaluationCriteria: ClassCriteria[]; // 評価基準
}

export interface ClassNewsInfo {
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
export interface ManaboBaseContentData {
    type: "file" | "report";
    isDone: boolean;
    duration: {
        publish: {
            start?: Date;
            end?: Date;
        };
        deadline: {
            start?: Date;
            end?: Date;
        };
    };
}

export interface ManaboFileContentData extends ManaboBaseContentData {
    type: "file";

    comment: string;
    files: {
        fileName: string;
        href: string;
        icon: string;
    }[];
}

export interface ManaboReportContentData extends ManaboBaseContentData {
    type: "report";

    title: string;
    description: string;
    contentId: string;
    reportType: string;
    isExpired: boolean;
    isNotAvailableYet: boolean;
    actions: {
        title: string;
        href: string;
    }[];
}

export type ManaboContentData = ManaboFileContentData | ManaboReportContentData;

export interface ClassSchedule {
    weekday: Weekday;
    period: Period;
}
/**
 * 大学の授業（コース）を表します。
 * 授業の詳細に関する単一の信頼できる情報源です。
 */

export interface Class {
    // 識別子
    id: string; // 主キー（通常 manaboClassId）
    manaboClassId: string;
    cubicsClassId: string;

    // 基本メタデータ（共有）
    name: string;
    room: string;
    teacher: string;

    // スケジュール（時間割ソースから派生。クラス一覧で簡単に参照できるようにここに保持）
    schedule: ClassSchedule[];

    // ユーザー設定
    color: ColorOption;

    // 詳細情報（遅延読み込み／別途取得）
    attendanceLog?: AttendanceInfo[];
    news?: ClassNewsInfo[];
    detail?: ClassDetailInfo;
}
