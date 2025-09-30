/**
 * PassPal Color System
 * Based on the unified design system from Figma
 */

export const colors = {
  // Primary Colors
  primary: {
    main: '#B19CD9',
    light: '#F0EBFF',
    dark: '#8B7BB8',
  },
  
  // Status Colors
  status: {
    success: '#90C695',
    warning: '#F5C842',
    error: '#E57373',
    info: '#81C7D4',
  },
  
  // Neutral Colors
  neutral: {
    black: '#2D2D30',
    gray600: '#8B8B8B',
    gray400: '#B8B8B8',
    gray200: '#E8E8E8',
    white: '#FFFFFF',
  },
  
  // Semantic Colors (mapped from above for easier usage)
  background: {
    primary: '#FFFFFF',
    secondary: '#F0EBFF',
    surface: '#E8E8E8',
  },
  
  text: {
    primary: '#2D2D30',
    secondary: '#8B8B8B',
    placeholder: '#B8B8B8',
    inverse: '#FFFFFF',
  },
  
  border: {
    default: '#E8E8E8',
    focused: '#B19CD9',
    error: '#E57373',
  },
} as const;

export type ColorTokens = typeof colors;

// Type helpers for color values
export type PrimaryColor = keyof typeof colors.primary;
export type StatusColor = keyof typeof colors.status;
export type NeutralColor = keyof typeof colors.neutral;