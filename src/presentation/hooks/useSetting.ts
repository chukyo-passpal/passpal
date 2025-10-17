import { Campus } from "@/src/domain/constants/chukyo-univ";
import { TimetableViewMode } from "@/src/domain/constants/timetable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface settingState {
    campus: Campus;
    timetableViewMode: TimetableViewMode;
    setCampus: (campus: Campus) => void;
    setTimetableViewMode: (mode: TimetableViewMode) => void;
}

const useSetting = create<settingState>()(
    persist(
        immer((set) => ({
            campus: "nagoya" as Campus,
            timetableViewMode: "week" as TimetableViewMode,

            setCampus: (campus: Campus) =>
                set((state) => {
                    state.campus = campus;
                }),
            setTimetableViewMode: (mode: TimetableViewMode) =>
                set((state) => {
                    state.timetableViewMode = mode;
                }),
        })),
        {
            name: "setting-storage",
            version: 0,
            storage: createJSONStorage(() => AsyncStorage),
            migrate: (persistedState: any, version: number) => {
                // 将来的なマイグレーション処理
                // version 0 からのマイグレーション例:
                // if (version === 0) {
                //     persistedState.newField = defaultValue;
                // }
                return persistedState as settingState;
            },
        }
    )
);
export default useSetting;
