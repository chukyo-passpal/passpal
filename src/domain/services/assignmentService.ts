import classRepositoryInstance, { ClassRepository } from "@/src/data/repositories/classRepository";
import { Theme } from "@/src/utils/theme";
import { AssignmentStatus } from "../constants/assignment";
import { AssignmentClassData, AssignmentDirectoryData, AssignmentInfo } from "../models/assignment";
import { ManaboContentData, ManaboDirectoryInfo, ManaboReportContentData } from "../models/class";
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

    /**
     * 課題情報を一覧表示向けにフラット化します。
     */
    buildAssignmentOverview(assignmentInfo?: AssignmentInfo | null): AssignmentOverviewItem[];

    /**
     * 一覧表示用課題情報をフィルターします。
     */
    filterAssignmentOverview(assignments: AssignmentOverviewItem[], filter: AssignmentFilter): AssignmentOverviewItem[];

    /**
     * フィルター種別の表示ラベルを返します。
     */
    getAssignmentFilterLabel(filter: AssignmentFilter): string;

    /**
     * 授業単位の課題コンテンツをディレクトリ情報付きでフラット化します。
     */
    flattenClassAssignments(assignmentClassData?: AssignmentClassData | null): ClassAssignmentContentItem[];

    /**
     * 授業単位の課題コンテンツから統計情報を算出します。
     */
    calculateClassAssignmentStats(
        assignments: ClassAssignmentContentItem[],
        referenceDate?: Date
    ): AssignmentStatsSummary;

    /**
     * コンテンツ種別に合わせてタイトルを返します。
     */
    resolveContentTitle(content: ClassAssignmentContentItem): string;

    /**
     * コンテンツの進捗ステータスを返します。
     */
    resolveContentStatus(content: ClassAssignmentContentItem): AssignmentStatus;

    /**
     * 課題が期限切れかどうかを返します。
     */
    isOverdue(content: ClassAssignmentContentItem, referenceDate?: Date): boolean;

    /**
     * コンテンツに紐づく主要アクションURLを取得します。
     */
    getPrimaryActionUrl(content: ClassAssignmentContentItem): string | undefined;
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

    /**
     * コンテンツのステータスを取得
     * @param content コンテンツデータ
     * @returns コンテンツのステータス
     */
    private getStatus = (content: ManaboReportContentData): AssignmentStatus => {
        if (content.isDone) {
            return "completed";
        } else if (content.isNotAvailableYet) {
            return "no-available-yet";
        } else if (content.isExpired) {
            return "expired";
        } else {
            return "not-started";
        }
    };

    public getStatusColor = (status: AssignmentStatus, theme: Theme) => {
        switch (status) {
            case "not-started":
            case "no-available-yet":
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
            case "no-available-yet":
                return "未公開";
        }
    };

    public buildAssignmentOverview(assignmentInfo?: AssignmentInfo | null): AssignmentOverviewItem[] {
        if (!assignmentInfo) {
            return [];
        }

        const overview: AssignmentOverviewItem[] = [];
        const classes = assignmentInfo.classes ?? {};

        for (const cls of Object.values(classes)) {
            if (!cls) continue;
            for (const directory of Object.values(cls.directories ?? {})) {
                if (!directory) continue;

                directory.contents
                    .filter((content): content is ManaboReportContentData => content.type === "report")
                    .forEach((content) => {
                        overview.push({
                            classId: cls.classId,
                            directoryId: directory.directoryId,
                            contentId: content.contentId,
                            title: content.title,
                            subtitle: `${cls.className} - ${directory.directoryName}`,
                            status: this.getStatus(content),
                            publishDate: content.duration.publish.end,
                            dueDate: content.duration.deadline.end,
                        });
                    });
            }
        }

        overview.sort((a, b) => {
            const dateA = a.dueDate ?? a.publishDate;
            const dateB = b.dueDate ?? b.publishDate;

            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;
            return dateA.getTime() - dateB.getTime();
        });

        return overview;
    }

    public filterAssignmentOverview(
        assignments: AssignmentOverviewItem[],
        filter: AssignmentFilter
    ): AssignmentOverviewItem[] {
        if (filter === "all") {
            return assignments;
        }
        return assignments.filter((assignment) => assignment.status === filter);
    }

    public getAssignmentFilterLabel(filter: AssignmentFilter): string {
        switch (filter) {
            case "all":
                return "すべて";
            case "not-started":
                return "未着手";
            case "completed":
                return "完了";
            case "expired":
                return "期限切れ";
        }
    }

    public flattenClassAssignments(assignmentClassData?: AssignmentClassData | null): ClassAssignmentContentItem[] {
        if (!assignmentClassData) {
            return [];
        }

        const directories = Object.values(assignmentClassData.directories ?? {});
        return directories.flatMap((directory) =>
            directory.contents.map((content) => ({
                ...content,
                directoryId: directory.directoryId,
                directoryName: directory.directoryName,
            }))
        );
    }

    public calculateClassAssignmentStats(
        assignments: ClassAssignmentContentItem[],
        referenceDate: Date = new Date()
    ): AssignmentStatsSummary {
        const total = assignments.length;
        const completed = assignments.filter((assignment) => assignment.isDone).length;
        const notCompleted = total - completed;
        const overdue = assignments.filter((assignment) => this.isOverdue(assignment, referenceDate)).length;

        return { total, completed, notCompleted, overdue };
    }

    public resolveContentTitle(content: ClassAssignmentContentItem): string {
        if (content.type === "report") {
            return content.title;
        }
        return content.comment || "ファイル";
    }

    public resolveContentStatus(content: ClassAssignmentContentItem): AssignmentStatus {
        if (content.type === "report") {
            return this.getStatus(content);
        }
        return content.isDone ? "completed" : "not-started";
    }

    public isOverdue(content: ClassAssignmentContentItem, referenceDate: Date = new Date()): boolean {
        const dueDate = content.duration.deadline.end;
        if (!dueDate) return false;
        return dueDate < referenceDate && !content.isDone;
    }

    public getPrimaryActionUrl(content: ClassAssignmentContentItem): string | undefined {
        if (content.type === "report") {
            return content.actions.find(({ href }) => Boolean(href))?.href;
        }

        if (content.type === "file") {
            return content.files[0]?.href;
        }

        return undefined;
    }
}

const assignmentServiceInstance = new IntegratedAssignmentService();
export default assignmentServiceInstance;

export type AssignmentFilter = "all" | "not-started" | "completed" | "expired";

export interface AssignmentOverviewItem {
    classId: string;
    directoryId: string;
    contentId: string;
    title: string;
    subtitle: string;
    status: AssignmentStatus;
    publishDate?: Date;
    dueDate?: Date;
}

export type ClassAssignmentContentItem = ManaboContentData & {
    directoryId: string;
    directoryName: string;
};

export interface AssignmentStatsSummary {
    total: number;
    completed: number;
    notCompleted: number;
    overdue: number;
}
