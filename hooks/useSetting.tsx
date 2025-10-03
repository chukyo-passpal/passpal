import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

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

// Webの時はzustand/middlewareが動作しないため、ダミーの状態管理を使用

// const dummyUseSetting: () => settingState = () => ({
//     campus: "nagoya",
//     timetableViewMode: "week",
//     setCampus: (campus: campusType) => {
//         console.log("setCampus called with", campus);
//     },
//     setTimetableViewMode: (mode: timetableViewModeType) => {
//         console.log("setTimetableViewMode called with", mode);
//     },
// });
// console.error("⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️Using dummy useSetting⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️");
// export default dummyUseSetting;
