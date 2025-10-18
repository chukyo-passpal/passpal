// /**
//  * Assignment Hooks
//  * Zustandを使用した課題データの状態管理
//  */

// import { AssignmentStatus } from "@/constants/assignment";
// import { AssignmentData, AssignmentInfo } from "@/types/assignment";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";
// import { assignmentService, AssignmentService } from "../services/assignmentService";

// /**
//  * Assignment State
//  */
// export interface AssignmentState {
//     lastFetch: Date | null;
//     assignmentData: AssignmentData | null;
//     loading: boolean;
//     error: Error | null;

//     /**
//      * 課題データを直接設定
//      */
//     setAssignmentData: (assignmentData: AssignmentData | null) => void;

//     /**
//      * 単一授業の課題を取得
//      */
//     fetchClassAssignments: (classId: string, courseName: string, semester: string, service?: AssignmentService) => Promise<void>;

//     /**
//      * 複数授業の課題を取得
//      */
//     fetchMultipleClassAssignments: (courses: { classId: string; courseName: string }[], semester: string, service?: AssignmentService) => Promise<void>;

//     /**
//      * 課題データを再取得
//      */
//     refetch: () => Promise<void>;

//     /**
//      * 課題IDで課題を取得
//      */
//     getAssignmentById: (id: string) => AssignmentInfo | null;

//     /**
//      * 授業IDで課題をフィルタ
//      */
//     getAssignmentsByCourseId: (courseId: string) => AssignmentData;

//     /**
//      * ステータスで課題をフィルタ
//      */
//     getAssignmentsByStatus: (status: AssignmentStatus) => AssignmentData;

//     /**
//      * 期限が近い課題を取得
//      */
//     getUpcomingAssignments: (days?: number) => AssignmentData;

//     /**
//      * 課題のステータスを更新
//      */
//     updateAssignmentStatus: (id: string, status: AssignmentStatus) => void;

//     /**
//      * エラーをクリア
//      */
//     clearError: () => void;
// }

// const useAssignment = create<AssignmentState>()(
//     persist(
//         immer((set, get) => ({
//             lastFetch: null,
//             assignmentData: null,
//             loading: false,
//             error: null,

//             setAssignmentData: (assignmentData: AssignmentData | null) =>
//                 set((state) => {
//                     state.assignmentData = assignmentData;
//                 }),

//             fetchClassAssignments: async (classId: string, courseName: string, semester: string, service: AssignmentService = assignmentService) => {
//                 set((state) => {
//                     state.loading = true;
//                     state.error = null;
//                 });

//                 try {
//                     const data = await service.getAllClassAssignments(classId, courseName, semester);
//                     set((state) => {
//                         // 既存の課題データがある場合はマージ
//                         if (state.assignmentData) {
//                             // 同じ授業の課題は置き換え、他は保持
//                             const filtered = state.assignmentData.filter((a) => a.courseId !== classId);
//                             state.assignmentData = [...filtered, ...data];
//                         } else {
//                             state.assignmentData = data;
//                         }
//                         state.loading = false;
//                         state.lastFetch = new Date();
//                     });
//                 } catch (err) {
//                     set((state) => {
//                         state.error = err instanceof Error ? err : new Error("Failed to fetch assignments");
//                         state.loading = false;
//                     });
//                 }
//             },

//             fetchMultipleClassAssignments: async (
//                 courses: { classId: string; courseName: string }[],
//                 semester: string,
//                 service: AssignmentService = assignmentService
//             ) => {
//                 set((state) => {
//                     state.loading = true;
//                     state.error = null;
//                 });

//                 try {
//                     // 全授業の課題を並列で取得
//                     const promises = courses.map((course) => service.getAllClassAssignments(course.classId, course.courseName, semester));

//                     const results = await Promise.all(promises);
//                     const allAssignments = results.flat();

//                     set((state) => {
//                         state.assignmentData = allAssignments;
//                         state.loading = false;
//                         state.lastFetch = new Date();
//                     });
//                 } catch (err) {
//                     set((state) => {
//                         state.error = err instanceof Error ? err : new Error("Failed to fetch assignments");
//                         state.loading = false;
//                     });
//                 }
//             },

//             refetch: async () => {
//                 // 最後の取得パラメータを保持する必要がある場合は、stateに保存する
//                 // ここでは簡易的に実装
//                 set((state) => {
//                     state.loading = true;
//                     state.error = null;
//                 });

//                 try {
//                     // Note: refetchを実装するには、最後の取得パラメータを保存する必要があります
//                     // 現在は空の実装
//                     set((state) => {
//                         state.loading = false;
//                         state.lastFetch = new Date();
//                     });
//                 } catch (err) {
//                     set((state) => {
//                         state.error = err instanceof Error ? err : new Error("Failed to refetch assignments");
//                         state.loading = false;
//                     });
//                 }
//             },

//             getAssignmentById: (id: string) => {
//                 const state = get();
//                 if (!state.assignmentData) return null;
//                 return state.assignmentData.find((a) => a.id === id) || null;
//             },

//             getAssignmentsByCourseId: (courseId: string) => {
//                 const state = get();
//                 if (!state.assignmentData) return [];
//                 return state.assignmentData.filter((a) => a.courseId === courseId);
//             },

//             getAssignmentsByStatus: (status: AssignmentStatus) => {
//                 const state = get();
//                 if (!state.assignmentData) return [];
//                 return state.assignmentData.filter((a) => a.status === status);
//             },

//             getUpcomingAssignments: (days: number = 7) => {
//                 const state = get();
//                 if (!state.assignmentData) return [];

//                 const now = new Date();
//                 const targetDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

//                 return state.assignmentData.filter((a) => {
//                     if (!a.dueDate) return false;
//                     return a.dueDate >= now && a.dueDate <= targetDate;
//                 });
//             },

//             updateAssignmentStatus: (id: string, status: AssignmentStatus) =>
//                 set((state) => {
//                     if (!state.assignmentData) return;
//                     const assignment = state.assignmentData.find((a) => a.id === id);
//                     if (assignment) {
//                         assignment.status = status;
//                     }
//                 }),

//             clearError: () =>
//                 set((state) => {
//                     state.error = null;
//                 }),
//         })),
//         {
//             name: "assignment-storage",
//             version: 0,
//             partialize: (state) => ({
//                 lastFetch: state.lastFetch,
//                 assignmentData: state.assignmentData,
//             }),
//             storage: createJSONStorage(() => AsyncStorage, {
//                 replacer: (key, value) => {
//                     // DateをISO文字列に変換して保存
//                     if (value instanceof Date) {
//                         return value.toISOString();
//                     }
//                     return value;
//                 },
//                 reviver: (key, value) => {
//                     // ISO文字列をDateに変換して復元
//                     if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
//                         return new Date(value);
//                     }
//                     return value;
//                 },
//             }),
//             migrate: (persistedState: any, version: number) => {
//                 // 将来的なマイグレーション処理
//                 // version 0 からのマイグレーション例:
//                 // if (version === 0) {
//                 //     persistedState.newField = defaultValue;
//                 // }
//                 return persistedState as AssignmentState;
//             },
//         }
//     )
// );

// export default useAssignment;
