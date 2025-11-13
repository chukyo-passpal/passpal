import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { TrainInfoService } from "@/src/domain/constants/bus";
import { Campus } from "@/src/domain/constants/chukyo-univ";
import { TimetableViewMode } from "@/src/domain/constants/timetable";

export interface settingState {
    campus: Campus;
    homeStation: string;
    trainInfoService: TrainInfoService;
    initTimetableViewMode: TimetableViewMode;
    setCampus: (campus: Campus) => void;
    setHomeStation: (station: string) => void;
    setTrainInfoService: (service: TrainInfoService) => void;
    setInitTimetableViewMode: (mode: TimetableViewMode) => void;
    reset: () => void;
}

/**
 * 時間割表示などのユーザー設定を管理するZustandストアを提供します。
 */
const useSetting = create<settingState>()(
    persist(
        immer((set) => ({
            campus: "nagoya" as Campus,
            homeStation: "",
            trainInfoService: "google-map" as TrainInfoService,
            initTimetableViewMode: "week" as TimetableViewMode,

            /**
             * 利用キャンパスを更新します。
             * @param campus 設定するキャンパス
             */
            setCampus: (campus: Campus) =>
                set((state) => {
                    state.campus = campus;
                }),
            /**
             * バスの時刻表示で使う目的地の駅名を設定します
             * @param station 設定する駅名
             */
            setHomeStation: (station: string) =>
                set((state) => {
                    state.homeStation = station;
                }),
            /**
             * バスの時刻表示で使うサービスを設定します
             * @param service 設定する駅名
             */
            setTrainInfoService: (service: TrainInfoService) =>
                set((state) => {
                    state.trainInfoService = service;
                }),
            /**
             * 初期表示の時間割モードを更新します。
             * @param mode 設定する表示モード
             */
            setInitTimetableViewMode: (mode: TimetableViewMode) =>
                set((state) => {
                    state.initTimetableViewMode = mode;
                }),
            /**
             * 設定をデフォルト値へ戻します。
             */
            reset: () =>
                set((state) => {
                    state.campus = "nagoya";
                    state.homeStation = "";
                    state.trainInfoService = "google-map";
                    state.initTimetableViewMode = "week";
                }),
        })),
        {
            name: "setting-storage",
            version: 0,
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
                return persistedState as settingState;
            },
        }
    )
);
export default useSetting;
