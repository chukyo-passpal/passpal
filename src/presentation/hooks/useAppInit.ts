import { useEffect } from "react";

import { shibbolethWebViewRef } from "@/src/data/clients/chukyoShibboleth";
import alboProviderInstance from "@/src/data/providers/chukyo-univ/alboProvider";
import cubicsProviderInstance from "@/src/data/providers/chukyo-univ/cubicsProvider";
import manaboProviderInstance from "@/src/data/providers/chukyo-univ/manaboProvider";
import authServiceInstance from "@/src/domain/services/authService";
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
}
