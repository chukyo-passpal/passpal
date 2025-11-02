import remoteConfigProviderInstance from "@/src/data/providers/firebase/remoteConfigProvider";
import googleAuthServiceInstance from "./googleAuthService";


export interface EventService {
    /**
     * アプリの初期化処理を実行します。
     */
    appInit: () => Promise<void>;
}

export class IntegratedEventService implements EventService {
    public async appInit(): Promise<void> {
        // 初期化処理があればここに追加
        await remoteConfigProviderInstance.fetchRemoteConfig();
        googleAuthServiceInstance.configure();
    }
}

const eventServiceInstance = new IntegratedEventService();
export default eventServiceInstance;
