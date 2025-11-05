import type { DiToken } from "./tokens";

type Factory<T> = (container: DIContainer) => T;

export class DIContainer {
    private readonly singletons = new Map<DiToken, unknown>();
    private readonly factories = new Map<DiToken, Factory<unknown>>();

    public registerSingleton<T>(token: DiToken, factory: Factory<T>): void {
        if (this.factories.has(token)) {
            throw new Error(`Token \"${token}\" is already registered.`);
        }
        this.factories.set(token, factory as Factory<unknown>);
    }

    public resolve<T>(token: DiToken): T {
        if (!this.singletons.has(token)) {
            const factory = this.factories.get(token);
            if (!factory) {
                throw new Error(`Token \"${token}\" is not registered.`);
            }
            const instance = factory(this);
            this.singletons.set(token, instance);
        }
        return this.singletons.get(token) as T;
    }
}

export const diContainer = new DIContainer();
