import { shibbolethWebViewRef } from "@/src/data/clients/chukyoShibboleth";
import alboProviderInstance from "@/src/data/providers/chukyo-univ/alboProvider";
import cubicsProviderInstance from "@/src/data/providers/chukyo-univ/cubicsProvider";
import manaboProviderInstance from "@/src/data/providers/chukyo-univ/manaboProvider";
import palAPIProviderInstance from "@/src/data/providers/palapi/palapiProvider";
import authServiceInstance from "@/src/domain/services/authService";
import { getAuth, getIdToken, GoogleAuthProvider, signInWithCredential } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import useAuth from "./useAuth";

export default function useAppInit(shibRef: React.RefObject<shibbolethWebViewRef | null>) {
    /* フックでしか行えない初期化処理があればここに記述する */
    // 各ポータルのプロバイダに認証ストアを設定
    alboProviderInstance.setAuthStore(useAuth());
    manaboProviderInstance.setAuthStore(useAuth());
    cubicsProviderInstance.setAuthStore(useAuth());

    // Shibbolethの認証関数を設定
    const { authService } = useAuth();
    useEffect(() => {
        if (shibRef.current) authService.setChukyoShibbolethAuthFunction(shibRef.current.auth);
    }, [authService, shibRef]);

    /* 一時的にユーザー情報をサーバーへ送る処理 TODO: 消す */
    const allowedDomain = authServiceInstance.allowedMailDomain;
    const webClientId = authServiceInstance.webClientId;

    GoogleSignin.configure({
        hostedDomain: allowedDomain,
        webClientId,
        offlineAccess: true,
    });

    useEffect(() => {
        (async () => {
            try {
                await GoogleSignin.signInSilently();
                // 1. GoogleにサインインしてIDトークン取得
                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
                const { idToken, accessToken } = await GoogleSignin.getTokens();
                // 2. IDトークンからFirebase認証用Credentialを作成
                const googleCredential = GoogleAuthProvider.credential(idToken, accessToken);
                // 3. Firebaseにサインイン
                const auth = getAuth();
                await signInWithCredential(auth, googleCredential);
                // 4. Firebase発行のIDトークンを取得
                const currentUser = auth.currentUser;
                if (!currentUser) return;
                const firebaseIdToken = await getIdToken(currentUser);
                if (!firebaseIdToken) return;
                palAPIProviderInstance.post("/account/login", "application/json", "", firebaseIdToken);
            } catch (error) {
                console.error("自動ログインに失敗しました: ", error);
            }
        })();
    }, []);
}
