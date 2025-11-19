import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface appInfoState {
    /**
     * アプリのバージョン(マイグレーション用)
     * 空文字の場合、初回起動とみなします。
     */
    appVersion: string;

    setAppVersion: (version: string) => void;
}

/**
 * アプリのバージョンや初期化状態を管理するZustandストアを提供します。
 */
const useAppInfo = create<appInfoState>()(
    persist(
        immer((set) => ({
            appVersion: "",

            /**
             * アプリのバージョンを更新します。
             * @param version 設定するバージョン
             */
            setAppVersion: (version: string) =>
                set((state) => {
                    state.appVersion = version;
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
