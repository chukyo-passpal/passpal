import { Cookies } from "@react-native-cookies/cookies";

export interface CookieCredentials {
    cookies: Cookies;
    lastRefreshedAt: Date;
}
export type ChukyoUserAuthData = {
    studentId: string;
    cuIdPass: string;
};
