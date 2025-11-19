import React, { useEffect, useMemo } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Modal as RNModal,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import classUsecaseInstance, { AttendanceStatsSummary } from "@/src/domain/usecase/classUsecase";
import { Button } from "@/src/presentation/components/Button";
import { Card } from "@/src/presentation/components/Card";
import Header from "@/src/presentation/components/Header";
import { Icon } from "@/src/presentation/components/Icon";
import { Input } from "@/src/presentation/components/Input";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useTimetable from "@/src/presentation/hooks/useTimetable";

type EditableClassFields = {
    name: string;
    room: string;
    teacher: string;
};

export default function ClassDetail() {
    const { theme } = useTheme();
    const router = useRouter();
    const { classId } = useLocalSearchParams<{ classId: string }>();
    const { courses, updateCourse } = useTimetable();

    const course = courses[classId];
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [editFields, setEditFields] = React.useState<EditableClassFields>({ name: "", room: "", teacher: "" });

    useEffect(() => {
        if (course) {
            setEditFields({
                name: course.name,
                room: course.room,
                teacher: course.teacher,
            });
        }
    }, [course]);

    // 出席情報を集計
    const attendanceStats = useMemo<AttendanceStatsSummary>(
        () => classUsecaseInstance.calculateAttendanceStats(course?.attendanceLog ?? []),
        [course?.attendanceLog]
    );

    // 授業が見つからない場合
    if (!course) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
                <Header title="授業詳細" shownBackButton />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                    }}
                >
                    <Typography variant="body" color={theme.colors.text.secondary}>
                        授業データが見つかりません
                    </Typography>
                </View>
            </View>
        );
    }

    const schedule = classUsecaseInstance.buildScheduleLabel(course);

    const finalClassData = {
        title: course.name,
        schedule: schedule,
        room: course.room,
        teacher: course.teacher,
        attendance: attendanceStats,
        announcements: course.news || [],
        grading: course.detail?.evaluationCriteria || [],
    };

    const handleOpenEditModal = () => {
        setEditFields({
            name: course.name ?? "",
            room: course.room ?? "",
            teacher: course.teacher ?? "",
        });
        setIsEditModalOpen(true);
    };

    const handleChangeEditField = (field: keyof EditableClassFields, value: string) => {
        setEditFields((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCancelEditModal = () => {
        setIsEditModalOpen(false);
        setEditFields({ name: "", room: "", teacher: "" });
    };

    const handleSaveEditModal = () => {
        if (!course) return;

        updateCourse(course.id, {
            name: editFields.name.trim(),
            room: editFields.room.trim(),
            teacher: editFields.teacher.trim(),
        });

        setIsEditModalOpen(false);
        setEditFields({ name: "", room: "", teacher: "" });
    };

    const isSaveDisabled = !editFields.name.trim();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="授業詳細" shownBackButton subButtonIcon="edit" onPressSubButton={handleOpenEditModal} />

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, gap: 24 }}>
                {/* Class Header Card */}
                <Card variant="feature" style={{ gap: 16 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 8 }}>
                            <Typography variant="h2" color={theme.colors.primary.main} style={{ flex: 1 }}>
                                {finalClassData.title}
                            </Typography>
                            <Icon name="clipboard-list" size={24} color={theme.colors.primary.main} />
                        </View>
                    </View>

                    <View style={{ gap: 8 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <Icon name="clock" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                {finalClassData.schedule}
                            </Typography>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <Icon name="map-pin" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                {finalClassData.room}
                            </Typography>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <Icon name="user" size={16} color={theme.colors.text.secondary} />
                            <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                {finalClassData.teacher}
                            </Typography>
                        </View>
                    </View>
                </Card>

                {/* Quick Actions */}
                <TouchableOpacity
                    onPress={() => router.push(`/class/${classId}/assignments`)}
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
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            出欠管理
                        </Typography>
                        <Icon name="calendar" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: 8,
                        }}
                    >
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Typography variant="h2" color={theme.colors.status.success}>
                                {finalClassData.attendance.present}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                出席
                            </Typography>
                        </View>
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Typography variant="h2" color={theme.colors.status.error}>
                                {finalClassData.attendance.absent}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                欠席
                            </Typography>
                        </View>
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Typography variant="h2" color={theme.colors.status.warning}>
                                {finalClassData.attendance.late}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                遅刻/早退
                            </Typography>
                        </View>
                    </View>

                    <View
                        style={{
                            padding: 12,
                            borderRadius: 8,
                            alignItems: "center",
                            gap: 4,
                            backgroundColor: theme.colors.status.success + "20",
                        }}
                    >
                        <Typography variant="label" color={theme.colors.status.success}>
                            出席率: {finalClassData.attendance.rate}%
                        </Typography>
                        <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                            {finalClassData.attendance.status}
                        </Typography>
                    </View>
                </Card>

                {/* Announcements Section */}
                <Card variant="default" style={{ gap: 16 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            お知らせ
                        </Typography>
                        <Icon name="bell" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View style={{ gap: 12 }}>
                        {finalClassData.announcements.length > 0 ? (
                            finalClassData.announcements.map((announcement, index) => (
                                <View
                                    key={index}
                                    style={{
                                        padding: 16,
                                        borderRadius: 8,
                                        gap: 8,
                                        backgroundColor: theme.colors.background.secondary,
                                    }}
                                >
                                    <Typography variant="label" color={theme.colors.text.primary}>
                                        {announcement.title}
                                    </Typography>
                                    <Typography
                                        variant="bodySmall"
                                        color={theme.colors.text.secondary}
                                        style={{ lineHeight: 20 }}
                                    >
                                        {announcement.body}
                                    </Typography>
                                </View>
                            ))
                        ) : (
                            <View
                                style={{
                                    padding: 16,
                                    borderRadius: 8,
                                    backgroundColor: theme.colors.background.secondary,
                                }}
                            >
                                <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                    お知らせはありません
                                </Typography>
                            </View>
                        )}
                    </View>
                </Card>

                {/* Grade Evaluation Section */}
                <Card variant="default" style={{ gap: 16 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h3" color={theme.colors.text.primary}>
                            成績評価方法・基準
                        </Typography>
                        <Icon name="check" size={24} color={theme.colors.text.primary} />
                    </View>

                    <View style={{ gap: 12 }}>
                        {finalClassData.grading.length > 0 ? (
                            finalClassData.grading.map((grade, index) => (
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
                                        {grade.weight}
                                    </Typography>
                                </View>
                            ))
                        ) : (
                            <View
                                style={{
                                    padding: 16,
                                    borderRadius: 8,
                                    backgroundColor: theme.colors.background.secondary,
                                }}
                            >
                                <Typography variant="bodySmall" color={theme.colors.text.secondary}>
                                    評価基準の情報はありません
                                </Typography>
                            </View>
                        )}
                    </View>
                </Card>
            </ScrollView>

            <Modal
                visible={isEditModalOpen}
                values={editFields}
                onChangeField={handleChangeEditField}
                onCancel={handleCancelEditModal}
                onSave={handleSaveEditModal}
                isSaveDisabled={isSaveDisabled}
            />
        </View>
    );
}

interface ModalProps {
    visible: boolean;
    values: EditableClassFields;
    onChangeField: (field: keyof EditableClassFields, value: string) => void;
    onCancel: () => void;
    onSave: () => void;
    isSaveDisabled: boolean;
}

function Modal({ visible, values, onChangeField, onCancel, onSave, isSaveDisabled }: ModalProps) {
    const { theme } = useTheme();

    return (
        <RNModal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={onCancel}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: theme.spacing.lg,
                        }}
                    >
                        <TouchableWithoutFeedback>
                            <View
                                style={{
                                    backgroundColor: theme.colors.background.primary,
                                    borderRadius: theme.spacing.borderRadius.lg,
                                    padding: theme.spacing.lg,
                                    width: "100%",
                                    maxWidth: 420,
                                    ...theme.components.shadows.large,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: theme.spacing.md,
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        style={{
                                            color: theme.colors.text.primary,
                                            fontSize: 20,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        授業情報を編集
                                    </Typography>
                                    <TouchableOpacity onPress={onCancel} style={{ padding: theme.spacing.xs }}>
                                        <Typography
                                            variant="body"
                                            style={{
                                                color: theme.colors.text.secondary,
                                                fontSize: 24,
                                                lineHeight: 24,
                                            }}
                                        >
                                            ×
                                        </Typography>
                                    </TouchableOpacity>
                                </View>

                                <Typography
                                    variant="body"
                                    style={{
                                        color: theme.colors.text.secondary,
                                        fontSize: 14,
                                        marginBottom: theme.spacing.lg,
                                    }}
                                >
                                    時間割データに表示される授業名・教室・担当教員を手動で調整できます。
                                </Typography>

                                <View style={{ gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
                                    <Input
                                        value={values.name}
                                        onChangeText={(text) => onChangeField("name", text)}
                                        placeholder="授業名"
                                        autoFocus
                                    />
                                    <Input
                                        value={values.room}
                                        onChangeText={(text) => onChangeField("room", text)}
                                        placeholder="教室番号"
                                    />
                                    <Input
                                        value={values.teacher}
                                        onChangeText={(text) => onChangeField("teacher", text)}
                                        placeholder="担当教員"
                                    />
                                </View>

                                <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
                                    <View style={{ flex: 1 }}>
                                        <Button variant="secondary" onPress={onCancel} style={{ height: 48 }}>
                                            キャンセル
                                        </Button>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Button
                                            variant="primary"
                                            onPress={onSave}
                                            disabled={isSaveDisabled}
                                            style={{ height: 48 }}
                                        >
                                            保存
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </RNModal>
    );
}
