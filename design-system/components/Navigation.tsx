/**
 * Navigation Components
 * Tab navigation and bottom navigation components
 */

import React from "react";
import { View, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../tokens/ThemeProvider";
import { Typography } from "./Typography";
import { Icon, IconName } from "./Icon";

// Tab Navigation Component
interface TabItem {
    id: string;
    label: string;
    active?: boolean;
}

interface TabNavigationProps {
    tabs: TabItem[];
    onTabPress: (tabId: string) => void;
    style?: ViewStyle;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, onTabPress, style }) => {
    const theme = useTheme();

    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    gap: 10,
                },
                style,
            ]}
        >
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.id}
                    style={{
                        paddingHorizontal: theme.spacing.lg,
                        paddingVertical: 10,
                        borderRadius: theme.spacing.borderRadius.xl,
                        backgroundColor: tab.active ? theme.colors.primary.main : theme.colors.background.surface,
                        minWidth: 90,
                        alignItems: "center",
                    }}
                    onPress={() => onTabPress(tab.id)}
                    activeOpacity={0.7}
                >
                    <Typography variant="button" color={tab.active ? theme.colors.text.inverse : theme.colors.text.secondary}>
                        {tab.label}
                    </Typography>
                </TouchableOpacity>
            ))}
        </View>
    );
};

// Bottom Navigation Component
interface BottomNavItem {
    id: string;
    label: string;
    icon: IconName;
    active?: boolean;
    badge?: number;
}

interface BottomNavigationProps {
    items: BottomNavItem[];
    onItemPress: (itemId: string) => void;
    style?: ViewStyle;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ items, onItemPress, style }) => {
    const theme = useTheme();

    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    backgroundColor: theme.colors.background.primary,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.border.default,
                    paddingTop: theme.spacing.component.topSafeArea,
                    paddingBottom: theme.spacing.component.bottomSafeArea,
                    paddingHorizontal: theme.spacing.md,
                    justifyContent: "space-between",
                    height: theme.spacing.component.tabBarHeight,
                },
                style,
            ]}
        >
            {items.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 4,
                    }}
                    onPress={() => onItemPress(item.id)}
                    activeOpacity={0.7}
                >
                    <View style={{ position: "relative", marginBottom: 4 }}>
                        <Icon name={item.icon} size={24} color={item.active ? theme.colors.primary.main : theme.colors.text.secondary} />
                        {item.badge && item.badge > 0 && (
                            <View
                                style={{
                                    position: "absolute",
                                    top: -6,
                                    right: -6,
                                    backgroundColor: theme.colors.status.error,
                                    borderRadius: 10,
                                    minWidth: 20,
                                    height: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                }}
                            >
                                <Typography variant="caption" color={theme.colors.text.inverse} style={{ fontSize: 10, lineHeight: 12 }}>
                                    {item.badge > 99 ? "99+" : item.badge.toString()}
                                </Typography>
                            </View>
                        )}
                    </View>
                    <Typography
                        variant="caption"
                        color={item.active ? theme.colors.primary.main : theme.colors.text.secondary}
                        style={{
                            fontWeight: item.active ? "600" : "400",
                        }}
                    >
                        {item.label}
                    </Typography>
                </TouchableOpacity>
            ))}
        </View>
    );
};

// Navigation Header Component
interface NavigationHeaderProps {
    title: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
    onLeftPress?: () => void;
    onRightPress?: () => void;
    style?: ViewStyle;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({ title, leftIcon, rightIcon, onLeftPress, onRightPress, style }) => {
    const theme = useTheme();

    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.sm,
                    backgroundColor: theme.colors.background.primary,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border.default,
                    height: 56,
                },
                style,
            ]}
        >
            <View style={{ width: 40 }}>
                {leftIcon && (
                    <TouchableOpacity
                        onPress={onLeftPress}
                        style={{
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name={leftIcon} size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                )}
            </View>

            <Typography variant="h3" color={theme.colors.text.primary} style={{ textAlign: "center" }}>
                {title}
            </Typography>

            <View style={{ width: 40 }}>
                {rightIcon && (
                    <TouchableOpacity
                        onPress={onRightPress}
                        style={{
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name={rightIcon} size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
