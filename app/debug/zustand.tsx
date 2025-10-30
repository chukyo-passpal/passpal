import Header from "@/src/presentation/components/Header";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useAuth from "@/src/presentation/hooks/useAuth";
import useClass from "@/src/presentation/hooks/useClass";
import useMail from "@/src/presentation/hooks/useMail";
import useNews from "@/src/presentation/hooks/useNews";
import useSetting from "@/src/presentation/hooks/useSetting";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface ExpandState {
    [key: string]: boolean;
}

/**
 * デバッグ用のデータビューアコンポーネント
 */
function DataViewer({
    data,
    path = "",
    expandState,
    setExpandState,
}: {
    data: any;
    path?: string;
    expandState: ExpandState;
    setExpandState: (state: ExpandState) => void;
}) {
    const { theme } = useTheme();

    const renderValue = (key: string, value: any, currentPath: string) => {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;
        const isExpanded = expandState[fullPath] || false;

        // 関数は表示しない
        if (typeof value === "function") {
            return null;
        }

        // null または undefined
        if (value === null) {
            return (
                <View key={fullPath} style={{ flexDirection: "row", paddingVertical: theme.spacing.xs }}>
                    <Text style={{ color: theme.colors.text.secondary, fontFamily: "monospace", fontSize: 12 }}>{key}: </Text>
                    <Text style={{ color: theme.colors.text.placeholder, fontFamily: "monospace", fontSize: 12, fontStyle: "italic" }}>null</Text>
                </View>
            );
        }

        if (value === undefined) {
            return (
                <View key={fullPath} style={{ flexDirection: "row", paddingVertical: theme.spacing.xs }}>
                    <Text style={{ color: theme.colors.text.secondary, fontFamily: "monospace", fontSize: 12 }}>{key}: </Text>
                    <Text style={{ color: theme.colors.text.placeholder, fontFamily: "monospace", fontSize: 12, fontStyle: "italic" }}>undefined</Text>
                </View>
            );
        }

        // プリミティブ型
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return (
                <View key={fullPath} style={{ flexDirection: "row", paddingVertical: theme.spacing.xs }}>
                    <Text style={{ color: theme.colors.text.secondary, fontFamily: "monospace", fontSize: 12 }}>{key}: </Text>
                    <Text style={{ color: theme.colors.primary.main, fontFamily: "monospace", fontSize: 12 }}>
                        {typeof value === "string" ? `"${value}"` : String(value)}
                    </Text>
                </View>
            );
        }

        // Date型
        if (value instanceof Date) {
            return (
                <View key={fullPath} style={{ flexDirection: "row", paddingVertical: theme.spacing.xs }}>
                    <Text style={{ color: theme.colors.text.secondary, fontFamily: "monospace", fontSize: 12 }}>{key}: </Text>
                    <Text style={{ color: theme.colors.status.info, fontFamily: "monospace", fontSize: 12 }}>Date({value.toISOString()})</Text>
                </View>
            );
        }

        // 配列
        if (Array.isArray(value)) {
            const itemCount = value.length;
            return (
                <View key={fullPath} style={{ paddingVertical: theme.spacing.xs }}>
                    <Pressable
                        onPress={() => {
                            setExpandState({ ...expandState, [fullPath]: !isExpanded });
                        }}
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Text style={{ color: theme.colors.text.primary, fontFamily: "monospace", fontSize: 12, marginRight: theme.spacing.xs }}>
                            {isExpanded ? "▼" : "▶"}
                        </Text>
                        <Text style={{ color: theme.colors.text.secondary, fontFamily: "monospace", fontSize: 12 }}>
                            {key}: Array[{itemCount}]
                        </Text>
                    </Pressable>
                    {isExpanded && (
                        <View
                            style={{
                                marginLeft: theme.spacing.lg,
                                borderLeftWidth: 1,
                                borderLeftColor: theme.colors.border.default,
                                paddingLeft: theme.spacing.md,
                            }}
                        >
                            {value.map((item, index) => renderValue(`[${index}]`, item, fullPath))}
                        </View>
                    )}
                </View>
            );
        }

        // オブジェクト
        if (typeof value === "object") {
            const keys = Object.keys(value).filter((k) => typeof value[k] !== "function");
            const keyCount = keys.length;
            return (
                <View key={fullPath} style={{ paddingVertical: theme.spacing.xs }}>
                    <Pressable
                        onPress={() => {
                            setExpandState({ ...expandState, [fullPath]: !isExpanded });
                        }}
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Text style={{ color: theme.colors.text.primary, fontFamily: "monospace", fontSize: 12, marginRight: theme.spacing.xs }}>
                            {isExpanded ? "▼" : "▶"}
                        </Text>
                        <Text style={{ color: theme.colors.text.secondary, fontFamily: "monospace", fontSize: 12 }}>
                            {key}: Object{"{"}
                            {keyCount}
                            {"}"}
                        </Text>
                    </Pressable>
                    {isExpanded && (
                        <View
                            style={{
                                marginLeft: theme.spacing.lg,
                                borderLeftWidth: 1,
                                borderLeftColor: theme.colors.border.default,
                                paddingLeft: theme.spacing.md,
                            }}
                        >
                            {keys.map((k) => renderValue(k, value[k], fullPath))}
                        </View>
                    )}
                </View>
            );
        }

        return null;
    };

    const dataKeys = Object.keys(data).filter((k) => typeof data[k] !== "function");
    return <View>{dataKeys.map((key) => renderValue(key, data[key], path))}</View>;
}

export default function ZustandDebugScreen() {
    const { theme } = useTheme();

    // 全てのZustandストアを取得
    const authState = useAuth();
    const assignmentState = useAssignment();
    const classState = useClass();
    const mailState = useMail();
    const newsState = useNews();
    const settingState = useSetting();
    const timetableState = useTimetable();

    // 各ストアの展開状態を管理
    const [authExpand, setAuthExpand] = useState<ExpandState>({});
    const [assignmentExpand, setAssignmentExpand] = useState<ExpandState>({});
    const [classExpand, setClassExpand] = useState<ExpandState>({});
    const [mailExpand, setMailExpand] = useState<ExpandState>({});
    const [newsExpand, setNewsExpand] = useState<ExpandState>({});
    const [settingExpand, setSettingExpand] = useState<ExpandState>({});
    const [timetableExpand, setTimetableExpand] = useState<ExpandState>({});

    const stores = [
        { name: "useAuth", state: authState, expandState: authExpand, setExpandState: setAuthExpand },
        { name: "useAssignment", state: assignmentState, expandState: assignmentExpand, setExpandState: setAssignmentExpand },
        { name: "useClass", state: classState, expandState: classExpand, setExpandState: setClassExpand },
        { name: "useMail", state: mailState, expandState: mailExpand, setExpandState: setMailExpand },
        { name: "useNews", state: newsState, expandState: newsExpand, setExpandState: setNewsExpand },
        { name: "useSetting", state: settingState, expandState: settingExpand, setExpandState: setSettingExpand },
        { name: "useTimetable", state: timetableState, expandState: timetableExpand, setExpandState: setTimetableExpand },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="Zustand Store Debug" />
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <ScrollView showsVerticalScrollIndicator={true} style={{ padding: theme.spacing.lg }}>
                    <View style={{ minWidth: 800 }}>
                        {stores.map((store, index) => (
                            <View
                                key={store.name}
                                style={{
                                    marginBottom: theme.spacing.lg,
                                    padding: theme.spacing.md,
                                    backgroundColor: theme.colors.background.secondary,
                                    borderRadius: theme.spacing.borderRadius.md,
                                    borderWidth: 1,
                                    borderColor: theme.colors.border.default,
                                }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.colors.text.primary, marginBottom: theme.spacing.md }}>
                                    {store.name}
                                </Text>
                                <DataViewer data={store.state} expandState={store.expandState} setExpandState={store.setExpandState} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
}
