import { Icon } from "@/src/presentation/components/Icon";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import { Tabs } from "expo-router";

export default function TabLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary.main,
                tabBarInactiveTintColor: theme.colors.text.secondary,
                tabBarStyle: {
                    backgroundColor: theme.colors.background.surface,
                    borderTopColor: theme.colors.background.secondary,
                },

                headerShown: false,
                headerStyle: {
                    backgroundColor: theme.colors.background.surface,
                },
                headerTintColor: theme.colors.text.primary,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "ホーム",
                    tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="timetable"
                options={{
                    title: "時間割",
                    tabBarIcon: ({ color, size }) => <Icon name="calendar" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="assignments"
                options={{
                    title: "課題",
                    tabBarIcon: ({ color, size }) => <Icon name="clipboard-list" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
