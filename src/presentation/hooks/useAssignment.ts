import { AssignmentData, AssignmentInfo } from "@/src/domain/models/assignment";
import { TimetableData } from "@/src/domain/models/timetable";
import assignmentServiceInstance, { AssignmentService } from "@/src/domain/services/assignmentService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/**
 * Assignment State
 */
export interface AssignmentState {
    lastFetch: Date | null;
    assignmentData: AssignmentData | null;
    loading: boolean;

    assignmentService: AssignmentService;

    /**
     * 課題データを直接設定
     */
    clear: () => void;

    /**
     * 単一授業の課題を取得
     */
    fetchClassAssignments: (classId: string) => Promise<AssignmentInfo[]>;

    /**
     * 複数授業の課題を取得
     */
    fetchAllClassAssignments: (timetable: TimetableData) => Promise<AssignmentData>;
}

const useAssignment = create<AssignmentState>()(
    persist(
        immer((set, get) => ({
            lastFetch: null,
            assignmentData: null,
            loading: false,

            assignmentService: assignmentServiceInstance,

            clear: () =>
                set((state) => {
                    state.assignmentData = null;
                }),

            fetchClassAssignments: async (classId: string) => {
                set((state) => {
                    state.loading = true;
                });

                try {
                    const data = await get().assignmentService.getAssignments(classId);
                    set((state) => {
                        // 既存の課題データがある場合はマージ
                        if (!state.assignmentData) {
                            state.assignmentData = {};
                        }
                        state.assignmentData[classId] = data;
                        state.loading = false;
                        state.lastFetch = new Date();
                    });
                    return data;
                } catch (err) {
                    set((state) => {
                        state.loading = false;
                    });
                    throw err;
                }
            },

            fetchAllClassAssignments: async (timetable: TimetableData) => {
                set((state) => {
                    state.loading = true;
                });

                try {
                    const data = await get().assignmentService.getAllAssignments(timetable);

                    set((state) => {
                        state.assignmentData = data;
                        state.loading = false;
                        state.lastFetch = new Date();
                    });
                    return data;
                } catch (err) {
                    set((state) => {
                        state.loading = false;
                    });
                    throw err;
                }
            },
        })),
        {
            name: "assignment-storage",
            version: 0,
            partialize: (state) => ({
                lastFetch: state.lastFetch,
                assignmentData: state.assignmentData,
            }),
            storage: createJSONStorage(() => AsyncStorage, {
                replacer: (key, value) => {
                    // DateをISO文字列に変換して保存
                    if (value instanceof Date) {
                        return value.toISOString();
                    }
                    return value;
                },
                reviver: (key, value) => {
                    // ISO文字列をDateに変換して復元
                    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
                        return new Date(value);
                    }
                    return value;
                },
            }),
            migrate: (persistedState: any, version: number) => {
                // 将来的なマイグレーション処理
                // version 0 からのマイグレーション例:
                // if (version === 0) {
                //     persistedState.newField = defaultValue;
                // }
                return persistedState as AssignmentState;
            },
        }
    )
);

export default useAssignment;
