import courseRepositoryInstance, { CourseRepository } from "@/src/data/repositories/courseRepository";
import { Period } from "../constants/period";
import { Weekday } from "../constants/week";
import { AttendanceInfo, CourseData, CourseInfo } from "../models/course";
import { TimetableData } from "../models/timetable";

export class CourseService {
    protected readonly courseRepository: CourseRepository;

    constructor(courseRepository = courseRepositoryInstance) {
        this.courseRepository = courseRepository;
    }

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

    private async getAttendance(manaboCourseId: string): Promise<AttendanceInfo[]> {
        // TODO: 将来的に手動での出席確認にも対応する
        return this.courseRepository.getClassEntry(manaboCourseId);
    }
}

const courseServiceInstance = new CourseService();
export default courseServiceInstance;
