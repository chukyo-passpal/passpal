import { diContainer } from "@/src/di/container";
import { DI_TOKENS } from "@/src/di/tokens";
import { getRemoteConfig, getValue } from "@react-native-firebase/remote-config";
import "../providers/chukyo-univ/manaboProvider";
import "../providers/palapi/palapiProvider";

import type { ManaboProvider } from "../providers/chukyo-univ/manaboProvider";
import type { PalAPIProvider } from "../providers/palapi/palapiProvider";

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
     * @param studentId 学籍番号
     * @param cuIdPass CU-IDのパスワード
     * @returns 認証成功可否のPromise
     */
    authTest: (studentId: string, cuIdPass: string) => Promise<boolean>;

    /**
     * Firebase IDトークンを用いてPalAPIにログインします。
     * @param firebaseIdToken Firebaseが発行したIDトークン
     */
    login: (firebaseIdToken: string) => Promise<string>;
}

export class IntegratedAuthRepository implements AuthRepository {
    constructor(
        private readonly manaboProvider: ManaboProvider,
        private readonly palAPIProvider: PalAPIProvider
    ) {}

    get allowedMailDomain(): string {
        return getValue(getRemoteConfig(), "allowedMailDomain").asString();
    }

    get webClientId(): string {
        return getValue(getRemoteConfig(), "webClientId").asString();
    }

    public authTest(studentId: string, cuIdPass: string): Promise<boolean> {
        return this.manaboProvider.authTest(studentId, cuIdPass);
    }

    public login(firebaseIdToken: string) {
        return this.palAPIProvider.post("/account/login", {
            bearer: firebaseIdToken,
        });
    }
}

diContainer.registerSingleton(DI_TOKENS.authRepository, (container) =>
    new IntegratedAuthRepository(
        container.resolve<ManaboProvider>(DI_TOKENS.manaboProvider),
        container.resolve<PalAPIProvider>(DI_TOKENS.palAPIProvider)
    )
);

const authRepositoryInstance = diContainer.resolve<AuthRepository>(DI_TOKENS.authRepository);
export default authRepositoryInstance;
