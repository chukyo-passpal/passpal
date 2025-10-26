import remoteConfig from "@react-native-firebase/remote-config";
import manaboProviderInstance from "../providers/chukyo-univ/manaboProvider";

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
}

export class IntegratedAuthRepository implements AuthRepository {
    private manaboProvider = manaboProviderInstance;

    get allowedMailDomain(): string {
        return remoteConfig().getValue("allowedMailDomain").asString();
    }

    get webClientId(): string {
        return remoteConfig().getValue("webClientId").asString();
    }

    public authTest(studentId: string, cuIdPass: string): Promise<boolean> {
        return this.manaboProvider.authTest(studentId, cuIdPass);
    }
}

const authRepositoryInstance = new IntegratedAuthRepository();
export default authRepositoryInstance;
