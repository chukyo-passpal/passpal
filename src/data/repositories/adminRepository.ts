import { diContainer } from "@/src/di/container";
import { DI_TOKENS } from "@/src/di/tokens";
import { getRemoteConfig, getValue } from "@react-native-firebase/remote-config";

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
        return getValue(getRemoteConfig(), "maintenanceMode").asBoolean();
    }

    get minimumVersion(): string {
        return getValue(getRemoteConfig(), "minimumVersion").asString();
    }
}

diContainer.registerSingleton(DI_TOKENS.adminRepository, () => new IntegratedAdminRepository());

const adminRepositoryInstance = diContainer.resolve<AdminRepository>(DI_TOKENS.adminRepository);
export default adminRepositoryInstance;
