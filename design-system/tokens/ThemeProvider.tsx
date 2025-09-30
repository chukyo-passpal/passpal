/**
 * PassPal Theme Provider
 * React context for providing theme throughout the app
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { theme, Theme } from './theme';

// Create theme context
const ThemeContext = createContext<Theme>(theme);

// Theme provider component
interface ThemeProviderProps {
  children: ReactNode;
  customTheme?: Partial<Theme>;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  customTheme 
}) => {
  const mergedTheme = customTheme ? { ...theme, ...customTheme } : theme;
  
  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme in components
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Higher-order component for theme access
export const withTheme = <P extends object>(
  Component: React.ComponentType<P & { theme: Theme }>
) => {
  const ThemedComponent = (props: P) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
  
  ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  return ThemedComponent;
};

// Export the default theme
export { theme };
export type { Theme };