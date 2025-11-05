import { diContainer } from "@/src/di/container";
import { DI_TOKENS } from "@/src/di/tokens";
import "@/src/data/repositories/classRepository";
import type { ClassRepository } from "@/src/data/repositories/classRepository";
import { Period } from "../constants/period";
import { Weekday } from "../constants/week";
import { DataBuildError } from "../errors/serviceError";
import { AttendanceInfo, ClassData, ClassInfo } from "../models/class";
import { TimetableClassInfo, TimetableData } from "../models/timetable";

export interface ClassService {
    /**
     * 授業の詳細情報を取得し、最新の授業情報へ更新します。
     * @param classInfo 更新対象の授業情報
     * @returns 取得した詳細を含む授業情報
     */
    updateClassInfo(classInfo: ClassInfo): Promise<ClassInfo>;

    /**
     * 新しく授業情報を取得し、構築します。
     */
    fetchAndBuildClassInfo(classId: string, timetable: TimetableData): Promise<ClassInfo>;

    /**
     * 時間割データから授業情報を構築します。
     * @param timetableData 基になる時間割データ
     * @returns 構築された授業データ
     */
    buildClassDataFromTimetable(timetableData: TimetableData): ClassData;

    /**
     * 出席記録から統計情報を算出します。
     */
    calculateAttendanceStats(attendanceLog?: AttendanceInfo[]): AttendanceStatsSummary;

    /**
     * 授業の時間割表示用文字列を生成します。
     */
    buildScheduleLabel(info: ClassInfo): string;
}

export class IntegratedClassService implements ClassService {
    protected readonly classRepository: ClassRepository;

    /**
     * 授業サービスを初期化します。
     * @param classRepository 授業関連データを扱うリポジトリ
     */
    constructor(classRepository: ClassRepository) {
        this.classRepository = classRepository;
    }

    public async updateClassInfo(classInfo: ClassInfo): Promise<ClassInfo> {
        const attendanceLog = await this.getAttendance(classInfo.info.manaboClassId);
        const news = await this.classRepository.getClassNews(classInfo.info.manaboClassId);
        const detail = await this.classRepository.getClassSyllabus(classInfo.info.manaboClassId);

        return {
            info: classInfo.info,
            attendanceLog,
            news,
            detail,
        };
    }

    public async fetchAndBuildClassInfo(classId: string, timetable: TimetableData): Promise<ClassInfo> {
        const classData = this.buildClassDataFromTimetable(timetable);
        const classInfo = classData.classes[classId];
        if (!classInfo) {
            throw new DataBuildError();
        }

        const info = classInfo.info;
        const attendanceLog = await this.getAttendance(classId);
        const news = await this.classRepository.getClassNews(classId);
        const detail = await this.classRepository.getClassSyllabus(classId);
        return {
            info,
            attendanceLog,
            news,
            detail,
        };
    }

    public buildClassDataFromTimetable(timetableData: TimetableData): ClassData {
        // manaboClassIdをキーとするマップで授業を管理
        const classMap = new Map<string, ClassInfo>();

        // 各曜日・時限について処理
        for (const weekday in timetableData.timetable) {
            const weekdayKey = weekday as Weekday;

            for (const period in timetableData.timetable[weekdayKey]) {
                const periodKey = period as Period;
                const classTimetable = timetableData.timetable[weekdayKey][periodKey];

                if (classTimetable && !classTimetable.isCustomSchedule) {
                    // カスタムスケジュールではない授業のみ
                    const existingClass = classMap.get(classTimetable.manaboClassId);

                    if (existingClass) {
                        // 既に同じIDの授業が存在する場合、timetableDateに追加
                        existingClass.info.timetableDate.push({
                            weekday: weekdayKey,
                            period: periodKey,
                        });
                    } else {
                        // 新しい授業として追加
                        const classInfo = this.buildClassInfoFromTimetableClassInfo(
                            classTimetable,
                            weekdayKey,
                            periodKey
                        );
                        classMap.set(classTimetable.manaboClassId, classInfo);
                    }
                }
            }
        }

        // ClassData形式で返す
        const classes: { [manaboClassId: string]: ClassInfo } = {};
        for (const [manaboClassId, classInfo] of classMap.entries()) {
            classes[manaboClassId] = classInfo;
        }

        return {
            semester: timetableData.semester,
            classes,
        };
    }

    private buildClassInfoFromTimetableClassInfo(
        info: TimetableClassInfo,
        weekday: Weekday,
        period: Period
    ): ClassInfo {
        return {
            info: {
                manaboClassId: info.manaboClassId,
                cubicsClassId: info.cubicsClassId,
                name: info.name,
                room: info.room,
                teacher: info.teacher,
                timetableDate: [
                    {
                        weekday: weekday,
                        period: period,
                    },
                ],
            },
            attendanceLog: [],
            news: [],
        };
    }

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

    public buildScheduleLabel(info: ClassInfo): string {
        const schedule = info.info.timetableDate.map((td) => `${td.weekday} ${td.period}限`);
        return schedule.join(", ");
    }

    /**
     * 指定した授業の出席記録を取得します。
     * @param manaboClassId Manaboの授業ID
     * @returns 出席情報の配列
     */
    private async getAttendance(manaboClassId: string): Promise<AttendanceInfo[]> {
        // TODO: 将来的に手動での出席確認にも対応する
        return this.classRepository.getClassEntry(manaboClassId);
    }
}

diContainer.registerSingleton(DI_TOKENS.classService, (container) =>
    new IntegratedClassService(container.resolve<ClassRepository>(DI_TOKENS.classRepository))
);

const classServiceInstance = diContainer.resolve<ClassService>(DI_TOKENS.classService);
export default classServiceInstance;

export interface AttendanceStatsSummary {
    present: number;
    absent: number;
    late: number;
    rate: number;
    status: string;
}
