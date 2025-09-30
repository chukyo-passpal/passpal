import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: "PassPal" }} />
            <Tabs.Screen name="assignments" options={{ title: "課題一覧" }} />
            <Tabs.Screen name="timetable" options={{ title: "時間割" }} />
            <Tabs.Screen name="transport" options={{ title: "バス・電車時刻表" }} />
        </Tabs>
    );
}
