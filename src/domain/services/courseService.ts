import courseRepositoryInstance, { CourseRepository } from "@/src/data/repositories/courseRepository";
import { Period } from "../constants/period";
import { Weekday } from "../constants/week";
import { AttendanceInfo, CourseData, CourseInfo } from "../models/course";
import { TimetableData } from "../models/timetable";

export interface CourseService {
    updateCourseInfo(course: CourseInfo): Promise<CourseInfo>;
    buildCourseInfoFromTimetable(timetableData: TimetableData): CourseData;
}

export class IntegratedCourseService implements CourseService {
    protected readonly courseRepository: CourseRepository;

    /**
     * 授業サービスを初期化します。
     * @param courseRepository 授業関連データを扱うリポジトリ
     */
    constructor(courseRepository = courseRepositoryInstance) {
        this.courseRepository = courseRepository;
    }

    /**
     * 授業の詳細情報を取得し、最新の授業情報へ更新します。
     * @param course 更新対象の授業情報
     * @returns 取得した詳細を含む授業情報
     */
    public async updateCourseInfo(course: CourseInfo): Promise<CourseInfo> {
        const attendanceLog = await this.getAttendance(course.info.manaboCourseId);
        const news = await this.courseRepository.getClassNews(course.info.manaboCourseId);
        const detail = await this.courseRepository.getClassSyllabus(course.info.manaboCourseId);

        return {
            info: course.info,
            attendanceLog,
            news,
            detail,
        };
    }

    /**
     * 時間割データから授業情報を構築します。
     * @param timetableData 基になる時間割データ
     * @returns 構築された授業データ
     */
    public buildCourseInfoFromTimetable(timetableData: TimetableData): CourseData {
        // manaboCourseIdをキーとするマップで授業を管理
        const courseMap = new Map<string, CourseInfo>();

        // 各曜日・時限について処理
        for (const weekday in timetableData.timetable) {
            const weekdayKey = weekday as Weekday;

            for (const period in timetableData.timetable[weekdayKey]) {
                const periodKey = period as Period;
                const course = timetableData.timetable[weekdayKey][periodKey];

                if (course && !course.isCustomSchedule) {
                    // カスタムスケジュールではない授業のみ
                    const existingCourse = courseMap.get(course.manaboCourseId);

                    if (existingCourse) {
                        // 既に同じIDの授業が存在する場合、timetableDateに追加
                        existingCourse.info.timetableDate.push({
                            weekday: weekdayKey,
                            period: periodKey,
                        });
                    } else {
                        // 新しい授業として追加
                        const courseInfo: CourseInfo = {
                            info: {
                                manaboCourseId: course.manaboCourseId,
                                cubicsCourseId: course.cubicsCourseId,
                                name: course.name,
                                room: course.room,
                                teacher: course.teacher,
                                timetableDate: [
                                    {
                                        weekday: weekdayKey,
                                        period: periodKey,
                                    },
                                ],
                            },
                            attendanceLog: [],
                            news: [],
                        };
                        courseMap.set(course.manaboCourseId, courseInfo);
                    }
                }
            }
        }

        // CourseData形式で返す
        const courses: { [manaboCourseId: string]: CourseInfo } = {};
        for (const [manaboCourseId, courseInfo] of courseMap.entries()) {
            courses[manaboCourseId] = courseInfo;
        }

        return {
            semester: timetableData.semester,
            courses,
        };
    }

    /**
     * 指定した授業の出席記録を取得します。
     * @param manaboCourseId Manaboの授業ID
     * @returns 出席情報の配列
     */
    private async getAttendance(manaboCourseId: string): Promise<AttendanceInfo[]> {
        // TODO: 将来的に手動での出席確認にも対応する
        return this.courseRepository.getClassEntry(manaboCourseId);
    }
}

const courseServiceInstance = new IntegratedCourseService();
export default courseServiceInstance;
