import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface appInfoState {
    appVersion: string;
    isInitialized: boolean;

    setAppVersion: (version: string) => void;
    setIsInitialized: (initialized: boolean) => void;
}

/**
 * アプリのバージョンや初期化状態を管理するZustandストアを提供します。
 */
const useAppInfo = create<appInfoState>()(
    persist(
        immer((set) => ({
            appVersion: "",
            isInitialized: false,

            /**
             * アプリのバージョンを更新します。
             * @param version 設定するバージョン
             */
            setAppVersion: (version: string) =>
                set((state) => {
                    state.appVersion = version;
                }),
            /**
             * アプリの初期化状態を更新します。
             * @param initialized 初期化済みかどうか
             */
            setIsInitialized: (initialized: boolean) =>
                set((state) => {
                    state.isInitialized = initialized;
                }),
        })),
        {
            name: "app-info-storage",
            version: 0,
            storage: createJSONStorage(() => AsyncStorage),
            migrate: (persistedState: any, version: number) => {
                // 将来的なマイグレーション処理
                // version 0 からのマイグレーション例:
                // if (version === 0) {
                //     persistedState.newField = defaultValue;
                // }
                return persistedState as appInfoState;
            },
        }
    )
);

export default useAppInfo;
