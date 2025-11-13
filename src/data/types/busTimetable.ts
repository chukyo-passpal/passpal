import { z } from "zod";

export const TimetableDiagramSchema = z.enum(["A", "B", "C", "A-dash", "none", "定期試験"]);

export const ScheduleItemSchema = z.object({
    minute: z.number().int().min(0).max(59),
    isTurnStart: z.boolean().optional(),
    via: z.string().optional(), // "kaidu" など
});

export const HourScheduleSchema = z.object({
    hour: z.number().int().min(0).max(23),
    schedules: z.array(ScheduleItemSchema),
});

export const DirectionSchema = z.array(HourScheduleSchema);

export const DiagramSchema = z.object({
    diagram: TimetableDiagramSchema,
    forward: DirectionSchema,
    reverse: DirectionSchema,
});

export const TimetableSchema = z.object({
    timetable: z.array(DiagramSchema),
});

// 型が欲しければ
export type TimetableBusDiagramType = z.infer<typeof TimetableDiagramSchema>;
export type ScheduleItemType = z.infer<typeof ScheduleItemSchema>;
export type HourScheduleType = z.infer<typeof HourScheduleSchema>;
export type DirectionType = z.infer<typeof DirectionSchema>;
export type DiagramType = z.infer<typeof DiagramSchema>;
export type TimetableType = z.infer<typeof TimetableSchema>;
