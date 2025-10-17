import { darkColors, lightColors } from "@/src/presentation/tokens/colors";
import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

// defaultConfigをベースに、カスタムテーマを追加
export const tamaguiConfig = createTamagui({
    ...defaultConfig,
    themes: {
        ...defaultConfig.themes,
        light: {
            ...defaultConfig.themes.light,
            background: lightColors.background.primary,
            backgroundStrong: lightColors.background.surface,
            backgroundSoft: lightColors.background.secondary,
            color: lightColors.text.primary,
            colorHover: lightColors.text.primary,
            colorPress: lightColors.text.primary,
            colorFocus: lightColors.text.primary,
            borderColor: lightColors.border.default,
            borderColorHover: lightColors.border.default,
            borderColorPress: lightColors.border.default,
            borderColorFocus: lightColors.primary.main,
        },
        dark: {
            ...defaultConfig.themes.dark,
            background: darkColors.background.primary,
            backgroundStrong: darkColors.background.surface,
            backgroundSoft: darkColors.background.secondary,
            color: darkColors.text.primary,
            colorHover: darkColors.text.primary,
            colorPress: darkColors.text.primary,
            colorFocus: darkColors.text.primary,
            borderColor: darkColors.border.default,
            borderColorHover: darkColors.border.default,
            borderColorPress: darkColors.border.default,
            borderColorFocus: darkColors.primary.main,
        },
    },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface TamaguiCustomConfig extends Conf {}
}
