import { CookieCredentials } from "@/src/domain/models/auth";
import { UserData } from "@/src/domain/models/user";
import AuthServiceInstance, { AuthService } from "@/src/domain/services/authService";
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

const useAuth = create<authState>()(
    persist(
        immer((set) => ({
            user: null,
            firebaseUser: null,
            isTermsAccepted: false,

            authService: AuthServiceInstance,

            signIn: (studentId, cuIdPass) =>
                set((state) => {
                    state.user = { studentId, cuIdPass };
                }),
            signOut: () =>
                set((state) => {
                    state.user = null;
                    state.firebaseUser = null;
                    state.isTermsAccepted = false;
                    state.manaboCredentials = undefined;
                    state.alboCredentials = undefined;
                }),
            acceptTerms: () =>
                set((state) => {
                    state.isTermsAccepted = true;
                }),

            setFirebaseUser: (user) =>
                set((state) => {
                    state.firebaseUser = user;
                }),
            setFirebaseIdToken: (idToken) =>
                set((state) => {
                    if (state.firebaseUser?.idToken) {
                        state.firebaseUser.idToken = idToken;
                    }
                }),

            setManaboCookie: (cookies) =>
                set((state) => {
                    state.manaboCredentials = { cookies, lastRefreshedAt: new Date() };
                }),
            setAlboCookie: (cookies) =>
                set((state) => {
                    state.alboCredentials = { cookies, lastRefreshedAt: new Date() };
                }),
            setCubicsCookie: (cookies) =>
                set((state) => {
                    state.cubicsCredentials = { cookies, lastRefreshedAt: new Date() };
                }),

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
                firebaseCritical: state.firebaseUser,
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
