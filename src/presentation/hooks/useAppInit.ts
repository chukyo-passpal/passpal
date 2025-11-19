import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { GoogleSignin } from "@react-native-google-signin/google-signin";



import { shibbolethWebViewRef } from "@/src/data/clients/chukyoShibboleth";
import alboProviderInstance from "@/src/data/providers/chukyo-univ/alboProvider";
import cubicsProviderInstance from "@/src/data/providers/chukyo-univ/cubicsProvider";
import manaboProviderInstance from "@/src/data/providers/chukyo-univ/manaboProvider";
import authCoordinatorInstance from "@/src/domain/services/authCoordinator";
import authServiceInstance from "@/src/domain/services/authService";
import notificationServiceInstance from "@/src/domain/services/notificationService";
import useAuth from "./useAuth";


export default function useAppInit(shibRef: React.RefObject<shibbolethWebViewRef | null>) {
    /* フックでしか行えない初期化処理があればここに記述する */
    // 各ポータルのプロバイダに認証ストアを設定
    alboProviderInstance.setAuthStore(useAuth());
    manaboProviderInstance.setAuthStore(useAuth());
    cubicsProviderInstance.setAuthStore(useAuth());

    const hasUser = useAuth().user !== null;
    // 自動でGoogleにサインインする
    if (GoogleSignin.hasPreviousSignIn()) {
        GoogleSignin.signInSilently();
    } else if (hasUser) {
        authCoordinatorInstance.signOut();
    }

    // Shibbolethの認証関数を設定
    useEffect(() => {
        if (shibRef.current) {
            authServiceInstance.setChukyoShibbolethAuthFunction(shibRef.current.auth);
        }
    }, [shibRef]);

    // FirebaseのMessaging設定
    useEffect(() => {
        const unsubscribe = messaging().onTokenRefresh((token) => {
            notificationServiceInstance.registerFcmToken(token);
        });

        return unsubscribe;
    }, []);
    notificationServiceInstance.registerFcmToken();
}
