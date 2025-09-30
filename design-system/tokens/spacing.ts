/**
 * PassPal Spacing System
 * 8px-based spacing scale for consistent layouts
 */

export const spacing = {
    // Base spacing scale (8px base)
    xs: 8, // Small space (related elements)
    sm: 12, // Small-medium space
    md: 16, // Standard space (padding)
    lg: 24, // Large space (between cards)
    xl: 32, // Extra large space (main sections)
    "2xl": 40,
    "3xl": 48,
    "4xl": 64,

    // Component-specific spacing
    component: {
        // Button padding
        buttonPaddingHorizontal: 20,
        buttonPaddingVertical: 12,
        buttonPaddingSmall: 8,

        // Input padding
        inputPadding: 16,
        inputPaddingVertical: 18,

        // Card padding
        cardPadding: 20,
        cardPaddingSmall: 16,

        // Screen margins
        screenPadding: 20,
        screenPaddingHorizontal: 16,

        // Navigation
        tabBarHeight: 90,
        bottomSafeArea: 22,
        topSafeArea: 10,
    },

    // Border radius scale
    borderRadius: {
        none: 0,
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        "2xl": 24,
        "3xl": 28,
        full: 9999,
    },
} as const;

export type SpacingTokens = typeof spacing;
export type SpacingValue = keyof typeof spacing;
export type BorderRadiusValue = keyof typeof spacing.borderRadius;
