import appServiceInstance from "@/src/domain/services/appService";
import { Icon } from "@/src/presentation/components/Icon";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import { getStoreUrl } from "@/src/utils/urls";
import { Linking, Platform, Pressable, View } from "react-native";

export default function ForceUpdateScreen() {
    const { theme } = useTheme();

    const handleUpdate = () => {
        const storeUrl = getStoreUrl(Platform.OS === "ios" ? "ios" : "android");
        Linking.openURL(storeUrl);
    };

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
            <Icon name="refresh-cw" size={64} color={theme.colors.primary.main} />

            <Typography variant="h1" style={{ textAlign: "center" }}>
                アップデートが必要です
            </Typography>

            <Typography variant="body" style={{ textAlign: "center", color: theme.colors.text.secondary }}>
                新しいバージョンのアプリが利用可能です。{"\n"}
                継続して利用するには、アプリを最新版にアップデートしてください。
            </Typography>

            <Typography variant="caption" style={{ color: theme.colors.text.disabled }}>
                現在のバージョン: {appServiceInstance.currentVersion}
            </Typography>

            <Pressable
                onPress={handleUpdate}
                style={{
                    backgroundColor: theme.colors.primary.main,
                    paddingVertical: theme.spacing.md,
                    paddingHorizontal: theme.spacing.xl,
                    borderRadius: theme.spacing.borderRadius.md,
                    marginTop: theme.spacing.lg,
                    width: "80%",
                    alignItems: "center",
                }}
            >
                <Typography variant="button" style={{ color: "#FFFFFF" }}>
                    アップデートする
                </Typography>
            </Pressable>
        </View>
    );
}
