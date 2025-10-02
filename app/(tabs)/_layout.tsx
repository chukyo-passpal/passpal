import { Tabs } from "expo-router";
import { useTheme, Icon } from "@/design-system";

export default function TabLayout() {
    const theme = useTheme();

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
            <Tabs.Screen
                name="transport"
                options={{
                    title: "時刻表",
                    tabBarIcon: ({ color, size }) => <Icon name="bus" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="course"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
        </Tabs>
    );
}
