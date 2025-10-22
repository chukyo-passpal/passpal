import { Theme } from "@/src/utils/theme";
import { z } from "zod";

export const COLOR_OPTIONS = ["red", "green", "blue", "black"] as const;
export const ColorOptionSchema = z.literal(COLOR_OPTIONS);
export type ColorOption = (typeof COLOR_OPTIONS)[number];

/**
 * 時間割などのカスタム色指定名を具体的なカラーコードへ変換します
 * @param color 利用する色オプション
 * @param theme テーマ情報
 * @returns 選択された色の16進カラーコード
 */
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
