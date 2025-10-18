import { z } from "zod";

export const ASSIGNMENT_STATUSES = ["not-started", "in-progress", "completed"] as const;
export const AssignmentSchema = z.literal(ASSIGNMENT_STATUSES);
export type AssignmentStatus = (typeof ASSIGNMENT_STATUSES)[number];

export const ASSIGNMENT_PRIORITIES = ["low", "medium", "high"] as const;
export const AssignmentPrioritySchema = z.literal(ASSIGNMENT_PRIORITIES);
export type AssignmentPriority = (typeof ASSIGNMENT_PRIORITIES)[number];
