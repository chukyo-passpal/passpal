import { z } from "zod";

export const ATTENDANCE_STATUSES = ["present", "absent", "late/early"] as const;
export const AttendanceStatusSchema = z.literal(ATTENDANCE_STATUSES);
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];

export const CONTENT_TYPES = ["board", "quiz", "report", ""] as const;
export const ContentTypeSchema = z.literal(CONTENT_TYPES);
export type ContentType = (typeof CONTENT_TYPES)[number];
