import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import remoteConfigProviderInstance from "@/src/data/providers/firebase/remoteConfigProvider";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useAuth from "@/src/presentation/hooks/useAuth";
import useMail from "@/src/presentation/hooks/useMail";
import useNews from "@/src/presentation/hooks/useNews";
import useSetting from "@/src/presentation/hooks/useSetting";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import appServiceInstance from "./appService";
import authCoordinatorInstance from "./authCoordinator";
import notificationServiceInstance from "./notificationService";

export interface EventService {
    /**
     * アプリの初期化処理を実行します。
     */
    appInit: () => Promise<void>;
}

export class IntegratedEventService implements EventService {
    public async appInit(): Promise<void> {
        // バージョン管理とデータマイグレーション
        await this.handleVersionUpdate();
        // 全データ読み込み
        await this.rehydrateAllStores();
        console.log("All stores rehydrated");

        // 初期化処理があればここに追加
        await remoteConfigProviderInstance.fetchRemoteConfig();
        authCoordinatorInstance.configure();

        // 自動でGoogleにサインインする
        const signInResponse = await GoogleSignin.signInSilently();
        if (signInResponse.type === "noSavedCredentialFound") {
            console.log("Google sign-inに保存された資格情報が見つかりません");
            authCoordinatorInstance.signOut();
            alert("前回のGoogleサインイン情報が見つかりません。再度ログインしてください。");
        } else if (signInResponse.type === "success") {
            // FCMトークンの登録
            notificationServiceInstance.registerFcmToken();
        }
    }

    /**
     * アプリバージョンの更新とデータマイグレーションを処理します。
     */
    private async handleVersionUpdate(): Promise<void> {
        const versionStorageKey = "passpal:app_version";
        const setAppVersion = (v: string) => AsyncStorage.setItem(versionStorageKey, v);
        const beforeVersion = await AsyncStorage.getItem(versionStorageKey);
        const currentVersion = appServiceInstance.currentVersion;

        // 初回起動時
        if (!beforeVersion) {
            console.log(`First launch with version ${currentVersion}`);
            // 全データ削除
            const AllItems = await AsyncStorage.getAllKeys();
            for (const key of AllItems) {
                await AsyncStorage.removeItem(key);
            }
            // 初回起動時に認証情報をクリア(iOSはアプリを削除してもSecureStoreのデータが残るため)
            await SecureStore.deleteItemAsync("auth-storage");

            await setAppVersion(currentVersion);
            return;
        }

        // バージョンが変更された場合
        if (beforeVersion !== currentVersion) {
            console.log(`Version updated from ${beforeVersion} to ${currentVersion}`);

            // データマイグレーション処理を実行
            try {
                await this.migrateData(beforeVersion, currentVersion);
                console.log("Version update completed successfully");
            } catch (error) {
                console.error("Failed to migrate data:", error);
            } finally {
                // エラーが発生してもバージョンは更新する
                await setAppVersion(currentVersion);
            }
        }
    }

    /**
     * バージョン間のデータマイグレーション処理を実行します。
     * @param fromVersion 以前のバージョン
     * @param toVersion 新しいバージョン
     */
    private migrateData = async (fromVersion: string, toVersion: string): Promise<void> => {
        console.log(`Migrating data from ${fromVersion} to ${toVersion}`);

        // 他のバージョン間のマイグレーション処理をここに追加
        // 例:
        // 0.9.9以前から1.0.0以降へのアップデート時の処理
        // if (isUpdatedTo(fromVersion, toVersion, "1.0.0")) {
        //     // 1.0.0へのマイグレーション処理
        // }
    };

    /**
     * 全てのZustandストアを再ハイドレーション（ストレージから再読み込み）します。
     */
    private rehydrateAllStores = async (): Promise<void> => {
        await Promise.all([
            useAssignment.persist.rehydrate(),
            useAuth.persist.rehydrate(),
            useMail.persist.rehydrate(),
            useNews.persist.rehydrate(),
            useSetting.persist.rehydrate(),
            useTimetable.persist.rehydrate(),
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
}

const eventServiceInstance = new IntegratedEventService();
export default eventServiceInstance;
