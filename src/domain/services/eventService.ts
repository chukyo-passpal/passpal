import { diContainer } from "@/src/di/container";
import { DI_TOKENS } from "@/src/di/tokens";
import "@/src/data/providers/firebase/remoteConfigProvider";
import type { RemoteConfigProvider } from "@/src/data/providers/firebase/remoteConfigProvider";
import "./authCoordinator";
import type { AuthCoordinator } from "./authCoordinator";

export interface EventService {
    /**
     * アプリの初期化処理を実行します。
     */
    appInit: () => Promise<void>;
}

export class IntegratedEventService implements EventService {
    constructor(
        private readonly remoteConfigProvider: RemoteConfigProvider,
        private readonly authCoordinator: AuthCoordinator
    ) {}

    public async appInit(): Promise<void> {
        // 初期化処理があればここに追加
        await this.remoteConfigProvider.fetchRemoteConfig();
        this.authCoordinator.configure();
    }
}

diContainer.registerSingleton(DI_TOKENS.eventService, (container) =>
    new IntegratedEventService(
        container.resolve<RemoteConfigProvider>(DI_TOKENS.remoteConfigProvider),
        container.resolve<AuthCoordinator>(DI_TOKENS.authCoordinator)
    )
);

const eventServiceInstance = diContainer.resolve<EventService>(DI_TOKENS.eventService);
export default eventServiceInstance;
