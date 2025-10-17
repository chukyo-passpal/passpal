import { Cookies } from "@react-native-cookies/cookies";

export interface CookieCredentials {
    cookies: Cookies;
    lastRefreshedAt: Date;
}
