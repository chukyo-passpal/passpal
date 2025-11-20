import { AttendanceInfo, Class } from "../models/class";

export interface AttendanceStatsSummary {
    present: number;
    absent: number;
    late: number;
    rate: number;
    status: string;
}

export interface ClassUsecase {
    /**
     * 出席記録から統計情報を算出します。
     */
    calculateAttendanceStats(attendanceLog?: AttendanceInfo[]): AttendanceStatsSummary;

    /**
     * 授業の時間割表示用文字列を生成します。
     */
    buildScheduleLabel(classData: Class): string;
}

export class IntegratedClassUsecase implements ClassUsecase {
    public calculateAttendanceStats(attendanceLog: AttendanceInfo[] = []): AttendanceStatsSummary {
        if (!attendanceLog || attendanceLog.length === 0) {
            return {
                present: 0,
                absent: 0,
                late: 0,
                rate: 0,
                status: "データがありません",
            };
        }

        const present = attendanceLog.filter((log) => log.status === "present").length;
        const absent = attendanceLog.filter((log) => log.status === "absent").length;
        const late = attendanceLog.filter((log) => log.status === "late/early").length;
        const total = attendanceLog.length;
        const rate = total > 0 ? Math.round((present / total) * 1000) / 10 : 0;

        let status = "データがありません";
        if (total > 0) {
            if (rate >= 80) status = "良好な出席状況です";
            else if (rate >= 60) status = "出席率が低下しています";
            else status = "出席率が著しく低下しています";
        }

        return { present, absent, late, rate, status };
    }

    public buildScheduleLabel(classData: Class): string {
        const schedule = classData.schedule.map((td) => `${td.weekday} ${td.period}限`);
        return schedule.join(", ");
    }
}

const classUsecaseInstance = new IntegratedClassUsecase();
export default classUsecaseInstance;
