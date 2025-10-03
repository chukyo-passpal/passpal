/**
 * PassPal Theme System
 * Main theme configuration combining all design tokens
 * Supports both light and dark modes
 */

import { lightColors, darkColors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";

// Create theme based on color mode
export const createTheme = (mode: "light" | "dark" = "light") => {
    const colors = mode === "dark" ? darkColors : lightColors;

    return {
        colors,
        typography,
        spacing,

        // Common component styles
        components: {
            // Shadow styles for cards and elevated components
            shadows: {
                small: {
                    shadowColor: colors.neutral.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: mode === "dark" ? 0.3 : 0.1,
                    shadowRadius: 4,
                    elevation: 2, // Android
                },
                medium: {
                    shadowColor: colors.neutral.black,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: mode === "dark" ? 0.4 : 0.15,
                    shadowRadius: 8,
                    elevation: 4, // Android
                },
                large: {
                    shadowColor: colors.neutral.black,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: mode === "dark" ? 0.5 : 0.2,
                    shadowRadius: 16,
                    elevation: 8, // Android
                },
            },

            // Button size configurations
            button: {
                sizes: {
                    small: {
                        height: 40,
                        paddingHorizontal: spacing.md,
                        borderRadius: spacing.borderRadius.xl,
                    },
                    medium: {
                        height: 48,
                        paddingHorizontal: spacing.lg,
                        borderRadius: spacing.borderRadius["2xl"],
                    },
                    large: {
                        height: 56,
                        paddingHorizontal: spacing.xl,
                        borderRadius: spacing.borderRadius["3xl"],
                    },
                },
            },

            // Input field configurations
            input: {
                height: 56,
                borderRadius: spacing.borderRadius.sm,
                paddingHorizontal: spacing.md,
            },

            // Card configurations
            card: {
                borderRadius: spacing.borderRadius.md,
                padding: spacing.component.cardPadding,
            },
        },
    } as const;
};

// Default theme (light mode for backward compatibility)
export const theme = createTheme("light");

export type Theme = ReturnType<typeof createTheme>;

// Export all token types
export * from "./colors";
export * from "./typography";
export * from "./spacing";
