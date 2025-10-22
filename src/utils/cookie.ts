import { Cookies } from "@react-native-cookies/cookies";

/**
 * CookieオブジェクトをHTTPヘッダーで利用できる文字列表現へ変換します。
 * @param cookies 変換対象のCookieマップ
 * @returns `name=value`形式を`; `区切りで連結した文字列
 */
export function cookiesToString(cookies: Cookies): string {
    return Object.entries(cookies)
        .map(([name, cookie]) => `${name}=${cookie.value}`)
        .join("; ");
}
