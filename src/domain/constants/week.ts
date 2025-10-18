import { z } from "zod";

export const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日"] as const;
export const WeekdaySchema = z.literal(WEEKDAYS);
export type Weekday = (typeof WEEKDAYS)[number];
