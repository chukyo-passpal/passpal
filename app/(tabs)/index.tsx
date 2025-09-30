import { View } from "react-native";
import { Typography, useTheme } from "@/design-system";

export default function Index() {
    const theme = useTheme();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.background.primary,
                padding: theme.spacing.lg,
            }}
        >
            <Typography variant="h1" style={{ color: theme.colors.primary.main, textAlign: "center" }}>
                PassPalへようこそ
            </Typography>
            <Typography
                variant="body"
                style={{
                    color: theme.colors.text.secondary,
                    textAlign: "center",
                    marginTop: theme.spacing.md,
                }}
            >
                あなたの学習をサポートします
            </Typography>
        </View>
    );
}
