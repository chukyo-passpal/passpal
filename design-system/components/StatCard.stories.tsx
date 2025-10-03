/**
 * StatCard Component Stories
 */

import React from "react";
import { View } from "react-native";
import { StatCard } from "./StatCard";
import { useTheme } from "../tokens/ThemeProvider";

export default {
    title: "Components/StatCard",
    component: StatCard,
};

export const NextClassCard = () => {
    const { theme } = useTheme();
    return (
        <View style={{ padding: 16, backgroundColor: theme.colors.background.primary }}>
            <StatCard iconName="calendar" title="次の授業" content="アルゴリズムとデータ構造" subtitle="1273" />
        </View>
    );
};

export const AssignmentCountCard = () => {
    const { theme } = useTheme();
    return (
        <View style={{ padding: 16, backgroundColor: theme.colors.background.primary }}>
            <StatCard iconName="clipboard-list" title="残り課題数" content={12} largeContent />
        </View>
    );
};

export const CustomHeightCard = () => {
    const { theme } = useTheme();
    return (
        <View style={{ padding: 16, backgroundColor: theme.colors.background.primary }}>
            <StatCard iconName="clock" title="カスタム高さ" content="200pxの高さ" height={200} />
        </View>
    );
};

export const LeftAlignedCard = () => {
    const { theme } = useTheme();
    return (
        <View style={{ padding: 16, backgroundColor: theme.colors.background.primary }}>
            <StatCard iconName="user" title="左寄せコンテンツ" content="これは左寄せのテキストです" contentAlign="left" />
        </View>
    );
};

export const AllVariants = () => {
    const { theme } = useTheme();
    return (
        <View style={{ padding: 16, backgroundColor: theme.colors.background.primary, gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 16 }}>
                <View style={{ flex: 1 }}>
                    <StatCard iconName="calendar" title="次の授業" content="アルゴリズムとデータ構造" subtitle="1273" />
                </View>
                <View style={{ flex: 1 }}>
                    <StatCard iconName="clipboard-list" title="残り課題数" content={12} largeContent />
                </View>
            </View>
        </View>
    );
};
