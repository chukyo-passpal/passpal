// /**
//  * Timetable フック
//  * UI向けの時間割データ取得フック
//  */

// import { TimetableData } from "@/types/timetable";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";
// import { timetableService, TimetableService } from "../services/timetableService";

// export interface TimetableState {
//     lastFetch: Date | null;
//     timetable: TimetableData | null;
//     loading: boolean;
//     setTimetable: (timetable: TimetableData | null) => void;
//     refetch: (service?: TimetableService) => Promise<void>;
// }

// const useTimetable = create<TimetableState>()(
//     persist(
//         immer((set) => ({
//             lastFetch: null,
//             timetable: null,
//             loading: false,

//             setTimetable: (timetable: TimetableData | null) =>
//                 set((state) => {
//                     state.timetable = timetable;
//                 }),

//             refetch: async (service: TimetableService = timetableService) => {
//                 set((state) => {
//                     state.loading = true;
//                 });

//                 const timetable = await service.getTimetable();
//                 set((state) => {
//                     state.timetable = timetable;
//                     state.loading = false;
//                     state.lastFetch = new Date();
//                 });
//             },
//         })),
//         {
//             name: "timetable-storage",
//             version: 0,
//             partialize: (state) => ({
//                 lastFetch: state.lastFetch,
//                 timetable: state.timetable,
//             }),
//             storage: createJSONStorage(() => AsyncStorage),
//             migrate: (persistedState: any, version: number) => {
//                 // 将来的なマイグレーション処理
//                 // version 0 からのマイグレーション例:
//                 // if (version === 0) {
//                 //     persistedState.newField = defaultValue;
//                 // }
//                 return persistedState as TimetableState;
//             },
//         }
//     )
// );

// export default useTimetable;
