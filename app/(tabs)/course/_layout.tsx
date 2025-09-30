import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="[courseId]" options={{ title: "[授業名]" }} />
        </Tabs>
    );
}
