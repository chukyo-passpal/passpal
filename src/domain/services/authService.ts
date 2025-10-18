import { shibbolethWebViewAuthFunction } from "@/src/data/clients/chukyoShibboleth";
import { NotSetError } from "../errors/serviceError";

export class AuthService {
    protected chukyoShibbolethAuth?: shibbolethWebViewAuthFunction;
    protected shibAuthQueue: Promise<void> = Promise.resolve();

    public setChukyoShibbolethAuthFunction(func: shibbolethWebViewAuthFunction) {
        this.chukyoShibbolethAuth = func;
    }

    public shibAuth(...params: Parameters<NonNullable<typeof this.chukyoShibbolethAuth>>): ReturnType<NonNullable<typeof this.chukyoShibbolethAuth>> {
        if (!this.chukyoShibbolethAuth) {
            throw new NotSetError({ cause: new Error("AuthServiceにChukyoShibbolethAuthが設定されていません") });
        }
        const authFn = this.chukyoShibbolethAuth;
        const task = () => authFn(...params);
        const queuedPromise = this.shibAuthQueue.then(task, task);
        this.shibAuthQueue = queuedPromise.then(
            () => undefined,
            () => undefined
        );
        return queuedPromise;
    }
}

const AuthServiceInstance = new AuthService();
export default AuthServiceInstance;
