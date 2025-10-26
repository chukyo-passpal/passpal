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
            <Typography variant="body" style={{ textAlign: "center", color: theme.colors.text.secondary }}>
                現在、システムのメンテナンスを行っております。しばらくしてから再度アクセスしてください。
            </Typography>
        </View>
    );
}
