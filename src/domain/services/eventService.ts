import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import remoteConfigProviderInstance from "@/src/data/providers/firebase/remoteConfigProvider";
import useAppInfo from "@/src/presentation/hooks/useAppInfo";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useAuth from "@/src/presentation/hooks/useAuth";
import useMail from "@/src/presentation/hooks/useMail";
import useNews from "@/src/presentation/hooks/useNews";
import useSetting from "@/src/presentation/hooks/useSetting";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import appServiceInstance from "./appService";
import authCoordinatorInstance from "./authCoordinator";

export interface EventService {
    /**
     * アプリの初期化処理を実行します。
     */
    appInit: () => Promise<void>;
}

export class IntegratedEventService implements EventService {
    public async appInit(): Promise<void> {
        // ストレージからの読み込み完了を待つ
        await this.waitForHydration();

        // バージョン管理とデータマイグレーション
        await this.handleVersionUpdate();

        // 初期化処理があればここに追加
        await remoteConfigProviderInstance.fetchRemoteConfig();
        authCoordinatorInstance.configure();
    }

    /**
     * Zustandのストレージ復元が完了するのを待ちます。
     */
    private waitForHydration = (): Promise<void> => {
        return new Promise((resolve) => {
            if (useAppInfo.persist.hasHydrated()) {
                resolve();
            } else {
                useAppInfo.persist.onFinishHydration(() => {
                    resolve();
                });
            }
        });
    };

    /**
     * アプリバージョンの更新とデータマイグレーションを処理します。
     */
    private async handleVersionUpdate(): Promise<void> {
        const { appVersion: storedVersion, setAppVersion, setIsInitialized } = useAppInfo.getState();
        const currentVersion = appServiceInstance.currentVersion;

        // 初回起動時
        if (!storedVersion) {
            console.log(`First launch with version ${currentVersion}`);
            // 初回起動時に認証情報をクリア(iOSはアプリを削除してもSecureStoreのデータが残るため)
            await SecureStore.deleteItemAsync("auth-storage");
            setAppVersion(currentVersion);
            setIsInitialized(true);
            return;
        }

        // バージョンが変更された場合
        if (storedVersion !== currentVersion) {
            console.log(`Version updated from ${storedVersion} to ${currentVersion}`);

            // データマイグレーション処理を実行
            try {
                await this.migrateData(storedVersion, currentVersion);

                // マイグレーション後にデータを再読み込み
                await this.rehydrateAllStores();

                setAppVersion(currentVersion);
                console.log("Version update completed successfully");
            } catch (error) {
                console.error("Failed to migrate data:", error);
                // エラーが発生してもバージョンは更新する
                setAppVersion(currentVersion);
            }
        }
    }

    /**
     * 全てのZustandストアを再ハイドレーション（ストレージから再読み込み）します。
     */
    private rehydrateAllStores = async (): Promise<void> => {
        await Promise.all([
            useAppInfo.persist.rehydrate(),
            useAuth.persist.rehydrate(),
            useMail.persist.rehydrate(),
            useTimetable.persist.rehydrate(),
            useSetting.persist.rehydrate(),
            useNews.persist.rehydrate(),
            useAssignment.persist.rehydrate(),
        ]);
    };

    /**
     * 指定されたバージョンへのアップデートが行われたかどうかをチェックします。
     * @param fromVersion 以前のバージョン
     * @param toVersion 新しいバージョン
     * @param targetVersion 対象のバージョン（このバージョン以降にアップデートされた場合にtrueを返す）
     * @returns targetVersion以前からtargetVersion以降へのアップデートの場合はtrue
     */
    private isUpdatedTo = (fromVersion: string, toVersion: string, targetVersion: string): boolean => {
        return (
            appServiceInstance.compareVersions(fromVersion, targetVersion) < 0 &&
            appServiceInstance.compareVersions(toVersion, targetVersion) >= 0
        );
    };

    /**
     * バージョン間のデータマイグレーション処理を実行します。
     * @param fromVersion 以前のバージョン
     * @param toVersion 新しいバージョン
     */
    private migrateData = async (fromVersion: string, toVersion: string): Promise<void> => {
        console.log(`Migrating data from ${fromVersion} to ${toVersion}`);

        // 0.0.3以前から0.0.4以降へのアップデート時の処理
        if (this.isUpdatedTo(fromVersion, toVersion, "0.0.4")) {
            console.log("Migrate from version 0.0.4");
            try {
                // 全データ削除
                const AllItems = await AsyncStorage.getAllKeys();
                for (const key of AllItems) {
                    await AsyncStorage.removeItem(key);
                }
                await SecureStore.deleteItemAsync("auth-storage");
                console.log("Successfully remove");
            } catch (error) {
                console.error("Failed to remove:", error);
            }
        }

        // 他のバージョン間のマイグレーション処理をここに追加
        // 例:
        // if (isUpdatedTo(fromVersion, toVersion, "1.0.0")) {
        //     // 1.0.0へのマイグレーション処理
        // }
    };
}

const eventServiceInstance = new IntegratedEventService();
export default eventServiceInstance;
