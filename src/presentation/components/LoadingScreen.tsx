import React from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";

import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";

type LoadingScreenProps = {
    message?: string;
    helperText?: string;
    containerStyle?: ViewStyle;
};

export function LoadingScreen({
    message = "データを読み込んでいます",
    helperText = "少々お待ちください",
    containerStyle,
}: LoadingScreenProps) {
    const { theme } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 24,
                gap: 16,
                backgroundColor: theme.colors.background.primary,
                ...containerStyle,
            }}
        >
            <ActivityIndicator size="large" color={theme.colors.primary.main} />
            <View style={{ alignItems: "center", gap: 4 }}>
                <Typography variant="h3" color={theme.colors.text.primary}>
                    {message}
                </Typography>
                <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                    {helperText}
                </Typography>
            </View>
        </View>
    );
}
