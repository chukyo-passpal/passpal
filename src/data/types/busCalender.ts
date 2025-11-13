import { z } from "zod";

// 取り得るダイヤ種別
export const CalenderDiagramSchema = z.enum(["none", "A", "B", "C", "A-dash", "special"]);
export const SpecialDiagramSchema = z.string().trim().min(1).optional();

// 日単位
export const DaySchema = z
    .object({
        day: z.number().int().min(1).max(31),
        diagram: CalenderDiagramSchema,
        special: SpecialDiagramSchema,
    })
    .strict()
    .superRefine((val, ctx) => {
        // diagramがspecialのときはspecial文字列を必須にする
        if (val.diagram === "special" && !val.special) {
            ctx.addIssue({
                code: "custom",
                message: 'When "diagram" is "special", "special" must be provided.',
                path: ["special"],
            });
        }
    });

// 月単位
export const MonthSchema = z
    .object({
        month: z.number().int().min(1).max(12),
        days: z.array(DaySchema).min(1),
    })
    .strict();

// 年単位
export const YearSchema = z
    .object({
        year: z.number().int().min(1900).max(2100),
        months: z.array(MonthSchema).min(1),
    })
    .strict();

// ルート（年の配列）
export const ScheduleSchema = z.object({ calendar: z.array(YearSchema).min(1) });

// 型エイリアス（必要なら）
export type CalenderDiagramType = z.infer<typeof CalenderDiagramSchema>;
export type SpecialDiagramType = z.infer<typeof SpecialDiagramSchema>;
export type DayType = z.infer<typeof DaySchema>;
export type MonthType = z.infer<typeof MonthSchema>;
export type YearType = z.infer<typeof YearSchema>;
export type ScheduleType = z.infer<typeof ScheduleSchema>;
