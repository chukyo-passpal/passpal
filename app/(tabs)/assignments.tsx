import { View, ScrollView } from "react-native";
import { Typography, Card, Button, useTheme } from "@/design-system";

export default function Assignments() {
    const theme = useTheme();

    // サンプルの課題データ
    const assignments = [
        {
            id: 1,
            title: "数学の宿題",
            dueDate: "2024年1月15日",
            subject: "数学",
            status: "pending",
        },
        {
            id: 2,
            title: "英語のレポート",
            dueDate: "2024年1月20日",
            subject: "英語",
            status: "in-progress",
        },
        {
            id: 3,
            title: "理科の実験レポート",
            dueDate: "2024年1月25日",
            subject: "理科",
            status: "completed",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return theme.colors.status.success;
            case "in-progress":
                return theme.colors.status.warning;
            default:
                return theme.colors.status.error;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "完了";
            case "in-progress":
                return "進行中";
            default:
                return "未着手";
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background.primary,
                padding: theme.spacing.md,
            }}
        >
            <Typography
                variant="h2"
                style={{
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing.lg,
                }}
            >
                課題一覧
            </Typography>

            <ScrollView showsVerticalScrollIndicator={false}>
                {assignments.map((assignment) => (
                    <Card key={assignment.id} style={{ marginBottom: theme.spacing.md }}>
                        <View style={{ marginBottom: theme.spacing.sm }}>
                            <Typography variant="h3" style={{ color: theme.colors.text.primary }}>
                                {assignment.title}
                            </Typography>
                            <Typography
                                variant="bodySmall"
                                style={{
                                    color: theme.colors.text.secondary,
                                    marginTop: theme.spacing.xs,
                                }}
                            >
                                科目: {assignment.subject}
                            </Typography>
                            <Typography
                                variant="bodySmall"
                                style={{
                                    color: theme.colors.text.secondary,
                                    marginTop: theme.spacing.xs,
                                }}
                            >
                                提出期限: {assignment.dueDate}
                            </Typography>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: getStatusColor(assignment.status),
                                    paddingHorizontal: theme.spacing.sm,
                                    paddingVertical: theme.spacing.xs,
                                    borderRadius: 12,
                                }}
                            >
                                <Typography variant="caption" style={{ color: theme.colors.text.inverse }}>
                                    {getStatusText(assignment.status)}
                                </Typography>
                            </View>

                            <Button
                                variant="secondary"
                                size="small"
                                onPress={() => {
                                    // TODO: 課題詳細画面への遷移
                                }}
                            >
                                詳細
                            </Button>
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
}
