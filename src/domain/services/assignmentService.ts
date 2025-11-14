import classRepositoryInstance, { ClassRepository } from "@/src/data/repositories/classRepository";
import { AssignmentClassData, AssignmentDirectoryData, AssignmentInfo } from "../models/assignment";
import { ManaboDirectoryInfo } from "../models/class";
import { TimetableData } from "../models/timetable";
import authServiceInstance, { AuthService } from "./authService";

export interface AssignmentService {
    /**
     * 指定した授業のディレクトリ構成を取得します。
     * @param manaboClassId Manaboの授業ID
     * @returns ディレクトリ情報
     */
    getDirectory(manaboClassId: string): Promise<ManaboDirectoryInfo>;

    /**
     * 指定した授業に紐づく課題一覧を取得します。
     * @param manaboClassId Manaboの授業ID
     * @returns 課題情報の配列
     */
    getAssignments(manaboClassId: string): Promise<AssignmentClassData>;

    /**
     * 時間割に含まれる全授業の課題情報をまとめて取得します。
     * @param timetable 時間割データ
     * @returns 授業IDをキーとした課題情報
     */
    getAllAssignments(timetable: TimetableData): Promise<AssignmentInfo>;
}

export class IntegratedAssignmentService implements AssignmentService {
    protected readonly classRepository: ClassRepository;
    protected readonly authService: AuthService;

    /**
     * 課題サービスを初期化します。
     * @param classRepository 授業情報を扱うリポジトリ
     * @param authService 認証を処理するサービス
     */
    constructor(classRepository = classRepositoryInstance, authService = authServiceInstance) {
        this.classRepository = classRepository;
        this.authService = authService;
    }

    public async getDirectory(manaboClassId: string): Promise<ManaboDirectoryInfo> {
        return this.classRepository.getClassDirectory(this.authService.shibAuth, manaboClassId);
    }

    public async getAssignments(manaboClassId: string): Promise<AssignmentClassData> {
        const directories = await this.getDirectory(manaboClassId);

        const assignment: AssignmentDirectoryData[] = [];

        for (const directory of directories.directories) {
            const contents = await this.classRepository.getClassContent(
                this.authService.shibAuth,
                manaboClassId,
                directory.directoryId
            );

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
            classId: manaboClassId,
            className: directories.className,
            directories: directoriesRecord,
        };
    }

    public async getAllAssignments(timetable: TimetableData): Promise<AssignmentInfo> {
        let classIds: string[] = [];
        for (const days of Object.keys(timetable.timetable) as (keyof typeof timetable.timetable)[]) {
            for (const periodKey of Object.keys(timetable.timetable[days])) {
                const period = periodKey as keyof (typeof timetable.timetable)[typeof days];
                const classes = timetable.timetable[days][period];
                classIds.push(classes?.manaboClassId ?? "");
            }
        }

        // 重複を排除
        classIds = Array.from(new Set(classIds)).filter((id) => id !== "");

        const assignmentData: AssignmentClassData[] = [];

        for (const classId of classIds) {
            assignmentData.push(await this.getAssignments(classId));
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
