import { User } from "@/types/user";
import { createContext, PropsWithChildren, use } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    acceptTerms: () => void;
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isTermsAccepted: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    acceptTerms: () => null,
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isTermsAccepted: false,
});

export function useAuth() {
    const value = use(AuthContext);
    if (!value) {
        throw new Error("useAuth must be wrapped in a <AuthProvider />");
    }

    return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
    const [[isLoadingStudentId, studentId], setStudentId] = useStorageState("studentId");
    const [[isLoadingCuIdPass, cuIdPass], setCuIdPass] = useStorageState("cuIdPass");
    const [[isLoadingIsTermsAccepted, isTermsAccepted], setIsTermsAccepted] = useStorageState("isTermsAccepted");

    let user: User | null = null;
    if (studentId && cuIdPass) {
        user = { studentId, cuIdPass };
    }

    const isLoading = isLoadingStudentId || isLoadingCuIdPass || isLoadingIsTermsAccepted;
    const isAuthenticated = Boolean(!isLoading && user !== null);

    return (
        <AuthContext
            value={{
                signIn: () => {
                    // Perform sign-in logic here
                    setStudentId("t324076");
                    setCuIdPass("examplePassword");
                },
                signOut: () => {
                    setStudentId(null);
                    setCuIdPass(null);
                    setIsTermsAccepted(null);
                },
                acceptTerms: () => {
                    setIsTermsAccepted('accepted');
                },
                user,
                isLoading,
                isAuthenticated,
                isTermsAccepted: isTermsAccepted === 'accepted',
            }}
        >
            {children}
        </AuthContext>
    );
}
