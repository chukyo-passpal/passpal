export const ATTENDANCE_STATUSES = ["present", "absent", "late/early"] as const;
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];
