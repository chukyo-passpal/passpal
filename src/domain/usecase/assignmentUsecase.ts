import { Theme } from "@/src/utils/theme";
import { AssignmentStatus } from "../constants/assignment";
import { AssignmentClassData, AssignmentInfo } from "../models/assignment";
import { ManaboContentData, ManaboReportContentData } from "../models/class";

export interface AssignmentUsecase {
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

export class IntegratedAssignmentUsecase implements AssignmentUsecase {
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

const assignmentUsecaseInstance = new IntegratedAssignmentUsecase();
export default assignmentUsecaseInstance;

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
