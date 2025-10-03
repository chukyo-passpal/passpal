/**
 * PassPal Color System
 * Based on the unified design system from Figma
 * Supports both light and dark modes
 */

// Base color palette (used in both themes)
const baseColors = {
    // Primary Colors
    primary: {
        main: "#B19CD9",
        light: "#F0EBFF",
        dark: "#8B7BB8",
        darker: "#6B5B98",
    },

    // Status Colors
    status: {
        success: "#90C695",
        successDark: "#72A877",
        warning: "#F5C842",
        warningDark: "#D4AA25",
        error: "#E57373",
        errorDark: "#C75555",
        info: "#81C7D4",
        infoDark: "#63A9B6",
    },

    // Neutral Colors
    neutral: {
        black: "#2D2D30",
        gray900: "#1A1A1C",
        gray800: "#2D2D30",
        gray700: "#454548",
        gray600: "#8B8B8B",
        gray400: "#B8B8B8",
        gray200: "#E8E8E8",
        gray100: "#F5F5F5",
        white: "#FFFFFF",
    },
};

// Light mode colors
export const lightColors = {
    ...baseColors,

    // Semantic Colors for Light Mode
    background: {
        primary: baseColors.neutral.white,
        secondary: baseColors.primary.light,
        surface: baseColors.neutral.gray200,
        disabled: baseColors.neutral.gray100,
    },

    text: {
        primary: baseColors.neutral.gray800,
        secondary: baseColors.neutral.gray600,
        placeholder: baseColors.neutral.gray400,
        inverse: baseColors.neutral.white,
        disabled: baseColors.neutral.gray400,
    },

    border: {
        default: baseColors.neutral.gray200,
        focused: baseColors.primary.main,
        error: baseColors.status.error,
        disabled: baseColors.neutral.gray200,
    },
} as const;

// Dark mode colors
export const darkColors = {
    ...baseColors,

    // Semantic Colors for Dark Mode
    background: {
        primary: baseColors.neutral.gray900,
        secondary: baseColors.neutral.gray800,
        surface: baseColors.neutral.gray700,
        disabled: baseColors.neutral.gray800,
    },

    text: {
        primary: baseColors.neutral.white,
        secondary: baseColors.neutral.gray400,
        placeholder: baseColors.neutral.gray600,
        inverse: baseColors.neutral.gray900,
        disabled: baseColors.neutral.gray600,
    },

    border: {
        default: baseColors.neutral.gray700,
        focused: baseColors.primary.main,
        error: baseColors.status.errorDark,
        disabled: baseColors.neutral.gray700,
    },
} as const;

// Default export (light mode for backward compatibility)
export const colors = lightColors;

export type ColorTokens = typeof lightColors;

// Type helpers for color values
export type PrimaryColor = keyof typeof baseColors.primary;
export type StatusColor = keyof typeof baseColors.status;
export type NeutralColor = keyof typeof baseColors.neutral;
