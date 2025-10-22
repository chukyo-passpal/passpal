import { CookieCredentials } from "@/src/domain/models/auth";
import { UserData } from "@/src/domain/models/user";
import authServiceInstance, { AuthService } from "@/src/domain/services/authService";
import { SecureStorage } from "@/src/utils/secureStorage";
import { Cookies } from "@react-native-cookies/cookies";
import { User } from "@react-native-google-signin/google-signin";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface authState {
    user: UserData | null;
    firebaseUser: User | null;
    isTermsAccepted: boolean;

    authService: AuthService;

    signIn: (studentId: string, cuIdPass: string) => void;
    signOut: () => void;
    acceptTerms: () => void;
    setFirebaseUser: (user: User) => void;
    setFirebaseIdToken: (idToken: string) => void;
    setManaboCookie: (cookies: Cookies) => void;
    setAlboCookie: (cookies: Cookies) => void;
    setCubicsCookie: (cookies: Cookies) => void;

    purgeCache: () => void;

    manaboCredentials?: CookieCredentials;
    alboCredentials?: CookieCredentials;
    cubicsCredentials?: CookieCredentials;
}

/**
 * 認証や利用規約、各サービスのCookieを管理するZustandストアを提供します。
 */
const useAuth = create<authState>()(
    persist(
        immer((set) => ({
            user: null,
            firebaseUser: null,
            isTermsAccepted: false,

            authService: authServiceInstance,

            /**
             * 認証情報を保存し、サインイン状態にします。
             * @param studentId 学籍番号
             * @param cuIdPass CU-IDパスワード
             */
            signIn: (studentId, cuIdPass) =>
                set((state) => {
                    state.user = { studentId, cuIdPass };
                }),
            /**
             * 全認証情報をクリアし、サインアウトします。
             */
            signOut: () =>
                set((state) => {
                    state.user = null;
                    state.firebaseUser = null;
                    state.isTermsAccepted = false;
                    state.manaboCredentials = undefined;
                    state.alboCredentials = undefined;
                }),
            /**
             * 利用規約に同意した状態を保存します。
             */
            acceptTerms: () =>
                set((state) => {
                    state.isTermsAccepted = true;
                }),

            /**
             * Firebaseユーザー情報を更新します。
             * @param user Firebaseユーザー
             */
            setFirebaseUser: (user) =>
                set((state) => {
                    state.firebaseUser = user;
                }),
            /**
             * FirebaseユーザーのIDトークンを更新します。
             * @param idToken 更新後のIDトークン
             */
            setFirebaseIdToken: (idToken) =>
                set((state) => {
                    if (state.firebaseUser?.idToken) {
                        state.firebaseUser.idToken = idToken;
                    }
                }),

            /**
             * Manabo用のCookie資格情報を保存します。
             * @param cookies 保存するCookie
             */
            setManaboCookie: (cookies) =>
                set((state) => {
                    state.manaboCredentials = { cookies, lastRefreshedAt: new Date() };
                }),
            /**
             * Albo用のCookie資格情報を保存します。
             * @param cookies 保存するCookie
             */
            setAlboCookie: (cookies) =>
                set((state) => {
                    state.alboCredentials = { cookies, lastRefreshedAt: new Date() };
                }),
            /**
             * Cubics用のCookie資格情報を保存します。
             * @param cookies 保存するCookie
             */
            setCubicsCookie: (cookies) =>
                set((state) => {
                    state.cubicsCredentials = { cookies, lastRefreshedAt: new Date() };
                }),

            /**
             * キャッシュとしてクリアできる情報を消します。
             */
            purgeCache: () =>
                set((state) => {
                    state.manaboCredentials = undefined;
                    state.alboCredentials = undefined;
                    state.cubicsCredentials = undefined;
                }),
        })),
        {
            name: "auth-storage",
            version: 0,
            partialize: (state) => ({
                user: state.user,
                firebaseUser: state.firebaseUser,
                isTermsAccepted: state.isTermsAccepted,
            }),
            storage: createJSONStorage(() => SecureStorage),
            migrate: (persistedState: any, version: number) => {
                // 将来的なマイグレーション処理
                // version 0 からのマイグレーション例:
                // if (version === 0) {
                //     persistedState.newField = defaultValue;
                // }
                return persistedState as authState;
            },
        }
    )
);
export default useAuth;
