/**
 * PassPal Typography System
 * Based on Inter font family with different weights and sizes
 */

export const typography = {
    // Font Families
    fontFamily: {
        primary: "system-ui",
    },

    // Font Weights
    fontWeight: {
        regular: "400" as const,
        medium: "500" as const,
        semiBold: "600" as const,
        bold: "700" as const,
    },

    // Font Sizes
    fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
        "3xl": 32,
    },

    // Line Heights (calculated as font-size * 1.2 for good readability)
    lineHeight: {
        xs: 14.4,
        sm: 16.8,
        base: 19.2,
        lg: 21.6,
        xl: 24,
        "2xl": 28.8,
        "3xl": 38.4,
    },

    // Typography Variants (matching Figma specs)
    variants: {
        // Headings
        h1: {
            fontSize: 32,
            lineHeight: 38.4,
            fontWeight: "700" as const,
        },
        h2: {
            fontSize: 24,
            lineHeight: 28.8,
            fontWeight: "700" as const,
        },
        h3: {
            fontSize: 20,
            lineHeight: 24,
            fontWeight: "700" as const,
        },

        // Body Text
        body: {
            fontSize: 16,
            lineHeight: 19.2,
            fontWeight: "400" as const,
        },
        bodySmall: {
            fontSize: 14,
            lineHeight: 16.8,
            fontWeight: "400" as const,
        },

        // Component Text
        button: {
            fontSize: 16,
            lineHeight: 19.2,
            fontWeight: "600" as const,
        },
        buttonSmall: {
            fontSize: 14,
            lineHeight: 16.8,
            fontWeight: "500" as const,
        },
        label: {
            fontSize: 14,
            lineHeight: 16.8,
            fontWeight: "500" as const,
        },
        caption: {
            fontSize: 12,
            lineHeight: 14.4,
            fontWeight: "400" as const,
        },
    },
} as const;

export type TypographyTokens = typeof typography;
export type TypographyVariant = keyof typeof typography.variants;
