import { Typography } from "@/src/presentation/components/Typography";

export default function NotYetImplemented() {
    return (
        <>
            <Typography>Not Yet Implemented</Typography>
        </>
    );
}

// import { Button } from "@/src/presentation/components/Button";
// import { Card } from "@/src/presentation/components/Card";
// import Header from "@/src/presentation/components/Header";
// import { Icon } from "@/src/presentation/components/Icon";
// import { Typography } from "@/src/presentation/components/Typography";
// import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useMemo } from "react";
// import { ScrollView, TouchableOpacity, View } from "react-native";

// export default function CourseDetail() {
//     const { theme } = useTheme();
//     const router = useRouter();
//     const { courseId } = useLocalSearchParams<{ courseId: string }>();
//     // const { getCourseById, fetchSyllabusDetail } = useCourse();

//     // useCourseからコースデータを取得
//     const courseInfo = useMemo(() => {
//         if (!courseId) return null;
//         return getCourseById(courseId);
//     }, [courseId, getCourseById]);

//     // 出席情報を集計
//     const attendanceStats = useMemo(() => {
//         if (!courseInfo?.attendanceLog) {
//             return { present: 0, absent: 0, late: 0, rate: 0, status: "データがありません" };
//         }

//         const present = courseInfo.attendanceLog.filter((log) => log.status === "present").length;
//         const absent = courseInfo.attendanceLog.filter((log) => log.status === "absent").length;
//         const late = courseInfo.attendanceLog.filter((log) => log.status === "late/early").length;
//         const total = courseInfo.attendanceLog.length;
//         const rate = total > 0 ? Math.round((present / total) * 100 * 10) / 10 : 0;

//         let status = "データがありません";
//         if (total > 0) {
//             if (rate >= 80) status = "良好な出席状況です";
//             else if (rate >= 60) status = "出席率が低下しています";
//             else status = "出席率が著しく低下しています";
//         }

//         return { present, absent, late, rate, status };
//     }, [courseInfo]);

//     // コースが見つからない場合
//     if (!courseInfo) {
//         return (
//             <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
//                 <Header title="授業詳細" shownBackButton />
//                 <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
//                     <Typography variant="body" color={theme.colors.text.secondary}>
//                         授業データが見つかりません
//                     </Typography>
//                 </View>
//             </View>
//         );
//     }

//     const { info, detail, news } = courseInfo;
//     const schedule = info.timetableDate.map((td) => `${td.weekday} ${td.period}限`).join(", ");

//     const courseData = {
//         title: info.name,
//         schedule: schedule,
//         room: info.room,
//         teacher: info.teacher,
//         attendance: attendanceStats,
//         announcements: news || [],
//         grading: detail?.evaluationCriteria || [],
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
//             <Header title="授業詳細" shownBackButton />

//             {__DEV__ && (
//                 <>
//                     <Button
//                         variant="text"
//                         onPress={async () => {
//                             console.log(await fetchSyllabusDetail(courseId));
//                         }}
//                     >
//                         データ取得
//                     </Button>
//                 </>
//             )}

//             <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, gap: 24 }}>
//                 {/* Class Header Card */}
//                 <Card variant="feature" style={{ gap: 16 }}>
//                     <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                         <Typography variant="h2" color={theme.colors.primary.main} style={{ flex: 1 }}>
//                             {courseData.title}
//                         </Typography>
//                         <Icon name="clipboard-list" size={24} color={theme.colors.primary.main} />
//                     </View>

//                     <View style={{ gap: 8 }}>
//                         <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
//                             <Icon name="clock" size={16} color={theme.colors.text.secondary} />
//                             <Typography variant="bodySmall" color={theme.colors.text.secondary}>
//                                 {courseData.schedule}
//                             </Typography>
//                         </View>
//                         <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
//                             <Icon name="map-pin" size={16} color={theme.colors.text.secondary} />
//                             <Typography variant="bodySmall" color={theme.colors.text.secondary}>
//                                 {courseData.room}
//                             </Typography>
//                         </View>
//                         <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
//                             <Icon name="user" size={16} color={theme.colors.text.secondary} />
//                             <Typography variant="bodySmall" color={theme.colors.text.secondary}>
//                                 {courseData.teacher}
//                             </Typography>
//                         </View>
//                     </View>
//                 </Card>

//                 {/* Quick Actions */}
//                 <TouchableOpacity
//                     onPress={() => router.push(`/course/${courseId}/assignments`)}
//                     style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         height: 48,
//                         borderRadius: 8,
//                         borderWidth: 1,
//                         gap: 8,
//                         backgroundColor: theme.colors.background.primary,
//                         borderColor: theme.colors.border.default,
//                     }}
//                 >
//                     <Icon name="clipboard-list" size={20} color={theme.colors.primary.main} />
//                     <Typography variant="label" color={theme.colors.primary.main}>
//                         課題・教材
//                     </Typography>
//                     <Icon name="chevron-right" size={16} color={theme.colors.text.secondary} />
//                 </TouchableOpacity>

//                 {/* Attendance Section */}
//                 <Card variant="default" style={{ gap: 16 }}>
//                     <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                         <Typography variant="h3" color={theme.colors.text.primary}>
//                             出欠管理
//                         </Typography>
//                         <Icon name="calendar" size={24} color={theme.colors.text.primary} />
//                     </View>

//                     <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
//                         <View style={{ alignItems: "center", gap: 4 }}>
//                             <Typography variant="h2" color={theme.colors.status.success}>
//                                 {courseData.attendance.present}
//                             </Typography>
//                             <Typography variant="caption" color={theme.colors.text.secondary}>
//                                 出席
//                             </Typography>
//                         </View>
//                         <View style={{ alignItems: "center", gap: 4 }}>
//                             <Typography variant="h2" color={theme.colors.status.error}>
//                                 {courseData.attendance.absent}
//                             </Typography>
//                             <Typography variant="caption" color={theme.colors.text.secondary}>
//                                 欠席
//                             </Typography>
//                         </View>
//                         <View style={{ alignItems: "center", gap: 4 }}>
//                             <Typography variant="h2" color={theme.colors.status.warning}>
//                                 {courseData.attendance.late}
//                             </Typography>
//                             <Typography variant="caption" color={theme.colors.text.secondary}>
//                                 遅刻/早退
//                             </Typography>
//                         </View>
//                     </View>

//                     <View style={{ padding: 12, borderRadius: 8, alignItems: "center", gap: 4, backgroundColor: theme.colors.status.success + "20" }}>
//                         <Typography variant="label" color={theme.colors.status.success}>
//                             出席率: {courseData.attendance.rate}%
//                         </Typography>
//                         <Typography variant="bodySmall" color={theme.colors.text.secondary}>
//                             {courseData.attendance.status}
//                         </Typography>
//                     </View>
//                 </Card>

//                 {/* Announcements Section */}
//                 <Card variant="default" style={{ gap: 16 }}>
//                     <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                         <Typography variant="h3" color={theme.colors.text.primary}>
//                             お知らせ
//                         </Typography>
//                         <Icon name="bell" size={24} color={theme.colors.text.primary} />
//                     </View>

//                     <View style={{ gap: 12 }}>
//                         {courseData.announcements.length > 0 ? (
//                             courseData.announcements.map((announcement, index) => (
//                                 <View key={index} style={{ padding: 16, borderRadius: 8, gap: 8, backgroundColor: theme.colors.background.secondary }}>
//                                     <Typography variant="label" color={theme.colors.text.primary}>
//                                         {announcement.title}
//                                     </Typography>
//                                     <Typography variant="bodySmall" color={theme.colors.text.secondary} style={{ lineHeight: 20 }}>
//                                         {announcement.body}
//                                     </Typography>
//                                 </View>
//                             ))
//                         ) : (
//                             <View style={{ padding: 16, borderRadius: 8, backgroundColor: theme.colors.background.secondary }}>
//                                 <Typography variant="bodySmall" color={theme.colors.text.secondary}>
//                                     お知らせはありません
//                                 </Typography>
//                             </View>
//                         )}
//                     </View>
//                 </Card>

//                 {/* Grade Evaluation Section */}
//                 <Card variant="default" style={{ gap: 16 }}>
//                     <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                         <Typography variant="h3" color={theme.colors.text.primary}>
//                             成績評価方法・基準
//                         </Typography>
//                         <Icon name="check" size={24} color={theme.colors.text.primary} />
//                     </View>

//                     <View style={{ gap: 12 }}>
//                         {courseData.grading.length > 0 ? (
//                             courseData.grading.map((grade, index) => (
//                                 <View
//                                     key={index}
//                                     style={{
//                                         flexDirection: "row",
//                                         justifyContent: "space-between",
//                                         alignItems: "center",
//                                         padding: 16,
//                                         borderRadius: 8,
//                                         backgroundColor: theme.colors.background.secondary,
//                                     }}
//                                 >
//                                     <Typography variant="label" color={theme.colors.text.primary}>
//                                         {grade.item}
//                                     </Typography>
//                                     <Typography variant="label" color={theme.colors.primary.main}>
//                                         {grade.weight}
//                                     </Typography>
//                                 </View>
//                             ))
//                         ) : (
//                             <View style={{ padding: 16, borderRadius: 8, backgroundColor: theme.colors.background.secondary }}>
//                                 <Typography variant="bodySmall" color={theme.colors.text.secondary}>
//                                     評価基準の情報はありません
//                                 </Typography>
//                             </View>
//                         )}
//                     </View>
//                 </Card>
//             </ScrollView>
//         </View>
//     );
// }
