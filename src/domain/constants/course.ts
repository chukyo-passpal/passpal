import { z } from "zod";

export const ATTENDANCE_STATUSES = ["present", "absent", "late/early"] as const;
export const AttendanceStatusSchema = z.literal(ATTENDANCE_STATUSES);
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];
