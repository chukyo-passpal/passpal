import Header from "@/src/presentation/components/Header";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import * as Updates from "expo-updates";
import { ScrollView, View } from "react-native";

export default function ZustandDebugScreen() {
    const { theme } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="Update Debug" />
            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={{ paddingBottom: theme.spacing.lg }}>
                <ScrollView showsVerticalScrollIndicator={true} style={{ padding: theme.spacing.lg }}>
                    <Typography>{JSON.stringify(Updates, null, 2)}</Typography>
                </ScrollView>
            </ScrollView>
        </View>
    );
}
