import Header from "@/src/presentation/components/Header";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "tamagui";

export default function DebugIndexScreen() {
    const { theme } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="Debug Links" />
            <View style={{ padding: theme.spacing.lg, gap: theme.spacing.md }}>
                <Link href="/debug/update" asChild>
                    <Button>
                        <Text>Update Debug</Text>
                    </Button>
                </Link>
                <Link href="/debug/zustand" asChild>
                    <Button>
                        <Text>Zustand Store Debug</Text>
                    </Button>
                </Link>
            </View>
        </View>
    );
}
