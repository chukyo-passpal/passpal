import { z } from "zod";

export const CAMPUSES = ["nagoya", "toyota"] as const;
export const CampusSchema = z.literal(CAMPUSES);
export type Campus = (typeof CAMPUSES)[number];

export const campusNames: Record<Campus, string> = {
    nagoya: "名古屋キャンパス",
    toyota: "豊田キャンパス",
};

export const CU_SERVICES = ["manabo", "albo", "cubics"] as const;
export const CUServiceSchema = z.literal(CU_SERVICES);
export type CUService = (typeof CU_SERVICES)[number];
