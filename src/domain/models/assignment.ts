import { AssignmentPriority, AssignmentStatus } from "@/src/domain/constants/assignment";

export interface AssignmentInfo {
    id: string;
    title: string;
    directory: string;
    status: AssignmentStatus;
    startDate?: Date;
    dueDate?: Date;
    priority?: AssignmentPriority;
    manaboUrl?: string;
}

export type AssignmentData = {
    [courseId: string]: AssignmentInfo[];
};
