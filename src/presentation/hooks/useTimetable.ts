import { Period } from "@/src/domain/constants/period";
import { Weekday } from "@/src/domain/constants/week";
import { TimetableCourseInfo, TimetableData } from "@/src/domain/models/timetable";
import timetableServiceInstance, { TimetableService } from "@/src/domain/services/timetableService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface TimetableState {
    lastFetch: Date | null;
    timetableData: TimetableData | null;
    loading: boolean;

    timetableService: TimetableService;

    clear: () => void;
    setCourse: (day: Weekday, period: Period, courseInfo: TimetableCourseInfo | null) => void;
    refetch: () => Promise<TimetableData>;
}

const useTimetable = create<TimetableState>()(
    persist(
        immer((set, get) => ({
            lastFetch: null,
            timetableData: null,
            loading: false,

            timetableService: timetableServiceInstance,

            clear: () =>
                set((state) => {
                    state.timetableData = null;
                    state.lastFetch = null;
                }),

            setCourse: (day, period, courseInfo) =>
                set((state) => {
                    if (!state.timetableData) return;
                    state.timetableData.timetable[day][period] = courseInfo;
                }),

            refetch: async () => {
                set((state) => {
                    state.loading = true;
                });

                try {
                    const timetable = await get().timetableService.getTimetable();

                    set((state) => {
                        state.timetableData = timetable;
                        state.loading = false;
                        state.lastFetch = new Date();
                    });

                    return timetable;
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
            version: 0,
            partialize: (state) => ({
                lastFetch: state.lastFetch,
                timetableData: state.timetableData,
            }),
            storage: createJSONStorage(() => AsyncStorage),
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
