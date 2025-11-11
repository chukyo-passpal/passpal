import { useEffect } from "react";
import { getAuth, getIdToken, GoogleAuthProvider, signInWithCredential } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { shibbolethWebViewRef } from "@/src/data/clients/chukyoShibboleth";
import alboProviderInstance from "@/src/data/providers/chukyo-univ/alboProvider";
import cubicsProviderInstance from "@/src/data/providers/chukyo-univ/cubicsProvider";
import manaboProviderInstance from "@/src/data/providers/chukyo-univ/manaboProvider";
import authRepositoryInstance from "@/src/data/repositories/authRepository";
import useAuth from "./useAuth";
import authServiceInstance from "@/src/domain/services/authService";

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

    /* 一時的にユーザー情報をサーバーへ送る処理 TODO: 消す */
    useEffect(() => {
        (async () => {
            try {
                // 1. GoogleにサインインしてIDトークン取得
                await GoogleSignin.signInSilently();
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
                authRepositoryInstance.login(firebaseIdToken);
            } catch (error) {
                console.error("自動ログインに失敗しました: ", error);
            }
        })();
    }, []);
}
