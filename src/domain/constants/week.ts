export const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日"] as const;
export type Weekday = (typeof WEEKDAYS)[number];
