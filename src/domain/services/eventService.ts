import remoteConfigProviderInstance from "@/src/data/providers/firebase/remoteConfigProvider";

export interface EventService {
    /**
     * アプリ内のイベントを処理するオブジェクト
     *
     * 例:
     * appEvent.addEventListener("eventName", callback);
     */
    readonly appEvent: EventTarget;

    /**
     * アプリの初期化処理を実行します。
     */
    appInit: () => Promise<void>;
}

export class IntegratedEventService implements EventService {
    public appEvent = new EventTarget();

    public async appInit(): Promise<void> {
        // 初期化処理があればここに追加
        await remoteConfigProviderInstance.fetchRemoteConfig();
    }
}

const eventServiceInstance = new IntegratedEventService();
export default eventServiceInstance;
