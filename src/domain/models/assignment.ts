import { AssignmentPriority, AssignmentStatus } from "@/src/domain/constants/assignment";

export interface AssignmentInfo {
    id: string;
    semester: string;
    courseId: string;
    courseName: string;
    title: string;
    status: AssignmentStatus;
    startDate: Date;
    dueDate?: Date;
    priority?: AssignmentPriority;
    manaboUrl?: string;
}

export type AssignmentData = AssignmentInfo[];
