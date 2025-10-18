import { z } from "zod";

export const TIMETABLE_VIEW_MODES = ["week", "day"] as const;
export const TimetableViewModeSchema = z.literal(TIMETABLE_VIEW_MODES);
export type TimetableViewMode = (typeof TIMETABLE_VIEW_MODES)[number];
