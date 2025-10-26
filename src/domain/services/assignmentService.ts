import classRepositoryInstance, { ClassRepository } from "@/src/data/repositories/classRepository";
import { Theme } from "@/src/utils/theme";
import { AssignmentStatus } from "../constants/assignment";
import { AssignmentClassData, AssignmentDirectoryData, AssignmentInfo } from "../models/assignment";
import { ManaboDirectoryInfo, ManaboReportContentData } from "../models/class";
import { TimetableData } from "../models/timetable";

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

    /**
     * コンテンツのステータスを取得
     * @param content コンテンツデータ
     * @returns コンテンツのステータス
     */
    getStatus(content: ManaboReportContentData): AssignmentStatus;

    /**
     * コンテンツのステータス色を取得
     * @param status コンテンツの完了状態
     * @param theme テーマ情報
     * @returns ステータス色の文字列
     */
    getStatusColor(status: AssignmentStatus, theme: Theme): string;

    /**
     * コンテンツのステータス背景色を取得
     * @param status コンテンツの完了状態
     * @param theme テーマ情報
     * @returns ステータス背景色の文字列
     */
    getStatusBGColor(status: AssignmentStatus, theme: Theme): string;

    /**
     * コンテンツのステータスの文字列を取得
     * @param status コンテンツの完了状態
     * @returns ステータスラベルの文字列
     */
    getStatusLabel(status: AssignmentStatus): string;
}

export class IntegratedAssignmentService implements AssignmentService {
    protected readonly classRepository: ClassRepository;

    /**
     * 課題サービスを初期化します。
     * @param classRepository 授業情報を扱うリポジトリ
     */
    constructor(classRepository = classRepositoryInstance) {
        this.classRepository = classRepository;
    }

    public async getDirectory(manaboClassId: string): Promise<ManaboDirectoryInfo> {
        return this.classRepository.getClassDirectory(manaboClassId);
    }

    public async getAssignments(manaboClassId: string): Promise<AssignmentClassData> {
        const directories = await this.getDirectory(manaboClassId);

        const assignment: AssignmentDirectoryData[] = [];

        for (const directory of directories.directories) {
            const contents = await this.classRepository.getClassContent(manaboClassId, directory.directoryId);

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

    public getStatus = (content: ManaboReportContentData): AssignmentStatus => {
        if (content.isDone) {
            return "completed";
        } else if (content.isExpired) {
            return "expired";
        } else {
            return "not-started";
        }
    };

    public getStatusColor = (status: AssignmentStatus, theme: Theme) => {
        switch (status) {
            case "not-started":
                return theme.colors.status.warning;
            case "completed":
                return theme.colors.status.success;
            case "expired":
                return theme.colors.status.error;
        }
    };

    public getStatusBGColor = (status: AssignmentStatus, theme: Theme) => {
        return this.getStatusColor(status, theme) + "20";
    };

    // コンテンツのステータスラベルを取得
    public getStatusLabel = (status: AssignmentStatus) => {
        switch (status) {
            case "not-started":
                return "未着手";
            case "completed":
                return "完了";
            case "expired":
                return "期限切れ";
        }
    };
}

const assignmentServiceInstance = new IntegratedAssignmentService();
export default assignmentServiceInstance;
