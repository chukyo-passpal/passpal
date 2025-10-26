import { Icon } from "@/src/presentation/components/Icon";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import { View } from "react-native";

export default function MaintenanceScreen() {
    const { theme } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background.primary,
                padding: theme.spacing.lg,

                justifyContent: "center",
                alignItems: "center",
                gap: theme.spacing.md,
            }}
        >
            <Icon name="construction" size={64} color={theme.colors.primary.main} />
            <Typography variant="h1">メンテナンス中</Typography>
        </View>
    );
}
