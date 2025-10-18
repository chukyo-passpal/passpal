import { z } from "zod";

export const PERIODS = ["1", "2", "3", "4", "5", "6", "7", "A", "B", "C"] as const;
export const PeriodSchema = z.literal(PERIODS);
export type Period = (typeof PERIODS)[number];
