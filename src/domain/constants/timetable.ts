export const TIMETABLE_VIEW_MODES = ["week", "day"] as const;
export type TimetableViewMode = (typeof TIMETABLE_VIEW_MODES)[number];
