import CookieManager, { Cookies } from "@react-native-cookies/cookies";
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef, useState } from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

interface Credential {
    enterUrl: string;
    goalUrl: string;
    username: string;
    password: string;
}

export type shibbolethWebViewAuthFunction = (crd: Credential) => Promise<Cookies>;

export interface shibbolethWebViewRef {
    auth: shibbolethWebViewAuthFunction;
}

const ShibbolethWebViewBase: ForwardRefRenderFunction<shibbolethWebViewRef, object> = (_, ref) => {
    const [credential, setCredential] = useState<Credential | null>(null);
    const [randomKey, setRandomKey] = useState(0);

    const [authResolve, setAuthResolve] = useState<(() => void) | null>(null);
    const [authReject, setAuthReject] = useState<((reason?: any) => void) | null>(null);

    const isProcessingRef = useRef(false);
    const isProcessing = credential !== null;

    const handleMessage = (event: WebViewMessageEvent) => {
        switch (event.nativeEvent.data) {
            case "LOGIN_FAILED":
                if (authReject) authReject("LOGIN_FAILED");
                break;
            case "LOGIN_SUCCESS":
                if (authResolve) authResolve();
                break;
        }
    };

    // 親から呼ばれる関数を定義
    useImperativeHandle(ref, () => ({
        async auth(crd: Credential) {
            return new Promise<Cookies>(async (resolve, reject) => {
                isProcessingRef.current = true;

                try {
                    await new Promise((res, rej) => {
                        setAuthResolve(() => res);
                        setAuthReject(() => rej);

                        setRandomKey((prev) => prev + 1);
                        setCredential(crd);

                        setTimeout(() => {
                            CookieManager.clearAll();
                            CookieManager.clearAll(true);
                            setCredential(null);
                            rej(new Error("timeout"));
                        }, 5000);
                    });

                    const cookieBaseUrl = crd.goalUrl;
                    const cookies1 = await CookieManager.get(cookieBaseUrl);
                    const cookies2 = await CookieManager.get(cookieBaseUrl, true);
                    const cookies = { ...cookies1, ...cookies2 };

                    CookieManager.clearAll();
                    CookieManager.clearAll(true);
                    setCredential(null);
                    resolve(cookies);
                } catch (error) {
                    reject(error);
                } finally {
                    isProcessingRef.current = false;
                }
            });
        },
    }));

    const runFirst = `
(() => {
    let url = location.href;
    let loginFormUrl = "https://shib.chukyo-u.ac.jp/cloudlink/module.php/core/loginuserpass.php"
    let goalUrl = "${credential?.goalUrl}";
    let username = "${credential?.username}";
    let password = "${credential?.password}";

    // ID/PW入力フォーム時処理
    if (url.startsWith(loginFormUrl)) {
        // ログイン情報が違う時の処理
        if (document.querySelector(".c-message._error") !== null) {
            window.ReactNativeWebView.postMessage("LOGIN_FAILED");
            return;
        }

        // ログイン情報を入力して送信
        document.getElementById("username").value = username;
        document.getElementById("password").value = password;
        document.getElementById("login").click();
        return;
    }

    // 認証後のリダイレクト処理
    if (url.startsWith(goalUrl)) {
        window.ReactNativeWebView.postMessage("LOGIN_SUCCESS");
        return;
    }

})()

true; // note: this is required, or you'll sometimes get silent failures
`;

    return (
        <>
            {isProcessing && (
                <View style={{ height: 0 }} key={randomKey}>
                    <WebView
                        style={{ flex: 1 }}
                        source={{ uri: credential.enterUrl }}
                        sharedCookiesEnabled={true}
                        thirdPartyCookiesEnabled={true}
                        onMessage={handleMessage}
                        injectedJavaScript={runFirst}
                    />
                </View>
            )}
        </>
    );
};
const ShibbolethWebView = forwardRef(ShibbolethWebViewBase);
export default ShibbolethWebView;
