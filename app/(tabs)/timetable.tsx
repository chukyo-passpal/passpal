import { View, ScrollView } from "react-native";
import { Typography, Card, useTheme } from "@/design-system";

export default function Timetable() {
    const theme = useTheme();
    
    // サンプルの時間割データ
    const timetableData = {
        Monday: [
            { time: "09:00-10:30", subject: "数学", room: "A-101" },
            { time: "10:45-12:15", subject: "英語", room: "B-205" },
            { time: "13:15-14:45", subject: "理科", room: "C-301" },
        ],
        Tuesday: [
            { time: "09:00-10:30", subject: "国語", room: "A-102" },
            { time: "10:45-12:15", subject: "社会", room: "B-201" },
            { time: "13:15-14:45", subject: "体育", room: "体育館" },
        ],
        Wednesday: [
            { time: "09:00-10:30", subject: "理科", room: "C-301" },
            { time: "10:45-12:15", subject: "数学", room: "A-101" },
            { time: "13:15-14:45", subject: "芸術", room: "D-401" },
        ],
        Thursday: [
            { time: "09:00-10:30", subject: "英語", room: "B-205" },
            { time: "10:45-12:15", subject: "国語", room: "A-102" },
            { time: "13:15-14:45", subject: "数学", room: "A-101" },
        ],
        Friday: [
            { time: "09:00-10:30", subject: "社会", room: "B-201" },
            { time: "10:45-12:15", subject: "理科", room: "C-301" },
            { time: "13:15-14:45", subject: "ホームルーム", room: "A-101" },
        ],
    };
    
    const days = Object.keys(timetableData) as (keyof typeof timetableData)[];
    const dayLabels = {
        Monday: "月曜日",
        Tuesday: "火曜日", 
        Wednesday: "水曜日",
        Thursday: "木曜日",
        Friday: "金曜日"
    };
    
    return (
        <View style={{ 
            flex: 1, 
            backgroundColor: theme.colors.background.primary,
            padding: theme.spacing.md
        }}>
            <Typography 
                variant="h2" 
                style={{ 
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing.lg
                }}
            >
                時間割
            </Typography>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                {days.map((day) => (
                    <Card key={day} style={{ marginBottom: theme.spacing.md }}>
                        <Typography 
                            variant="h3" 
                            style={{ 
                                color: theme.colors.primary.main,
                                marginBottom: theme.spacing.md
                            }}
                        >
                            {dayLabels[day]}
                        </Typography>
                        
                        {timetableData[day].map((lesson, index) => (
                            <View 
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingVertical: theme.spacing.sm,
                                    borderBottomWidth: index < timetableData[day].length - 1 ? 1 : 0,
                                    borderBottomColor: theme.colors.background.secondary,
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Typography 
                                        variant="body" 
                                        style={{ color: theme.colors.text.primary }}
                                    >
                                        {lesson.subject}
                                    </Typography>
                                    <Typography 
                                        variant="caption" 
                                        style={{ 
                                            color: theme.colors.text.secondary,
                                            marginTop: theme.spacing.xs
                                        }}
                                    >
                                        {lesson.room}
                                    </Typography>
                                </View>
                                
                                <Typography 
                                    variant="bodySmall" 
                                    style={{ 
                                        color: theme.colors.text.secondary,
                                        textAlign: "right"
                                    }}
                                >
                                    {lesson.time}
                                </Typography>
                            </View>
                        ))}
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
}
