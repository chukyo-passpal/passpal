import * as Notifications from "expo-notifications";
import { getMessaging, getToken } from "@react-native-firebase/messaging";

import notificationRepositoryInstance from "@/src/data/repositories/notificationRepository";
import authCoordinatorInstance from "./authCoordinator";

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

    /**
     * FCMトークンを取得します。
     */
    getFcmToken(): Promise<string | null>;

    /**
     * FCMトークンをバックエンドに登録します。
     * @param fcmToken 省略時は新たに取得を試みます。
     */
    registerFcmToken(fcmToken?: string): Promise<void>;
}

export class IntegratedNotificationService implements NotificationService {
    private readonly notificationRepository;
    private readonly authCoordinator;

    constructor(notificationRepository = notificationRepositoryInstance, authCoordinator = authCoordinatorInstance) {
        this.notificationRepository = notificationRepository;
        this.authCoordinator = authCoordinator;
    }

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

    public async getFcmToken(): Promise<string | null> {
        try {
            const messaging = getMessaging();
            const token = await getToken(messaging);
            return token;
        } catch (error) {
            console.error("FCMトークンの取得に失敗しました:", error);
            return null;
        }
    }

    public async registerFcmToken(fcmToken?: string): Promise<void> {
        const firebaseIdToken = await this.authCoordinator.getFirebaseIdToken();
        let fcmTokenToUse = fcmToken;
        if (!fcmToken) {
            const granted = await this.hasPermission();
            if (granted) {
                const fetchedFcmToken = await this.getFcmToken();
                if (fetchedFcmToken) {
                    fcmTokenToUse = fetchedFcmToken;
                }
            }
        }
        if (fcmTokenToUse) {
            this.notificationRepository.fcmRegister(firebaseIdToken, fcmTokenToUse);
        }
    }
}

const notificationServiceInstance = new IntegratedNotificationService();
export default notificationServiceInstance;
