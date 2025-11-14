import { z } from "zod";

export const CACHE_KEYS = ["bus-diagram", "bus-timetable"] as const;
export const CacheKeySchema = z.enum(CACHE_KEYS);
export type CacheKey = (typeof CACHE_KEYS)[number];
