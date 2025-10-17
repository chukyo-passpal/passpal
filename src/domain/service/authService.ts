import { shibbolethWebViewAuthFunction } from "@/src/data/clients/chukyoShibboleth";

export class AuthService {
    protected ChukyoShibboleth?: shibbolethWebViewAuthFunction;
}

const AuthServiceInstance = new AuthService();
export default AuthServiceInstance;
