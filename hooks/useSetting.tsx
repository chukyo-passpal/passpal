import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type campusType = "nagoya" | "toyota";
type timetableViewModeType = "week" | "day";

export type settingState = {
    campus: campusType;
    timetableViewMode: timetableViewModeType;
    setCampus: (campus: campusType) => void;
    setTimetableViewMode: (mode: timetableViewModeType) => void;
};

const useSetting = create<settingState>()(
    persist(
        (set) => ({
            campus: "nagoya" as campusType,
            timetableViewMode: "week" as timetableViewModeType,

            setCampus: (campus: campusType) =>
                set(
                    produce((state) => {
                        state.campus = campus;
                    })
                ),
            setTimetableViewMode: (mode: timetableViewModeType) =>
                set(
                    produce((state) => {
                        state.timetableViewMode = mode;
                    })
                ),
        }),
        {
            name: "setting-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useSetting;
