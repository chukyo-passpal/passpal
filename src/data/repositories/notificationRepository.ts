import { Platform } from "react-native";

import palAPIProviderInstance from "../providers/palapi/palapiProvider";

export interface NotificationRepository {
    /**
     * FCMトークンをPalAPIに登録します。
     * @param firebaseIdToken FirebaseのIDトークン
     * @param fcmToken FCMトークン
     */
    fcmRegister: (firebaseIdToken: string, fcmToken: string) => void;
}

export class IntegratedNotificationRepository implements NotificationRepository {
    private readonly palAPIProvider;
    constructor(palAPIProvider = palAPIProviderInstance) {
        this.palAPIProvider = palAPIProvider;
    }

    public fcmRegister(firebaseIdToken: string, fcmToken: string) {
        this.palAPIProvider.post("/v1/account/fcm-token", {
            body: JSON.stringify({
                fcm_token: fcmToken,
                client_type: Platform.OS,
                notify_assignment: true,
                notify_advertisement: true,
                notify_attendance: true,
            }),
            contentType: "application/json",
            bearer: firebaseIdToken,
        });
    }
}

const notificationRepositoryInstance = new IntegratedNotificationRepository();
export default notificationRepositoryInstance;
