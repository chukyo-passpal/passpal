import { z } from "zod";

export const TRAIN_INFO_SERVICE = ["google-map", "yahoo-transit", "jorudan", "navitime"] as const;
export const TrainInfoServiceSchema = z.literal(TRAIN_INFO_SERVICE);
export type TrainInfoService = (typeof TRAIN_INFO_SERVICE)[number];

export const TrainInfoServiceName: Record<TrainInfoService, string> = {
    "google-map": "Google Map",
    "yahoo-transit": "Yahoo! 乗換案内",
    jorudan: "ジョルダン乗換案内",
    navitime: "NAVITIME",
};
