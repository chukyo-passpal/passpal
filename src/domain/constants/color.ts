import { Theme } from "@/src/utils/theme";
import { z } from "zod";

export const COLOR_OPTIONS = ["red", "green", "blue", "black"] as const;
export const ColorOptionSchema = z.literal(COLOR_OPTIONS);
export type ColorOption = (typeof COLOR_OPTIONS)[number];

export function getOptionColor(color: ColorOption, theme: Theme): string {
    switch (color) {
        case "red":
            return "#FF0000";
        case "green":
            return "#00FF00";
        case "blue":
            return "#0000FF";
        case "black":
            return theme.colors.neutral.black;
    }
}
