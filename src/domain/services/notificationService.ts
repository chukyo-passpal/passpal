import { diContainer } from "@/src/di/container";
import { DI_TOKENS } from "@/src/di/tokens";
import * as Notifications from "expo-notifications";

export interface NotificationService {
    /**
     * 現在の通知権限の状態を取得します。
     */
    getPermissions(): Promise<Notifications.NotificationPermissionsStatus>;

    /**
     * 通知権限をリクエストし、最新の状態を返します。
     */
    requestPermissions(): Promise<Notifications.NotificationPermissionsStatus>;

    /**
     * 通知権限が付与されているかどうかを返します。
     */
    hasPermission(): Promise<boolean>;

    /**
     * 通知権限が未付与の場合はリクエストし、結果を返します。
     */
    ensurePermissions(): Promise<Notifications.NotificationPermissionsStatus>;
}

export class IntegratedNotificationService implements NotificationService {
    public getPermissions(): Promise<Notifications.NotificationPermissionsStatus> {
        return Notifications.getPermissionsAsync();
    }

    public requestPermissions(): Promise<Notifications.NotificationPermissionsStatus> {
        return Notifications.requestPermissionsAsync();
    }

    public async hasPermission(): Promise<boolean> {
        const { status } = await this.getPermissions();
        return status === "granted";
    }

    public async ensurePermissions(): Promise<Notifications.NotificationPermissionsStatus> {
        const current = await this.getPermissions();
        if (current.status === "granted") {
            return current;
        }

        return this.requestPermissions();
    }
}

diContainer.registerSingleton(DI_TOKENS.notificationService, () => new IntegratedNotificationService());

const notificationServiceInstance = diContainer.resolve<NotificationService>(DI_TOKENS.notificationService);
export default notificationServiceInstance;
