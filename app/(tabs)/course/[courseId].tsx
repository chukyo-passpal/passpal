import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Card, Typography, Icon, useTheme } from "@/design-system";

export default function CourseDetail() {
    const theme = useTheme();

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
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.colors.background.primary, borderBottomColor: theme.colors.border.default }]}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        style={[styles.iconButton, { backgroundColor: theme.colors.background.secondary, borderColor: theme.colors.border.default }]}
                        onPress={() => router.back()}
                    >
                        <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                    <Typography variant="h3" color={theme.colors.primary.main}>
                        時間割 - 授業
                    </Typography>
                </View>
                <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.background.secondary, borderColor: theme.colors.border.default }]}>
                    <Icon name="settings" size={16} color={theme.colors.text.secondary} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                {/* Class Header Card */}
                <Card variant="feature" style={styles.classHeader}>
                    <View style={styles.classTitleRow}>
                        <Typography variant="h2" color={theme.colors.primary.main} style={styles.classTitle}>
                            {courseData.title}
                        </Typography>
                        <Icon name="clipboard-list" size={24} color={theme.colors.primary.main} />
                    </View>

                    <View style={styles.classInfo}>
                        <View style={styles.infoRow}>
                            <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                {courseData.schedule}
                            </Typography>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="map-pin" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                {courseData.room}
                            </Typography>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="user" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                {courseData.teacher}
                            </Typography>
                        </View>
                    </View>
                </Card>

                {/* Quick Actions */}
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background.primary, borderColor: theme.colors.border.default }]}>
                    <Icon name="clipboard-list" size={20} color={theme.colors.primary.main} />
                    <Typography variant="label" color={theme.colors.primary.main}>
                        課題・教材
                    </Typography>
                    <Icon name="chevron-right" size={16} color={theme.colors.text.secondary} />
                </TouchableOpacity>

                {/* Attendance Section */}
                <Card variant="default" style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            出欠管理
                        </Typography>
                        <Icon name="calendar" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View style={styles.attendanceStats}>
                        <View style={styles.statItem}>
                            <Typography variant="h2" color="#90c695">
                                {courseData.attendance.present}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                出席
                            </Typography>
                        </View>
                        <View style={styles.statItem}>
                            <Typography variant="h2" color="#e57373">
                                {courseData.attendance.absent}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                欠席
                            </Typography>
                        </View>
                        <View style={styles.statItem}>
                            <Typography variant="h2" color="#f5c842">
                                {courseData.attendance.late}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                遅刻/早退
                            </Typography>
                        </View>
                    </View>

                    <View style={[styles.attendanceRate, { backgroundColor: "#f0f9f1" }]}>
                        <Typography variant="label" color="#90c695">
                            出席率: {courseData.attendance.rate}%
                        </Typography>
                        <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                            {courseData.attendance.status}
                        </Typography>
                    </View>
                </Card>

                {/* Announcements Section */}
                <Card variant="default" style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            お知らせ
                        </Typography>
                        <Icon name="bell" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View style={styles.announcementsList}>
                        {courseData.announcements.map((announcement) => (
                            <View key={announcement.id} style={[styles.announcementItem, { backgroundColor: theme.colors.background.secondary }]}>
                                <Typography variant="label" color={theme.colors.text.primary}>
                                    {announcement.title}
                                </Typography>
                                <Typography variant="bodySmall" color={theme.colors.text.secondary} style={styles.announcementContent}>
                                    {announcement.content}
                                </Typography>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* Grade Evaluation Section */}
                <Card variant="default" style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            成績評価方法・基準
                        </Typography>
                        <Icon name="check" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View style={styles.gradeBreakdown}>
                        {courseData.grading.map((grade, index) => (
                            <View key={index} style={[styles.gradeItem, { backgroundColor: theme.colors.background.secondary }]}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 48,
        paddingBottom: 12,
        borderBottomWidth: 1,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        flex: 1,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        gap: 24,
    },
    classHeader: {
        gap: 16,
    },
    classTitleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    classTitle: {
        flex: 1,
    },
    classInfo: {
        gap: 8,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        gap: 8,
    },
    section: {
        gap: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    attendanceStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    statItem: {
        alignItems: "center",
        gap: 4,
    },
    attendanceRate: {
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        gap: 4,
    },
    announcementsList: {
        gap: 12,
    },
    announcementItem: {
        padding: 16,
        borderRadius: 8,
        gap: 8,
    },
    announcementContent: {
        lineHeight: 20,
    },
    gradeBreakdown: {
        gap: 12,
    },
    gradeItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderRadius: 8,
    },
});
