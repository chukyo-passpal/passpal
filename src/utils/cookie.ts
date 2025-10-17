import { Cookies } from "@react-native-cookies/cookies";

export function cookiesToString(cookies: Cookies): string {
    return Object.entries(cookies)
        .map(([name, cookie]) => `${name}=${cookie.value}`)
        .join("; ");
}
