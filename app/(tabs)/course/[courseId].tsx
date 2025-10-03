import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Card, Typography, Icon, useTheme } from "@/design-system";

export default function CourseDetail() {
    const { theme } = useTheme();

    // Mock data - 実際のアプリではAPIから取得
    const courseData = {
        title: "アルゴリズムとデータ構造",
        schedule: "月曜日 2限",
        room: "1273教室",
        teacher: "田中 太郎 教授",
        attendance: {
            present: 5,
            absent: 2,
            late: 1,
            rate: 87.5,
            status: "良好な出席状況です",
        },
        announcements: [
            {
                id: 1,
                title: "第9回課題について",
                content: "データ構造の実装課題を配布しました。締切は来週金曜日です。",
            },
            {
                id: 2,
                title: "中間試験の範囲について",
                content: "第1回〜第8回の講義内容が試験範囲となります。",
            },
        ],
        grading: [
            { item: "課題・レポート", percentage: "70%" },
            { item: "定期試験", percentage: "30%" },
        ],
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingTop: 48,
                    paddingBottom: 12,
                    borderBottomWidth: 1,
                    backgroundColor: theme.colors.background.primary,
                    borderBottomColor: theme.colors.border.default,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 15, flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            borderWidth: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: theme.colors.background.secondary,
                            borderColor: theme.colors.border.default,
                        }}
                        onPress={() => router.back()}
                    >
                        <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                    <Typography variant="h3" color={theme.colors.primary.main}>
                        時間割 - 授業
                    </Typography>
                </View>
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.colors.background.secondary,
                        borderColor: theme.colors.border.default,
                    }}
                >
                    <Icon name="settings" size={16} color={theme.colors.text.secondary} />
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, gap: 24 }}>
                {/* Class Header Card */}
                <Card variant="feature" style={{ gap: 16 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h2" color={theme.colors.primary.main} style={{ flex: 1 }}>
                            {courseData.title}
                        </Typography>
                        <Icon name="clipboard-list" size={24} color={theme.colors.primary.main} />
                    </View>

                    <View style={{ gap: 8 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                {courseData.schedule}
                            </Typography>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <Icon name="map-pin" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                {courseData.room}
                            </Typography>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <Icon name="user" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                {courseData.teacher}
                            </Typography>
                        </View>
                    </View>
                </Card>

                {/* Quick Actions */}
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 48,
                        borderRadius: 8,
                        borderWidth: 1,
                        gap: 8,
                        backgroundColor: theme.colors.background.primary,
                        borderColor: theme.colors.border.default,
                    }}
                >
                    <Icon name="clipboard-list" size={20} color={theme.colors.primary.main} />
                    <Typography variant="label" color={theme.colors.primary.main}>
                        課題・教材
                    </Typography>
                    <Icon name="chevron-right" size={16} color={theme.colors.text.secondary} />
                </TouchableOpacity>

                {/* Attendance Section */}
                <Card variant="default" style={{ gap: 16 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            出欠管理
                        </Typography>
                        <Icon name="calendar" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Typography variant="h2" color={theme.colors.status.success}>
                                {courseData.attendance.present}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                出席
                            </Typography>
                        </View>
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Typography variant="h2" color={theme.colors.status.error}>
                                {courseData.attendance.absent}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                欠席
                            </Typography>
                        </View>
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Typography variant="h2" color={theme.colors.status.warning}>
                                {courseData.attendance.late}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                遅刻/早退
                            </Typography>
                        </View>
                    </View>

                    <View style={{ padding: 12, borderRadius: 8, alignItems: "center", gap: 4, backgroundColor: theme.colors.status.success + "20" }}>
                        <Typography variant="label" color={theme.colors.status.success}>
                            出席率: {courseData.attendance.rate}%
                        </Typography>
                        <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                            {courseData.attendance.status}
                        </Typography>
                    </View>
                </Card>

                {/* Announcements Section */}
                <Card variant="default" style={{ gap: 16 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            お知らせ
                        </Typography>
                        <Icon name="bell" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View style={{ gap: 12 }}>
                        {courseData.announcements.map((announcement) => (
                            <View key={announcement.id} style={{ padding: 16, borderRadius: 8, gap: 8, backgroundColor: theme.colors.background.secondary }}>
                                <Typography variant="label" color={theme.colors.text.primary}>
                                    {announcement.title}
                                </Typography>
                                <Typography variant="bodySmall" color={theme.colors.text.secondary} style={{ lineHeight: 20 }}>
                                    {announcement.content}
                                </Typography>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* Grade Evaluation Section */}
                <Card variant="default" style={{ gap: 16 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            成績評価方法・基準
                        </Typography>
                        <Icon name="check" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View style={{ gap: 12 }}>
                        {courseData.grading.map((grade, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: 16,
                                    borderRadius: 8,
                                    backgroundColor: theme.colors.background.secondary,
                                }}
                            >
                                <Typography variant="label" color={theme.colors.text.primary}>
                                    {grade.item}
                                </Typography>
                                <Typography variant="label" color={theme.colors.primary.main}>
                                    {grade.percentage}
                                </Typography>
                            </View>
                        ))}
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
}
