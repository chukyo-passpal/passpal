import { getRemoteConfig, getValue } from "@react-native-firebase/remote-config";

import { shibbolethWebViewAuthFunction } from "../clients/chukyoShibboleth";
import alboProviderInstance from "../providers/chukyo-univ/alboProvider";
import cubicsProviderInstance from "../providers/chukyo-univ/cubicsProvider";
import manaboProviderInstance from "../providers/chukyo-univ/manaboProvider";
import palAPIProviderInstance from "../providers/palapi/palapiProvider";

export interface AuthRepository {
    /**
     * Googleサインインで許可するメールドメイン
     */
    readonly allowedMailDomain: string;

    /**
     * Googleサインイン時に使用するFirebase Admin SDKのWebクライアントID
     */
    readonly webClientId: string;

    /**
     * 指定した資格情報で認証テストを実行します。
     * @param authFunc shibboleth認証を行う関数
     * @param studentId 学籍番号
     * @param cuIdPass CU-IDのパスワード
     * @returns 認証成功可否のPromise
     */
    authTest: (authFunc: shibbolethWebViewAuthFunction, studentId: string, cuIdPass: string) => Promise<boolean>;
}

export class IntegratedAuthRepository implements AuthRepository {
    private manaboProvider = manaboProviderInstance;
    private alboProvider = alboProviderInstance;
    private cubicsProvider = cubicsProviderInstance;

    get allowedMailDomain(): string {
        return getValue(getRemoteConfig(), "allowedMailDomain").asString();
    }

    get webClientId(): string {
        return getValue(getRemoteConfig(), "webClientId").asString();
    }

    public authTest(authFunc: shibbolethWebViewAuthFunction, studentId: string, cuIdPass: string): Promise<boolean> {
        return this.manaboProvider.authTest(authFunc, studentId, cuIdPass);
    }

    public login(firebaseIdToken: string) {
        palAPIProviderInstance.post("/account/login", {
            bearer: firebaseIdToken,
        });
    }

    public clearAuthCookies() {
        this.manaboProvider.clearAuthCookie();
        this.alboProvider.clearAuthCookie();
        this.cubicsProvider.clearAuthCookie();
    }
}

const authRepositoryInstance = new IntegratedAuthRepository();
export default authRepositoryInstance;
