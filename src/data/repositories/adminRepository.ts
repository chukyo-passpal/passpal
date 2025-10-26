import remoteConfig from "@react-native-firebase/remote-config";

export interface AdminRepository {
    /**
     * メンテナンスモードの状態
     */
    readonly maintenanceMode: boolean;

    /**
     * アプリの最小バージョン
     */
    readonly minimumVersion: string;
}

export class IntegratedAdminRepository implements AdminRepository {
    get maintenanceMode(): boolean {
        return remoteConfig().getValue("maintenanceMode").asBoolean();
    }

    get minimumVersion(): string {
        return remoteConfig().getValue("minimumVersion").asString();
    }
}

const adminRepositoryInstance = new IntegratedAdminRepository();
export default adminRepositoryInstance;
