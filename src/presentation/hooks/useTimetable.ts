import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Period } from "@/src/domain/constants/period";
import { Weekday } from "@/src/domain/constants/week";
import { Course } from "@/src/domain/models/course";
import { TimetableData, TimetableEntry, TimetableFetchResult } from "@/src/domain/models/timetable";
import timetableServiceInstance from "@/src/domain/services/timetableService";

export interface TimetableState {
    lastFetch: Date | null;
    timetableData: TimetableData | null;
    courses: Record<string, Course>;
    loading: boolean;

    clear: () => void;
    setClass: (day: Weekday, period: Period, entry: TimetableEntry | null) => void;
    updateCourse: (courseId: string, updates: Partial<Course>) => void;
    refetch: () => Promise<TimetableFetchResult>;
}

/**
 * 時間割データを保持・更新するZustandストアを提供します。
 */
const useTimetable = create<TimetableState>()(
    persist(
        immer((set) => ({
            lastFetch: null,
            timetableData: null,
            courses: {},
            loading: false,

            /**
             * 時間割と取得時刻を初期化します。
             */
            clear: () =>
                set((state) => {
                    state.timetableData = null;
                    state.courses = {};
                    state.lastFetch = null;
                }),

            /**
             * 指定した曜日・時限の授業情報を更新します。
             * @param day 曜日
             * @param period 時限
             * @param entry 設定する授業情報
             */
            setClass: (day, period, entry) =>
                set((state) => {
                    if (!state.timetableData) return;
                    state.timetableData.timetable[day][period] = entry;
                }),

            updateCourse: (courseId, updates) =>
                set((state) => {
                    if (state.courses[courseId]) {
                        Object.assign(state.courses[courseId], updates);
                    }
                }),

            /**
             * リモートから時間割を再取得します。
             * @returns 最新の時間割データ
             */
            refetch: async () => {
                set((state) => {
                    state.loading = true;
                });

                try {
                    const result = await timetableServiceInstance.getTimetable();

                    set((state) => {
                        state.timetableData = result.timetable;
                        state.courses = result.courses;
                        state.loading = false;
                        state.lastFetch = new Date();
                    });

                    return result;
                } catch (err) {
                    set((state) => {
                        state.loading = false;
                    });
                    throw err;
                }
            },
        })),
        {
            name: "timetable-storage",
            skipHydration: true,
            version: 0,
            partialize: (state) => ({
                lastFetch: state.lastFetch,
                timetableData: state.timetableData,
                courses: state.courses,
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
                return persistedState as TimetableState;
            },
        }
    )
);

export default useTimetable;
