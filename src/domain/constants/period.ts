export const PERIODS = ["1", "2", "3", "4", "5", "6", "7", "A", "B", "C"] as const;
export type Period = (typeof PERIODS)[number];
