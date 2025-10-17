export const ASSIGNMENT_STATUSES = ["not-started", "in-progress", "completed"] as const;
export type AssignmentStatus = (typeof ASSIGNMENT_STATUSES)[number];

export const ASSIGNMENT_PRIORITIES = ["low", "medium", "high"] as const;
export type AssignmentPriority = (typeof ASSIGNMENT_PRIORITIES)[number];
