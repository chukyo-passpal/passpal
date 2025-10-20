import { Typography } from "@/src/presentation/components/Typography";

export default function NotYetImplemented() {
    return (
        <>
            <Typography>Not Yet Implemented</Typography>
        </>
    );
}

// import { Card } from "@/src/presentation/components/Card";
// import Header from "@/src/presentation/components/Header";
// import { Icon } from "@/src/presentation/components/Icon";
// import { Typography } from "@/src/presentation/components/Typography";
// import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
// import { useLocalSearchParams } from "expo-router";
// import React, { useEffect, useMemo } from "react";
// import { ActivityIndicator, Linking, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";

// export default function CourseAssignments() {
//     const { theme } = useTheme();
//     const { courseId } = useLocalSearchParams<{ courseId: string }>();
//     // const { getCourseById } = useCourse();
//     // const { fetchClassAssignments, getAssignmentsByCourseId, loading, error, clearError, updateAssignmentStatus } = useAssignment();

//     // コース情報を取得
//     const courseInfo = useMemo(() => {
//         if (!courseId) return null;
//         return getCourseById(courseId);
//     }, [courseId, getCourseById]);

//     // この授業の課題のみを取得
//     const assignments = useMemo(() => {
//         if (!courseId) return [];
//         const courseAssignments = getAssignmentsByCourseId(courseId);
//         return sortAssignmentsByDueDate(courseAssignments);
//     }, [courseId, getAssignmentsByCourseId]);

//     // 初回読み込み
//     useEffect(() => {
//         if (courseId && courseInfo) {
//             fetchClassAssignments(courseId, courseInfo.info.name, "2025年度春学期");
//         }
//     }, [courseId, courseInfo]);

//     // 課題を更新
//     const handleRefresh = () => {
//         if (courseId && courseInfo) {
//             clearError();
//             fetchClassAssignments(courseId, courseInfo.info.name, "2025年度春学期");
//         }
//     };

//     // MaNaBoで開く
//     const handleOpenInManabo = (url?: string) => {
//         if (url) {
//             Linking.openURL(url);
//         }
//     };

//     // ステータスの色を取得
//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "completed":
//                 return theme.colors.status.success;
//             case "in-progress":
//                 return theme.colors.status.warning;
//             case "not-started":
//                 return theme.colors.status.error;
//             default:
//                 return theme.colors.text.secondary;
//         }
//     };

//     // ステータスのラベルを取得
//     const getStatusLabel = (status: string) => {
//         switch (status) {
//             case "completed":
//                 return "完了";
//             case "in-progress":
//                 return "進行中";
//             case "not-started":
//                 return "未開始";
//             default:
//                 return status;
//         }
//     };

//     // 優先度の色を取得
//     const getPriorityColor = (priority?: string) => {
//         switch (priority) {
//             case "high":
//                 return theme.colors.status.error;
//             case "medium":
//                 return theme.colors.status.warning;
//             case "low":
//                 return theme.colors.status.info;
//             default:
//                 return theme.colors.text.secondary;
//         }
//     };

//     // 優先度のラベルを取得
//     const getPriorityLabel = (priority?: string) => {
//         switch (priority) {
//             case "high":
//                 return "高";
//             case "medium":
//                 return "中";
//             case "low":
//                 return "低";
//             default:
//                 return "なし";
//         }
//     };

//     // 課題の統計
//     const stats = useMemo(() => {
//         const total = assignments.length;
//         const completed = assignments.filter((a) => a.status === "completed").length;
//         const inProgress = assignments.filter((a) => a.status === "in-progress").length;
//         const notStarted = assignments.filter((a) => a.status === "not-started").length;
//         const overdue = assignments.filter((a) => a.dueDate && a.dueDate < new Date() && a.status !== "completed").length;

//         return { total, completed, inProgress, notStarted, overdue };
//     }, [assignments]);

//     // コースが見つからない場合
//     if (!courseInfo) {
//         return (
//             <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
//                 <Header title="課題一覧" shownBackButton />
//                 <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
//                     <Typography variant="body" color={theme.colors.text.secondary}>
//                         授業データが見つかりません
//                     </Typography>
//                 </View>
//             </View>
//         );
//     }

//     return (
//         <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
//             <Header title="課題一覧" shownBackButton />

//             <ScrollView
//                 style={{ flex: 1 }}
//                 contentContainerStyle={{ padding: 20, gap: 24 }}
//                 refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} colors={[theme.colors.primary.main]} />}
//             >
//                 {/* 授業情報ヘッダー */}
//                 <Card variant="feature" style={{ gap: 12 }}>
//                     <Typography variant="h2" color={theme.colors.primary.main}>
//                         {courseInfo.info.name}
//                     </Typography>
//                     <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
//                         <Icon name="user" size={16} color={theme.colors.text.secondary} />
//                         <Typography variant="bodySmall" color={theme.colors.text.secondary}>
//                             {courseInfo.info.teacher}
//                         </Typography>
//                     </View>
//                 </Card>

//                 {/* 統計情報 */}
//                 <Card variant="default" style={{ gap: 16 }}>
//                     <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                         <Typography variant="h3" color={theme.colors.text.primary}>
//                             課題の進捗状況
//                         </Typography>
//                         <Icon name="clipboard-list" size={24} color={theme.colors.text.primary} />
//                     </View>

//                     <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
//                         <View style={{ alignItems: "center", gap: 4 }}>
//                             <Typography variant="h2" color={theme.colors.text.primary}>
//                                 {stats.total}
//                             </Typography>
//                             <Typography variant="caption" color={theme.colors.text.secondary}>
//                                 総数
//                             </Typography>
//                         </View>
//                         <View style={{ alignItems: "center", gap: 4 }}>
//                             <Typography variant="h2" color={theme.colors.status.success}>
//                                 {stats.completed}
//                             </Typography>
//                             <Typography variant="caption" color={theme.colors.text.secondary}>
//                                 完了
//                             </Typography>
//                         </View>
//                         <View style={{ alignItems: "center", gap: 4 }}>
//                             <Typography variant="h2" color={theme.colors.status.warning}>
//                                 {stats.inProgress}
//                             </Typography>
//                             <Typography variant="caption" color={theme.colors.text.secondary}>
//                                 進行中
//                             </Typography>
//                         </View>
//                         <View style={{ alignItems: "center", gap: 4 }}>
//                             <Typography variant="h2" color={theme.colors.status.error}>
//                                 {stats.notStarted}
//                             </Typography>
//                             <Typography variant="caption" color={theme.colors.text.secondary}>
//                                 未開始
//                             </Typography>
//                         </View>
//                     </View>

//                     {stats.overdue > 0 && (
//                         <View
//                             style={{
//                                 padding: 12,
//                                 borderRadius: 8,
//                                 alignItems: "center",
//                                 backgroundColor: theme.colors.status.error + "20",
//                             }}
//                         >
//                             <Typography variant="label" color={theme.colors.status.error}>
//                                 期限切れ: {stats.overdue}件
//                             </Typography>
//                         </View>
//                     )}
//                 </Card>

//                 {/* エラー表示 */}
//                 {error && (
//                     <Card variant="default" style={{ backgroundColor: theme.colors.status.error + "20" }}>
//                         <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
//                             <Icon name="alert-triangle" size={20} color={theme.colors.status.error} />
//                             <View style={{ flex: 1 }}>
//                                 <Typography variant="label" color={theme.colors.status.error}>
//                                     エラーが発生しました
//                                 </Typography>
//                                 <Typography variant="bodySmall" color={theme.colors.text.secondary}>
//                                     {error.message}
//                                 </Typography>
//                             </View>
//                         </View>
//                     </Card>
//                 )}

//                 {/* 読み込み中 */}
//                 {loading && assignments.length === 0 && (
//                     <View style={{ paddingVertical: 40, alignItems: "center" }}>
//                         <ActivityIndicator size="large" color={theme.colors.primary.main} />
//                         <Typography variant="body" color={theme.colors.text.secondary} style={{ marginTop: 16 }}>
//                             課題を読み込み中...
//                         </Typography>
//                     </View>
//                 )}

//                 {/* 課題一覧 */}
//                 {!loading && assignments.length === 0 ? (
//                     <Card variant="default">
//                         <View style={{ padding: 16, alignItems: "center", gap: 12 }}>
//                             <Icon name="clipboard-list" size={48} color={theme.colors.text.secondary} />
//                             <Typography variant="body" color={theme.colors.text.secondary}>
//                                 課題はありません
//                             </Typography>
//                         </View>
//                     </Card>
//                 ) : (
//                     <View style={{ gap: 16 }}>
//                         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                             <Typography variant="h3" color={theme.colors.text.primary}>
//                                 課題リスト
//                             </Typography>
//                             <Typography variant="caption" color={theme.colors.text.secondary}>
//                                 期限順
//                             </Typography>
//                         </View>

//                         {assignments.map((assignment) => {
//                             const isOverdue = assignment.dueDate && assignment.dueDate < new Date() && assignment.status !== "completed";

//                             return (
//                                 <Card
//                                     key={assignment.id}
//                                     variant="default"
//                                     style={{
//                                         gap: 12,
//                                         borderLeftWidth: 4,
//                                         borderLeftColor: isOverdue ? theme.colors.status.error : getPriorityColor(assignment.priority),
//                                     }}
//                                 >
//                                     {/* タイトルとステータス */}
//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
//                                         <View style={{ flex: 1 }}>
//                                             <Typography variant="label" color={theme.colors.text.primary}>
//                                                 {assignment.title}
//                                             </Typography>
//                                         </View>
//                                         <View
//                                             style={{
//                                                 paddingHorizontal: 8,
//                                                 paddingVertical: 4,
//                                                 borderRadius: 4,
//                                                 backgroundColor: getStatusColor(assignment.status) + "20",
//                                             }}
//                                         >
//                                             <Typography variant="caption" color={getStatusColor(assignment.status)}>
//                                                 {getStatusLabel(assignment.status)}
//                                             </Typography>
//                                         </View>
//                                     </View>

//                                     {/* 期限 */}
//                                     {assignment.dueDate && (
//                                         <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
//                                             <Icon name="calendar" size={16} color={isOverdue ? theme.colors.status.error : theme.colors.text.secondary} />
//                                             <Typography variant="bodySmall" color={isOverdue ? theme.colors.status.error : theme.colors.text.secondary}>
//                                                 期限: {assignment.dueDate.toLocaleDateString("ja-JP")}{" "}
//                                                 {assignment.dueDate.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
//                                             </Typography>
//                                             {isOverdue && (
//                                                 <View
//                                                     style={{
//                                                         paddingHorizontal: 6,
//                                                         paddingVertical: 2,
//                                                         borderRadius: 4,
//                                                         backgroundColor: theme.colors.status.error + "20",
//                                                     }}
//                                                 >
//                                                     <Typography variant="caption" color={theme.colors.status.error}>
//                                                         期限切れ
//                                                     </Typography>
//                                                 </View>
//                                             )}
//                                         </View>
//                                     )}

//                                     {/* 優先度 */}
//                                     {assignment.priority && (
//                                         <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
//                                             <Icon name="flag" size={16} color={getPriorityColor(assignment.priority)} />
//                                             <Typography variant="bodySmall" color={getPriorityColor(assignment.priority)}>
//                                                 優先度: {getPriorityLabel(assignment.priority)}
//                                             </Typography>
//                                         </View>
//                                     )}

//                                     {/* アクションボタン */}
//                                     <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
//                                         {/* MaNaBoで開く */}
//                                         {assignment.manaboUrl && (
//                                             <TouchableOpacity
//                                                 onPress={() => handleOpenInManabo(assignment.manaboUrl)}
//                                                 style={{
//                                                     flex: 1,
//                                                     flexDirection: "row",
//                                                     alignItems: "center",
//                                                     justifyContent: "center",
//                                                     paddingVertical: 8,
//                                                     paddingHorizontal: 12,
//                                                     borderRadius: 6,
//                                                     backgroundColor: theme.colors.primary.main,
//                                                     gap: 6,
//                                                 }}
//                                             >
//                                                 <Icon name="arrow-left-right" size={16} color={theme.colors.background.primary} />
//                                                 <Typography variant="label" color={theme.colors.background.primary}>
//                                                     MaNaBoで開く
//                                                 </Typography>
//                                             </TouchableOpacity>
//                                         )}

//                                         {/* ステータス変更 */}
//                                         {assignment.status !== "completed" && (
//                                             <TouchableOpacity
//                                                 onPress={() => updateAssignmentStatus(assignment.id, "completed")}
//                                                 style={{
//                                                     flexDirection: "row",
//                                                     alignItems: "center",
//                                                     justifyContent: "center",
//                                                     paddingVertical: 8,
//                                                     paddingHorizontal: 12,
//                                                     borderRadius: 6,
//                                                     borderWidth: 1,
//                                                     borderColor: theme.colors.status.success,
//                                                     gap: 6,
//                                                 }}
//                                             >
//                                                 <Icon name="check" size={16} color={theme.colors.status.success} />
//                                                 <Typography variant="label" color={theme.colors.status.success}>
//                                                     完了
//                                                 </Typography>
//                                             </TouchableOpacity>
//                                         )}
//                                     </View>
//                                 </Card>
//                             );
//                         })}
//                     </View>
//                 )}
//             </ScrollView>
//         </View>
//     );
// }
