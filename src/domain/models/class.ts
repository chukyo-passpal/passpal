import { AttendanceStatus } from "@/src/domain/constants/class";

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
