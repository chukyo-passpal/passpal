import { useEffect } from "react";
import { getMessaging, onTokenRefresh } from "@react-native-firebase/messaging";

import { shibbolethWebViewRef } from "@/src/data/clients/chukyoShibboleth";
import alboProviderInstance from "@/src/data/providers/chukyo-univ/alboProvider";
import cubicsProviderInstance from "@/src/data/providers/chukyo-univ/cubicsProvider";
import manaboProviderInstance from "@/src/data/providers/chukyo-univ/manaboProvider";
import authServiceInstance from "@/src/domain/services/authService";
import notificationServiceInstance from "@/src/domain/services/notificationService";
import useAuth from "./useAuth";

export default function useAppInit(shibRef: React.RefObject<shibbolethWebViewRef | null>) {
    /* フックでしか行えない初期化処理があればここに記述する */
    // 各ポータルのプロバイダに認証ストアを設定
    alboProviderInstance.setAuthStore(useAuth());
    manaboProviderInstance.setAuthStore(useAuth());
    cubicsProviderInstance.setAuthStore(useAuth());

    // Shibbolethの認証関数を設定
    useEffect(() => {
        if (shibRef.current) {
            authServiceInstance.setChukyoShibbolethAuthFunction(shibRef.current.auth);
        }
    }, [shibRef]);

    // FirebaseのMessaging設定
    useEffect(() => {
        // FCMトークンの更新監視
        const messaging = getMessaging();
        const unsubscribe = onTokenRefresh(messaging, (token) => {
            try {
                notificationServiceInstance.registerFcmToken(token);
            } catch (e) {
                console.error("Firebase の FCM トークン更新に失敗しました:", e);
            }
        });

        return unsubscribe;
    }, []);
}
