import courseRepositoryInstance, { CourseRepository } from "@/src/data/repositories/courseRepository";
import { AssignmentClassData, AssignmentDirectoryData, AssignmentInfo } from "../models/assignment";
import { ManaboDirectoryInfo } from "../models/course";
import { TimetableData } from "../models/timetable";

export interface AssignmentService {
    /**
     * 指定した授業のディレクトリ構成を取得します。
     * @param manaboCourseId Manaboの授業ID
     * @returns ディレクトリ情報
     */
    getDirectory(manaboCourseId: string): Promise<ManaboDirectoryInfo>;

    /**
     * 指定した授業に紐づく課題一覧を取得します。
     * @param manaboCourseId Manaboの授業ID
     * @returns 課題情報の配列
     */
    getAssignments(manaboCourseId: string): Promise<AssignmentClassData>;

    /**
     * 時間割に含まれる全授業の課題情報をまとめて取得します。
     * @param timetable 時間割データ
     * @returns 授業IDをキーとした課題情報
     */
    getAllAssignments(timetable: TimetableData): Promise<AssignmentInfo>;
}

export class IntegratedAssignmentService implements AssignmentService {
    protected readonly courseRepository: CourseRepository;

    /**
     * 課題サービスを初期化します。
     * @param courseRepository 授業情報を扱うリポジトリ
     */
    constructor(courseRepository = courseRepositoryInstance) {
        this.courseRepository = courseRepository;
    }

    public async getDirectory(manaboCourseId: string): Promise<ManaboDirectoryInfo> {
        return this.courseRepository.getClassDirectory(manaboCourseId);
    }

    public async getAssignments(manaboCourseId: string): Promise<AssignmentClassData> {
        const directories = await this.getDirectory(manaboCourseId);

        const assignment: AssignmentDirectoryData[] = [];

        for (const directory of directories.directories) {
            const contents = await this.courseRepository.getClassContent(manaboCourseId, directory.directoryId);

            assignment.push({
                directoryId: directory.directoryId,
                directoryName: directory.title,
                contents: contents,
            });
        }

        const directoriesRecord: Record<string, AssignmentDirectoryData> = {};
        assignment.forEach((dir) => {
            directoriesRecord[dir.directoryId] = dir;
        });

        return {
            classId: manaboCourseId,
            className: directories.className,
            directories: directoriesRecord,
        };
    }

    public async getAllAssignments(timetable: TimetableData): Promise<AssignmentInfo> {
        let courseIds: string[] = [];
        for (const days of Object.keys(timetable.timetable) as (keyof typeof timetable.timetable)[]) {
            for (const periodKey of Object.keys(timetable.timetable[days])) {
                const period = periodKey as keyof (typeof timetable.timetable)[typeof days];
                const classes = timetable.timetable[days][period];
                courseIds.push(classes?.manaboCourseId ?? "");
            }
        }

        // 重複を排除
        courseIds = Array.from(new Set(courseIds)).filter((id) => id !== "");

        const assignmentData: AssignmentClassData[] = [];

        for (const courseId of courseIds) {
            assignmentData.push(await this.getAssignments(courseId));
        }

        const assignmentDataRecord: Record<string, AssignmentClassData> = {};
        assignmentData.forEach((cls) => {
            assignmentDataRecord[cls.classId] = cls;
        });

        return {
            classes: assignmentDataRecord,
        };
    }
}

const assignmentServiceInstance = new IntegratedAssignmentService();
export default assignmentServiceInstance;
