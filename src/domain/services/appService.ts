import adminRepositoryInstance, { AdminRepository } from "@/src/data/repositories/adminRepository";
import * as Application from "expo-application";

export interface AppService {
    /**
     * 現在のアプリバージョンを取得します。
     */
    readonly currentVersion: string;

    /**
     * アプリの最小バージョンを取得します。
     */
    readonly minimumVersion: string;

    /**
     * メンテナンスモードの状態を取得します。
     */
    readonly maintenanceMode: boolean;

    /*
     * バージョン情報の文字列を取得します。
    例: "Version 1.0.2 (13)"
     */
    readonly versionInfo: string;

    /**
     * バージョン文字列を比較します。
     * @param version1 比較するバージョン1 (例: "1.2.3")
     * @param version2 比較するバージョン2 (例: "1.2.4")
     * @returns version1 < version2 の場合は -1、version1 > version2 の場合は 1、等しい場合は 0
     */
    compareVersions: (version1: string, version2: string) => number;

    /**
     * アップデートが必要なバージョンかどうかを判定します。
     * @returns アップデートが必要な場合は true、不要な場合は false
     */
    isNeededUpdate: () => boolean;
}

export class IntegratedAppService implements AppService {
    private readonly adminRepository;

    constructor(adminRepository: AdminRepository = adminRepositoryInstance) {
        this.adminRepository = adminRepository;
    }

    get currentVersion(): string {
        return Application.nativeApplicationVersion ?? "0.0.0";
    }

    get minimumVersion(): string {
        return this.adminRepository.minimumVersion;
    }

    get maintenanceMode(): boolean {
        return this.adminRepository.maintenanceMode;
    }

    get versionInfo(): string {
        return `Version ${this.currentVersion} (${Application.nativeBuildVersion ?? "unknown"})`;
    }

    public compareVersions(version1: string, version2: string): number {
        const v1Parts = version1.split(".").map((part) => parseInt(part, 10));
        const v2Parts = version2.split(".").map((part) => parseInt(part, 10));

        const maxLength = Math.max(v1Parts.length, v2Parts.length);

        for (let i = 0; i < maxLength; i++) {
            const v1Part = v1Parts[i] ?? 0;
            const v2Part = v2Parts[i] ?? 0;

            if (v1Part < v2Part) {
                return -1;
            }
            if (v1Part > v2Part) {
                return 1;
            }
        }

        return 0;
    }

    public isNeededUpdate(): boolean {
        return this.compareVersions(this.currentVersion, this.minimumVersion) < 0;
    }
}

const appServiceInstance = new IntegratedAppService();
export default appServiceInstance;
