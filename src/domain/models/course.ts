import { ColorOption } from "@/src/domain/constants/color";
import { Period } from "@/src/domain/constants/period";
import { Weekday } from "@/src/domain/constants/week";
import { AttendanceInfo, ClassDetailInfo, ClassNewsInfo } from "./class";

export interface CourseSchedule {
    weekday: Weekday;
    period: Period;
}

/**
 * 大学の授業（コース）を表します。
 * 授業の詳細に関する単一の信頼できる情報源です。
 */
export interface Course {
    // 識別子
    id: string; // 主キー（通常 manaboClassId）
    manaboClassId: string;
    cubicsClassId: string;

    // 基本メタデータ（共有）
    name: string;
    room: string;
    teacher: string;

    // スケジュール（時間割ソースから派生。クラス一覧で簡単に参照できるようにここに保持）
    schedule: CourseSchedule[];

    // ユーザー設定
    color: ColorOption;

    // 詳細情報（遅延読み込み／別途取得）
    attendanceLog?: AttendanceInfo[];
    news?: ClassNewsInfo[];
    detail?: ClassDetailInfo;
}
