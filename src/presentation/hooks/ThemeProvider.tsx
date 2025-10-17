/**
 * PassPal Theme Provider
 * React context for providing theme throughout the app with dark mode support
 * Automatically syncs with device settings via Expo
 */

import { createTheme, theme, Theme } from "@/src/utils/theme";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Platform, useColorScheme } from "react-native";

export type ColorMode = "light" | "dark" | "auto";

interface ThemeContextValue {
    theme: Theme;
    colorMode: ColorMode;
    isDark: boolean;
    setColorMode: (mode: ColorMode) => void;
    toggleColorMode: () => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Theme provider component
interface ThemeProviderProps {
    children: ReactNode;
    initialColorMode?: ColorMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialColorMode = "auto" }) => {
    const systemColorScheme = useColorScheme();
    const [colorMode, setColorMode] = useState<ColorMode>(initialColorMode);

    // Determine if dark mode should be active
    const isDark = colorMode === "auto" ? systemColorScheme === "dark" : colorMode === "dark";

    // Create theme based on current mode
    const currentTheme = createTheme(isDark ? "dark" : "light");

    // Update navigation bar color when theme changes (Android only)
    useEffect(() => {
        if (Platform.OS === "android") {
            NavigationBar.setBackgroundColorAsync(currentTheme.colors.background.primary);
            NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
        }
    }, [isDark, currentTheme.colors.background.primary]);

    // Toggle between light and dark modes
    const toggleColorMode = () => {
        setColorMode((prev) => {
            if (prev === "auto") return "dark";
            if (prev === "dark") return "light";
            return "dark";
        });
    };

    const contextValue: ThemeContextValue = {
        theme: currentTheme,
        colorMode,
        isDark,
        setColorMode,
        toggleColorMode,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <StatusBar style={isDark ? "light" : "dark"} />
            {children}
        </ThemeContext.Provider>
    );
};

// Hook to use theme in components
export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

// Higher-order component for theme access
export const withTheme = <P extends object>(Component: React.ComponentType<P & { theme: Theme }>) => {
    const ThemedComponent = (props: P) => {
        const { theme } = useTheme();
        return <Component {...props} theme={theme} />;
    };

    ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
    return ThemedComponent;
};

// Export the default theme and types
export { theme };
export type { Theme };
