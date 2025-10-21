import { shibbolethWebViewAuthFunction } from "@/src/data/clients/chukyoShibboleth";
import manaboProviderInstance from "@/src/data/providers/chukyo-univ/manaboProvider";
import { NotSetError } from "../errors/serviceError";

export interface AuthService {
    shibAuth: (...params: Parameters<shibbolethWebViewAuthFunction>) => ReturnType<shibbolethWebViewAuthFunction>;
    setChukyoShibbolethAuthFunction: (func: shibbolethWebViewAuthFunction) => void;
    authTest: (studentId: string, cuIdPass: string) => Promise<boolean>;
}

export class IntegratedAuthService implements AuthService {
    protected chukyoShibbolethAuth?: shibbolethWebViewAuthFunction;
    protected shibAuthQueue: Promise<void> = Promise.resolve();
    protected manaboProvider = manaboProviderInstance;

    public setChukyoShibbolethAuthFunction = (func: shibbolethWebViewAuthFunction) => {
        this.chukyoShibbolethAuth = func;
    };

    public authTest(studentId: string, cuIdPass: string): Promise<boolean> {
        return this.manaboProvider.authTest(studentId, cuIdPass);
    }

    public shibAuth = (...params: Parameters<shibbolethWebViewAuthFunction>): ReturnType<shibbolethWebViewAuthFunction> => {
        if (this.chukyoShibbolethAuth === undefined) {
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
    };
}

const authServiceInstance = new IntegratedAuthService();
export default authServiceInstance;
